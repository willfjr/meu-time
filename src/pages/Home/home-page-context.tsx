import React, {createContext, FunctionComponent, ReactNode, useEffect, useState} from "react";
import api, {CONFIG} from "../../services/api";
import {API_URL} from "../../constants/urls";
import {throws} from "assert";

interface HomeContextProps {
    seasonsOptions: any[];
    setSeasonsOptions: React.Dispatch<React.SetStateAction<any>>;
    countries: Coutries[];
    setCountries: React.Dispatch<React.SetStateAction<any[]>>;
}

interface HomeProviderProps {
    children: ReactNode;
}

export interface Coutries {
    name: string;
    code: string;
    flag: string;
}

export const HomeContext = createContext<HomeContextProps>({
    seasonsOptions: [],
    setSeasonsOptions: () => {
    },
    countries: [],
    setCountries: () => {
    },
});

export const HomeProvider: FunctionComponent<HomeProviderProps> = ({children}) => {
    const [seasonsOptions, setSeasonsOptions] = useState<any[]>([]);
    const [countries, setCountries] = useState<Coutries[]>([]);

    useEffect(() => {
        getCountries();
        getSeasons();
    }, []);

    const getCountries = () => {
        api
            .get(`${API_URL.COUTRIES}/`, CONFIG)
            .then((response) => {
                let countries: Coutries[] = response.data.response;
                setCountries(countries);
            })
            .catch((err) => {
                throws(err);
            });
    };
    const getSeasons = () => {
        api.get(`${API_URL.SEASONS}/`, CONFIG)
            .then(response => {
                let seasons = response?.data?.response
                setSeasonsOptions(seasons)
            })
            .catch(err => {
                throws(err);
            });

    }

    return (
        <HomeContext.Provider value={{seasonsOptions, setSeasonsOptions, countries, setCountries}}>
            {children}
        </HomeContext.Provider>
    );
};
