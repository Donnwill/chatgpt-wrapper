"use client";

import { fadeInRight, fadeUp } from "@/utils/motionPresets";
import { motion } from "framer-motion";
import { Accordion } from "../ui/accordion";
import AccordionWidget from "../accordionWidget/AccordionWidget";
import { useTranslation } from "react-i18next";

export default function EducationContent() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl text-justify mt-8">
      <Accordion type="single" collapsible>
        <section className="mb-6">
          <AccordionWidget
            keyValue="Sheffield Hallam University"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                {t("education1Title")}
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              {education1Descriptions.map((description, index) => (
                <li key={index}>{t(description)}</li>
              ))}
            </motion.ul>
          </AccordionWidget>
        </section>
        <section className="mb-6">
          <AccordionWidget
            keyValue="Indian Institute of Aeronautical Engineering"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                {t("education2Title")}
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              {education2Descriptions.map((description, index) => (
                <li key={index}>{t(description)}</li>
              ))}
            </motion.ul>
          </AccordionWidget>
        </section>
        <section className="mb-6">
          <AccordionWidget
            keyValue="CS50 AI Course"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                {t("education3Title")}
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              {education3Descriptions.map((description, index) => (
                <li key={index}>{t(description)}</li>
              ))}
            </motion.ul>
          </AccordionWidget>
        </section>
      </Accordion>
    </div>
  );
}

const education1Descriptions = [
  "education1Desc1",
  "education1Desc2",
  "education1Desc3",
];

const education2Descriptions = ["education2Desc1", "education2Desc2"];

const education3Descriptions = [
  "education3Desc1",
  "education3Desc2",
  "education3Desc3",
];
