import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
	const { level, name, avatar_url } = useContext(ChallengesContext);

	return (
		<div className={styles.profileContainer}>
			<img src={avatar_url} alt={name} />
			<div>
				<strong>{name}</strong>
				<p>
					<img src='icons/level.svg' alt='level' />
					Level {level}
				</p>
			</div>
		</div>
	);
}
