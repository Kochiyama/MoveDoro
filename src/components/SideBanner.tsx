import styles from '../styles/components/SideBanner.module.css';

export function SideBanner() {
	return (
		<div className={styles.container}>
			<h1>POMODORO MOVING</h1>

			<p>A maneira automática de ser mais produtivo e saudável!</p>

			<img src='time-management.svg' />
		</div>
	);
}
