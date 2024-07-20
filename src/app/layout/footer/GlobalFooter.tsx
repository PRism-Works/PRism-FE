import { Mail, Copyright } from 'lucide-react';

export default function GlobalFooter() {
  return (
    <footer className="bottom-0 h-full w-full bg-gray-100 py-6">
      <div className="flex flex-col items-center gap-2 md:h-20">
        <p className="text-gray-600 display2">Team PRism.</p>
        <div className="flex items-center gap-1 text-gray-500 mobile2">
          <Mail className="h-4 w-4" />
          Contact Us: swyp5thteam6@gmail.com
        </div>
        <div className="flex items-center text-gray-400 display5">
          <Copyright className="h-3 w-3" />
          2024. PRism. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
