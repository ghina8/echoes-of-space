/**
 * Project: Echoes of Space
 * Team: GY - NASA Space Apps Challenge 2026
 * AI-assisted development using OpenAI ChatGPT.
 * Reviewed and customized by Team GY.
 * See AI_DISCLOSURE.md for details.
 */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Rocket,
  Trophy,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Target,
  Star,
} from "lucide-react";

const allQuestions = [
    {
    planet: "Moon",
    mission: "Apollo 11 — Eagle",
    question: "In which year did Eagle land on the Moon?",
    options: ["1959", "1969", "1971", "1989"],
    answer: 1,
    explanation:
      "Eagle landed on the Moon on July 20, 1969, during the Apollo 11 mission.",
  },
  {
    planet: "Moon",
    mission: "Apollo 11 — Eagle",
    question: "Which part of Eagle remains on the Moon?",
    options: [
      "The ascent stage",
      "The entire spacecraft",
      "The descent stage",
      "The command module",
    ],
    answer: 2,
    explanation:
      "The descent stage stayed on the Moon and served as a launch platform for the ascent stage.",
  },
  {
    planet: "Moon",
    mission: "Apollo 11 — Eagle",
    question: "Where did Eagle land?",
    options: [
      "Jezero Crater",
      "Mount Everest",
      "Perseverance Valley",
      "Sea of Tranquility",
    ],
    answer: 3,
    explanation:
      "Eagle landed in the Sea of Tranquility, a large lunar plain.",
  },
  {
    planet: "Moon",
    mission: "Apollo 15 — Lunar Rover",
    question: "What powered the Lunar Rover?",
    options: [
      "Electric batteries",
      "Gasoline",
      "Wind energy",
      "Rocket fuel",
    ],
    answer: 0,
    explanation:
      "The Lunar Rover used batteries and electric motors to travel across the Moon.",
  },
  {
    planet: "Moon",
    mission: "Apollo 15 — Lunar Rover",
    question: "How far did the Apollo 15 Lunar Rover travel?",
    options: [
      "2 kilometers",
      "100 kilometers",
      "About 27.9 kilometers",
      "500 kilometers",
    ],
    answer: 2,
    explanation:
      "The Apollo 15 Lunar Rover traveled approximately 27.9 kilometers, helping astronauts explore farther.",
  },
  {
    planet: "Moon",
    mission: "Apollo 15 — Lunar Rover",
    question: "Why was the Lunar Rover left behind?",
    options: [
      "It ran away",
      "It was not designed to return to Earth",
      "It melted",
      "It was lost in space",
    ],
    answer: 1,
    explanation:
      "The Lunar Rover was designed for surface exploration, not transportation back to Earth.",
  },
  {
    planet: "Mars",
    mission: "Opportunity",
    question: "How long was Opportunity originally expected to operate?",
    options: [
      "90 Martian days",
      "15 years",
      "10 years",
      "One hour",
    ],
    answer: 0,
    explanation:
      "Opportunity was designed for 90 Martian days, but explored Mars for almost 15 years!",
  },
  {
    planet: "Mars",
    mission: "Opportunity",
    question: "What important evidence did Opportunity discover?",
    options: [
      "Living dinosaurs",
      "Forests",
      "Evidence of ancient water",
      "Alien buildings",
    ],
    answer: 2,
    explanation:
      "Opportunity discovered geological evidence that liquid water once existed on Mars.",
  },
  {
    planet: "Mars",
    mission: "Opportunity",
    question: "What caused Opportunity to lose contact with Earth?",
    options: [
      "A broken wheel",
      "An asteroid impact",
      "Heavy rain",
      "A massive dust storm",
    ],
    answer: 3,
    explanation:
      "A massive dust storm in 2018 blocked the sunlight needed by Opportunity's solar panels.",
  },
  {
    planet: "Mars",
    mission: "Ingenuity",
    question: "What made Ingenuity's mission historic?",
    options: [
      "It discovered an ocean",
      "It achieved the first powered flight on another planet",
      "It carried astronauts",
      "It returned to Earth",
    ],
    answer: 1,
    explanation:
      "On April 19, 2021, Ingenuity achieved the first powered, controlled flight on another planet.",
  },
  {
    planet: "Mars",
    mission: "Ingenuity",
    question: "How many flights did Ingenuity complete?",
    options: ["5", "12", "30", "72"],
    answer: 3,
    explanation:
      "Ingenuity was designed for five flights but successfully completed 72 flights on Mars.",
  },
  {
    planet: "Mars",
    mission: "Ingenuity",
    question: "Why did Ingenuity stop flying?",
    options: [
      "Damage to its rotor blades",
      "It returned to Earth",
      "It ran out of oxygen",
      "It landed on the Moon",
    ],
    answer: 0,
    explanation:
      "Damage to Ingenuity's rotor blades during its final flight ended its flying mission in January 2024.",
  },
];

export default function Quiz() {
  const { id } = useParams();

const missions = {
  "apollo-11-eagle": {
    name: "Eagle",
    questions: allQuestions.slice(0, 3),
  },
  "apollo-15-rover": {
    name: "Lunar Rover",
    questions: allQuestions.slice(3, 6),
  },
  opportunity: {
    name: "Opportunity",
    questions: allQuestions.slice(6, 9),
  },
  ingenuity: {
    name: "Ingenuity",
    questions: allQuestions.slice(9, 12),
  },
};

const mission = missions[id];

const questions = mission
  ? mission.questions
  : allQuestions;

const missionName = mission
  ? mission.name
  : "Space Explorer";
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const reduceMotion = useReducedMotion();

  const question = questions[current];

  const accent =
    question.planet === "Moon" ? "#a78bfa" : "#fb923c";

  const answered = selected !== null;

  const progress =
    ((current + (answered ? 1 : 0)) / questions.length) * 100;

  const selectAnswer = (index) => {
    if (answered) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const nextQuestion = () => {
    if (!answered) return;

    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent((previous) => previous + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setStarted(false);
  };

  const percentage = (score / questions.length) * 100;

const rank =
  percentage === 100
    ? "Legendary Space Explorer"
    : percentage >= 75
    ? "Expert Space Explorer"
    : percentage >= 50
    ? "Rising Astronaut"
    : "Curious Space Cadet";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* SPACE BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#7c3aed22,transparent_60%)]" />

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

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12">

        <Link
          to="/explore"
          className="inline-flex items-center gap-3 text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={20} />
          Back to Exploration
        </Link>

        <AnimatePresence mode="wait">

          {/* INTRO SCREEN */}

          {!started && !finished && (
            <motion.section
              key="intro"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0 }}
              className="flex min-h-[75vh] flex-col items-center justify-center text-center"
            >

              <motion.div
                animate={{
                  y: reduceMotion ? 0 : [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: reduceMotion ? 0 : Infinity,
                }}
                className="mb-10 rounded-full border border-purple-400/30 bg-purple-500/10 p-10 shadow-[0_0_70px_#a78bfa33]"
              >
                <Rocket size={80} className="text-purple-400" />
              </motion.div>

              <p className="mb-5 tracking-[0.35em] text-purple-400">
                YOUR NEXT MISSION
              </p>

              <h1 className="text-5xl font-black leading-tight md:text-7xl">
                {missionName}
                <span className="block text-purple-400">
                  Challenge
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-400">
                You've discovered their stories.
                Now it's time to prove your knowledge
                and become a true space explorer!
              </p>

              <div className="my-10 grid w-full max-w-2xl grid-cols-3 gap-3">

                {[
                  { icon: Target, value: questions.length, label: "Questions" },
                  { icon: Rocket, value: mission ? "1" : "4", label: "Explorers" },
                  { icon: Star, value: mission ? "1" : "2", label: "Worlds" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6"
                  >
                    <item.icon
                      className="mx-auto mb-3 text-purple-400"
                      size={25}
                    />
                    <p className="text-3xl font-bold">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-gray-400 md:text-sm">
                      {item.label}
                    </p>
                  </div>
                ))}

              </div>

              <button
                onClick={() => setStarted(true)}
                className="flex items-center gap-3 rounded-full bg-purple-400 px-10 py-5 text-lg font-bold text-[#030712] shadow-[0_0_40px_#a78bfa55] transition hover:scale-105"
              >
                Launch Challenge
                <Rocket size={22} />
              </button>

            </motion.section>
          )}

          {/* QUESTION SCREEN */}

          {started && !finished && (
            <motion.section
              key={`question-${current}`}
              initial={reduceMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-3xl py-12"
            >

              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

                <span className="text-sm tracking-widest text-gray-400">
                  MISSION {current + 1} / {questions.length}
                </span>

                <div className="flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-yellow-300">
                  <Star size={18} />
                  {score} Points
                </div>

              </div>

              <div
                role="progressbar"
                aria-label="Quiz progress"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mb-10 h-2 overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${progress}%` }}
                  style={{ backgroundColor: accent }}
                />
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0b1120]/90 p-6 backdrop-blur-xl md:p-10">

                <div
                  className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                  style={{
                    color: accent,
                    borderColor: `${accent}44`,
                    backgroundColor: `${accent}15`,
                  }}
                >
                  <Rocket size={16} />
                  {question.mission}
                </div>

                <h2 className="mb-8 text-2xl font-bold leading-relaxed md:text-4xl">
                  {question.question}
                </h2>

                <div className="grid gap-4">

                  {question.options.map((option, index) => {
                    const correct =
                      answered && index === question.answer;

                    const wrong =
                      answered &&
                      selected === index &&
                      index !== question.answer;

                    return (
                      <motion.button
                        key={index}
                        disabled={answered}
                        whileHover={
                          answered || reduceMotion
                            ? {}
                            : { scale: 1.02 }
                        }
                        onClick={() => selectAnswer(index)}
                        className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition ${
                          correct
                            ? "border-emerald-400 bg-emerald-500/15"
                            : wrong
                            ? "border-red-400 bg-red-500/15"
                            : "border-white/10 bg-white/5 enabled:hover:border-purple-400"
                        }`}
                      >

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span className="flex-1 font-medium">
                          {option}
                        </span>

                        {correct && (
                          <CheckCircle2 className="text-emerald-400" />
                        )}

                        {wrong && (
                          <XCircle className="text-red-400" />
                        )}

                      </motion.button>
                    );
                  })}

                </div>

                {answered && (
                  <motion.div
                    role="status"
                    initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-7 rounded-xl border p-5 ${
                      selected === question.answer
                        ? "border-emerald-400/30 bg-emerald-400/10"
                        : "border-orange-400/30 bg-orange-400/10"
                    }`}
                  >

                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">

                      <Sparkles size={20} />

                      {selected === question.answer
                        ? "Mission Successful!"
                        : "New Discovery!"}

                    </h3>

                    <p className="leading-relaxed text-gray-300">
                      {question.explanation}
                    </p>

                  </motion.div>
                )}

                <div className="mt-8 flex justify-end">

                  <button
                    disabled={!answered}
                    onClick={nextQuestion}
                    style={{ backgroundColor: accent }}
                    className="flex items-center gap-3 rounded-full px-7 py-4 font-bold text-[#030712] transition enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    {current === questions.length - 1
                      ? "View Results"
                      : "Next Mission"}

                    <ArrowRight size={20} />
                  </button>

                </div>

              </div>

            </motion.section>
          )}

          {/* FINAL RESULTS */}

          {finished && (
            <motion.section
              key="results"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[75vh] flex-col items-center justify-center py-12 text-center"
            >

              <div className="mb-8 rounded-full border border-yellow-400/30 bg-yellow-400/10 p-9 shadow-[0_0_80px_#facc1533]">
                <Trophy size={80} className="text-yellow-300" />
              </div>

              <p className="mb-5 tracking-[0.3em] text-yellow-300">
                MISSION COMPLETE
              </p>

              <h1 className="text-4xl font-black md:text-6xl">
                {rank}
              </h1>

              <div className="my-10 rounded-3xl border border-purple-400/30 bg-purple-400/10 px-16 py-8">

                <p className="text-6xl font-black text-purple-400">
                  {score}
                  <span className="text-3xl text-gray-400">
                    /{questions.length}
                  </span>
                </p>

                <p className="mt-3 text-gray-300">
                  Correct Answers
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {Math.round((score / questions.length) * 100)}%
                </p>

              </div>

              <p className="max-w-xl text-lg leading-relaxed text-gray-400">
                Every discovery brings you closer to the stars.
                Keep exploring, stay curious, and remember:
                forgotten machines have unforgettable stories.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">

                <button
                  onClick={restart}
                  className="flex items-center gap-3 rounded-full bg-purple-400 px-7 py-4 font-bold text-[#030712] transition hover:scale-105"
                >
                  <RotateCcw size={20} />
                  Play Again
                </button>

                <Link
                  to="/explore"
                  className="flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 transition hover:bg-white/10"
                >
                  <Rocket size={20} />
                  Explore More
                </Link>

              </div>

            </motion.section>
          )}

        </AnimatePresence>

      </div>

    </main>
  );
}
