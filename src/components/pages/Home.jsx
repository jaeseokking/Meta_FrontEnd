import React from 'react';
import styled from 'styled-components'
import Main from '../../images/main.jpg';
import Logo from '../../images/logo.png';

const Home = () => {
    return (
        <BackgroundImage>
            <Wrapper>
                <p>&nbsp;S-Oil 세차권 관리자 페이지&nbsp;</p><img src={Logo} alt={'Logo'}/>
            </Wrapper>
        </BackgroundImage>
    );
};

export default Home;

const BackgroundImage = styled.image`
    background:
    linear-gradient(to top, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.99)),
    url(${Main});
    background-size : cover;    
    background-repeat: no-repeat;
    width: 100vw;
    display: flex;
    

`



const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size : 30px;
  margin : 0 auto;
  flex-direction : row;

  p {
    color: black;
    border-radius: 4px;
    margin-top : 50px;
  }
  
  


`;
