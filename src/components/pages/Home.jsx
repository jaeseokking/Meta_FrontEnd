import React from 'react';
import styled from 'styled-components'

const Home = () => {
    console.log('Home')
    return (

        <Wrapper>
            <div>
                <div>{"안녕하세요."}</div>
                <div>{"메뉴를 이용해주세요."}</div>
            </div>
        </Wrapper>
    );
};

export default Home;

// const BackgroundImage = styled.image`
//     background-size : cover;    
//     background-repeat: no-repeat;
//     width: 100vw;
//     display: flex;
      

// `

// const Wrapper = styled.section`
//   display: flex;
//   justify-content: center;
// //   align-items: center;
//   font-size : 30px;
//   margin : 0 auto;
//   flex-direction : column;

//   p {
//     color: black;
//     border-radius: 4px;
//     margin-top : 50px;
//   }
  
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height : 100vh;

  font-size : 30px;
 
`
  


// `;
