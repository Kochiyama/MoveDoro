import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { BiMedal } from 'react-icons/bi';

import styles from '../styles/components/NavBar.module.css';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionsContext';

export function NavBar() {
	const { handleLogout } = useContext(SessionContext);

	const router = useRouter();

	const actualRoute = router.pathname;

	return (
		<div className={styles.navbar}>
			<header className={styles.logo}>MD</header>

			<div className={styles.navlinks}>
				<Link href='/'>
					<div
						className={`${styles.linkIcon} ${
							actualRoute == '/' ? styles.currentRouteLink : ''
						}`}>
						<FiHome
							style={{
								width: '2rem',
								height: '2rem',
							}}
						/>
					</div>
				</Link>

				<Link href='/leaderboard'>
					<div
						className={`${styles.linkIcon} ${
							actualRoute == '/leaderboard' ? styles.currentRouteLink : ''
						}`}>
						<BiMedal
							style={{
								width: '3rem',
								height: '3rem',
							}}
						/>
					</div>
				</Link>
			</div>

			<button className={styles.logoutButton} onClick={handleLogout}>
				<FiLogOut
					style={{
						width: '2rem',
						height: '2rem',
					}}
				/>
			</button>
		</div>
	);
}
