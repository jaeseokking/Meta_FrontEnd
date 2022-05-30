import React from 'react';
import {Navigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

function PublicRoute({ authenticated, component : Component}){
    const cookies = new Cookies();
    const token = cookies.get('refresh_token');

    return (
        authenticated && token ?  <Navigate to="/"/> : Component
    )
}

export default PublicRoute;