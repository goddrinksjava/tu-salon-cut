import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-quill/dist/quill.bubble.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
