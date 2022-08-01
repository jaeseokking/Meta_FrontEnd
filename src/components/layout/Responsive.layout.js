import React from 'react';
import {useMediaQuery} from 'react-responsive';

import DesktopLayout from './Desktop.layout';
import MobileLayout from './Mobile.layout';

const ResponsiveLayout = ({loginCallBack, isLogin, role}) => {
    
    const Desktop = () => {
        const isDesktop = useMediaQuery({minWidth : 768});
        return isDesktop && <DesktopLayout loginCallBack={loginCallBack} role={role} ></DesktopLayout> 
    }

    const Mobile = () => {
        const isMobile = useMediaQuery({maxWidth : 767});
        return isMobile && <MobileLayout loginCallBack={loginCallBack} role={role}></MobileLayout>;
    }

    return (
        <div >
            <Desktop/>
            <Mobile/>       
        </div>
    );
    
   
}



export default ResponsiveLayout;