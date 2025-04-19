// src/lib/auth.ts
import { initAuth0 } from '@auth0/nextjs-auth0';
import getDynamicEnvs from '../utils/getDynamicEnvs';

let auth0Instance: ReturnType<typeof initAuth0> | null = null;

export async function getAuth0() {
  if (!auth0Instance) {
    const envs = await getDynamicEnvs();
    auth0Instance = initAuth0({
      secret: envs.AUTH0_SECRET,
      baseURL: envs.AUTH0_BASE_URL,
      issuerBaseURL: envs.AUTH0_ISSUER_BASE_URL,
      clientID: envs.AUTH0_CLIENT_ID,
      clientSecret: envs.AUTH0_CLIENT_SECRET,
    });
  }

  return auth0Instance;
}
