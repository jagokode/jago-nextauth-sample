import { NextResponse } from 'next/server';
import User from '../../(models)/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
	try {
		const data = await req.json();

		// confirm data is exists
		if (!data?.email || !data?.password) {
			return NextResponse.json(
				{ message: 'All fields are required' },
				{ status: 400 }
			);
		}

		// check duplicate email
		const duplicated = await User.findOne({ email: data.email })
			.lean()
			.exec();

		if (duplicated) {
			return NextResponse.json(
				{
					message: 'User with that email is already registered',
				},
				{ status: 409 }
			);
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);
		data.password = hashedPassword;

		await User.create(data);

		return NextResponse.json(
			{ message: 'User registered' },
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: error }, { status: 500 });
	}
}
