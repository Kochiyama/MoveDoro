import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import { RegisterForm } from '../components/RegisterForm';
import { SideBanner } from '../components/SideBanner';

import styles from '../styles/pages/login&register.module.css';

export default function Home() {
	const route = useRouter();

	async function register(values) {
		try {
			const response = await axios({
				method: 'POST',
				url: 'http://localhost:4000/users',
				data: {
					name: values.email,
					email: values.email,
					password: values.password,
				},
			});
		} catch (error) {
			console.log(error);
		}

		alert('Registrado com sucesso!');
		route.push('/');
	}

	return (
		<div className={styles.container}>
			<SideBanner />

			<div className={styles.rightSideContainer}>
				<h1>Bem-vindo</h1>

				<p>Crie sua conta gratuitamente.</p>

				<RegisterForm handleSubmit={register} />

				<Link href='/login'>
					<a className={styles.link}>
						Já é cadastrado? Entre com suas cedenciais.
					</a>
				</Link>
			</div>
		</div>
	);
}
