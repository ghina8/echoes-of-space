
import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import StoryChapter from "../components/StoryChapter";
import Glossary from "../components/Glossary";
import equipment from "../data/equipment.json";

const stories = {
  "apollo-11-eagle": {
    folder: "eagle",
    intro: "I carried humanity's greatest dream to the Moon.",
    ending: "My journey ended. Humanity's adventure had just begun.",
    chapters: [
      {
        title: "A Dream Beyond Earth",
        image: "scene1.webp",
        text: "In July 1969, I left Earth carrying an extraordinary dream. My mission was to help two astronauts reach a world no human had ever walked on."
      },
      {
        title: "One Giant Leap",
        image: "scene2.jpg",
        text: "I separated from Columbia and began my descent. With Neil Armstrong and Buzz Aldrin aboard, I reached the Sea of Tranquility on July 20, 1969."
      },
      {
        title: "We Made History",
        image: "scene3.jpg",
        text: "My astronauts collected lunar rocks, placed scientific instruments on the surface, and helped humanity understand the Moon in ways never possible before."
      },
      {
        title: "Forever on the Moon",
        image: "scene4.jpg",
        text: "My upper section carried the astronauts back toward home. My lower section stayed behind. Today, it remains on the Moon as a reminder of humanity's first footsteps."
      }
    ]
  },

  "apollo-15-rover": {
    folder: "lunar-rover",
    intro: "I was the first car humans drove on another world.",
    ending: "My wheels stopped turning, but exploration never stopped.",
    chapters: [
      {
        title: "Built for Adventure",
        image: "scene1.webp",
        text: "Engineers built me to travel across a world without roads. With electric motors and special wire-mesh wheels, I was ready for the Moon."
      },
      {
        title: "Driving Into the Unknown",
        image: "scene2.jpg",
        text: "In 1971, I carried Apollo 15 astronauts across the lunar landscape. Mountains, craters and dusty valleys became our roads."
      },
      {
        title: "Beyond the First Footprints",
        image: "scene3.jpg",
        text: "I helped astronauts travel farther, collect more rocks and explore new geological sites. Together, we covered approximately 27.9 kilometers."
      },
      {
        title: "My Tracks Remain",
        image: "hero.jpg",
        text: "When the astronauts returned to Earth, I stayed behind. I was never designed to come home, but my journey helped shape the future of planetary exploration."
      }
    ]
  },

  opportunity: {
    folder: "opportunity",
    intro: "They gave me 90 Martian days. I explored for almost 15 years.",
    ending: "Even the smallest explorer can leave an extraordinary legacy.",
    chapters: [
      {
        title: "A Little Rover, A Big Dream",
        image: "hero.jpg",
        text: "I arrived on Mars in January 2004. My mission was to search for evidence that water once existed on the Red Planet."
      },
      {
        title: "Mars Became My Home",
        image: "scene1.webp",
        text: "Powered by sunlight, I traveled across dusty plains and ancient craters. My cameras and scientific instruments helped me investigate the secrets beneath my wheels."
      },
      {
        title: "More Than Anyone Imagined",
        image: "scene2.jpg",
        text: "I discovered evidence of ancient water and traveled more than 45 kilometers. My mission lasted almost 15 years instead of the planned 90 Martian days."
      },
      {
        title: "My Final Signal",
        image: "scene1.webp",
        text: "In 2018, a powerful dust storm blocked the sunlight I needed. Communication with Earth ended. I remain on Mars, but my discoveries continue to inspire scientists."
      }
    ]
  },

  ingenuity: {
    folder: "ingenuity",
    intro: "On a planet with almost no air, I learned to fly.",
    ending: "My flights are over, but the skies belong to future explorers.",
    chapters: [
      {
        title: "They Dreamed I Could Fly",
        image: "hero.jpg",
        text: "I arrived on Mars with Perseverance. Engineers designed my lightweight body and fast-spinning rotor blades to fly through the planet's extremely thin atmosphere."
      },
      {
        title: "Against All Odds",
        image: "scene1.webp",
        text: "On April 19, 2021, I rose above the Martian surface and made history as the first aircraft to achieve powered, controlled flight on another planet."
      },
      {
        title: "The Sky Was Never the Limit",
        image: "scene2.jpg",
        text: "I was designed for just five flights, but completed 72. I explored from above and helped Perseverance investigate the Martian landscape."
      },
      {
        title: "A Legacy With Wings",
        image: "hero.jpg",
        text: "In January 2024, damage to my rotor blades ended my flying mission. I remain on Mars, having opened a new chapter in planetary exploration."
      }
    ]
  }
};

export default function Story() {
  const { id } = useParams();

  const item = equipment.find((entry) => entry.id === id);
  const story = stories[id];

  if (!item || !story) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">
          Story not found
        </h1>
        <Link to="/explore" className="text-cyan-400">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <StoryExperience
      key={id}
      item={item}
      story={story}
    />
  );
}

function StoryExperience({ item, story }) {
  const [chapter, setChapter] = useState(0);
  const [completed, setCompleted] = useState(false);

  const storyRef = useRef(null);
  const endingRef = useRef(null);
  const challengeRef = useRef(null);

  const accent =
    item.planet === "Mars" ? "#fb923c" : "#a78bfa";

  const imagePath = (file) =>
    `${import.meta.env.BASE_URL}images/stories/${story.folder}/${file}`;

  const current = story.chapters[chapter];

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const nextChapter = () => {
  if (chapter < story.chapters.length - 1) {
    setChapter(chapter + 1);
  } else {
    setCompleted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        challengeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    });
  }
};

  return (
    <main
      className="echo-story bg-[#030712] text-white overflow-hidden"
      style={{ "--story-accent": accent }}
    >
      {/* CINEMATIC HERO */}

      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 echo-hero-image"
          style={{
            backgroundImage: `url("${imagePath("hero.jpg")}")`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/30" />

        <div className="relative z-10 text-center max-w-5xl px-6 echo-reveal">

          <p
            className="uppercase tracking-[0.35em] text-sm mb-6"
            style={{ color: accent }}
          >
            Echoes of Space · {item.planet}
          </p>

          <h1 className="text-5xl md:text-8xl font-bold mb-5">
            {item.name}
          </h1>

          <h2 className="text-2xl md:text-4xl font-light mb-6">
            {item.title}
          </h2>

          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10">
            “{story.intro}”
          </p>

          <button
            onClick={scrollToStory}
            className="px-9 py-4 rounded-full font-bold text-black transition hover:scale-105"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 35px ${accent}55`
            }}
          >
            Enter My Story ↓
          </button>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-300">
            <span>{item.mission}</span>
            <span>{item.year}</span>
            <span>{item.location}</span>
          </div>

        </div>

        <p className="absolute bottom-6 right-6 text-xs text-gray-300">
          Image: NASA / JPL-Caltech
        </p>

      </section>

      {/* STORY CHAPTERS */}

      <section
        ref={storyRef}
        className="max-w-7xl mx-auto px-5 md:px-10 py-24"
      >

        <div className="text-center mb-12">

          <p
            className="uppercase tracking-[0.3em] text-sm mb-4"
            style={{ color: accent }}
          >
            A Journey Through Time
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            My Story
          </h2>

          <p className="text-gray-400 mt-4">
            Chapter {chapter + 1} of {story.chapters.length}
          </p>

        </div>

        <div className="flex gap-3 mb-10">
          {story.chapters.map((entry, index) => (
            <button
              key={index}
              aria-label={`Go to chapter ${index + 1}`}
              onClick={() => setChapter(index)}
              className="h-2 flex-1 rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  index <= chapter ? accent : "#1f2937",
                boxShadow:
                  index === chapter
                    ? `0 0 15px ${accent}`
                    : "none"
              }}
            />
          ))}
        </div>

        <StoryChapter
          key={chapter}
          number={chapter + 1}
          title={current.title}
          image={imagePath(current.image)}
          accent={accent}
          imageCredit="NASA / JPL-Caltech"
        >
          <p className="text-lg md:text-xl leading-relaxed">
            {current.text}
          </p>
        </StoryChapter>

        <div className="flex justify-between items-center gap-4 mt-10">

          <button
            disabled={chapter === 0}
            onClick={() => setChapter(chapter - 1)}
            className="border border-white/20 rounded-full px-6 py-3 disabled:opacity-30 hover:bg-white/10 transition"
          >
            ← Previous
          </button>

          <button
            onClick={nextChapter}
            className="rounded-full px-7 py-3 text-black font-bold hover:scale-105 transition"
            style={{ backgroundColor: accent }}
          >
            {chapter === story.chapters.length - 1
              ? "Finish Story"
              : "Next Chapter →"}
          </button>

        </div>

      </section>

      {/* EMOTIONAL ENDING */}

      <section
        ref={endingRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >

        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url("${imagePath("hero.jpg")}")`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />

        <div className="relative z-10 text-center max-w-4xl px-6 py-20">

          {completed && (
            <p
              className="mb-8 uppercase tracking-widest text-sm"
              style={{ color: accent }}
            >
              ✓ Journey Completed
            </p>
          )}

          <p
            className="uppercase tracking-[0.3em] mb-6 text-sm"
            style={{ color: accent }}
          >
            Abandoned, But Not Forgotten
          </p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            “{story.ending}”
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            {item.legacy}
          </p>

          <div className="mt-10 inline-block border border-white/20 rounded-full px-6 py-3">
            {item.status}
          </div>

        </div>

      </section>

      {/* EDUCATIONAL SECTION */}

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div
          className="border-l-4 bg-white/5 rounded-r-2xl p-8 mb-12"
          style={{ borderColor: accent }}
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: accent }}
          >
            Did You Know?
          </h3>

          <p className="text-gray-200 text-lg">
            {item.funFact}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">

          <h3 className="text-2xl font-bold text-cyan-300 mb-4">
            Think Like a Scientist
          </h3>

          <p className="text-lg text-gray-200">
            {item.question}
          </p>

        </div>

        <Glossary />

        <div className="mt-20 border-t border-white/10 pt-10">

          <h3 className="text-xl font-bold mb-6">
            Explore the Science
          </h3>

          <div className="flex flex-col gap-4">

            {item.sources?.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                {source.name} ↗
              </a>
            ))}

          </div>

          <p className="text-xs text-gray-500 mt-8 leading-relaxed">
            Creative educational narration based on mission facts.
            First-person statements are fictional storytelling,
            not NASA quotations. Imagery includes historical
            photographs and official artistic illustrations.
          </p>

        </div>

        <div className="text-center mt-16">

{/* MISSION CHALLENGE */}

{completed && (
  <section
   ref={challengeRef}
    className="my-12 w-full rounded-3xl border p-8 text-center md:p-12"
    style={{
      borderColor: `${accent}55`,
      background: `linear-gradient(135deg, ${accent}18, #0b1120)`,
      boxShadow: `0 0 40px ${accent}15`,
    }}
  >
    <div className="mb-5 text-5xl">
      🏆
    </div>

    <p
      className="mb-4 text-sm font-semibold tracking-[0.3em]"
      style={{ color: accent }}
    >
      JOURNEY COMPLETED
    </p>

    <h2 className="text-3xl font-black text-white md:text-4xl">
      Ready for Your Challenge?
    </h2>

    <p className="mx-auto mt-5 max-w-xl leading-relaxed text-gray-400">
      You've explored my story. Now let's see what
      you've learned during our adventure!
    </p>

    <p
      className="mt-5 text-sm font-semibold"
      style={{ color: accent }}
    >
      3 Questions · 1 Mission · New Discoveries
    </p>

    <Link
      to={`/quiz/${item.id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="mt-8 inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-bold text-[#030712] transition-all hover:scale-105"
      style={{
        backgroundColor: accent,
        boxShadow: `0 0 30px ${accent}44`,
      }}
    >
      Accept the Challenge →
    </Link>
  </section>
)}


          <Link
            to="/explore"
            className="inline-block rounded-full px-8 py-4 font-bold text-black hover:scale-105 transition"
            style={{ backgroundColor: accent }}
          >
            Discover Another Story →
          </Link>

        </div>

      </section>

      <style>{`
        .echo-hero-image {
          animation: echoStoryZoom 22s ease-in-out infinite alternate;
        }

        .echo-reveal {
          animation: echoStoryReveal 1.5s ease-out both;
        }

        @keyframes echoStoryZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.13);
          }
        }

        @keyframes echoStoryReveal {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .echo-hero-image,
          .echo-reveal {
            animation: none;
          }
        }
      `}</style>

    </main>
  );
}
