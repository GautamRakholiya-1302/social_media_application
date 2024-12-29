// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { supabase } from "./supabaseClient";

// const withAuth = (WrappedComponent: React.ComponentType) => {
//   const AuthenticatedComponent = (props: any) => {
//     const router = useRouter();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const checkAuth = async () => {
//         const { data: session } = await supabase.auth.getSession();
//         if (!session?.session?.user) {
//           router.push("/"); // Redirect to login if not authenticated
//         } else {
//           setIsAuthenticated(true);
//         }
//         setLoading(false);
//       };

//       checkAuth();
//     }, [router]);

//     if (loading) {
//       return <div className="flex justify-center items-center h-screen">Loading...</div>;
//     }

//     return isAuthenticated ? <WrappedComponent {...props} /> : null;
//   };

//   return AuthenticatedComponent;
// };

// export default withAuth;
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './supabaseClient'; // Relative path for utils

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // Redirect to login if no user is logged in
          router.push('/');
        }
      };

      checkUser();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
