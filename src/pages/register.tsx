import React, { useContext, useState } from 'react';
import Link from 'next/link';

import { RegisterForm } from '../components/RegisterForm';
import { SideBanner } from '../components/SideBanner';

import styles from '../styles/pages/login&register.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<SideBanner />

			<div className={styles.rightSideContainer}>
				<h1>Bem-vindo</h1>

				<p>Crie sua conta gratuitamente.</p>

				<RegisterForm />

				<Link href='/login'>
					<a className={styles.link}>
						Já é cadastrado? Entre com suas cedenciais.
					</a>
				</Link>
			</div>
		</div>
	);
}
