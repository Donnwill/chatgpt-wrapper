"use client";

import { useTranslation } from "react-i18next";
import TooltipWidget from "../tooltipWidget/TooltipWidget";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProjectsImageCarousel from "./ProjectsImageCarousel";

type ProjectContentProps = React.HTMLAttributes<HTMLDivElement>;

type ProjectModel = {
  projectTitle: string;
  projectDescription: string;
  images: { src: string }[];
  url: string;
};

const projectsList: ProjectModel[] = [
  {
    projectTitle: "ChatGPT Wrapper",
    projectDescription: "wrapperProject",
    images: [
      { src: "/assets/image/portfolio/portfolio-home-light.png" },
      { src: "/assets/image/portfolio/portfolio-home-dark.png" },
      { src: "/assets/image/portfolio/portfolio-aboutme-light.png" },
      { src: "/assets/image/portfolio/portfolio-experience-dark.png" },
    ],
    url: "https://github.com/Donnwill/chatgpt-wrapper",
  },
  {
    projectTitle: "Charging Stations Simulations",
    projectDescription: "chargingStationProject",
    images: [
      { src: "/assets/image/charging-station/basic-day.png" },
      { src: "/assets/image/charging-station/advanced-year.png" },
      { src: "/assets/image/charging-station/advanced-responsive.png" },
      { src: "/assets/image/charging-station/advanced-responsive-sm.png" },
    ],
    url: "https://github.com/Donnwill/charging-stations",
  },
  {
    projectTitle: "Chat Application",
    projectDescription: "chatProject",
    images: [
      { src: "/assets/image/my-chat/myChat-login.png" },
      { src: "/assets/image/my-chat/myChat-friends.png" },
      { src: "/assets/image/my-chat/myChat-requests.png" },
    ],
    url: "https://github.com/Donnwill/MyChat",
  },
];

export default function ProjectContent({}: ProjectContentProps) {
  const { t } = useTranslation();

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 max-w-6xl mt-8">
      {projectsList.map((project, index) => (
        <Card key={index} className="w-[360px] h-[345px] p-0.5">
          <CardHeader className="m-1">
            <ProjectsImageCarousel imageList={project.images} />
          </CardHeader>
          <CardFooter className="flex flex-col items-start gap-2 px-4 pb-4">
            <CardTitle>{project.projectTitle}</CardTitle>
            <TooltipWidget
              duration={4000}
              tooltip={t(project.projectDescription)}
            >
              <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                {t(project.projectDescription)}
              </CardDescription>
            </TooltipWidget>
            <Button
              className="self-end transform transition-transform hover:scale-110 hover:shadow-lg hover:shadow-app-cardShadow"
              onClick={() => window.open(project.url, "_blank")}
            >
              {t("viewCode")}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
