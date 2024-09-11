"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Tour from "@/app/tour";

export default function Home() {
  const [s, setS] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setS(true);
    }, 5000);
  }, []);
  return (
    <Tour>
      {s && <div id="timeout1">asdfasdf</div>}
      <main className="bg-blue-600 flex min-h-screen flex-col items-center justify-between p-24">
        <section className="flex flex-col gap-4">
          <div>
            <div
              className="min-w-[400px] min-h-[50px] bg-white"
              id="normal-content"
            >
              NO OVERFLOW_SCREEN
            </div>
          </div>
          <div
            id="container"
            className="border rounded-md bg-red-50  overflow-x-scroll max-w-[400px] max-h-[100px]"
          >
            <div className="min-w-[20020px] min-h-[50px]" id="overflow-content">
              WIDTH OVERFLOW_SCREEN
            </div>
          </div>

          <div
            className="border rounded-md bg-red-50 overflow-auto max-h-[100px]"
            id="container2"
          >
            <div className="min-w-[300px] min-h-[350px]" id="overflow-content2">
              HEIGHT OVERFLOW_SCREEN
            </div>
          </div>

          <div className="border rounded-md bg-red-50 overflow-auto max-w-[400px] max-h-[100px]">
            <div
              className="min-w-[2000px] min-h-[550px]"
              id="overflow-content3"
            >
              WIDTH + HEIGHT OVERFLOW_SCREEN
            </div>
          </div>

          <div className="border rounded-md bg-red-50  w-full ">
            <div className="w-fit h-fit" id="overflow-content4">
              NONE OVERFLOW_SCREEN
            </div>
          </div>
        </section>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <Link id="page1" href={"/page1"}>
            page1
          </Link>
          <Link id="page2" href={"/page2"}>
            page2
          </Link>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            id={"test1"}
            width={100}
            height={24}
            priority
          />
        </div>

        <div style={{ height: "300px" }} className="overflow-scroll">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((x) => (
            <div key={x} id={`scroll${x}`} className="h-20">
              asdasdasd
            </div>
          ))}
        </div>

        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
          id={"test2"}
        />

        {Array.from({ length: 100 }).map((_, index) => {
          return <div key={index} className="h-10"></div>;
        })}
        <div id="test122">aaa</div>
      </main>
    </Tour>
  );
}
