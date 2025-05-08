// src/lib/auth.ts
import { initAuth0 } from '@auth0/nextjs-auth0';
import getDynamicEnvs from '@utils/getDynamicEnvs';

let auth0Instance: ReturnType<typeof initAuth0> | null = null;

const getAuth0 = async () => {
  if (!auth0Instance) {
    const envs = await getDynamicEnvs();
    auth0Instance = initAuth0({
      secret: process.env.FRONTEND_APP_AUTH0_SECRET,
      baseURL: envs.AUTH0_BASE_URL,
      issuerBaseURL: envs.AUTH0_ISSUER_BASE_URL,
      clientID: envs.AUTH0_CLIENT_ID,
      clientSecret: process.env.FRONTEND_APP_AUTH0_CLIENT_SECRET,
      authorizationParams: { // must match your Auth0 API identifier
        scope: 'openid profile email',
      }
      
    });
  }

  return auth0Instance;
}

export default getAuth0;