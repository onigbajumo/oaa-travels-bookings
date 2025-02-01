import { headers } from "next/headers";
import Programs from "./programClient";

export async function generateMetadata({ params }, parent) {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseURL = `${protocol}://${host}`;

  const slug = params.slug;

  const program = await fetch(`${baseURL}/api/courses?slug=${slug}`).then(
    (res) => res.json()
  );

  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: program.title || "Program not found",
    description: program.description || "Program not found",
    openGraph: {
      images: [program.image, ...previousImages],
    },
  };
}

export default async function Page() {
  return (
    <>
      <Programs />
    </>
  );
}
