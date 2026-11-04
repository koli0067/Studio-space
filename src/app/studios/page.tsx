import { redirect } from "next/navigation";

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  redirect(
    category
      ? `/explore-studios?category=${encodeURIComponent(category)}`
      : "/explore-studios",
  );
}
