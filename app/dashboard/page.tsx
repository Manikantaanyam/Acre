import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div>
      <Navbar />
      <Toolbar />
    </div>
  );
}
