'use client';

import { useEffect, useRef } from 'react';

export default function PageSpinner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PI = Math.PI;
    const TAU = PI * 2;
    const width = 200;
    const height = 200;
    const min = width * 0.5;
    const particles: Particle[] = [];
    let globalAngle = 0;
    let tick = 0;
    let lastFrameTime = 0;
    let animationFrameId: number;

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
        if (!ctx) return;
        // 블루에서 퍼플, 핑크 색상 범위를 사용
        const hue = ((tick + this.life * 90) % 90) + 240;
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${this.life})`;
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${this.life})`;
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
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, i) => {
        particle.draw(i);
      });
    }

    function loop(currentTime: number) {
      animationFrameId = window.requestAnimationFrame(loop);
      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime > 16) {
        lastFrameTime = currentTime;
        step();
        draw();
        tick += 2;
      }
    }

    animationFrameId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    };
  }, []);

  return (
    <div className="bg-white fixed inset-0 z-50 flex items-center justify-center bg-opacity-80">
      <div className="relative">
        <canvas ref={canvasRef} className="block"></canvas>
      </div>
    </div>
  );
}
