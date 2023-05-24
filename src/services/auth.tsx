import React, {createContext, FunctionComponent, ReactNode, useEffect, useState} from 'react';
import api from "./api";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode
}

interface UserInfos {
    get: string,
    parameters: [],
    errors: [],
    results: number,
    response: {
        account: {
            firstname: string,
            lastname: string,
            email: string
        },
        subscription: {
            plan: string,
            end: string,
            active: boolean
        },
        requests: {
            current: number,
            limit_day: number
        }
    }

}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    login: () => {
    },
    logout: () => {
    },
});

const AuthProvider: FunctionComponent<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfos, setUserInfos] = useState<UserInfos>();


    const getUserInfos = async (userKey: string): Promise<UserInfos> => {
        const config = {
            headers: {"x-apisports-key": `${userKey}`}
        }
        return api.get("status", config).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        const userKey: string | null = "66fb19c4c23ad4af159ced95f449b518" //localStorage.getItem('user_key')

        if (userKey) {
            getUserInfos(userKey).then(res => setUserInfos(res))
        }
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    console.log(userInfos)
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
