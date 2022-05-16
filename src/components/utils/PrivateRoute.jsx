import React from 'react';
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({component : Component, restricted,...rest}) {
    return (
        <Route
        {...rest}
        render={props =>
          sessionStorage.getItem('isAuth') ? (
            <Component {...props} />
            
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
}

export default PrivateRoute;