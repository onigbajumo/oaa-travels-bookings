import React, { Suspense } from "react";
import Enrol from "./enrolClient";
import Image from "next/image";

/**
 * Formats the query parameter into a readable title.
 *
 * @param {string} query
 * @returns {string}
 */

function formatQueryToTitle(query) {
  let title = query.replace(/-s-/g, "'s ");

  title = title.replace(/-/g, " ");

  title = title.replace(/[^a-zA-Z0-9\s']/g, "");

  //   title = title.replace(/\b\w/g, (char) => char.toUpperCase());

  return title;
}

export async function generateMetadata({ searchParams }, parent) {
  const q = searchParams.course;

  let title;

  if (q) {
    const formattedQ = formatQueryToTitle(q);

    title = `Enrol for ${formattedQ} course`;
  } else {
    title = "Enrol for a creative program";
  }

  return {
    title,
    description: `You're just a few steps away from starting your learning
                journey!`,
  };
}

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen grid place-content-center">
          <Image src="/icon.png" width={70} height={70} />
        </div>
      }
    >
      <Enrol />
    </Suspense>
  );
};

export default page;
