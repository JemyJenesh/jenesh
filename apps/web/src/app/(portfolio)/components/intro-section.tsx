import illustrationDarkPhoto from "@/assets/illustration-dark.png";
import illustrationPhoto from "@/assets/illustration.jpg";
import Image from "next/image";

export default function IntroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h1 className="my-5 pb-1 md:pb-3 text-3xl md:mb-8 md:text-5xl inline-block border-b-4 border-green-500">
          Hey, I&apos;m Jenesh!
        </h1>
        <p className="text-lg text-balance">
          I&apos;m a software engineer with a passion for building dynamic and
          interactive web applications. My primary tools are React and Node.js.
          I am filled with a passion for designing convincing products, I have a
          deep desire to excel and continuously improve my work with joy. And
          always up for a challenge.
        </p>
      </div>

      <Image
        src={illustrationPhoto}
        height={320}
        className="mx-auto hidden md:block dark:hidden"
        alt="Picture of computer"
      />

      <Image
        src={illustrationDarkPhoto}
        height={320}
        className="mx-auto hidden md:dark:block"
        alt="Picture of computer"
      />
    </div>
  );
}
