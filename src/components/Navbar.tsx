import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();

        if (session?.session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', session.session.user.id)
            .single();

          if (error) {
            console.error('Error fetching username:', error.message);
          } else {
            setUsername(profile?.username || null);
          }
        }
      } catch (err) {
        console.error('Error fetching user session:', err);
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-white/30 backdrop-blur-lg shadow-lg p-4 flex justify-between items-center rounded-xl">
      {/* Left Section: Links */}
      <div className="flex gap-6">
        <Link href="/feed">
          <span className="text-gray-800 font-semibold hover:text-blue-600 transition-transform duration-300 ease-in-out cursor-pointer transform hover:scale-110">
            Feed
          </span>
        </Link>
        <Link href="/create-post">
          <span className="text-gray-800 font-semibold hover:text-blue-600 transition-transform duration-300 ease-in-out cursor-pointer transform hover:scale-110">
            Create Post
          </span>
        </Link>
      </div>

      {/* Right Section: Username and Logout Button */}
      <div className="flex items-center gap-6">
        {username && (
          <div className="flex items-center gap-2 bg-blue-100/50 px-3 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-200">
            <FaUserCircle className="text-blue-600 text-xl" />
            <span className="text-gray-800 font-medium hover:text-blue-600">
              {username}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
