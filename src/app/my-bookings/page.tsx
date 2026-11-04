import { redirect } from "next/navigation";

export default function MyBookingsRedirectPage() {
  redirect("/dashboard/my-bookings");
}
