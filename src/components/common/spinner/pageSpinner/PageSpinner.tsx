import { useEffect, useRef } from 'react';
import './PageSpinner.module.css';

export default function PageSpinner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const PI = Math.PI;
    const TAU = PI * 2;
    const width = 200;
    const height = 200;
    const min = width * 0.5;
    const particles: Particle[] = [];
    let globalAngle = 0;
    let tick = 0;
    let lastFrameTime = 0;

    class Particle {
      x: number;
      y: number;
      angle: number;
      speed: number;
      accel: number;
      radius: number;
      decay: number;
      life: number;

      constructor(opt: { x: number; y: number; angle: number; speed: number; accel: number }) {
        this.x = opt.x;
        this.y = opt.y;
        this.angle = opt.angle;
        this.speed = opt.speed;
        this.accel = opt.accel;
        this.radius = 4;
        this.decay = 0.01;
        this.life = 1;
      }

      step(i: number) {
        this.speed += this.accel;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.angle += PI / 64;
        this.accel *= 1.01;
        this.life -= this.decay;

        if (this.life <= 0) {
          particles.splice(i, 1);
        }
      }

      draw(i: number) {
        ctx.fillStyle = `hsla(${tick + this.life * 120}, 100%, 60%, ${this.life})`;
        ctx.strokeStyle = `hsla(${tick + this.life * 120}, 100%, 60%, ${this.life})`;
        ctx.beginPath();
        if (particles[i - 1]) {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(particles[i - 1].x, particles[i - 1].y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.001, this.life * this.radius), 0, TAU);
        ctx.fill();

        const size = Math.random() * 1.25;
        ctx.fillRect(
          ~~(this.x + (Math.random() - 0.5) * 35 * this.life),
          ~~(this.y + (Math.random() - 0.5) * 35 * this.life),
          size,
          size,
        );
      }
    }

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.globalCompositeOperation = 'lighter';

    function step() {
      particles.push(
        new Particle({
          x: width / 2 + (Math.cos(tick / 20) * min) / 2,
          y: height / 2 + (Math.sin(tick / 20) * min) / 2,
          angle: globalAngle,
          speed: 0,
          accel: 0.01,
        }),
      );

      particles.forEach((particle, i) => {
        particle.step(i);
      });

      globalAngle += (2 * PI) / 5;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, i) => {
        particle.draw(i);
      });
    }

    function loop(currentTime: number) {
      window.requestAnimationFrame(loop);
      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime > 16) {
        lastFrameTime = currentTime;
        step();
        draw();
        tick++;
      }
    }

    window.requestAnimationFrame(loop);
  }, []);

  return (
    <div className="page-spinner">
      <canvas ref={canvasRef} className="canvas"></canvas>
    </div>
  );
}
