import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import axios from 'axios';

// define the type for the auth context
type AuthContextType = {
    token: string | null;
    updateToken: (newToken: string | null) => void;
    isAuthenticated: boolean;
    isLoaded: boolean;
};

// create the auth context
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode
}
// create the auth provider component
export function AuthProvider({ children} : AuthProviderProps ): JSX.Element {
    let initToken = null;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        initToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null ;
    }
    const [token, setToken] = useState<string | null>(initToken);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // make an API request to validate the token and set the isAuthenticated flag
        // this is just an example - you should replace this with your own authentication logic
        const validateToken = async () => {
            // make an API request to validate the token
            await axios.get('http://localhost:8080/api/auth/validateToken', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
                // @ts-ignore
                if(res.data === "Valid"){
                    setIsLoaded(true);
                    setIsAuthenticated(true);
                }else{
                    setIsLoaded(false);
                    setIsAuthenticated(false);
                }
            }).catch(err =>
                console.error(err)
            );
        };
        if (token) {
            validateToken().then(() => {
                console.log('validated token');
            });
        } else {
            setIsLoaded(true);
        }
    }, [token]);

    // function to update the token
    function updateToken(newToken:  string | null) {
        setToken(newToken);
        localStorage.setItem('token', JSON.stringify(newToken));
    }

    // create an object with the token and updateToken function
    const authContextValue : AuthContextType = {
        token,
        isAuthenticated,
        isLoaded,
        updateToken,
    };

    // return the context provider with the value set to the authContextValue object
    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

// create a custom hook to use the auth context
export function useAuth() {
    const authContext = useContext(AuthContext);
    if (authContext === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
}