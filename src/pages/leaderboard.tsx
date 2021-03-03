import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import { NavBar } from '../components/NavBar';
import api from '../config/api';

import styles from '../styles/pages/leaderboard.module.css';

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
	users: Array<UserData>;
}

export default function Leaderboard({ users }: LeaderboardProps) {
	return (
		<div className={styles.container}>
			<div className={styles.leaderboard}>
				<header className={styles.header}>
					<h1>TOP 10</h1>
				</header>

				<table className={styles.table}>
					<thead>
						<tr>
							<th>POSIÇÃO</th>
							<th>USUÁRIO</th>
							<th>DESAFIOS</th>
							<th>EXPERIÊNCIA</th>
						</tr>
					</thead>

					<tbody>
						{users.map((user, index) => {
							index++;
							return (
								<tr key={user.name}>
									<td>{index}</td>

									<td className={styles.user}>
										<img className={styles.userAvatar} src={user.avatar.url} />

										<div className={styles.userInfoContainer}>
											<span className={styles.userName}>{user.name}</span>

											<div className={styles.userLevelContainer}>
												<img src='icons/level.svg' />
												<span>Level {user.level}</span>
											</div>
										</div>
									</td>

									<td>
										<strong>{user.challenges_completed} </strong>
										completados
									</td>

									<td>
										<strong>{user.current_experience} </strong>
										xp
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<NavBar />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const { movedoro_auth_token } = ctx.req.cookies;

	if (!movedoro_auth_token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const { data } = await axios({
		method: 'GET',
		url: `${api.url}/leaderboard`,
		headers: { Authorization: `Bearer ${movedoro_auth_token}` },
	});

	return {
		props: {
			users: data,
		},
	};
};
