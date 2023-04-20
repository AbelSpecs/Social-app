const { default: auth } = require("./auth-helper");

const jwtUser = auth.isAuthenticated();

const jwt = {
    id: jwtUser.user._id,
    name: jwtUser.user.name,
    email: jwtUser.user.email,
    about: jwtUser.user.about,
    token: jwtUser.token
};

export default jwt;