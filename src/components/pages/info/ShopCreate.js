import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import Spinner from 'react-spinkit';
import LoadingForeground from '../../layout/LoadingForeground';


const ShopCreate = ({loginCallBack}) => {
    const inputRef = useRef([]);
  
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [resLoading, setResLoading] = useState(true);
    const [role, setRole] = useState(1);
    const [value, setValue] = useState({
        shopBizno : '',
        shopName : '',
        shopBranch : '',
        shopAddr : '',
        shopCEO : '',
        shopTelNum : '',
        // shopInfoNo : '',
    });


    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //초기 설정한 데이터 가져오기

useEffect(() =>  { 

  async function getInfo(){
    try {


      await axios.post(`${config.SERVER_URL}/api/get/bizno`, {}, {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        const {result, bizno, role} = res.data;
        console.log(res)
        console.log(result);
        if(result === "TOKEN ERROR"){
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
          setRole(role)
          if(result.role == 2){
            
          }else{
            setValue({shopBizno : bizno})
          }



        }
        if(result === "TOKEN EXPIRED"){
          alert(result);
          navigate("/login")
        }
          
      })
      .catch(ex => {
      })
      .finally(() => {
        setLoading(true);
      });
    } catch (error) {
      console.log(error);

    } 
  }
  getInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  
    const createShop = () => {
      setResLoading(false);
      if(window.confirm("가맹점을 추가하시겠습니까?") === false){
        setResLoading(true);
        return;
      }
      setTimeout(()=>{create()}, 500)

      function create() {
        for(let i = 0; i<inputRef.current.length; i++){
          if(inputRef.current[i].value === ""){
              alert(inputRef.current[i].id + "를 입력해주세요.");
              inputRef.current[i].focus();
              setResLoading(true);
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
          // shopInfoNo : value.shopInfoNo,
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
            resLoading(true);
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

  
    if(loading === true){

    }else{
      return (
        <Wrapper>
        <Spinner name="ball-grid-pulse" color="steelblue" />
        </Wrapper>
      )
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
                  <tbody>
                    <tr>
                        <th scope="col" >사업자등록번호(ID)</th>
                        <td><div><Input name='shopBizno' type="text" id="로그인 아이디" className="bizno" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[0] = el)} disabled={role !== 2} value={value.shopBizno} ></Input></div></td>
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
                        <td colSpan={4}>
                            <Button onClick={createShop}>등록</Button>
                        </td>
                    </tr> 
                    </tbody> 
                </Table>
               </Contents>
            </Form>
        </Wrapper>
      );

};

export default ShopCreate;

const Wrapper = styled.div`
  font-family: 'SCDream';
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width : 100%;
  padding-left: 50px;
  padding-top : 80px;
  

`
const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  box-shadow: 5px 5px 10px 0px gray;
  padding : 40px;
  width : 1000px;
  background-color: white;
`

const Title = styled.div`
  font-size : 30px;
  color : #714DDA;
  font-weight: 800;
  width : 100%;
  display: flex;
  flex-direction: row;
  font-family: 'SCDream_Bold';

`

const Contents = styled.div`
  margin-top : 20px;
`

const Input = styled.input`
  height : 10px;
  text-align: end;

  padding: 11px 13px;
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
  border-collapse: separate;
  border-spacing: 0 10px;
  font-family: 'SCDream';
  font-weight : 900;
  border-spacing: 0 0px;
  width : 100%;

  tbody th {
    padding : 25px;
    font-family: 'SCDream_Bold';

  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }



  th {
    background-color: #F5F2F4;
    border-bottom : 1px solid #888;
    width : 180px;
  }

  td{
    border-bottom : 1px solid #888;
    padding-left : 20px;
  }
  td:last-child{
    height : 50px;
  }

  tr:last-child td{
    border-bottom : 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .checkbox {
    margin-left : 30px;
  }

 
 
`

const Button = styled.button`
  font-family: 'SCDream_Bold';
  margin-top : 10px;
  width : 200px;
  margin-left : 5px;
  margin-right : 5px;
  height : 30px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 20px;
  outline: 0;
  border: 0;
  background-color : #714DDA;
  color : rgba(255,255,255);
  cursor:pointer;
  box-shadow: 1px 1px 3px 0px gray;
  transition : 0.3s;
  float : right;

  &:hover{
    width : 220px;
    height : 34px;
    font-size : 22px;
    border-radius: 5px;
  }



`

