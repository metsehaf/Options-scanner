// pages/api/auth/custom-login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import getAuth0  from '@lib/auth';

export default async function customLogin(req: NextApiRequest, res: NextApiResponse) {
  const auth0 = await getAuth0();
  const returnTo = req.query.returnTo || '/main/dashboard';

  await auth0.handleLogin(req, res, {
    returnTo: returnTo as string
  });
}
