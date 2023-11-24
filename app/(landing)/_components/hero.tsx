import Image from "next/image";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center gap-20">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src="/document.svg"
            alt="document"
            fill
            className="object-center object-contain"
          />
        </div>

        <div className="relative hidden md:block w-[400px] h-[400px]">
          <Image
            src="/reading.svg"
            alt="reading"
            fill
            className="object-center object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
