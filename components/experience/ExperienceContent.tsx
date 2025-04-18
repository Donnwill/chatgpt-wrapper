"use client";

import { fadeInRight, fadeUp } from "@/app/utils/motionPresets";
import { motion } from "framer-motion";
import StrongtagWidget from "../strongtagWidget/StrongtagWidget";
import { Accordion } from "@radix-ui/react-accordion";
import AccordionWidget from "../accordionWidget/AccordionWidget";

export default function ExperienceContent() {
  return (
    <div className="max-w-4xl text-justify">
      <Accordion type="single" collapsible>
        <section className="mb-6">
          <AccordionWidget
            keyValue="Sensit! Intermediate"
            trigger={
              <motion.h2
                {...fadeUp}
                className="text-xl font-figtreeBold text-app-primarytext mb-2"
              >
                Intermediate Software Developer — Sensit! GmbH, Germany (Sep
                2023 – Present)
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              <li>
                Developed multiple desktop applications using the{" "}
                <StrongtagWidget>Tauri</StrongtagWidget> framework, leveraging{" "}
                <StrongtagWidget>Rust</StrongtagWidget> for backend performance
                and <StrongtagWidget>React with TypeScript</StrongtagWidget> for
                a type-safe frontend. Standardized styling across products and
                white-label solutions using{" "}
                <StrongtagWidget>Tailwind CSS</StrongtagWidget>.
              </li>
              <li>
                Implemented asynchronous, non-blocking communication with
                synchronous hardware using the Tokio runtime. Collaborated
                closely with the design team, independently managing tasks to
                enhance <StrongtagWidget>visual appeal</StrongtagWidget> and{" "}
                <StrongtagWidget>user experience</StrongtagWidget>.
              </li>
              <li>
                Designed, developed, and maintained Rust-based microservices
                with a distributed{" "}
                <StrongtagWidget>SQLite (TURSO)</StrongtagWidget> database for
                internal and external services.
              </li>
              <li>
                Contributed to the development and optimization of complex CI/CD
                pipelines in <StrongtagWidget>Azure</StrongtagWidget>, ensuring
                code quality through{" "}
                <StrongtagWidget>
                  rigorous testing, linting, building and releasing
                </StrongtagWidget>{" "}
                across a multi-product{" "}
                <StrongtagWidget>mono repo</StrongtagWidget>.
              </li>
              <li>
                Led internal projects, driving team efficiency and ensuring
                project success.
              </li>
              <p className="font-figtreeSemiBold text-app-primarytext">
                Achievements:
              </p>
              <li>
                Recognized for outstanding performance with an{" "}
                <StrongtagWidget>
                  award of company shares and bonuses
                </StrongtagWidget>
                , reflecting my contributions to key projects and overall
                company success.
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
                Junior Software Developer — Sensit! GmbH, Germany (Aug 2021 –
                Aug 2023)
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              <li>
                {" "}
                Developed the Feelbelt mobile application using{" "}
                <StrongtagWidget>Flutter </StrongtagWidget> and{" "}
                <StrongtagWidget>Dart </StrongtagWidget>.
              </li>
              <li>
                {" "}
                Experienced with <StrongtagWidget>
                  MongoDB
                </StrongtagWidget> and{" "}
                <StrongtagWidget>Firebase</StrongtagWidget>.
              </li>
              <li>
                Implemented <StrongtagWidget>unit tests</StrongtagWidget> and{" "}
                <StrongtagWidget>integration tests</StrongtagWidget>, following{" "}
                <StrongtagWidget>clean code</StrongtagWidget> principles for
                maintainability and usability.
              </li>
              <li>
                Integrated Bluetooth connectivity to read and write firmware
                values.
              </li>
              <li>
                Added new features, including firmware update progress tracking
                and an in-app video player.
              </li>
              <li>
                Conducted thorough application testing before final release to
                ensure issue resolution.
              </li>
              <li>
                Gained proficiency in desktop application development with{" "}
                <StrongtagWidget>
                  UWP (C#), JavaFX (Java), ElectronJS (JavaScript), Tauri
                  (React, TypeScript), and Compose Multiplatform
                </StrongtagWidget>
                .
              </li>
              <p className="font-figtreeSemiBold text-app-primarytext">
                Achievements:
              </p>
              <li>Offered pay rise and new position within the company.</li>
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
                Software Developer — Asirtech, India (Oct 2020 – Apr 2021)
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              <li>
                Contributed to the development of a web application using{" "}
                <StrongtagWidget>Java</StrongtagWidget>,{" "}
                <StrongtagWidget>Spring Boot</StrongtagWidget>,{" "}
                <StrongtagWidget>AngularJS</StrongtagWidget>, and{" "}
                <StrongtagWidget>HTML</StrongtagWidget>, focusing on both
                frontend and backend development.
              </li>
              <li>
                Developed a mobile application for an automated testing tool{" "}
                <StrongtagWidget>(ACRA)</StrongtagWidget>, implementing UI and
                core functionalities using{" "}
                <StrongtagWidget>Dart </StrongtagWidget>and{" "}
                <StrongtagWidget>Flutter </StrongtagWidget>.
              </li>
              <p className="font-figtreeSemiBold text-app-primarytext">
                Achievements:
              </p>
              <li>
                Developed complete front-end mobile application functionalities
                in 3 months.
              </li>
              <li>After probation received pay rise of 110%.</li>
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
                Design Engineer — Ozone Engineering Solutions, India (Feb 2018 –
                Jul 2019)
              </motion.h2>
            }
          >
            <motion.ul
              {...fadeInRight}
              className="list-disc list-inside text-lg space-y-1 font-IBM text-app-secondarytext"
            >
              <li>
                Designed innovative 2D and 3D machine guards tailored to
                customer requirements.
              </li>
              <li>
                <StrongtagWidget>Collaborated with customers</StrongtagWidget>{" "}
                to identify issues and provide creative solutions.
              </li>
              <p className="font-figtreeSemiBold text-app-primarytext">
                Achievements:
              </p>
              <li>
                Produced range of 3D and 2D drawings on machine guards that led
                company to secure project worth 700K INR.
              </li>
            </motion.ul>
          </AccordionWidget>
        </section>
      </Accordion>
    </div>
  );
}
