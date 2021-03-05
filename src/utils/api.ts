import axios from 'axios';
import Cookies from 'js-cookie';

const url = 'http://localhost:4000';

export interface registerValuesData {
	name: string;
	email: string;
	password: string;
}

export interface loginValuesData {
	email: string;
	password: string;
}

interface updateUserData {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

export class api {
	async register({ name, email, password }: registerValuesData) {
		try {
			await axios({
				method: 'POST',
				url: `${url}/users`,
				data: {
					name,
					email,
					password,
				},
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	async login({ email, password }: loginValuesData) {
		try {
			const response = await axios({
				method: 'POST',
				url: 'http://localhost:4000/sessions',
				data: {
					email,
					password,
				},
			});

			return {
				type: 'data',
				token: response.data.token,
			};
		} catch (error) {
			return {
				type: 'error',
				title: error.response.data.title,
				message: error.response.data.message,
			};
		}
	}

	async getUser(token) {
		try {
			const response = await axios({
				method: 'GET',
				url: `${url}/users`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response;
		} catch (error) {
			return error;
		}
	}

	async updateUser({
		level,
		currentExperience,
		challengesCompleted,
	}: updateUserData) {
		axios({
			method: 'PUT',
			url: `${url}/users`,
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

	async getLeaderboard(token) {
		const response = await axios({
			method: 'GET',
			url: `${url}/leaderboard`,
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	}
}

export default new api();
