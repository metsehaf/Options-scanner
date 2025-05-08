import getAuth0  from '@lib/auth';

export default async function auth(req: any, res: any) {
  try {
    const auth0 = await getAuth0();
    // Handle Auth0 routes dynamically
    return auth0.handleAuth()(req, res);

  } catch (error) {
    console.error('Auth0 handler error:', error);
    return res.status(500).end('Auth0 config error');
  }
}
