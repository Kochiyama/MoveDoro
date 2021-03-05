import { SessionProvider } from '../contexts/SessionsContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider>
			<Component {...pageProps} />;
		</SessionProvider>
	);
}

export default MyApp;
