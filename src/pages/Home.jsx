import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        Echoes of Space
      </h1>

      <p className="mt-4 text-xl text-purple-300">
        Forgotten Machines. Unforgettable Stories.
      </p>

      <Link
        to="/explore"
        className="mt-8 bg-purple-600 px-6 py-3 rounded-lg"
      >
        Start Exploring
      </Link>
    </div>
  );
}

export default Home;