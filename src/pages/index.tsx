import React from 'react';
import Head from 'next/head';

import { ExperienceBar } from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedCheallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Inicio | Move.it</title>
			</Head>

			<ExperienceBar />

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
		</div>
	);
}
