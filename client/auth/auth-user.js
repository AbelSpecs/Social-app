const { default: auth } = require("./auth-helper");

const jwt = () => {
    const jwtUser = auth.isAuthenticated();

    if(!jwtUser){
        return;
    }

    return  {
        id: jwtUser.user._id,
        name: jwtUser.user.name,
        email: jwtUser.user.email,
        about: jwtUser.user.about,
        token: jwtUser.token
    };
}


export default jwt();