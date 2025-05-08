import getAuth0  from '../../lib/auth';

export default async function handler(req, res) {
  const auth0 = await getAuth0();
  const session = await auth0.getSession(req, res);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = session.accessToken;
  return res.status(200).json({ token });
}
