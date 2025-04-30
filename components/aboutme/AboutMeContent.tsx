"use client";

import { fadeInRight, fadeUp } from "@/utils/motionPresets";
import { motion } from "framer-motion";
import StrongtagWidget from "../strongtagWidget/StrongtagWidget";
import { Trans, useTranslation } from "react-i18next";

const funFacts: string[] = [
  "funFact1",
  "funFact2",
  "funFact3",
  "funFact4",
  "funFact5",
  "funFact6",
];

export default function AboutMeContent() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl text-justify mt-8">
      {/* Personal Background */}
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          {t("personalBackground")}
        </motion.h2>
        <motion.p
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext"
        >
          <Trans
            i18nKey="personalBackgroundContent"
            components={{
              1: <StrongtagWidget />,
            }}
          />
        </motion.p>
      </section>

      {/* Professional Summary */}
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          {t("whoIAmProfessionally")}
        </motion.h2>
        <motion.p
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext"
        >
          <Trans
            i18nKey="whoIAmProfessionallyContent"
            components={{
              1: <StrongtagWidget />,
            }}
          />
        </motion.p>
      </section>

      {/* Philosophy */}
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          {t("whatDrivesMe")}
        </motion.h2>
        <motion.p
          {...fadeInRight}
          className="text-lg font-IBM text-app-secondarytext"
        >
          <Trans
            i18nKey="whatDrivesMeContent"
            components={{
              1: <StrongtagWidget />,
            }}
          />
        </motion.p>
      </section>

      {/* Fun Facts */}
      <section className="mb-6">
        <motion.h2
          {...fadeUp}
          className="text-xl font-figtreeBold text-app-primarytext mb-2"
        >
          {t("funFacts")}
        </motion.h2>
        <motion.ul
          {...fadeInRight}
          className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
        >
          {funFacts.map((funFact, index) => (
            <li key={index}>{t(funFact)}</li>
          ))}
        </motion.ul>
      </section>
    </div>
  );
}
