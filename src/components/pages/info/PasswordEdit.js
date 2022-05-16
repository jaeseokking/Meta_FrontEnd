import React from 'react';
import styled from 'styled-components';

const PasswordEdit = () => {



    return (
        <Wrapper>
            <Form>
               <Title>비밀번호 수정</Title>
               <Contents>
               <Input
                  maxLength="20"
                  type="password"
                  name="currentPW"
                  placeholder="현재 비밀번호"
                />
                <Input
                    maxLength="20"
                    type="password"
                    name="NewPW"
                    placeholder="변경 비밀번호"
                />
                <Input
                    maxLength="20"
                    type="password"
                    name="CheckPW"
                    placeholder="변경 비밀번호 확인"
                />
               </Contents>
            </Form>
        </Wrapper>
    );
};

export default PasswordEdit;

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
  padding : 20px;
`

const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  padding : 0px 0px 20px 0px;

`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
  flex-direction: column;
`


// const Table = styled.table`
//   border : 1px solid black;

//   tbody th {
//     font-weight : 100;
//     padding : 10px;
//   }

//   input::-webkit-outer-spin-button,
//   input::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   }

//   /* Firefox */
//   input[type=number] {
//     -moz-appearance: textfield;
//   }
// `

const Input = styled.input`
  width : 200px;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #000;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 15px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;