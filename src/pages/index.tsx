import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

import styles from '../styles/pages/home.module.css';

export default function Home() {
	const [isOnLoginPage, setIsOnLoginPage] = useState(true);

	function handleClick() {
		setIsOnLoginPage(!isOnLoginPage);
	}

	return (
		<div className={styles.container}>
			<div className={styles.leftSideContainer}>
				<h1>POMODORO MOVING</h1>
				<p>A maneira automática de ser mais produtivo e saudável!</p>

				<img src='time-management.svg' />
			</div>

			<div className={styles.rightSideContainer}>
				<h1>Bem-vindo</h1>

				{isOnLoginPage ? (
					<p>Faça login para começar</p>
				) : (
					<p>Crie sua conta gratuitamente.</p>
				)}

				{isOnLoginPage ? (
					<>
						<LoginForm />
						<button className={styles.switchPageButton} onClick={handleClick}>
							Não tem uma conta? Cadastre-se gratuitamente.
						</button>
					</>
				) : (
					<>
						<RegisterForm />
						<button className={styles.switchPageButton} onClick={handleClick}>
							Já é cadastrado? Entre com suas cedenciais.
						</button>
					</>
				)}
			</div>
		</div>
	);
}
