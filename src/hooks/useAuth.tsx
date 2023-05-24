import {useContext} from "react";
import {AuthContext} from "../services/auth";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;