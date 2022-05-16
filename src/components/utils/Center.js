import React from 'react'
import {useMediaQuery} from 'react-responsive';
import styled from 'styled-components';

function Center({children}) {
    const Center_D = () => {
        const isDesktop = useMediaQuery({minWidth : 768});
        return isDesktop && <DesktopCenter>{children}</DesktopCenter> 
    }
    
    const Center_M = () => {
        const isMobile = useMediaQuery({maxWidth : 767});
        return isMobile && <MobileCenter>{children}</MobileCenter>;
    }
     


    return (
        <>
            <Center_D/>
            <Center_M/>
        </>
    );
}

export default Center;


const DesktopCenter = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`

const MobileCenter = styled.div`
    height: 100vh;
    display: flex;
    flex-direction : column;
`