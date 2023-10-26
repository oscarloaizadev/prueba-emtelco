"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import { linkRoutes } from "./data";

export default function Index({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <nav className="flex gap-6 z-10 fixed">
      <div
        className={`bg-primary min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div
          className={`${!open && "hidden"} 
        flex justify-center items-center card bg-white shadow-xl h-20`}
        >
          <Image
            src="/Logo_Emtelco.png"
            width={150}
            height={150}
            alt="Picture of the author"
          />
          <Image
            className="absolute top-12 -right-[15px]"
            src="/emoji.gif"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relativa">
          {linkRoutes?.map((data, i) => (
            <Link
              href={data?.link}
              key={i}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2`}
            >
              <div>{React.createElement(data?.icon, { size: "20" })}</div>
              <h2
                style={{ transitionDelay: `${i + 2}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {data?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-primary font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {data?.name}
              </h2>
            </Link>
          ))}
        </div>
        {children}
      </div>
    </nav>
  );
}
