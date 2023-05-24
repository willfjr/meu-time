import React, {createContext, FunctionComponent, ReactNode, useEffect, useState} from 'react';
import api from "./api";
import {USER_KEY} from "../constants/localStorageConstants";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (key: string) => void | string;
    logout: () => void;
    userInfos: UserInfos;
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
    login: (_: string) => {
    },
    logout: () => {
    },
    userInfos: {}
} as AuthContextProps);

const AuthProvider: FunctionComponent<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfos, setUserInfos] = useState<UserInfos | any>();


    const getUserInfos = async (userKey: string): Promise<UserInfos> => {
        const config = {
            headers: {"x-apisports-key": `${userKey}`}
        }
        return api.get("status", config).then(res => {
            return res.data
        }).catch(err => {
            return err
        })
    }

    useEffect(() => {
        const userKey: string | null = localStorage.getItem(USER_KEY)
        if (userKey) {
            getUserInfos(userKey).then(res => setUserInfos(res)).catch((err) => setUserInfos(err))
        }
    }, []);

    const login = (key: string) => {
        setIsAuthenticated(true);
        localStorage.setItem(USER_KEY, key)
    };

    const logout = () => {
        localStorage.setItem(USER_KEY, "")
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, userInfos}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
