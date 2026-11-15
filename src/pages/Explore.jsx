/**
 * Project: Echoes of Space
 * Team: GY - NASA Space Apps Challenge 2026
 * AI-assisted development using OpenAI ChatGPT.
 * Reviewed and customized by Team GY.
 * See AI_DISCLOSURE.md for details.
 */
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  MapPin,
  Orbit,
} from "lucide-react";

const planets = [
  {
    id: "moon",
    name: "The Moon",
    label: "DESTINATION 01",
    image: "/images/moon.jpg",
    color: "#a78bfa",
    distance: "384,400 km",
    explorers: "2 Explorers",
    description:
      "Walk in the footsteps of astronauts and discover the machines that helped humanity explore another world.",
  },
  {
    id: "mars",
    name: "Mars",
    label: "DESTINATION 02",
    image: "/images/mars.jpg",
    color: "#fb923c",
    distance: "225 million km",
    explorers: "2 Explorers",
    description:
      "Travel to the Red Planet and meet the robotic explorers that uncovered its extraordinary secrets.",
  },
];

function Explore() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#312e8155,transparent_65%)]" />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 90 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 73.7) % 100}%`,
              top: `${(i * 37.3) % 100}%`,
              width: i % 4 === 0 ? 3 : 2,
              height: i % 4 === 0 ? 3 : 2,
            }}
            animate={{
              opacity: reduceMotion ? 0.5 : [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2 + (i % 4),
              repeat: reduceMotion ? 0 : Infinity,
              delay: i % 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-12">

        {/* Back Button */}
        <Link
          to="/"
          className="group inline-flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft
            size={20}
            className="transition-transform group-hover:-translate-x-2"
          />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14 mt-10 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm tracking-widest text-cyan-300">
            <Orbit size={18} />
            MISSION CONTROL
          </div>

          <h1 className="text-5xl font-black md:text-7xl">
            Select Your
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Destination
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
            Your spacecraft is ready. Choose a world and
            discover the forgotten explorers waiting for you.
          </p>
        </motion.div>

        {/* Planet Cards */}
        <div className="grid gap-8 md:grid-cols-2">

          {planets.map((planet, index) => (
            <motion.div
              key={planet.id}
              initial={reduceMotion ? false : { opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1120]/80 p-8 backdrop-blur-lg transition-all duration-500 hover:border-[var(--planet-color)] hover:shadow-[0_0_40px_var(--planet-glow)]"
              style={{
                "--planet-color": planet.color,
                "--planet-glow": `${planet.color}33`,
              }}
            >

              {/* Destination Label */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold tracking-[0.2em]"
                  style={{ color: planet.color }}
                >
                  {planet.label}
                </span>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="h-2 w-2 rounded-full bg-green-400 motion-safe:animate-pulse" />
                  AVAILABLE
                </div>
              </div>

              {/* Floating Planet */}
              <div className="relative flex h-[320px] items-center justify-center">

                <div
                  className="absolute h-56 w-56 rounded-full opacity-20 blur-[80px] transition-opacity duration-500 group-hover:opacity-50"
                  style={{ backgroundColor: planet.color }}
                />

                <motion.div
                  className="relative h-56 w-56 md:h-64 md:w-64"
                  animate={{
                    y: reduceMotion ? 0 : [0, -12, 0],
                    rotate: reduceMotion ? 0 : [-3, 3, -3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="h-full w-full rounded-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-110"
                    style={{
                      boxShadow: `0 0 50px ${planet.color}44`,
                    }}
                  />
                </motion.div>

                
                
              </div>

              {/* Planet Details */}
              <h2
                className="text-4xl font-bold"
                style={{ color: planet.color }}
              >
                {planet.name}
              </h2>

              <p className="mt-4 min-h-[80px] leading-relaxed text-gray-400">
                {planet.description}
              </p>

              {/* Mission Information */}
              <div className="my-6 grid grid-cols-2 gap-4">

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <MapPin size={19} style={{ color: planet.color }} />

                  <p className="mt-2 text-xs text-gray-400">
                    Avg. Distance from Earth
                  </p>

                  <p className="mt-1 font-semibold">
                    {planet.distance}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <Rocket size={19} style={{ color: planet.color }} />

                  <p className="mt-2 text-xs text-gray-400">
                    Discover
                  </p>

                  <p className="mt-1 font-semibold">
                    {planet.explorers}
                  </p>
                </div>

              </div>

              {/* Launch Mission Button */}
              <Link
                to={`/explore/${planet.id}`}
                className="group/button flex w-full items-center justify-center gap-3 rounded-xl py-4 font-bold text-[#030712] transition-all duration-300 hover:brightness-125"
                style={{ backgroundColor: planet.color }}
              >
                <Rocket size={21} />

                Launch Mission

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover/button:translate-x-2"
                />
              </Link>

            </motion.div>
          ))}

        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-sm tracking-widest text-gray-500">
            TWO WORLDS • FOUR EXPLORERS • ONE JOURNEY
          </p>
        </div>

      </div>
    </main>
  );
}

export default Explore;
