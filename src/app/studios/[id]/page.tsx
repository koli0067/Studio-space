import { redirect } from "next/navigation";

export default async function StudioDetailsRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  redirect(`/explore-studios/${id}`);
}
