import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

import api, { registerValuesData, loginValuesData } from '../utils/api';

import { SessionModal } from '../components/SessionModal';
import Cookies from 'js-cookie';

interface SessionContextData {
	handleRegister: (values: registerValuesData) => void;
	handleLogin: (values: loginValuesData) => void;
	handleLogout: () => void;
}

interface SessionProviderProps {
	children: ReactNode;
}

export const SessionContext = createContext({} as SessionContextData);

export function SessionProvider({ children }: SessionProviderProps) {
	const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
	const [modalData, setModalData] = useState({});

	const router = useRouter();

	function closeModal() {
		setIsSessionModalOpen(false);
	}

	async function handleRegister(values) {
		const successfullyRegistered = await api.register(values);

		if (successfullyRegistered) {
			const firstName = values.name.split(' ')[0];

			setModalData({
				isError: false,
				username: firstName,
				title: 'Registrado com sucesso!',
				message: 'Agora entre com suas credenciais e comece a utilizar!',
			});
		} else {
			setModalData({
				isError: true,
				title: 'Usuário já registrado!',
				message: 'Entre com suas credenciais ou recupere sua senha.',
			});
		}

		setIsSessionModalOpen(true);

		setTimeout(() => {
			router.push('/');
		}, 3000);
	}

	async function handleLogin(values) {
		const response = await api.login(values);

		if (response.type === 'error') {
			setModalData({
				isError: true,
				title: response.title,
				message: response.message,
			});
			setIsSessionModalOpen(true);
		} else {
			Cookies.set('movedoro_auth_token', response.token);
			router.push('/');
		}
	}

	function handleLogout() {
		Cookies.remove('movedoro_auth_token');
		router.push('/login');
	}

	return (
		<SessionContext.Provider
			value={{ handleRegister, handleLogin, handleLogout }}>
			{children}

			{isSessionModalOpen && (
				<SessionModal closeModalFunction={closeModal} modalData={modalData} />
			)}
		</SessionContext.Provider>
	);
}
