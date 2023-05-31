import React, {useState} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import Logo from "./logo/logo";

const NavbarComponent = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    return (
        <div>
            <Navbar style={{backgroundColor: "#010101"}}>
                <NavbarBrand href="/" className="me-auto">
                    <Logo/>
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="me-2" style={{backgroundColor: "#ffffff"}}/>
                <Collapse isOpen={!collapsed} navbar style={{border: "1px #dcd8d8 solid"}}
                          className={"bg-gradient border-opacity-50 rounded-2 mt-2"}>
                    <Nav navbar className={"p-2"}>
                        <NavItem>
                            <NavLink href="/components/">
                                <span style={{color: "#ffffff"}}>
                                Components
                                </span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                <span style={{color: "#ffffff"}}>
                                GitHub
                                </span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;