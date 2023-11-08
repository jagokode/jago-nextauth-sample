'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function MemberClientPage() {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/api/auth/signin?callbackUrl=/client-member');
		},
	});

	return (
		<div>
			<h1>Member Client Side</h1>
			<p>{session?.user?.email}</p>
			<p>{session?.user?.role}</p>
		</div>
	);
}
