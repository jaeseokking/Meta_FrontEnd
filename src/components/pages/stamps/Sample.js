import React, {useState} from 'react';
import styled from 'styled-components';

const Sample = () => {




    return (
        <Wrapper>
            <Form>
               <Title>스탬프 발급 조건 설정</Title>
               <Contents>
                   
               </Contents>
            </Form>
        </Wrapper>
    );
};

export default Sample;

const Wrapper = styled.div`
  font-family : "BMDOHYEON";
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height : 100vh;
  

`
const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  box-shadow: 5px 5px 10px 0px gray;
  padding : 10px;
`

const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  

`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
`

const Input = styled.input`
   height : 20px;
   text-align: end;

 


`

const Table = styled.table`
  border : 1px solid black;

  tbody th {
    font-weight : 100;
    padding : 10px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`