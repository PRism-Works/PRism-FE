import { Mail, Copyright } from 'lucide-react';

export default function GlobalFooter() {
  return (
    <footer className="bg-gray-100 bottom-0 h-full w-full py-6">
      <div className="flex flex-col items-center gap-2 md:h-20">
        <p className="text-gray-600 display2">Team PRism.</p>
        <div className="text-gray-500 flex items-center gap-1 mobile2">
          <Mail className="h-4 w-4" />
          Contact Us: swyp5thteam6@gmail.com
        </div>
        <div className="text-gray-400 flex items-center display5">
          <Copyright className="h-3 w-3" />
          2024. PRism. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
