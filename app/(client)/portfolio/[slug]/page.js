import { headers } from "next/headers";
import Programs from "./portfolioClient";

export async function generateMetadata({ params }, parent) {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseURL = `${protocol}://${host}`;

  const slug = params.slug;

  const portfolio = await fetch(`${baseURL}/api/portfolios?slug=${slug}`).then(
    (res) => res.json()
  );

  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: portfolio.title || "portfolio not found",
    description: portfolio.description || "portfolio not found",
    openGraph: {
      images: [portfolio.coverImage, ...previousImages],
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
