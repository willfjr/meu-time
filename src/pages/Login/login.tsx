// @ts-ignore
import logo from '../../assets/logo-meu-time.png'
// @ts-ignore
import apiSportsLogo from '../../assets/api-sports-small-logo.png'
import React, {useState} from "react";
import "../../styles/login-page.css"
import {Button, Form, Input} from "reactstrap";
import {API_SPORTS_URL} from "../../constants/urls";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [inputValueKey, setInputValueKey] = useState<string>("");

    const handleInputKey = (event: any) => {
        setInputValueKey(event.target.value)
    }
    const handleLogin = () => {
        const res = login(inputValueKey);
        if (res) {
            console.log(res)
            return;
        }

        navigate("/home");
    };

    return (
        <div className={"Auth-form-container"}>
            <Form onSubmit={handleLogin} className="Auth-form">
                <div className="Auth-form-content">
                    <img width="100%" src={logo} alt={"Imagem da logo Meu Time"}/>
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                    </div>
                    <div className="form-group mt-3">
                        <Input
                            type="text"
                            className="form-control mt-1 text-center"
                            placeholder="API-SPORTS KEY"
                            value={inputValueKey}
                            onChange={handleInputKey}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button type={"submit"} color={"warning"} className={"Btn-login"}>
                            Entrar
                        </Button>
                    </div>
                    <p className="text-center mt-2">
                        Não tem sua key? Registre-se na <a
                        href={API_SPORTS_URL.CADASTRO}><img width={"80px"} src={apiSportsLogo} alt={"api-sports logo"}/></a>
                    </p>
                </div>
            </Form>
        </div>
    )
}

export default LoginPage