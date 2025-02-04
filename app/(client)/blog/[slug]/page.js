import { headers } from "next/headers";
import BlogClient from "./blogClient";

export async function generateMetadata({ params }, parent) {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseURL = `${protocol}://${host}`;

  const slug = params.slug;

  const blog = await fetch(`${baseURL}/api/blogs?slug=${slug}`).then(
    (res) => res.json()
  );

  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: blog.title || "blog not found",
    description: blog.description || "blog not found",
    openGraph: {
      images: [blog.image, ...previousImages],
    },
  };
}

export default async function Page() {
  return (
    <>
      <BlogClient />
    </>
  );
}
