import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import Spinner from 'react-spinkit';


const AccountCreate = ({loginCallBack}) => {
    const inputRef = useRef([]);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [value, setValue] = useState({
        bizno : '',
        password : '',
        plusID : '',
        ceoName : '',
        ceoCall : ''
    });


    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
      setLoading(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  
    const createAccount = () => {
        for(let i = 0; i<inputRef.current.length; i++){
            if(inputRef.current[i].value === ""){
                alert(inputRef.current[i].id + "를 입력해주세요.");
                inputRef.current[i].focus();
                return;
            }


        }

        const data = {
            bizno : value.bizno,
            password : value.password,
            plusID : value.plusID,
            ceoName : value.ceoName,
            ceoCall : value.ceoCall,
        }
        try {
            axios.post(`${config.SERVER_URL}/api/create/account`, JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
            xhrFields: {
                withCredentials: true
            },
        })
            .then(res => {
            const message = res.data.result;
            if(message === "TOKEN ERROR"){
                alert(message);
                navigate("/login")
            }
            if(message === "SUCCESS"){
                alert("계정 생성 완료")
                window.location.reload();
            }
            if(message === "REDUPLICATED BIZNO"){
                alert("중복된 아이디입니다.")
                inputRef.current[0].focus();
            }
            if(message === "TOKEN EXPIRED"){
                alert("로그인 만료 다시 로그인해주세요.");
                navigate("/login")
            }
            if(message === "TOKEN NULL"){
                navigate("/login");
            }
            
                
            })
            .catch(ex => {
            })
            .finally(() => {
            });
        } catch (error) {
            console.log(error);
            
        } 
         
          
    }

    function valueChange(e){
        setValue({
          ...value,
          [e.target.name]: e.target.value
        })
    }

  

    if(loading === true){
      return (
        <Wrapper>
            <Form>
               <Title>계정 생성</Title>
               <Contents>               
                <Table>
                    <tr>
                        <th scope="col" >로그인 아이디</th>
                        <td ><div><Input name='bizno' id="로그인 아이디" className="bizno" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[0] = el)} ></Input></div></td>
                        <th scope="col">비밀번호</th>
                        <td ><div><Input name='password' type="password" id="비밀번호" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[1] = el)}/></div></td>
                    </tr>
                    <tr>
                        <th scope="col" >플러스 친구</th>
                        <td ><div><Input name='plusID'  id="플러스 친구"onChange={(e) => valueChange(e)} ref={el => (inputRef.current[2] = el)}/></div></td>
                        <th scope="col">대표자</th>
                        <td ><div><Input name='ceoName' id="대표자" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[3] = el)}/></div></td>
                    </tr>
                    <tr>
                        <th scope="col" >대표번호</th>
                        <td ><div><Input name='ceoCall' id="대표번호" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[4] = el)}/></div></td>
                        
                        <td  colSpan={2} ><div className="button_container">
                            <button onClick={() => navigate({ pathname : `/account/list`})}
                            >목록</button>
                            <button onClick={createAccount}>등록</button>
                        </div></td>
                    </tr>  
                </Table>
               </Contents>
            </Form>
        </Wrapper>
      );
    }else{
      return (
        <Wrapper>
           <Spinner name="ball-grid-pulse" color="steelblue" />
        </Wrapper>
      )
    }

};

export default AccountCreate;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height : 100%;
  margin : auto 0;


`


const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  box-shadow: 5px 5px 10px 0px gray;
  padding : 40px;
  width : 80%;

  @media screen and (max-width: 767px){
    width : 95%;
  }
`

const Title = styled.div`
  font-size : 30px;
  color : #714DDA;
  font-weight: 800;
  width : 100%;
  display: flex;
  flex-direction: row;
`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
  flex-direction: column;
 
`

const Input = styled.input`
    width : 150px;
    padding: 5px 13px;
    background: #f9f9fa;
    color: #000;
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
`


const Table = styled.table`
  margin-top : 10px;
  border-collapse: collapse;
  margin-bottom : 10px;
  overflow: hidden;
  border-radius: 15px;
  align-items : center;
  width : 100%;


  div {
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius : 100px;
    font-weight: bold;

  }

  th, td {
    padding : 10px;
    text-align: center;
    font-size: 15px;

  }


  th {
    color : #714DDA;
    font-weight : 900;
  }

  td {
    padding: 7px;
  }

  .stamp_code {
    @media screen and (max-width: 767px){
      display : none;
    }
  }

  .button_container{
    width : fit-content;
    float : right;
    margin-right : 10px;
    button {
        width : 60px;
        margin-left : 5px;
    }
  }


`

