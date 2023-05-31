import NavbarComponent from "../../components/navbar-component";
import {API_URL} from "../../constants/urls";
import api, {CONFIG} from "../../services/api";
import React, {useContext, useState} from "react";
import {Card, CardBody, Container, Form, Input} from "reactstrap";
import {HomeContext} from "./home-page-context";
import {throws} from "assert";


export interface Leagues {
    league: League;
    country: any;
    seasons: any;
}

export interface League {
    id: number;
    logo: string;
    name: string;
    type: string;
}

const HomePage = () => {
    const {seasonsOptions, countries} = useContext(HomeContext);
    const [seasonValue, setSeasonValue] = useState<number>(0);
    const [countryValue, setCountryValue] = useState<string>("");
    const [leagues, setLeagues] = useState<Leagues[]>([]);
    const [leagueValue, setLeagueValue] = useState<string | ReadonlyArray<string> | number | undefined>();

    const getLeaguesBySeasonAndCountry = (
        season: number,
        country: string
    ) => {
        api
            .get(`${API_URL.LEAGUES}/?season=${season}&code=${country}`, CONFIG)
            .then((response) => {
                let leagues: Leagues[] = response.data.response
                console.log(response.data)
                // setLeagues(leagues)
            })
            .catch((err) => {
                throws(err);
            });
    };

    const handleSeasonValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let seasonYear = parseInt(e.target.value);
        setSeasonValue(seasonYear);
    };

    const handleCountryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let countryValue = countries.find(
            (option: { name: string; }) => option.name === e.target.value
        );
        setCountryValue(countryValue?.code ? countryValue.code : "");
        getLeaguesBySeasonAndCountry(seasonValue, countryValue?.code ? countryValue.code : "");
    };
    
    const handleLeagueValue = (e: any) => {
        console.log(e)
    }

    return (
        <Container>
            <NavbarComponent/>
            <Card className={"mt-3"}>
                <CardBody>
                    <Form>
                        <Input
                            type={"select"}
                            value={seasonValue}
                            onChange={handleSeasonValue}
                        >
                            {seasonsOptions.length > 0 &&
                                seasonsOptions.map((option) => (
                                    <option key={option}>{parseInt(option)}</option>
                                ))}
                        </Input>
                        <br/>
                        <Input
                            type={"select"}
                            value={countryValue}
                            onChange={handleCountryValue}
                        >
                            {countries.length > 0 &&
                                countries.map((option: any) => (
                                    <option key={option?.name}>{option?.name}</option>
                                ))}
                        </Input>
                        <br/>
                        {leagues?.length > 0 && (
                            <Input
                                value={leagueValue}
                                onChange={handleLeagueValue}
                            >
                                {leagues.map(it => it.league)?.map(leag => (
                                    <option key={leag.id}>
                                        {leag?.name}
                                    </option>
                                ))}
                            </Input>)}
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default HomePage;
