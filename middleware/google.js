const { User } = require('./../models/user');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Grab user ID created by MongoDB and place into a cookie
// that is stored in the browser
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Browser sends user ID; user retrieved on the server
// user is then placed on the Express req object
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: '/users/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists
        User.findOne({ googleId: profile.id })
            .then((user) => {
                // If user already exists in the DB
                if (user) {
                    // Calling 'done' will serialize user
                    console.log('user is', user);
                    done(null, user);
                }
                // User does not exist in DB; create new user
                else {
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        email: profile.emails[0].value
                    }).save().then((user) => {
                        console.log('new user created' + user);
                        // Calling 'done' will serialize user
                        done(null, user);
                    });
                }
            });
    })
);