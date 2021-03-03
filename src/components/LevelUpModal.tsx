import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { ShareOnTwitterButton } from './ShareOnTwitterButton';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
	const { level, closeLevelUpModal } = useContext(ChallengesContext);

	return (
		<div className={styles.overlay}>
			<div className={styles.container}>
				<div className={styles.info}>
					<header>{level}</header>

					<strong>Parabéns</strong>
					<p>Você alcançou um novo level.</p>

					<button type='button' onClick={closeLevelUpModal}>
						<img src='/icons/close.svg' alt='Fechar Modal' />
					</button>
				</div>
				<div className={styles.shareButton}>
					<ShareOnTwitterButton />
				</div>
			</div>
		</div>
	);
}
