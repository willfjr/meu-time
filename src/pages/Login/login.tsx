// @ts-ignore
import logo from '../../assets/logo-meu-time.png'
// @ts-ignore
import apiSportsLogo from '../../assets/api-sports-small-logo.png'
import React, {useState} from "react";
import "../../styles/login-page.css"
import {Button, Form, Input, Modal, ModalBody, ModalHeader} from "reactstrap";
import {API_SPORTS_URL} from "../../constants/urls";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {UserInfos} from "../../services/auth";
import api from "../../services/api";
import {throws} from "assert";

const LoginPage = () => {
    const {login, setUserInfos} = useAuth();
    const navigate = useNavigate();
    const [inputValueKey, setInputValueKey] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    const handleInputKey = (event: any) => {
        setInputValueKey(event.target.value)
    }
    const handleLogin = (e: any) => {
        e.preventDefault()

        if (!inputValueKey) {
            setIsModalOpen(true);
        }

        if (inputValueKey) {
            const config = {
                headers: {"x-apisports-key": `${inputValueKey}`}
            }
            api.get("status", config).then(res => {
                let response: UserInfos = res.data

                if (response?.results === 0) {
                    login(inputValueKey, false)
                    setIsModalOpen(true)
                } else if (response?.results === 1) {
                    login(inputValueKey, true)
                    setUserInfos(response)
                    navigate("/home")
                    setIsModalOpen(false)
                } else {
                    setIsModalOpen(true)
                }
            }).catch(err => {
                throws(err)
            })
        }
    };

    const toggle = () => {
        setIsModalOpen(!isModalOpen)
    }

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
                        <Button type={"submit"} color={"warning"} className={"Btn-login"} onClick={handleLogin}>
                            Entrar
                        </Button>
                    </div>
                    <p className="text-center mt-2">
                        Não tem sua key? Registre-se na <a
                        href={API_SPORTS_URL.CADASTRO}><img width={"80px"} src={apiSportsLogo} alt={"api-sports logo"}/></a>
                    </p>
                </div>
            </Form>
            <Modal isOpen={isModalOpen} toggle={toggle} modalTransition={{timeout: 100}}>
                <ModalHeader>
                    <span>
                    Algo deu errado! =(
                    </span>
                </ModalHeader>
                <ModalBody>
                    <span>
                        Tenha certeza de inserir a key que se encontra na sua dashboard da API SPORTS.
                        Você pode se cadastrar <a
                        href={API_SPORTS_URL.CADASTRO}>aqui</a> caso não tenha feito seu cadastro.
                    </span>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LoginPage