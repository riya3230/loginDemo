var passport = require("passport");
var passportJWT = require("passport-jwt");
var queries = require("../queries/user");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: 'hello',
    jwtFromRequest: ExtractJwt.fromHeader("authorization")
};

module.exports = function() {
    var strategy = new Strategy(params,async function(payload, done) {
        var user = await queries.findOne({email:payload.user.email})
        if (user.length) {
            return done(null, {
               data:user[0]
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};
