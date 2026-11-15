
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Rocket,
  ArrowRight,
  Sparkles,
  Globe,
  ChevronDown,
  Orbit,
  BookOpen,
  Telescope,
} from "lucide-react";

const destinations = [
  {
    name: "The Moon",
    subtitle: "Where humanity left its first footprints",
    image: "/images/moon.jpg",
    path: "/explore/moon",
    number: "01",
    color: "#a78bfa",
  },
  {
    name: "Mars",
    subtitle: "The red planet of endless discoveries",
    image: "/images/mars.jpg",
    path: "/explore/mars",
    number: "02",
    color: "#fb923c",
  },
];

function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  function handleMouseMove(e) {
    if (reduceMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
    });
  }

  return (
    <main className="relative overflow-hidden bg-[#030712] text-white">

      {/* ================= HERO SECTION ================= */}

      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        className="relative flex min-h-[90vh] items-center overflow-hidden"
      >

        {/* Space Background */}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#312e81,transparent_55%)]" />

        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-700/10 blur-[150px]" />

        {/* Animated Stars */}

        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 100 }, (_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${(i * 73.7) % 100}%`,
                top: `${(i * 37.3) % 100}%`,
                width: i % 5 === 0 ? 3 : 2,
                height: i % 5 === 0 ? 3 : 2,
              }}
              animate={{
                opacity: reduceMotion ? 0.6 : [0.2, 1, 0.2],
              }}
              transition={{
                duration: 2 + (i % 4),
                repeat: reduceMotion ? 0 : Infinity,
                delay: i % 5,
              }}
            />
          ))}
        </div>

        {/* Shooting Stars */}

        {!reduceMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute h-[2px] w-36 bg-gradient-to-r from-transparent via-cyan-300 to-white"
                style={{
                  top: `${5 + i * 17}%`,
                  left: "-150px",
                }}
                initial={{ opacity: 0 }}
                animate={{
                  x: [0, 1800],
                  y: [0, 500],
                  opacity: [0, 1, 1, 0],
                  rotate: 16,
                }}
                transition={{
                  duration: 3,
                  delay: i * 4,
                  repeat: Infinity,
                  repeatDelay: 10,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}

        {/* Hero Content */}

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16 px-6 py-24 lg:flex-row lg:px-12">

          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={reduceMotion ? false : { opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >

            {/* NASA Challenge Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm text-purple-300">
              <Sparkles size={16} />
              NASA Space Apps Challenge 2026
            </div>

            {/* Main Title */}

            <h1 className="text-6xl font-black leading-tight tracking-tight md:text-8xl">
              Echoes of

              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Space
              </span>
            </h1>

            <h2 className="mt-6 text-xl font-medium text-purple-200 md:text-2xl">
              Forgotten Machines. Unforgettable Stories.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-400 lg:mx-0">
              Beyond Earth, silent explorers are waiting to tell
              their stories. Journey to the Moon and Mars,
              discover NASA's forgotten machines, and uncover
              the science that changed our understanding of space.
            </p>

            {/* Explore Button */}

            <Link
              to="/explore"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#8b5cf6]"
            >
              <Rocket size={22} />

              Start Exploring

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>

            {/* Statistics */}

            <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start">

              <div className="flex items-center gap-3">
                <Globe className="text-cyan-400" />

                <div className="text-left">
                  <p className="text-xl font-bold">02</p>
                  <p className="text-xs text-gray-400">
                    Destinations
                  </p>
                </div>
              </div>

              <div className="h-12 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <Rocket className="text-purple-400" />

                <div className="text-left">
                  <p className="text-xl font-bold">04</p>
                  <p className="text-xs text-gray-400">
                    Space Explorers
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ================= REALISTIC MOON ================= */}

          <motion.div
            className="relative flex min-h-[360px] flex-1 items-center justify-center"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mouse.x,
              y: mouse.y,
            }}
            transition={{ duration: 0.6 }}
          >

            {/* Moon Glow */}

            <div className="absolute h-72 w-72 rounded-full bg-purple-600/25 blur-[100px] md:h-[420px] md:w-[420px]" />

            {/* Moon Image */}

            <motion.div
              className="relative h-64 w-64 md:h-96 md:w-96"
              animate={{
                y: reduceMotion ? 0 : [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
              whileHover={reduceMotion ? {} : { scale: 1.06 }}
            >
              <img
                src="/images/moon.jpg"
                alt="The Moon"
                className="h-full w-full rounded-full object-cover shadow-[0_0_80px_#6366f155]"
              />
            </motion.div>

            

          

            

            {/* Floating Mission Card */}

            <motion.div
              className="absolute right-0 top-0 rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4 backdrop-blur-xl"
              animate={{
                y: reduceMotion ? 0 : [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: reduceMotion ? 0 : Infinity,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 motion-safe:animate-pulse" />

                <p className="text-xs tracking-widest text-cyan-300">
                  MISSION STATUS
                </p>
              </div>

              <p className="mt-2 font-semibold">
                Ready to Explore
              </p>
            </motion.div>

            {/* Moon Information */}

            <div className="absolute bottom-0 left-0 rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl">
              <p className="text-xs tracking-widest text-purple-400">
                DESTINATION 01
              </p>

              <p className="mt-1 text-xl font-bold">
                The Moon
              </p>

              <p className="mt-1 text-xs text-gray-400">
                ~384,400 km from Earth
              </p>
            </div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}

        <motion.a
          href="#destinations"
          aria-label="Scroll to destinations"
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-purple-300"
          animate={{
            y: reduceMotion ? 0 : [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: reduceMotion ? 0 : Infinity,
          }}
        >
          <ChevronDown size={30} />
        </motion.a>

      </section>

      {/* ================= DESTINATIONS SECTION ================= */}

      <section
        id="destinations"
        className="relative mx-auto max-w-7xl px-6 py-24 lg:px-12"
      >

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-semibold tracking-[0.3em] text-purple-400">
            YOUR JOURNEY BEGINS
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Choose Your Destination
          </h2>

          <p className="mt-4 text-gray-400">
            Two worlds. Four forgotten explorers.
            Endless stories waiting to be discovered.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">

          {destinations.map((planet, index) => (
            <motion.div
              key={planet.name}
              initial={reduceMotion ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
            >

              <Link
                to={planet.path}
                className="group relative block h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b1120] transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/60 hover:shadow-[0_0_40px_#8b5cf633]"
              >

                {/* Planet Image */}

                <img
                  src={planet.image}
                  alt={planet.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />

                {/* Number */}

                <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm backdrop-blur-md">
                  DESTINATION {planet.number}
                </div>

                {/* Card Content */}

                <div className="absolute bottom-0 w-full p-8">

                  <h3
                    className="text-4xl font-bold"
                    style={{ color: planet.color }}
                  >
                    {planet.name}
                  </h3>

                  <p className="mt-3 text-gray-300">
                    {planet.subtitle}
                  </p>

                  <div className="mt-6 flex items-center gap-3 font-semibold">
                    Discover Stories

                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-3" />
                  </div>

                </div>

              </Link>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= ABOUT EXPERIENCE ================= */}

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-sm tracking-[0.3em] text-cyan-400">
              MORE THAN MACHINES
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Every Explorer Has a Story
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                icon: Telescope,
                title: "Discover",
                text: "Explore the forgotten equipment left behind on the Moon and Mars.",
              },
              {
                icon: BookOpen,
                title: "Experience",
                text: "Listen to the stories of space explorers through their own perspective.",
              },
              {
                icon: Orbit,
                title: "Learn",
                text: "Uncover the science and discoveries that shaped space exploration.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={reduceMotion ? {} : { y: -8 }}
                  className="group rounded-2xl border border-white/10 bg-slate-900/50 p-8 transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-500/10"
                >
                  <div className="mb-6 inline-flex rounded-xl bg-purple-500/15 p-4 text-purple-400 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-gray-400">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="relative overflow-hidden px-6 py-24 text-center">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#312e8155,transparent_70%)]" />

        <div className="relative">

          <Sparkles className="mx-auto mb-5 text-purple-400" size={35} />

          <h2 className="text-4xl font-bold md:text-5xl">
            The Universe Is Waiting.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Their missions may have ended, but their stories
            are still waiting to be heard.
          </p>

          <Link
            to="/explore"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_#8b5cf6]"
          >
            Begin Your Journey

            <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;
