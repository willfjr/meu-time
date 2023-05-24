import {BrowserRouter, Route, Routes} from "react-router-dom";
import useAuth from "./hooks/useAuth";

const Private = ({HomeComponent}: any) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? <HomeComponent/> : <Signin/>;
};

const Signin = () => {
    return null;
}

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
                <Route path="/home" element={<Private HomeComponent={Home}/>}/>
                <Route path="/" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="*" element={<Signin/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;