import React from 'react';
import {Navigate} from 'react-router-dom';
import Cookies from 'universal-cookie';


function RolePrivateRoute({ authenticated, role, component : Component}){
    const cookies = new Cookies();
    const token = cookies.get('refresh_token');

    return (
        authenticated && token ? role === 2 ? Component : <Navigate to="/"/> : <Navigate to="/login"/>
    )
}

export default RolePrivateRoute;