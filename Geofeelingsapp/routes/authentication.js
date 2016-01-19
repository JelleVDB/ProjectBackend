/**
 * Created by Jelle on 19/01/2016.
 */

module.exports = function (app, passport) {

    /* Login user */
    //When the user is trying to log in
    app.post('/login', function (req, res) {
        //Attempt to authenticate the login
        passport.authenticate('login', function (err, user) {
            if (err) {
                //If there are errors, return the error
                return res.json(err);
            }

            if (user.error) {
                return res.json({error: user.error});
            }

            //After authenticating, log in the user
            req.logIn(user, function (err) {
                if (err) {
                    //If there are errors, return the error
                    return res.json(err);
                }

                //If the login is successful, redirect to the map page
                return res.json({redirect: '/map'});
            });
        })(req, res);
    });

    /* Register user */
    //When the user tries to data
    app.post('/register', function (req, res) {
        //Attempt to authenticate user registration
        passport.authenticate('register', function (err, user) {
            if (err) {
                //If there are errors, return the error
                return res.json(err);
            }

            if (user.error) {
                return res.json({error: user.error});
            }

            //After registrating, log in the user
            req.logIn(user, function (err) {
                if (err) {
                    //If there are errors, return the error
                    return res.json(err);
                }

                //If the login is successful, redirect to the map page
                return res.json({redirect: '/map'});
            });
        })(req, res);
    });

    //If the user wants to logout
    app.get('/logout', function (req, res) {
        //logout the user
        //req.logout();
        //req.session.destroy();

        req.session.destroy(function () {
            res.clearCookie('connect.sid');
            res.json({redirect: '/startpage'});
        });

        //redirect the user to the login/register page
        //res.json({ redirect : '/startpage' });
    });

};