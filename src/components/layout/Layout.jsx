import React from 'react';
import Sidebar from "./Sidebar";

function Layout(props) {

    return (
        <div>
            {
            sessionStorage.getItem('isAuth') ?
            <div style={{display: "flex" }}>
                    <Sidebar history={props.history}/>
                    {props.children}
            </div>
            :  
            <div style={{display: "flex" }}>
                {props.children}
            </div>
            }
        </div>
    );
}

export default Layout;