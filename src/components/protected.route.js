import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import auth from './auth';

const ProtectedRoute = ({component: Component, ...rest}) => 
{
    return(
        <Route
        {...rest}
        component={ props => {
            if(auth.isAuthenticated())
            {
                return <Component {...props} />;
            }else
            {
                return <Redirect to="/" />;
            }
        }}
    />
    );
}

export default ProtectedRoute;