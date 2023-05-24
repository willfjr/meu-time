import React from 'react';
import AuthProvider from "./services/auth";
import RoutesApp from "./routes";

function App() {
    return (
        <AuthProvider>
            <RoutesApp/>
        </AuthProvider>
    );
}

export default App;
