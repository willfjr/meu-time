import React from 'react';
import AuthProvider from "./services/auth";
import RoutesApp from "./routes";
import {HomeProvider} from "./pages/Home/home-page-context";

function App() {
    return (
        <AuthProvider>
            <HomeProvider>
                <RoutesApp/>
            </HomeProvider>
        </AuthProvider>
    );
}

export default App;
