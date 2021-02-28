import styles from '../styles/components/SessionModal.module.css';

interface ModalProps {
	closeModalFunction: () => void;
	isErrorModal: boolean;
	title: string;
	message: string;
	modalUserName?: string;
}

export function SessionModal({
	closeModalFunction,
	isErrorModal,
	title,
	message,
	modalUserName,
}: ModalProps) {
	return (
		<div className={styles.overlay}>
			<div className={styles.container}>
				<button onClick={closeModalFunction}>
					<img src='icons/close.svg' />
				</button>

				{isErrorModal ? (
					<h1 className={styles.errorTitle}>{title}</h1>
				) : (
					<h1>{title}</h1>
				)}

				{modalUserName && (
					<h2>
						Olá <strong>{modalUserName}</strong>! Seja bem vindo ao MoveDoro.
					</h2>
				)}

				<p>{message}</p>
			</div>
		</div>
	);
}
