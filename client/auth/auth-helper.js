import { signout } from "../services/api-auth";

const auth = {
    
    authenticate(jwt, cb) {
        if(typeof window !== "undefined") {
            sessionStorage.setItem("jwt", JSON.stringify(jwt));
        }
        cb();
    },

    update(jwt) {
        if(typeof window !== "undefined") {
            const userData = JSON.parse(sessionStorage.getItem('jwt'));
            const keys = Object.keys(userData.user);
            keys.forEach((k) => { 
                if(!jwt[k])
                    return;
                userData.user = {...userData.user, [k]: jwt[k]};
            });
            sessionStorage.setItem("jwt", JSON.stringify(userData));
        }
    },
    
    isAuthenticated() {
        if(typeof window == "undefined"){
            return false;
        }
        
        if(sessionStorage.getItem('jwt')){
            return true;
        }
        else{
            return false;
        }
    },
    
    clearJWT(cb) {
        if(typeof window !== "undefined"){
            sessionStorage.removeItem('jwt');
        }
        
        cb();
        signout();
    },

    getData() {
        if(!sessionStorage.getItem('jwt')){
            return;
        }
        const jwt = JSON.parse(sessionStorage.getItem('jwt'));
        const user = { 
                        token: jwt.token, 
                        id: jwt.user._id, 
                        name: jwt.user.name, 
                        email: jwt.user.email, 
                        about: jwt.user.about, 
                        background: jwt.user.background,
                        photo: jwt.user.photo,
                        created: jwt.user.created 
                    }
        return user;
    }
}

export default auth;

