import React from 'react';
import { Route } from 'react-router';
import auth from './auth';

const ProtectedRoute = ({component: Component, ...rest}) => 
{
    return(
        <Route
        {...rest}
        render={props => {
            return <Component {...props} />;
        }}
    />
    );
}

export default ProtectedRoute;