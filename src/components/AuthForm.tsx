
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    setError('');
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/feed'); 
      } else {
        // Sign up logic with username
        const { data: signupData, error: signupError } = await supabase.auth.signUp(
          { email, password },
          { data: { username } } // Pass username as metadata
        );
        if (signupError) throw signupError;

        // Update user table with the username
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({ id: signupData.user?.id, username });

        if (updateError) throw updateError;

        alert('Signup successful! Please log in.');
        router.push('/'); // Redirect to login page after signup
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="p-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleAuth}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="text-center mt-6 text-gray-700">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 font-semibold hover:underline">
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a href="/" className="text-blue-500 font-semibold hover:underline">
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
