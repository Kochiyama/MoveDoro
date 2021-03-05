import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import { ExperienceBar } from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedCheallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { NavBar } from '../components/NavBar';

import api from '../utils/api';

import styles from '../styles/pages/dashboard.module.css';

interface Avatar {
	url: string;
	name: string;
	path: string;
}
export interface User {
	email: string;
	name: string;
	level: number;
	current_experience: number;
	challenges_completed: number;
	avatar: Avatar;
}
interface DashboardProps {
	user: User;
}

export default function Dashboard(props: DashboardProps) {
	return (
		<ChallengesProvider user={props.user}>
			<div className={styles.container}>
				<Head>
					<title>Inicio | Move.it</title>
				</Head>

				<ExperienceBar />

				<CountdownProvider>
					<section>
						<div className={styles.profile}>
							<Profile />
							<CompletedCheallenges />
							<Countdown />
						</div>

						<div>
							<ChallengeBox />
						</div>
					</section>
				</CountdownProvider>
			</div>

			<NavBar />
		</ChallengesProvider>
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

	return {
		props: {
			user: response.data,
		},
	};
};
