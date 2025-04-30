"use client";

import { fadeInRight, fadeUp } from "@/utils/motionPresets";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const softwares: string[] = [
  "React, Next.js and Typescript",
  "Rust",
  "Tauri",
  "Flutter and Dart",
  "Firebase",
  "MongoDB",
  "SQL",
  "Supabase",
  "OpenAI",
  "CI/CD – Jenkins, Azure",
  "Python",
  "Java",
];

const skills: string[] = [
  "softwareDevelopment",
  "mobileAppDevelopment",
  "desktopAppDevelopment",
  "projectManagement",
  "testingAndMaintenance",
  "buildReleases",
  "frontendFrameworks",
  "codeReviewAndRefactoring",
];

const languages: string[] = ["german", "english", "tamil", "malayalam"];

export default function SkillsContent() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl text-justify mt-8">
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          {t("software")}
        </motion.h2>
        <motion.ul
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext md:grid grid-cols-2 gap-y-2 list-disc list-inside"
        >
          {softwares.map((software) => (
            <li>{software}</li>
          ))}
        </motion.ul>
      </section>
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          {t("skills")}
        </motion.h2>
        <motion.ul
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext md:grid grid-cols-2 gap-y-2 list-disc list-inside"
        >
          {skills.map((skill) => (
            <li>{t(skill)}</li>
          ))}
        </motion.ul>
      </section>
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          {t("languages")}
        </motion.h2>
        <motion.ul
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext md:grid grid-cols-2 gap-y-2 list-disc list-inside"
        >
          {languages.map((language) => (
            <li>{t(language)}</li>
          ))}
        </motion.ul>
      </section>
    </div>
  );
}
