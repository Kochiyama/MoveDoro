import React, { useContext } from 'react';
import { useFormik } from 'formik';

import styles from '../styles/components/Form.module.css';
import { SessionContext } from '../contexts/SessionsContext';
interface ValidationProps {
	name: string;
	email: string;
	password: string;
}

const validate = values => {
	const errors = {} as ValidationProps;

	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length > 15) {
		errors.password = 'Must be 15 characters or less';
	} else if (values.password.length < 6) {
		errors.password = 'Must be 6 characters or more';
	}

	return errors;
};

export const RegisterForm = () => {
	const { handleRegister } = useContext(SessionContext);

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validate,
		onSubmit: async values => {
			handleRegister(values);
		},
	});
	return (
		<form className={styles.form} onSubmit={formik.handleSubmit}>
			<label className={styles.label} htmlFor='name'>
				Nome
				{formik.errors.name ? (
					<div className={styles.error}>{formik.errors.name}</div>
				) : null}
			</label>
			<input
				className={styles.input}
				id='name'
				name='name'
				type='text'
				onChange={formik.handleChange}
				value={formik.values.name}
			/>

			<label className={styles.label} htmlFor='email'>
				Endereço de email
				{formik.errors.email ? (
					<div className={styles.error}>{formik.errors.email}</div>
				) : null}
			</label>
			<input
				className={styles.input}
				id='email'
				name='email'
				type='email'
				onChange={formik.handleChange}
				value={formik.values.email}
			/>

			<label className={styles.label} htmlFor='password'>
				Senha
				{formik.errors.password ? (
					<div className={styles.error}>{formik.errors.password}</div>
				) : null}
			</label>
			<input
				className={styles.input}
				id='password'
				name='password'
				type='password'
				onChange={formik.handleChange}
				value={formik.values.password}
			/>

			<button className={styles.submitButton} type='submit'>
				Cadastrar
			</button>
		</form>
	);
};
