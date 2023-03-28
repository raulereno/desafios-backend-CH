const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const {
  getUserById,
  createUserService,
  getUserByUsername,
} = require("../services/user.service");

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    done(null, user);
  });

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackUrl: "http://localhost:3001/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await getUserByUsername(profile.username);

          if (!user) {
            let newUser = {
              username: profile._json.login,
              email: profile.emails[0].value,
              password: "",
            };
            let result = await createUserService(newUser);

            
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
