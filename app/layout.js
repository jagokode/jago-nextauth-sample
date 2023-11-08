import AuthProvider from './(components)/AuthProvider';
import Navigation from './(components)/Navigation';
import './globals.css';

export const metadata = {
	title: 'Jago Next Auth',
	description: 'Next.js Authentication - Next Auth for Role Based Security',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className="bg-gray-100">
					<Navigation />

					<main>{children}</main>
				</body>
			</AuthProvider>
		</html>
	);
}
