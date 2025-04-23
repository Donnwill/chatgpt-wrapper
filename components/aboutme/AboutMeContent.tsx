"use client";

import { fadeInRight, fadeUp } from "@/utils/motionPresets";
import { motion } from "framer-motion";
import StrongtagWidget from "../strongtagWidget/StrongtagWidget";

export default function AboutMeContent() {
  return (
    <div className="max-w-4xl text-justify">
      {/* Personal Background */}
      <section className="mb-6">
        <motion.h2 {...fadeUp} className="text-xl font-figtreeBold text-app-primarytext mb-2">
          Personal Background
        </motion.h2>
        <motion.p {...fadeInRight} className="text-lg font-IBM text-app-secondarytext">
          I was born on <StrongtagWidget>25th October 1994</StrongtagWidget> in{" "}
          <StrongtagWidget>Nagercoil</StrongtagWidget>, a small yet beautiful town in Kanyakumari,
          Tamil Nadu. I completed my schooling in my hometown before pursuing my
          bachelor's degree spending two years in Dehradun, India, and the
          final two years in Sheffield, United Kingdom. After graduating, I
          returned to India to begin my professional journey. A couple of years
          later, in 2021, I moved to Germany for my master’s, and I’ve been
          living here ever since.
        </motion.p>
      </section>

      {/* Professional Summary */}
      <section className="mb-6">
        <motion.h2 {...fadeUp} className="text-xl font-figtreeBold text-app-primarytext mb-2">
          Who I Am Professionally
        </motion.h2>
        <motion.p {...fadeInRight} className="text-lg font-IBM text-app-secondarytext">
          I'm a software developer with a StrongtagWidget focus on{" "}
          <StrongtagWidget>clean design</StrongtagWidget>, <StrongtagWidget>solid architecture</StrongtagWidget>,
          and
          <StrongtagWidget> meaningful user experiences</StrongtagWidget>. I enjoy building
          scalable systems and working with modern technologies across the
          stack. My favourite frameworks are Flutter, React, Tauri, ReactNative.
        </motion.p>
      </section>

      {/* Philosophy */}
      <section className="mb-6">
        <motion.h2 {...fadeUp} className="text-xl font-figtreeBold text-app-primarytext mb-2">
          What Drives Me
        </motion.h2>
        <motion.p {...fadeInRight} className="text-lg font-IBM text-app-secondarytext">
          I believe in writing <StrongtagWidget>sharp</StrongtagWidget>,{" "}
          <StrongtagWidget>clean code</StrongtagWidget>, <StrongtagWidget>giving honest feedback</StrongtagWidget>.
          If something feels bloated or overcomplicated, I’ll likely rebuild it
          simpler and better. What truly motivates me is the drive to improve
          every single day. I thrive on learning something new, no matter how
          small. In the long run, I aim to become a well-rounded developer with
          deep technical knowledge, someone who is capable and not just building
          great software. One day, I want to have a team of my own, mentor, and
          grow with.
        </motion.p>
      </section>

      {/* Fun Facts */}
      <section className="mb-6">
        <motion.h2 {...fadeUp} className="text-xl font-figtreeBold text-app-primarytext mb-2">
          Fun Facts
        </motion.h2>
        <motion.ul
          {...fadeInRight}
          className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
        >
          <li>
            I enjoy listening to music, mostly Japanese, English, Tamil and
            Korean.
          </li>
          <li>My favourite food is South Indian chicken or fish curry.</li>
          <li>I love travelling, most recently I travelled to Paris.</li>
          <li>
            played cricket till I was 18, I was the captain of the team. Time to
            time I also play sports, such as football, batminton.
          </li>
          <li>I take long walks at night. That’s when the best ideas hit.</li>
          <li>I enjoy playing video games — mostly competitive, strategy or sci-fi themes.</li>
        </motion.ul>
      </section>
    </div>
  );
}
