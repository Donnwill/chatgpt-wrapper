"use client";

import { fadeInRight, fadeUp } from "@/app/utils/motionPresets";
import { motion } from "framer-motion";
import { Accordion } from "../ui/accordion";
import AccordionWidget from "../accordionWidget/AccordionWidget";

export default function EducationContent() {
  return (
    <div className="max-w-4xl text-justify">
      <Accordion type="single" collapsible>
        <section className="mb-6">
          <AccordionWidget
            keyValue="Sheffield Hallam University"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                BEng in Aerospace Engineering — Sheffield Hallam University, UK
                (2015–2017)
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              <li>
                Completed the final two years of my engineering degree in the UK
                after an international transfer.
              </li>
              <li>
                Achieved a Second-Class (2:2) degree while adapting to a new
                education system and culture.
              </li>
              <li>
                Gained strong fundamentals in engineering, physics, and critical
                thinking all of which shaped how I approach software development
                today.
              </li>
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
                Associate Degree in Aerospace Engineering — Indian Institute of
                Aeronautical Engineering, India (2012–2014)
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              <li>
                Completed the foundational two years of my engineering education
                in India.
              </li>
              <li>
                Achieved a GPA of 3.6/4 with a strong focus on mathematics,
                mechanical systems, and problem-solving.
              </li>
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
                CS50’s Introduction to AI with Python — Harvard / EDX (2020)
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              <li>
                Took this course during the pandemic as my entry point into
                programming and artificial intelligence.
              </li>
              <li>
                Learned the fundamentals of programming, algorithms, search,
                machine learning, and logic in Python.
              </li>
              <li>
                This course sparked my love for programming and set the stage
                for my transition into software development.
              </li>
            </motion.ul>
          </AccordionWidget>
        </section>
      </Accordion>
    </div>
  );
}
