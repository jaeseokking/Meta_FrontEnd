import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <Wrapper>
            <h1>404</h1>
            <h3>Page Not Found</h3>
        </Wrapper>
    );
};

export default NotFound;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size : 30px;
  margin: 0 auto;
  flex-direction : column;

  h1 {
      font-size : 100px;
  }

  h3 {
      margin-top : -110px;
      color : gray;
  }
`