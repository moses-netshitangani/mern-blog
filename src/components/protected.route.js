import React, {useEffect, useState} from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => 
{
    const [login, onLoginChange] = useState(localStorage.getItem("login"));

    useEffect(() => {
        onLoginChange(localStorage.getItem("login"));
        console.log(`local storage from Proute comp: ${localStorage.getItem("login")}`);
    })

    return(
        <Route
        {...rest}
        component={ props => {
            if(login === "true" || login)
            {
                return <Component {...props} />;
            }
            else
            {
                return <Redirect to="/" />;
            }
        }}
        />
    );
}

export default ProtectedRoute;