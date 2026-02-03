import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* LEFT */}
          <div className="flex items-center gap-2 text-sm">
            <FaBookOpen className="text-blue-400 text-lg" />
            <span className="font-medium">BookHub</span>
            <span className="opacity-60">© 2026</span>
          </div>

          {/* CENTER */}
          <p className="text-xs opacity-60 text-center">
            Built with ❤️ for readers
          </p>

          {/* RIGHT */}
          <div className="flex items-center gap-4 text-lg">
            <FaGithub className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaLinkedin className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}