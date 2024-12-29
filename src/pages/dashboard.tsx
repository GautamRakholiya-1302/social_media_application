import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session) {
        router.push("/"); // Redirect to login if not logged in
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to login after logout
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 py-1 px-4 rounded text-white"
        >
          Logout
        </button>
      </header>
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
        <a href="/feed" className="text-blue-500 underline mr-4">
          View Feed
        </a>
        <a href="/create-post" className="text-blue-500 underline">
          Create Post
        </a>
      </main>
    </div>
  );
};

export default Dashboard;
