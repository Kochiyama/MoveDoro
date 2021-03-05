import React from 'react';

import styles from '../styles/components/LeaderboardTable.module.css';
import LeaderBoardTableBody from './LeaderBoardTableBody';
import TableHead from './TableHead';

export default function LeaderboardTable({ leaderboard }) {
	return (
		<table className={styles.table}>
			<thead>
				<TableHead titles={['POSIÇÃO', 'USUÁRIO', 'DESAFIOS', 'EXPERIÊNCIA']} />
			</thead>

			<tbody>
				<LeaderBoardTableBody leaderboard={leaderboard} />
			</tbody>
		</table>
	);
}
