import NavbarComponent from "../../components/navbar-component";
import {API_URL} from "../../constants/urls";
import api, {CONFIG} from "../../services/api";
import React, {useContext, useState} from "react";
import {Button, Card, CardBody, Col, Container, Form, Row} from "reactstrap";
import {HomeContext} from "./home-page-context";
import {throws} from "assert";
import SelectInput from "../../components/select-input";
import {useNavigate} from "react-router-dom";


export interface Leagues {
    country: any;
    league: League;
    seasons: any;
}

export interface League {
    id: number;
    logo: string;
    name: string;
    type: string;
}

export interface Teams {
    team: any;
    venue: any;
}

export interface Team {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
}

export interface TeamVenue {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
}

export interface FormValues {
    id: number;
    season: number;
    countryCode: string;
    leagueId: number;
}

const HomePage = () => {
    const {
        seasonsOptions,
        countries,
        leagues,
        setLeagues,
        teams,
        setTeams
    } = useContext(HomeContext);
    const [seasonValue, setSeasonValue] = useState<number>(0);
    const [countryValue, setCountryValue] = useState<string>();
    const [leagueValue, setLeagueValue] = useState<
        string | ReadonlyArray<string> | number | undefined
    >();
    const [teamValue, setTeamValue] = useState<
        string | ReadonlyArray<string> | number | undefined
    >();

    const getLeaguesBySeasonAndCountry = (season: number, country: string) => {
        api
            .get(`${API_URL.LEAGUES}/?season=${season}&code=${country}`, CONFIG)
            .then(response => {
                let leagues: Leagues[] = response.data.response;
                setLeagues(leagues);
            })
            .catch(err => {
                throws(err);
            });
    };

    const getTeamBySeasonAndLeague = (season: number, leagueId: number) => {
        api
            .get(
                `${API_URL.TEAMS_INFORMATION}/?season=${season}&league=${leagueId}`,
                CONFIG
            )
            .then(response => {
                let teams: Teams[] = response.data.response;
                setTeams(teams);
            })
            .catch(err => {
                throws(err);
            });
    };

    const handleSeasonValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let seasonYear = parseInt(e.target.value);
        setSeasonValue(seasonYear);
    };

    const handleCountryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let countryValue = countries.find(
            (option: { name: string }) => option.name === e.target.value
        );
        setCountryValue(countryValue?.code ? countryValue.code : "");
        getLeaguesBySeasonAndCountry(
            seasonValue,
            countryValue?.code ? countryValue.code : ""
        );
    };

    const handleLeagueValue = (e: any) => {
        let leagueValue: League | undefined = leagues?.find(
            it => it.league.name === e.target.value
        )?.league;
        setLeagueValue(leagueValue?.name);
        getTeamBySeasonAndLeague(seasonValue, leagueValue?.id!!);
    };

    const handleTeamValue = (e: any) => {
        let teamValue = e.target.value;
        setTeamValue(teamValue);
    };

    const navigate = useNavigate();
    const goToTeamDetailsPage = () => {
        navigate("/team-details")
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formValues: any = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        if (formValues.team) {
            goToTeamDetailsPage();
        }
    };

    const formModel = {
        season: seasonValue || "",
        country: countryValue || "",
        league: leagueValue || "",
        team: teamValue || null
    }

    return (
        <Container>
            <NavbarComponent/>
            <Card className={"mt-3"}>
                <CardBody>
                    <Form model={formModel} onSubmit={handleSubmit}>
                        <Col>
                            <SelectInput
                                name={"season"}
                                labelName={"Seasons"}
                                value={seasonValue}
                                arrayOption={seasonsOptions}
                                handleChange={handleSeasonValue}
                            />
                            <SelectInput
                                name={"country"}
                                labelName={"Countries"}
                                value={countries?.find(it => it.code === countryValue)?.name}
                                arrayOption={countries?.map(it => it.name)}
                                handleChange={handleCountryValue}
                            />
                            {leagues?.length > 0 && (
                                <SelectInput
                                    name={"league"}
                                    labelName={"Leagues"}
                                    value={leagueValue}
                                    arrayOption={leagues.map(it => it.league.name)}
                                    handleChange={handleLeagueValue}
                                />
                            )}
                            {teams?.length > 0 && (
                                <SelectInput
                                    name={"team"}
                                    labelName={"Teams"}
                                    value={teamValue}
                                    arrayOption={teams.map(it => it.team).map(t => t.name)}
                                    handleChange={handleTeamValue}
                                />

                            )}
                        </Col>
                        <br/>
                        <Row>
                            <Button>Get team informations</Button>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default HomePage;
