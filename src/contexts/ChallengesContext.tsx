import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookie from 'js-cookie';

import challenges from '../../challenges.json';

import { LevelUpModal } from '../components/LevelUpModal';
import { User } from '../pages/dashboard';

interface Challenge {
	type: string;
	description: string;
	amount: number;
}

interface ChallengesContextData {
	name: string;
	avatar_url: string;
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	activeChallenge: Challenge;
	experienceToNextLevel: number;
	levelUp: () => void;
	startNewChallenge: () => void;
	resetChallenge: () => void;
	completeChallenge: () => void;
	closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
	children: ReactNode;
	user: User;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
	children,
	user,
}: ChallengesProviderProps) {
	const [level, setLevel] = useState(user.level ?? 1);
	const [currentExperience, setCurrentExperience] = useState(
		user.current_experience ?? 0
	);
	const [challengesCompleted, setChallengesCompleted] = useState(
		user.challenges_completed ?? 0
	);
	const [activeChallenge, setActiveChallenge] = useState(null);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
	const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	useEffect(() => {
		Cookie.set('level', String(level));
		Cookie.set('currentExperience', String(currentExperience));
		Cookie.set('challengesCompleted', String(challengesCompleted));
	}, [level, currentExperience, challengesCompleted]);

	function openLevelUpModal() {
		setisLevelUpModalOpen(true);
	}

	function closeLevelUpModal() {
		setisLevelUpModalOpen(false);
	}

	function levelUp() {
		setLevel(level + 1);
		openLevelUpModal();
	}

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];
		setActiveChallenge(challenge);

		new Audio('/notification.mp3').play();

		if (Notification.permission === 'granted') {
			new Notification('Novo Desafio!', {
				body: `Valendo ${challenge.amount}xp`,
			});
		}
	}

	function resetChallenge() {
		setActiveChallenge(null);
	}

	function completeChallenge() {
		if (!activeChallenge) {
			return;
		}

		const { amount } = activeChallenge;

		let finalExperience = currentExperience + amount;

		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			levelUp();
		}

		setCurrentExperience(finalExperience);
		setActiveChallenge(null);
		setChallengesCompleted(challengesCompleted + 1);
	}

	return (
		<ChallengesContext.Provider
			value={{
				name: user.name,
				avatar_url: user.avatar.url,
				level,
				currentExperience,
				challengesCompleted,
				activeChallenge,
				experienceToNextLevel,
				levelUp,
				startNewChallenge,
				resetChallenge,
				completeChallenge,
				closeLevelUpModal,
			}}>
			{children}

			{isLevelUpModalOpen && <LevelUpModal />}
		</ChallengesContext.Provider>
	);
}
