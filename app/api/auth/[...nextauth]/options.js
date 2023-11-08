import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import User from '../../../(models)/User';
import bcrypt from 'bcrypt';

export const options = {
	providers: [
		GitHubProvider({
			profile(profile) {
				console.log('github profile', profile);

				let userRole = 'GitHub User';
				if (profile?.email === 'jagokode@gmail.com') {
					userRole = 'admin';
				}

				return { ...profile, role: userRole };
			},
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			profile(profile) {
				console.log('google profile', profile);
				let userRole = 'Google User';
				return {
					...profile,
					id: profile.sub,
					role: userRole,
				};
			},
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
					placeholder: 'your-email',
				},
				password: {
					label: 'password',
					type: 'password',
					placeholder: 'your-password',
				},
			},
			async authorize(credentials) {
				try {
					const user = await User.findOne({
						email: credentials.email,
					})
						.lean()
						.exec();
					if (user) {
						console.log('User Exists');
						const match = await bcrypt.compare(
							credentials.password,
							user.password
						);

						if (match) {
							console.log('Matched');
							delete user.password;

							user['role'] = 'Unverified Email User';
							return user;
						}
					}
				} catch (error) {
					console.log(error);
				}
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},
		async session({ session, token }) {
			if (session?.user) session.user.role = token.role;
			return session;
		},
	},
};
