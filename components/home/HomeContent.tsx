"use client";

import { fadeInRight, fadeUp } from "@/utils/motionPresets";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function HomeContent() {
  const { t } = useTranslation();

  return (
    <section className="flex px-6 overflow-hidden">
      {/* Content */}
      <div className="flex flex-col max-w-3xl min-h-[calc(100vh-10vh)] justify-center">
        <motion.h1
          className="text-4xl md:text-5xl font-figtreeBold text-app-primarytext tracking-tight flex flex-col"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Donn Williams
        </motion.h1>

        <motion.h2
          className="mt-4 text-lg md:text-xl text-app-secondarytext font-figtreeSemiBold"
          {...fadeUp}
        >
          {t("designation")}
        </motion.h2>

        <motion.p
          className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-foreground font-IBM"
          {...fadeInRight}
        >
          I'm a developer passionate about crafting beautiful, functional apps —
          from mobile to desktop. I've built Android and iOS applications using
          Flutter, Dart, and React Native. I also enjoy working on desktop apps
          using Tauri, React, TypeScript, and Rust. I’m comfortable with setting
          up CI/CD pipelines using Jenkins and Azure and exploring new
          frameworks. On the backend, I’ve worked with Firebase, MongoDB,
          Supabase and MySQL, and recently, I’ve been diving into Next.js,
          OpenAI integrations, and Rust-based microservices. <br /> My motto:{" "}
          <span className="italic font-bold">“Little better every day.”</span>
        </motion.p>
      </div>
    </section>
  );
}
