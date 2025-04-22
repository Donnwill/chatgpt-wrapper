import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ProjectsImageCarouselProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  imageList: string[];
};

export default function ProjectsImageCarousel({
  imageList,
}: ProjectsImageCarouselProps) {
  return (
    <Carousel onClick={(e) => e.stopPropagation()}>
      <CarouselContent>
        {imageList.map((image, index) => (
          <CarouselItem key={index}>
            <img className="h-36" src={image} alt={`Image ${index}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onClick={(e) => e.stopPropagation()}/>
      <CarouselNext />
    </Carousel>
  );
}
