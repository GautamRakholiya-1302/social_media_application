import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Don't show Navbar on login or signup pages
  const noNavbarRoutes = ['/', '/signup'];

  return (
    <div>
      {!noNavbarRoutes.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
