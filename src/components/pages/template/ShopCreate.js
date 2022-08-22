import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import LoadingForeground from '../../layout/LoadingForeground';


const ShopCreate = ({loginCallBack}) => {
    const inputRef = useRef([]);
    const [resLoading, setResLoading] = useState(true);

    const navigate = useNavigate();
    const [value, setValue] = useState({
        shopBizno : '',
        shopName : '',
        shopBranch : '',
        shopAddr : '',
        shopCEO : '',
        shopTelNum : '',
        shopInfoNo : '',
    });


    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  
    const createShop = () => {
      setResLoading(false);
      if(window.confirm("가맹점을 추가하시겠습니까?") === false){
        setResLoading(true);
        return;
      }
      setTimeout(() => {create()}, 500);

      function create(){
        for(let i = 0; i<inputRef.current.length; i++){
          if(inputRef.current[i].value === ""){
              alert(inputRef.current[i].id + "를 입력해주세요.");
              inputRef.current[i].focus();
              return;
          }


      }

      const data = {
          shopBizno : value.shopBizno,
          shopName : value.shopName,
          shopBranch : value.shopBranch,
          shopAddr : value.shopAddr,
          shopCEO : value.shopCEO,
          shopTelNum : value.shopTelNum,
          shopInfoNo : value.shopInfoNo,
      }
      try {
          axios.post(`${config.SERVER_URL}/api/create/shop`, JSON.stringify(data), {
          headers: {
              "Content-Type": `application/json`,
          },
          xhrFields: {
              withCredentials: true
          },
      })
          .then(res => {
          const message = res.data.result;
          if(message === "NON BIZNO"){
              alert("해당 사업자번호(ID) 계정이 존재하지 않습니다.")
              return;
          }
          if(message === "TOKEN ERROR"){
              alert(message);
              navigate("/login")
          }
          if(message === "SUCCESS"){
              alert("가맹점 추가 완료")
              window.location.reload();
          }
          if(message === "REDUPLICATED SHOP_INFO_NO"){
              alert(message)
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
       
         
          
    }

    function valueChange(e){
        setValue({
          ...value,
          [e.target.name]: e.target.value
        })
    }

  

      return (
        <Wrapper>
            {resLoading === false &&
              <LoadingForeground/>
            }
            <Form>
               <Title>가맹점 추가</Title>
               <Contents>               
                <Table>
                    <tr>
                        <th scope="col" >사업자등록번호(ID)</th>
                        <td><div><Input name='shopBizno' type="text" id="로그인 아이디" className="bizno" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[0] = el)} ></Input></div></td>
                        <th scope="col">상호명</th>
                        <td ><div><Input name='shopName' type="text" id="상호명" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[1] = el)}/></div></td>
                    </tr>
                    <tr>
                        <th scope="col" >가맹점 이름</th>
                        <td><div><Input name='shopBranch' type="text" id="가맹점 이름"onChange={(e) => valueChange(e)} ref={el => (inputRef.current[2] = el)}/></div></td>
                        <th scope="col">주소</th>
                        <td><div><Input name='shopAddr' type="text"id="주소" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[3] = el)}/></div></td>
                    </tr>
                    <tr>
                        <th scope="col" >대표자</th>
                        <td ><div><Input name='shopCEO' type="text" id="대표자"onChange={(e) => valueChange(e)} ref={el => (inputRef.current[4] = el)}/></div></td>
                        <th scope="col">대표번호</th>
                        <td ><div><Input name='shopTelNum'type="text" id="대표번호" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[5] = el)}/></div></td>
                    </tr>
                    <tr>      
                        <th scope="col" >SHOP_INFO_NO</th>
                        <td><div><Input name='shopInfoNo' type="text" id="SHOP_INFO_NO"onChange={(e) => valueChange(e)} ref={el => (inputRef.current[6] = el)}/></div></td>
                        <td></td>                  
                        <td ><div className="button_container">
                            <button onClick={() => navigate({ pathname : `/account/list`})}
                            >계정 목록</button>
                            <button onClick={createShop}>등록</button>
                        </div></td>
                    </tr>  
                </Table>
               </Contents>
            </Form>
        </Wrapper>
      );

};

export default ShopCreate;

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
    width : 100%;
    text-align : right;

    margin-right : 10px;
    button {
        width : fit-content;
        margin-left : 5px;
    }
  }


`
