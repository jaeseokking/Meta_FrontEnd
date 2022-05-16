import React, { useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import Cookies from 'universal-cookie';


function PrivateRoute({ authenticated, component : Component}){
    const cookies = new Cookies();
    const token = cookies.get('refresh_token');

    return (
        authenticated && token ? Component : <Navigate to="/login" />
    )
}

export default PrivateRoute;