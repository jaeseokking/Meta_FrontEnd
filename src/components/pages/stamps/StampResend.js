import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';



const StampResend = ({loginCallBack}) => {
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


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

  async function getShopDetail(){
    try {
      await axios.post(`${config.SERVER_URL}/api/getShopList`, {}, {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        const {shopList , result} = res.data;

        if(result === "TOKEN ERROR"){
          navigate("/login")
        }
        if(result === "SUCCESS"){
          setShopList(shopList);
          setShop(shopList[0].SHOP_INFO_NO);       

        }
        if(result === "TOKEN EXPIRED"){
          alert("로그인 만료 다시 로그인해주세요.");
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

  getShopDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
   






function changePhone(e){
  setPhoneNumber(e.target.value);
}


  const ResendButton = () => {
    for(let i = 0; i<inputRef.current.length; i++){
      if(inputRef.current[i].value === ""){
        alert(inputRef.current[i].id + "을 입력해주세요.");
        inputRef.current[i].focus();
        return;
      }
    }



    const data = {
      phoneNumber : phoneNumber,
      shop_info_no : shop
    }
    try {
      axios.post(`${config.SERVER_URL}/api/stamp/resend`, JSON.stringify(data), {
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
        if(message === "INSERT ERROR"){
          alert('스탬프 발급 오류');
          window.location.reload();

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
 
 

  function selectShop(e){
    setShop(e.target.value);
  }




  if(loading === true){
    return (
        <Wrapper>
            <Form>
               <Title>스탬프 재발송
              <div style={{flex : '1', textAlign : 'right'}}>   
              {shopList ?
                <Select style={{textAlign : 'center'}} onChange={e => selectShop(e)}>
                  {shopList.map((value, index) => 
                    <option key={value.SHOP_INFO_NO} value={value.SHOP_INFO_NO} >{value.SHOP_NAME}</option>
                    )
                  }
               </Select>
               :
               null
              }
               </div>
               </Title>
           
               <Contents>
                   <Table>
                     <tbody>
                        <tr>
                          <th>핸드폰 번호</th>
                          <td><Input type={"number"} value={phoneNumber} placeholder={" - 을 제외한 핸드폰 번호"} name="phoneNumber" id="핸드폰 번호"  onChange={(e)=> changePhone(e)} ref={el => (inputRef.current[0] = el)}/></td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{textAlign : 'right'}}>
                              <Button onClick={ResendButton}>재전송</Button>
                          </td>
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

export default StampResend;

const Wrapper = styled.div`
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
  padding : 40px;
`

const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  font-weight: 800;
  width : 100%;
  display: flex;
  flex-direction: row;
`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;

  input {
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
}

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
  border: 0px;
  border-collapse: separate;
  border-spacing: 0 10px;

  tbody th {
    font-weight : 400;
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

const Button = styled.button`
  max-width : 100px;
  margin-left : 5px;
  margin-right : 5px;
  height : 25px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 15px;
  outline: 0;
  border: 0px solid rgba(1, 78, 136, 0.9);
  background-color : rgba(1, 78, 136, 0.9);
  color : rgba(255,255,255);

  &:hover {
    cursor:pointer;
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