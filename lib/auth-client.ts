import { oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const authClientInstance = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
  plugins: googleClientId ? [oneTapClient({ clientId: googleClientId })] : [],
});
export const authClient = authClientInstance;
export const { signIn, signUp, useSession } = authClientInstance;
