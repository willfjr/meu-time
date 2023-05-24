import {BrowserRouter, Route, Routes} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/Login/login";

const Private = ({HomeComponent}: any) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? <HomeComponent/> : <LoginPage/>;
};

const Signup = () => {
    return null;
}

const Home = () => {
    return null;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Private HomeComponent={Home}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;