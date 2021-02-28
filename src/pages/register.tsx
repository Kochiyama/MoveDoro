import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import { RegisterForm } from '../components/RegisterForm';
import { SideBanner } from '../components/SideBanner';
import { SessionModal } from '../components/SessionModal';

import styles from '../styles/pages/login&register.module.css';

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isErrorModal, setIsErrorModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalMessage, setModalMessage] = useState('');
	const [modalUserName, setModalUserName] = useState('');

	const route = useRouter();

	function closeModal() {
		setIsModalOpen(false);
	}

	async function register(values) {
		try {
			const response = await axios({
				method: 'POST',
				url: 'http://localhost:4000/users',
				data: {
					name: values.name,
					email: values.email,
					password: values.password,
				},
			});

			const firstName = values.name.split(' ')[0];

			setModalUserName(firstName);

			setIsErrorModal(false);
			setModalTitle('Registrado Com Sucesso!');
			setModalMessage('Agora entre com suas credenciais e comece a utilizar');
			setIsModalOpen(true);
			setTimeout(() => {
				route.push('/login');
			}, 3000);
		} catch (error) {
			setIsErrorModal(true);
			setModalTitle('Usuário já registrado!');
			setModalMessage('Entre com suas credenciais ou recupere sua senha.');
			setIsModalOpen(true);
		}
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

			{isModalOpen && (
				<SessionModal
					closeModalFunction={closeModal}
					isErrorModal={isErrorModal}
					title={modalTitle}
					message={modalMessage}
					modalUserName={modalUserName}
				/>
			)}
		</div>
	);
}
