import React, { useState } from 'react';
import Link from 'next/link';

import { LoginForm } from '../components/LoginForm';
import { SideBanner } from '../components/SideBanner';

import styles from '../styles/pages/login&register.module.css';

export default function Login() {
	return (
		<div className={styles.container}>
			<SideBanner />

			<div className={styles.rightSideContainer}>
				<h1>Bem-vindo</h1>

				<p>Faça login para começar</p>

				<LoginForm />

				<Link href='/register'>
					<a className={styles.link}>
						Não tem uma conta? Cadastre-se gratuitamente.
					</a>
				</Link>
			</div>
		</div>
	);
}
