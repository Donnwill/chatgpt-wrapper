"use client";

import { fadeInRight, fadeUp } from "@/utils/motionPresets";
import { motion } from "framer-motion";

export default function SkillsContent() {
  return (
    <div className="max-w-4xl text-justify mt-8">
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          Software
        </motion.h2>
        <motion.ul
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext md:grid grid-cols-2 gap-y-2 list-disc list-inside"
        >
          <li> React, Next.js and Typescript </li>
          <li> Rust </li>
          <li> Tauri </li>
          <li> Flutter and Dart</li>
          <li>Firebase</li>
          <li> MongoDB </li>
          <li> SQL </li>
          <li> Supabase </li>
          <li> OpenAI </li>
          <li>CI/CD – Jenkins, Azure</li>
          <li>Python</li>
          <li>Java</li>
        </motion.ul>
      </section>
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          Skills
        </motion.h2>
        <motion.ul
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext md:grid grid-cols-2 gap-y-2 list-disc list-inside"
        >
          <li> Software development </li>
          <li> Mobile app development </li>
          <li> Desktop app development </li>
          <li> Project management</li>
          <li>Testing and maintenance</li>
          <li> Build releases</li>
          <li> Front-end frameworks</li>
          <li> Code review and refactoring</li>
        </motion.ul>
      </section>
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          Languages
        </motion.h2>
        <motion.ul
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext md:grid grid-cols-2 gap-y-2 list-disc list-inside"
        >
          <li>German</li>
          <li>English</li>
          <li>Tamil</li>
          <li>Malayalam</li>
        </motion.ul>
      </section>
    </div>
  );
}
