import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';



const ShopUpdate = ({loginCallBack}) => {
  const inputRef = useRef([]);
  const navigate = useNavigate();
  

  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState('');
  const [shopIDX, setShopIDX] = useState(0);


  const [value, setValue] = useState({
    shopBizno : '',
    shopName : '',
    shopBranch : '',
    shopAddr : '',
    shopCEO : '',
    shopTelNum : '',
    shopInfoNo : '',
});

  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
}


  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  


//초기 설정한 데이터 가져오기

useEffect(() =>  { 

  const bizno = getParameter("bizno");


  async function getTemplate(){
    try {
      const data ={
        shop_info_no : shop,
        bizno : bizno
      }

      await axios.post(`${config.SERVER_URL}/api/get/template`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        const {shopList , result} = res.data;

        if(result === "TOKEN ERROR"){
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
          setShopList(shopList);
          setShopIDX(0);
          setValue({
            shopBizno : shopList[shopIDX].SHOP_BIZNO,
            shopName : shopList[shopIDX].SHOP_NAME,
            shopBranch : shopList[shopIDX].SHOP_BRANCH,
            shopAddr : shopList[shopIDX].SHOP_ADDR,
            shopCEO : shopList[shopIDX].SHOP_CEO,
            shopTelNum : shopList[shopIDX].SHOP_TEL_NUM,
            shopInfoNo : shopList[shopIDX].SHOP_INFO_NO,
            seq : shopList[shopIDX].SEQ
          })



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
  getTemplate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
   


  function selectShop(e){

    setShop(e.target.value);
    setShopIDX(e.target.options[e.target.selectedIndex].index)

    setValue({
      shopBizno : shopList[e.target.selectedIndex].SHOP_BIZNO,
      shopName : shopList[e.target.selectedIndex].SHOP_NAME,
      shopBranch : shopList[e.target.selectedIndex].SHOP_BRANCH,
      shopAddr : shopList[e.target.selectedIndex].SHOP_ADDR,
      shopCEO : shopList[e.target.selectedIndex].SHOP_CEO,
      shopTelNum : shopList[e.target.selectedIndex].SHOP_TEL_NUM,
      shopInfoNo : shopList[e.target.selectedIndex].SHOP_INFO_NO,
      seq : shopList[e.target.selectedIndex].SEQ
    })
 

  }


  function updateShop(e){
    e.preventDefault();

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
      seq : value.seq
    }
    
    try {
      axios.post(`${config.SERVER_URL}/api/account/shop/update`, JSON.stringify(data), {
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
          alert(message);
          window.location.reload();
        }
        if(message === "TOKEN EXPIRED"){
          alert(message);
          navigate("/login")
        }
        if(message === "TOKEN NULL"){
          alert(message);
          navigate("/login");
        }
        if(message === "UPDATE ERROR"){
          alert('업데이트 오류');
          window.location.reload();
        }
        if(message === "REDUPLICATED SHOP_INFO_NO"){
          alert(message);
          inputRef.current[6].focus();

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
               <Title>가맹점 수정
              <div style={{flex : '1', textAlign : 'right'}}>   
                <Select style={{textAlign : 'center'}} onChange={e => selectShop(e)}>
                  {shopList.map((value, index) => 
                    <option index={index} key={value.SHOP_INFO_NO} value={value.SHOP_INFO_NO} >{value.SHOP_NAME}</option>
                    )
                  }
               </Select>
               </div>
               </Title>
               <Contents>
                   <Table>
                    <tbody>
                    <tr>
                        <th scope="col" >사업자등록번호(ID)</th>
                        <td ><div><Input name='shopBizno' type="text" id="로그인 아이디" className="bizno" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[0] = el)} value={value.shopBizno} readOnly></Input></div></td>
                        <th scope="col">상호명</th>
                        <td ><div><Input name='shopName' type="text" id="상호명" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[1] = el)} value={value.shopName}/></div></td>
                    </tr>
                    <tr>
                        <th scope="col" >가맹점 이름</th>
                        <td ><div><Input name='shopBranch' type="text" id="가맹점 이름"onChange={(e) => valueChange(e)} ref={el => (inputRef.current[2] = el)} value={value.shopBranch}/></div></td>
                        <th scope="col">주소</th>
                        <td ><div><Input name='shopAddr' type="text"id="주소" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[3] = el)} value={value.shopAddr}/></div></td>
                    </tr>
                    <tr>
                        <th scope="col" >대표자</th>
                        <td ><div><Input name='shopCEO' type="text" id="대표자"onChange={(e) => valueChange(e)} ref={el => (inputRef.current[4] = el)} value={value.shopCEO}/></div></td>
                        <th scope="col">대표번호</th>
                        <td ><div><Input name='shopTelNum'type="text" id="대표번호" onChange={(e) => valueChange(e)} ref={el => (inputRef.current[5] = el)} value={value.shopTelNum}/></div></td>
                    </tr>
                    <tr>      
                        <th scope="col" >SHOP_INFO_NO</th>
                        <td><div><Input name='shopInfoNo' type="text" id="SHOP_INFO_NO"onChange={(e) => valueChange(e)} ref={el => (inputRef.current[6] = el)} value={value.shopInfoNo}/></div></td>
                        <td></td>                  
                        <td ><div className="button_container">
                            {/* <button onClick={() => navigate({ pathname : `/account/list`})}>계정 목록</button> */}
                            <button onClick={(e) => updateShop(e)}>등록</button>
                        </div></td>
                    </tr>
                    </tbody>  
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

export default ShopUpdate;

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
  width : fit-content;

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
  width : fit-content;
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
  width : fit-content;


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

const Select = styled.select`
  height : 30px;
  background: #f9f9fa;
  border-radius: 4px;
  color: #000;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 15px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  font-family: inherit;
`