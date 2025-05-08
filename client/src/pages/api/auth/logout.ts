// pages/api/auth/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import getDynamicEnvs from '@utils/getDynamicEnvs';
import getAuth0  from '@lib/auth';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth0 = await getAuth0();
    const envs = await getDynamicEnvs();

    const federatedLogoutUrl = new URL(`${envs.AUTH0_ISSUER_BASE_URL}/oidc/logout`);
    federatedLogoutUrl.searchParams.set('post_logout_redirect_uri', envs.AUTH0_POST_LOGOUT_REDIRECT_URI);
    federatedLogoutUrl.searchParams.set('federated', 'true');

    // ✅ Let Auth0 SDK handle session clearing and redirect
    await auth0.handleLogout(req, res, {
      returnTo: federatedLogoutUrl.toString()
    });

    // ❌ Don't send res.redirect(...) after this
  } catch (err) {
    console.error('Federated logout error:', err);
    res.status(500).end('Logout failed');
  }
}
