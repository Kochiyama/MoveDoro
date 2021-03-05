import { GetServerSideProps } from 'next';
import React from 'react';
import { NavBar } from '../components/NavBar';
import api from '../utils/api';

import styles from '../styles/pages/leaderboard.module.css';
import LeaderboardTable from '../components/LeaderboardTable';

interface AvatarData {
	url: string;
	name: string;
	path: string;
}

interface UserData {
	name: string;
	level: number;
	current_experience: number;
	challenges_completed: number;
	avatar: AvatarData;
}

interface LeaderboardProps {
	leaderboard: Array<UserData>;
}

export default function Leaderboard({ leaderboard }: LeaderboardProps) {
	return (
		<div className={styles.container}>
			<div className={styles.leaderboard}>
				<header className={styles.header}>
					<h1>TOP 10</h1>
				</header>

				<LeaderboardTable leaderboard={leaderboard} />

				<NavBar />
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const response = await api.getUser(ctx.req.cookies.movedoro_auth_token);

	if (response.isAxiosError) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const leaderboard = await api.getLeaderboard(
		ctx.req.cookies.movedoro_auth_token
	);

	return {
		props: {
			leaderboard,
		},
	};
};
