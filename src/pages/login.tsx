import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

import { LoginForm } from '../components/LoginForm';
import { SideBanner } from '../components/SideBanner';

import styles from '../styles/pages/login&register.module.css';

export default function Login() {
	const route = useRouter();

	async function login(values) {
		try {
			const response = await axios({
				method: 'POST',
				url: 'http://localhost:4000/sessions',
				data: {
					email: values.email,
					password: values.password,
				},
			});

			Cookie.set('movedoro_auth_token', String(response.data.token));
		} catch (error) {
			console.log(error);
		}

		route.push('/dashboard');
	}

	return (
		<div className={styles.container}>
			<SideBanner />

			<div className={styles.rightSideContainer}>
				<h1>Bem-vindo</h1>

				<p>Faça login para começar</p>

				<LoginForm handleSubmit={login} />

				<Link href='/register'>
					<a className={styles.link}>
						Não tem uma conta? Cadastre-se gratuitamente.
					</a>
				</Link>
			</div>
		</div>
	);
}
