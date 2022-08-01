import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../layout/Layout';


function SidebarRoute({component : Component, ...rest}) {
    return (
        <Route
        {...rest}
        render={props =>
          localStorage.getItem('isAuth') ? (
            <Layout/>
            ) : (
                null
            )
        }
      />
    );
}

export default SidebarRoute;