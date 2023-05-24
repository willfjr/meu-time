import React, {createContext, FunctionComponent, ReactNode, useState} from 'react';
import {USER_KEY} from "../constants/localStorageConstants";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (key: string, authenticated: boolean) => void;
    logout: () => void;
    setUserInfos: (infos: UserInfos) => void;
    userInfos?: UserInfos;
}

interface AuthProviderProps {
    children: ReactNode
}

export interface UserInfos {
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
    userInfos: {},
    setUserInfos: (infos: UserInfos) => {
    },
    logout: () => {
    },
} as AuthContextProps);

const AuthProvider: FunctionComponent<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfos, setUserInfos] = useState<UserInfos>();
    const login = (key: string, authenticated: boolean): (UserInfos | any) => {
        localStorage.setItem(USER_KEY, key)
        setIsAuthenticated(authenticated)
    };
    const logout = () => {
        localStorage.setItem(USER_KEY, "")
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, setUserInfos, userInfos}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
