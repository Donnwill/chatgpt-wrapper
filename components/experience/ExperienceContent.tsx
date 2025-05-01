"use client";

import { fadeInRight, fadeUp } from "@/utils/motionPresets";
import { motion } from "framer-motion";
import StrongtagWidget from "../strongtagWidget/StrongtagWidget";
import { Accordion } from "@radix-ui/react-accordion";
import AccordionWidget from "../accordionWidget/AccordionWidget";
import { Trans, useTranslation } from "react-i18next";

export default function ExperienceContent() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl text-justify mt-8">
      <Accordion type="single" collapsible>
        <section className="mb-6">
          <AccordionWidget
            keyValue="Sensit! Intermediate"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                {t("experience1Title")}
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              {experience1Descriptions.map((description, index) => (
                <li key={index}>
                  <Trans
                    i18nKey={description}
                    components={{
                      1: <StrongtagWidget />,
                    }}
                  />
                </li>
              ))}
              <p className="font-figtreeSemiBold text-app-primarytext">
                {t("achievements")}
              </p>
              <li>
                <Trans
                  i18nKey={"experience1Achievement1"}
                  components={{
                    1: <StrongtagWidget />,
                  }}
                />
              </li>
            </motion.ul>
          </AccordionWidget>
        </section>
        <section className="mb-6">
          <AccordionWidget
            keyValue="Sensit! Junior"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                {t("experience2Title")}
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              {experience2Descriptions.map((description, index) => (
                <li key={index}>
                  <Trans
                    i18nKey={description}
                    components={{
                      1: <StrongtagWidget />,
                    }}
                  />
                </li>
              ))}
              <p className="font-figtreeSemiBold text-app-primarytext">
                {t("achievements")}
              </p>
              <li>
                <Trans
                  i18nKey={"experience2Achievement1"}
                  components={{
                    1: <StrongtagWidget />,
                  }}
                />
              </li>
            </motion.ul>
          </AccordionWidget>
        </section>
        <section className="mb-6">
          <AccordionWidget
            keyValue="Asirtech"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                {t("experience3Title")}
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              {experience3Descriptions.map((description, index) => (
                <li key={index}>
                  <Trans
                    i18nKey={description}
                    components={{
                      1: <StrongtagWidget />,
                    }}
                  />
                </li>
              ))}
              <p className="font-figtreeSemiBold text-app-primarytext">
                {t("achievements")}
              </p>
              <li>
                <Trans
                  i18nKey={"experience3Achievement1"}
                  components={{
                    1: <StrongtagWidget />,
                  }}
                />
              </li>
              <li>
                <Trans
                  i18nKey={"experience3Achievement2"}
                  components={{
                    1: <StrongtagWidget />,
                  }}
                />
              </li>
            </motion.ul>
          </AccordionWidget>
        </section>
        <section className="mb-6">
          <AccordionWidget
            keyValue="Ozone Engineering"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                {t("experience4Title")}
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              {experience4Descriptions.map((description, index) => (
                <li key={index}>
                  <Trans
                    i18nKey={description}
                    components={{
                      1: <StrongtagWidget />,
                    }}
                  />
                </li>
              ))}
              <p className="font-figtreeSemiBold text-app-primarytext">
                {t("achievements")}
              </p>
              <li>{t("experience4Achievement1")}</li>
            </motion.ul>
          </AccordionWidget>
        </section>
      </Accordion>
    </div>
  );
}

const experience1Descriptions = [
  "experience1Desc1",
  "experience1Desc2",
  "experience1Desc3",
  "experience1Desc4",
  "experience1Desc5",
];

const experience2Descriptions = [
  "experience2Desc1",
  "experience2Desc2",
  "experience2Desc3",
  "experience2Desc4",
  "experience2Desc5",
  "experience2Desc6",
  "experience2Desc7",
];

const experience3Descriptions = ["experience3Desc1", "experience3Desc2"];

const experience4Descriptions = ["experience4Desc1", "experience4Desc2"];