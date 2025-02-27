import type { Handle } from '@sveltejs/kit';
import { verifyUser } from '$lib/api/mutations';
import { client } from '$lib/api/graphql';

export const handle: Handle = async ({ event, resolve }) => {
	// Check if the user is authenticated
	const token = event.cookies.get('token') || '';
	// Skip authentication check for login and register pages
	if (!event.url.pathname.startsWith('/login') && !event.url.pathname.startsWith('/register')) {
		if (token) {
			try {
				const result = await client.query({
					query: verifyUser,
					variables: { token }
				});
				
				if (!result.data?.verifyUser.success) {
					console.log('Token is invalid, redirecting to login');
					// Token is invalid, redirect to login
					return new Response(null, {
						status: 303,
						headers: { Location: '/login' }
					});
				}
				} catch (error) {
				// Error verifying token, redirect to login
				console.error(error);
				return new Response(null, {
					status: 303,
					headers: { Location: '/login' }
				});
			}
		} else {
			// No token found, redirect to login
			return new Response(null, {
				status: 303,
				headers: { Location: '/login' }
			});
		}
	}

	const response = await resolve(event);
	return response;
};