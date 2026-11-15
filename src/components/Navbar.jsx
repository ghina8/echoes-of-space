import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-12 py-5 bg-slate-950 text-white border-b border-white/10">

      <Link to="/" className="text-2xl font-bold tracking-wider">
        ECHOES<span className="text-purple-400">.</span>
      </Link>

      <div className="flex items-center gap-6 text-sm">

        <Link to="/" className="hover:text-purple-400 transition">
          Home
        </Link>

        <Link to="/explore" className="hover:text-purple-400 transition">
          Explore
        </Link>

      </div>

      <Link
        to="/explore"
        className="border border-purple-400 rounded-full px-5 py-2 hover:bg-purple-600 transition"
      >
        Begin Journey
      </Link>

    </nav>
  );
}

export default Navbar;