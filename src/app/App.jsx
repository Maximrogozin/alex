import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NotFound from "./components/not-found";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";

function App() {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <Switch>
                    <Route path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/" component={Main} />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="404" />
                </Switch>
            </ProfessionProvider>

            <ToastContainer />
        </>
    );
}

export default App;
