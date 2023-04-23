import { createContext, useContext } from "react";
import { useState } from "react";
import auth from "../auth/auth-helper";

// const AuthContext = createContext();

export default function useAuth() {
    // const context = useContext(AuthContext);
    const isLogged = auth.isAuthenticated() ? true : false;
    const [isAuthenticated, setIsAuthenticated] = useState(isLogged);

    const login = () => {
        setIsAuthenticated(true);
    }

    const logout = () => {
        setIsAuthenticated(false);
    }

    return { isAuthenticated, login, logout };
}

// export const AuthProvider = ({children}) => {
//     console.log(children);
    

    

//     return (
//         <AuthContext.Provider value={{isAuthenticated, login, logout}}>
//             {{children}}
//         </AuthContext.Provider>
//     )
// }
