import { redirect } from "next/navigation";

export default function StudiosPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const qs = searchParams?.category
    ? `?category=${encodeURIComponent(searchParams.category)}`
    : "";
  redirect(`/explore-studios${qs}`);
}