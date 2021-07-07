import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  theme: 'light',
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(
          `${process.env.API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      return Promise.resolve(token);
    },
    async signIn(user, account, profile) {
      if (account.provider === 'google' &&
          profile.verified_email === true &&
          profile.email.endsWith('@st.usth.edu.vn')) {
        return true
      } else {
        return false
      }
    },
  },
};

const Auth = (req, res) =>
  NextAuth(req, res, options);

export default Auth;