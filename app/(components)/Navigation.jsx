import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function Navigation() {
	const session = await getServerSession(options);

	return (
		<header className="bg-gray-600 text-gray-100">
			<nav className="flex justify-between items-center w-full px-10 py-4">
				<div>Jagokode</div>
				<div className="flex gap-10">
					<Link href="/">Home</Link>
					<Link href="/create-user">Create User</Link>
					<Link href="/client-member">Client</Link>
					<Link href="/member">Server</Link>
					<Link href="/not-auth">Public</Link>
					{session ? (
						<Link href="/api/auth/signout?callbackUrl=/">
							Logout
						</Link>
					) : (
						<Link href="/api/auth/signin">Login</Link>
					)}
				</div>
			</nav>
		</header>
	);
}
