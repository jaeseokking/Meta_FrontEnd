import React from 'react'
import {useMediaQuery} from 'react-responsive';
import styled from 'styled-components';
import TopLayout from '../layout/TopLayout';

function Center({children}) {
    const CenterD = () => {
        // const isDesktop = useMediaQuery({minWidth : 768});
        // return isDesktop && <DesktopCenter>{children}</DesktopCenter> 
        return <DesktopCenter>{children}</DesktopCenter>
    }
    
    const CenterM = () => {
        const isMobile = useMediaQuery({maxWidth : 767});
        return isMobile && <MobileCenter>{children}</MobileCenter>;
    }
     


    return (
        <>
       
            <CenterD/>
            {/* <CenterM/> */}
        </>
    );
}

export default Center;


const DesktopCenter = styled.div`
  height: 100%;
  min-height : 100vh;
  display: flex;
  flex-direction: row;
`

const MobileCenter = styled.div`
    height: 100vh;
    display: flex;
    flex-direction : column;
`

