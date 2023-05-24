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
    const {userInfos} = useAuth();
    console.log(userInfos)
    return null;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Private HomeComponent={Home}/>}/>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="*" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;