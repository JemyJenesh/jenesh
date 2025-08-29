import AboutMeSection from "@/app/(portfolio)/about/components/about-me-section";
import HardwareSection from "@/app/(portfolio)/about/components/hardware-section";
import myPhoto from "@/assets/me.jpg";
import myPCPhoto from "@/assets/myPC1.jpg";
import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-5 mb-10">
        <Image src={myPhoto} className="rounded-4xl" alt="Picture of Jenesh" />

        <div className="col-span-1 md:col-span-2">
          <AboutMeSection />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <HardwareSection />

        <Image
          src={myPCPhoto}
          priority
          className="rounded-lg"
          alt="Picture of PC"
        />
      </div>
    </>
  );
}
