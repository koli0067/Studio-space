import { redirect } from "next/navigation";

export default function MyListingsRedirectPage() {
  redirect("/dashboard/my-listings");
}
