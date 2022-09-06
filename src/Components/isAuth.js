import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const Protected = ({ Component, ...rest }) => {
    const token = localStorage.getItem("token")
    const isAuthenticated = !token

    if (isAuthenticated === true) return (
            <>
                <Redirect to="/logIn" />
            </>
        )
    return (
        <Route
            {...rest}
            render={(props) =>  <Component {...props} />}
        />
    );
};

export default Protected;