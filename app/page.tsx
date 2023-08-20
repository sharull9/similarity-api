import { Heading, Paragraph } from "@/components/text-component";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-20 lg:pt-0 lg:-mt-20 max-w-7xl mx-auto w-full h-full">
        <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
          <Heading size={"lg"} className="text-black three-d dark:text-gold">
            Easliy determine <br /> text similarity.
          </Heading>
          <Paragraph className="max-w-xl lg:text-left">
            With the Text Similarity API, you can easily determine the
            similarity between two pieces of text with a free{" "}
            <Link
              href={"/login"}
              className="text-black dark:text-gold underline underline-offset-2"
            >
              API Key
            </Link>
            .
          </Paragraph>
          <div className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
            <Image
              src="/typewriter.png"
              alt=""
              priority
              quality={100}
              className="object-contain shadow-md"
              fill
            />
          </div>
        </div>
      </div>
    </main>
  );
}
