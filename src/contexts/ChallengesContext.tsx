import { createContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import api from '../config/api';

import challenges from '../../challenges.json';

import { LevelUpModal } from '../components/LevelUpModal';
import { User } from '../pages/index';
import Cookies from 'js-cookie';

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
	const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(true);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

	function updateDatabaseUserData() {
		axios({
			method: 'PUT',
			url: `${api.url}/users`,
			data: {
				level: level,
				current_experience: currentExperience,
				challenges_completed: challengesCompleted,
			},
			headers: {
				Authorization: `Bearer ${Cookies.get('movedoro_auth_token')}`,
			},
		}).then(res => {
			console.log(res);
		});
	}

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	useEffect(updateDatabaseUserData, [
		level,
		currentExperience,
		challengesCompleted,
	]);

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
