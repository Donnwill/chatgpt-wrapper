"use client";

import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

type LightBoxWrapperProp = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  openIndex: number;
  slides: {
    src: string;
  }[];
  onClose: () => void;
};

export default function LightBoxWrapper({
  isOpen,
  openIndex,
  slides,
  onClose,
}: LightBoxWrapperProp) {
  return (
    <Lightbox
      carousel={{ finite: true }}
      styles={{container:{background: "rgba(0, 0, 0, 0.5)"}}}
      plugins={[Download]}
      open={isOpen}
      index={openIndex}
      close={onClose}
      slides={slides}
    />
  );
}
