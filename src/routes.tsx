import {BrowserRouter, Route, Routes} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/Login/login";
import HomePage from "./pages/Home/home-page";
import TeamDetails from "./pages/TeamDetails/team-details";

const Private = ({Component}: any) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? (
        <Component/>
    ) : <LoginPage/>;
};

const Signup = () => {
    return null;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Private Component={HomePage}/>}/>
                <Route path="/team-details" element={<Private Component={TeamDetails}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;