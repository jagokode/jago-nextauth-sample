'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function UserForm() {
	const router = useRouter();
	const [data, setData] = useState({});
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');
		const resp = await fetch('api/users', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		});
		if (!resp.ok) {
			const result = await resp.json();
			setErrorMessage(result.message);
		} else {
			router.refresh();
			router.push('/');
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				method="POST"
				className="flex flex-col gap-3 w-1/2"
			>
				<h1>Create New User</h1>
				<label>Full Name</label>
				<input
					type="text"
					id="name"
					name="name"
					onChange={handleChange}
					value={data.name}
					required
					className="m-2 bg-slate-400 rounded-md"
				/>
				<label>Email</label>
				<input
					type="email"
					id="email"
					name="email"
					onChange={handleChange}
					value={data.email}
					required
					className="m-2 bg-slate-400 rounded-md"
				/>
				<label>Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={handleChange}
					value={data.password}
					required
					className="m-2 bg-slate-400 rounded-md"
				/>
				<input
					type="submit"
					value="Submit"
					className="bg-blue-300 hover:bg-blue-100 hover:font-semibold hover:shadow-md rounded-md m-2 hover:cursor-pointer"
				/>
			</form>
			<p className="text-red-500">{errorMessage}</p>
		</>
	);
}
