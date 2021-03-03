import styles from '../styles/components/SessionModal.module.css';

interface modalData {
	isError?: boolean;
	username?: string;
	title?: string;
	message?: string;
}
interface ModalProps {
	closeModalFunction: () => void;
	modalData: modalData;
}

export function SessionModal({ closeModalFunction, modalData }: ModalProps) {
	return (
		<div className={styles.overlay}>
			<div className={styles.container}>
				<button onClick={closeModalFunction}>
					<img src='icons/close.svg' />
				</button>

				{modalData.isError ? (
					<h1 className={styles.errorTitle}>{modalData.title}</h1>
				) : (
					<h1>{modalData.title}</h1>
				)}

				{modalData.username && (
					<h2>
						Olá <strong>{modalData.username}</strong>! Seja bem vindo ao
						MoveDoro.
					</h2>
				)}

				<p>{modalData.message}</p>
			</div>
		</div>
	);
}
