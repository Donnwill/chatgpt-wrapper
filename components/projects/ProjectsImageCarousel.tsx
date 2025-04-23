import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LightBoxWrapper from "./LightBoxWrapper";
import { useState } from "react";

type ProjectsImageCarouselProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  imageList: { src: string }[];
};

export default function ProjectsImageCarousel({
  imageList,
}: ProjectsImageCarouselProps) {
  const [lightBoxState, setLightBoxState] = useState({
    isOpen: false,
    openIndex: 0,
  });

  function handleLightBox(isOpen: boolean, openIndex: number) {
    setLightBoxState({
      isOpen,
      openIndex,
    });
  }

  return (
    <>
      <Carousel>
        <CarouselContent>
          {imageList.map((image, index) => (
            <CarouselItem
              key={index}
              onClick={() => handleLightBox(true, index)}
            >
              <img
                className="h-40 cursor-pointer"
                src={image.src}
                alt={`Image ${index}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <LightBoxWrapper
        isOpen={lightBoxState.isOpen}
        openIndex={lightBoxState.openIndex}
        slides={imageList}
        onClose={() => handleLightBox(false, 0)}
      />
    </>
  );
}
