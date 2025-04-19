// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import getDynamicEnvs from '../../../utils/getDynamicEnvs';
import { getAuth0 } from '../../../lib/auth';


export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const envs = await getDynamicEnvs();
  const auth0 = await getAuth0();
  await auth0.handleLogin(req, res, {
    authorizationParams: {
      redirect_uri: `${envs.AUTH0_BASE_URL}/api/auth/callback`
    }
  });
}
