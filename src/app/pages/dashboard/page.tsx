import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();
  console.log("Session:", session);
  if (!session) {
    redirect("/");
  }
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome {session.user?.name || session.user?.email}</p>
    </div>
  );
}