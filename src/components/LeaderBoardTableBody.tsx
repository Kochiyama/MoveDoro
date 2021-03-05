import React from 'react';

import styles from '../styles/components/LeaderBoardTableBody.module.css';

export default function LeaderBoardTableBody({ leaderboard }) {
	return (
		<>
			{leaderboard.map((user, index) => {
				index++;
				return (
					<tr key={user.name}>
						<td>{index}</td>

						<td className={styles.user}>
							<img className={styles.userAvatar} src={user.avatar.url} />

							<div className={styles.userInfoContainer}>
								<span className={styles.userName}>{user.name}</span>

								<div className={styles.userLevelContainer}>
									<img src='icons/level.svg' />
									<span>Level {user.level}</span>
								</div>
							</div>
						</td>

						<td>
							<strong>{user.challenges_completed} </strong>
							completados
						</td>

						<td>
							<strong>{user.current_experience} </strong>
							xp
						</td>
					</tr>
				);
			})}
		</>
	);
}
