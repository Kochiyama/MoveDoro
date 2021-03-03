import styles from '../styles/components/ShareOnTwitterButton.module.css';

export function ShareOnTwitterButton() {
	return (
		<button className={styles.button}>
			Compartilhar no Twitter
			<img src='icons/twitter.svg' />
		</button>
	);
}
