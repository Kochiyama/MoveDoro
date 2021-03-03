import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

import { SessionModal } from '../components/SessionModal';

interface registerValuesData {
	name: string;
	email: string;
	password: string;
}

interface SessionContextData {
	handleRegister: (values: registerValuesData) => void;
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

	async function Register(values: registerValuesData) {
		try {
			await axios({
				method: 'POST',
				url: 'http://localhost:4000/users',
				data: {
					name: values.name,
					email: values.email,
					password: values.password,
				},
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	async function handleRegister(values: registerValuesData) {
		const successfullyRegistered = await Register(values);
		console.log(successfullyRegistered);

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

	return (
		<SessionContext.Provider value={{ handleRegister: handleRegister }}>
			{children}

			{isSessionModalOpen && (
				<SessionModal closeModalFunction={closeModal} modalData={modalData} />
			)}
		</SessionContext.Provider>
	);
}
