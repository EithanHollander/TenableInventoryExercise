import { redirect } from "next/navigation";

export default function Home() {
  redirect("/inventory"); // Redirects the homepage to /inventory
}
