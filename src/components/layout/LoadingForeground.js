import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';

const LoadingForeground = () => {

    return (
        <Loading>
            <Spinner  fadeIn='half'  className="spinner" name="ball-clip-rotate-multiple" color="#4F3698" />
        </Loading>
    )
};

export default LoadingForeground;

const Loading = styled.div`
  top : -50px;
  left : -200px;
  margin : 0;
  padding : 0;
  position : absolute;
  width : 100vw;
  height : -webkit-fill-available;
  min-height : 100vh;
  background-color : rgba(0, 0, 0, 0.3);
  z-index : 10;
  text-align: center;
  line-height : 100vh;
  transition-delay: 0s;

  .sk-spinner{
    position : fixed;
    top : 50%;
    left : 50%;
    transform : scale(3);
    animation: sk-fade-in 0.2s;
  }
`
