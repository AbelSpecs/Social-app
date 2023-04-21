import { signout } from "./api-auth";

const auth = {
    
    authenticate(jwt, cb) {
        if(typeof window !== "undefined") {
            sessionStorage.setItem("jwt", JSON.stringify(jwt));
        }
        cb();
    },
    
    isAuthenticated() {
        if(typeof window == "undefined"){
            return false;
        }
        
        if(sessionStorage.getItem('jwt')){
            return JSON.parse(sessionStorage.getItem('jwt'));
        }
        else{
            return false;
        }
    },
    
    clearJWT(cb) {
        if(typeof window !== "undefined")
            sessionStorage.removeItem('jwt');
        
        cb();
        signout();
    }
}

export default auth;

