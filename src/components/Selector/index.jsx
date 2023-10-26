"use client";
import React from "react";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    themeChange(false);
  });
  return (
    <div className="flex justify-end p-4">
      <select
        data-choose-theme
        className="select select-primary max-w-xs z-10 fixed"
      >
        <option disabled selected value={""}>
          Default
        </option>
        {themeValues.map((value) => (
          <option key={value.toLowerCase()} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
