/**
 * Project: Echoes of Space
 * Team: GY - NASA Space Apps Challenge 2026
 * AI-assisted development using OpenAI ChatGPT.
 * Reviewed and customized by Team GY.
 * See AI_DISCLOSURE.md for details.
 */
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  MapPin,
  CalendarDays,
  BookOpen,
  Radio,
  Sparkles,
} from "lucide-react";

import equipment from "../data/equipment.json";

const equipmentImages = {
  "apollo-11-eagle": "images/stories/eagle/hero.jpg",
  "apollo-15-rover": "images/stories/lunar-rover/hero.jpg",
  "opportunity": "images/stories/opportunity/hero.jpg",
  "ingenuity": "images/stories/ingenuity/hero.jpg",
};


function Equipment() {
  const { planet } = useParams();
  const reduceMotion = useReducedMotion();

  const planetId = planet?.toLowerCase();
  const isMoon = planetId === "moon";

  const color = isMoon ? "#a78bfa" : "#fb923c";

  const planetName = isMoon ? "The Moon" : "Mars";

  const planetImage = isMoon
    ? "/images/moon.jpg"
    : "/images/mars.jpg";

  const filteredEquipment = equipment.filter(
    (item) => item.planet.toLowerCase() === planetId
  );

  if (!["moon", "mars"].includes(planetId)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#030712] text-white">
        <h1 className="text-4xl font-bold">
          Destination not found
        </h1>

        <Link
          to="/explore"
          className="mt-6 text-purple-400"
        >
          Back to Destinations
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* ================= BACKGROUND ================= */}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top right, ${color}22, transparent 55%)`,
        }}
      />

      {/* Animated Stars */}

      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 80 }, (_, i) => (
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
              opacity: reduceMotion
                ? 0.5
                : [0.2, 0.9, 0.2],
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

        {/* ================= BACK BUTTON ================= */}

        <Link
          to="/explore"
          className="group inline-flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft
            size={20}
            className="transition-transform group-hover:-translate-x-2"
          />

          Back to Destinations
        </Link>

        {/* ================= HERO ================= */}

        <section className="mb-16 mt-12 flex flex-col items-center gap-12 lg:flex-row">

          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: -40 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm tracking-widest"
              style={{
                color,
                borderColor: `${color}44`,
                backgroundColor: `${color}15`,
              }}
            >
              <Rocket size={17} />

              {isMoon
                ? "LUNAR EXPLORATION"
                : "MARTIAN EXPLORATION"}
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Meet the Forgotten

              <span
                className="block"
                style={{ color }}
              >
                Explorers
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-300">
              Their missions ended. Their stories didn't.
            </p>

            <p className="mt-4 max-w-xl leading-relaxed text-gray-400">
              Discover the incredible machines left behind on
              {isMoon ? " the Moon" : " Mars"} and experience
              their journeys through their own stories.
            </p>

            <div
              className="mt-7 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3"
            >
              <Radio size={20} style={{ color }} />

              <span className="font-semibold">
                {filteredEquipment.length} Explorers to Discover
              </span>
            </div>

          </motion.div>

          {/* Floating Planet */}

          <motion.div
            className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80"
            animate={{
              y: reduceMotion ? 0 : [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >

            <div
              className="absolute inset-0 rounded-full opacity-30 blur-[70px]"
              style={{ backgroundColor: color }}
            />

            <img
              src={planetImage}
              alt={planetName}
              className="relative h-full w-full rounded-full object-cover"
              style={{
                boxShadow: `0 0 60px ${color}33`,
              }}
            />

          </motion.div>

        </section>

        {/* ================= SECTION TITLE ================= */}

        <div className="mb-8 flex items-center gap-4">

          <div
            className="h-8 w-1 rounded-full"
            style={{ backgroundColor: color }}
          />

          <h2 className="text-3xl font-bold">
            {planetName} Mission Archive
          </h2>

          <div className="h-px flex-1 bg-white/10" />

        </div>

        {/* ================= EQUIPMENT CARDS ================= */}

        <div className="grid gap-8 md:grid-cols-2">

          {filteredEquipment.map((item, index) => (

            <motion.article
              key={item.id}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 50 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
              whileHover={
                reduceMotion ? {} : { y: -8 }
              }
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1120] transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_0_40px_var(--glow)]"
              style={{
                "--accent": color,
                "--glow": `${color}33`,
              }}
            >

              {/* Equipment Image */}

              <div className="relative h-72 overflow-hidden bg-slate-900 md:h-80">

                <img
                  src={`${import.meta.env.BASE_URL}${equipmentImages[item.id] || item.image}`}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = planetImage;
                  }}
                  className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-black/30" />

                {/* Mission Number */}

                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs tracking-widest backdrop-blur-md">
                  EXPLORER 0{index + 1}
                </div>

                {/* Equipment Type */}

                <div
                  className="absolute bottom-5 left-6 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-md"
                  style={{
                    color,
                    borderColor: `${color}55`,
                    backgroundColor: "#030712aa",
                  }}
                >
                  {item.type}
                </div>

              </div>

              {/* Equipment Details */}

              <div className="flex flex-1 flex-col p-7 md:p-8">

                <div
                  className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider"
                  style={{ color }}
                >
                  <CalendarDays size={17} />

                  {item.year} • {item.mission}
                </div>

                <h3 className="text-3xl font-bold">
                  {item.name}
                </h3>

                <p
                  className="mt-2 text-lg italic"
                  style={{ color }}
                >
                  {item.title}
                </p>

                <p className="mt-5 leading-relaxed text-gray-400">
                  {item.description}
                </p>

                {/* Location and Status */}

                <div className="my-6 space-y-3">

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">

                    <MapPin
                      size={21}
                      style={{ color }}
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Final Location
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {item.location}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">

                    <Radio
                      size={21}
                      style={{ color }}
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Mission Status
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {item.status}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Fun Fact */}

                <div
                  className="mb-6 rounded-xl border p-4"
                  style={{
                    borderColor: `${color}33`,
                    backgroundColor: `${color}0d`,
                  }}
                >

                  <div
                    className="mb-2 flex items-center gap-2 text-sm font-bold"
                    style={{ color }}
                  >
                    <Sparkles size={17} />

                    DID YOU KNOW?
                  </div>

                  <p className="text-sm leading-relaxed text-gray-300">
                    {item.funFact}
                  </p>

                </div>

                {/* Story Button */}

                <Link
                  to={`/story/${item.id}`}
                  className="group/button mt-auto flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 font-bold text-[#030712] transition-all duration-300 hover:brightness-125"
                  style={{
                    backgroundColor: color,
                  }}
                >

                  <BookOpen size={21} />

                  Discover My Story

                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover/button:translate-x-2"
                  />

                </Link>

              </div>

            </motion.article>

          ))}

        </div>

        {/* ================= BOTTOM SECTION ================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 border-t border-white/10 py-12 text-center"
        >

          <Sparkles
            className="mx-auto mb-5"
            size={30}
            style={{ color }}
          />

          <h2 className="text-3xl font-bold">
            The Adventure Continues
          </h2>

          <p className="mt-4 text-gray-400">
            Another world is waiting to share its stories.
          </p>

          <Link
            to={isMoon ? "/explore/mars" : "/explore/moon"}
            className="group mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3 font-semibold transition-all hover:bg-white/10"
            style={{
              color,
              borderColor: `${color}66`,
            }}
          >

            Explore {isMoon ? "Mars" : "The Moon"}

            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-2"
            />

          </Link>

        </motion.div>

      </div>
    </main>
  );
}

export default Equipment;
