import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

import { LoginForm } from '../components/LoginForm';
import { SideBanner } from '../components/SideBanner';

import styles from '../styles/pages/login&register.module.css';
import { SessionModal } from '../components/SessionModal';

export default function Login() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isErrorModal, setIsErrorModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalMessage, setModalMessage] = useState('');

	const route = useRouter();

	function closeModal() {
		setIsModalOpen(false);
	}

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
			setIsErrorModal(true);
			setModalTitle(error.response.data.title);
			setModalMessage(error.response.data.message);
			setIsModalOpen(true);
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

			{isModalOpen && (
				<SessionModal
					closeModalFunction={closeModal}
					isErrorModal={isErrorModal}
					title={modalTitle}
					message={modalMessage}
				/>
			)}
		</div>
	);
}
