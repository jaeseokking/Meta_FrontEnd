import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import moment from 'moment';
import leftButton from '../../../images/angle-left.svg';
import rightButton from '../../../images/angle-right.svg';



const StampIssuance = ({loginCallBack}) => {
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [stampAmount, setStampAmount] = useState(1);
  const [issuanceDate, setIssuanceDate] = useState(new Date());
  const [expirationDate, setExpirationDate] = useState('');


  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }
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
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
          setShopList(shopList);
          setShop(shopList[0].SHOP_INFO_NO);       

        }
        if(result === "TOKEN EXPIRED"){
          alert(result);
          navigate("/login")
        }
          
      })
      .catch(ex => {
        console.log("login request fail : " + ex);
      })
      .finally(() => {
       });
    } catch (error) {
      console.log(error);

    } 

   

  }






function choiceDate1(date) {
    if(date > expirationDate && expirationDate != ""){
      alert('만료 일자 이전의 날짜를 설정해주세요.')
      return;
    }
    setIssuanceDate(date) 
}

function choiceDate2(date) {
    if(issuanceDate > date){
      alert('발급 일자 이후의 날짜를 설정해주세요.')
      return;
    }
    
    setExpirationDate(date)
}

function changePhone(e){
  setPhoneNumber(e.target.value);
}

function changeAmount(e){
  setStampAmount(e.target.value);
}

  const issuanceButton = () => {
    for(let i = 0; i<inputRef.current.length; i++){
      if(inputRef.current[i].value === ""){
        alert(inputRef.current[i].id + "을 입력해주세요.");
        inputRef.current[i].focus();
        return;
      }
    }

    if(issuanceDate === ""){
        alert("발급 날짜를 선택해주세요.");
        return;
    }    

    if(expirationDate === ""){
      alert("만료 날짜를 선택해주세요");
      return;
    }



    const data = {
      phoneNumber : phoneNumber,
      stampAmount : stampAmount,
      issuanceDate : moment(issuanceDate).format('yyyy-MM-DD'),
      expirationDate : moment(expirationDate).format('yyyy-MM-DD'),
      shop_info_no : shop
    }
    try {
      axios.post(`${config.SERVER_URL}/api/issue/stamp`, JSON.stringify(data), {
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
      } );
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
               <Title>스탬프  발급 
              <div style={{flex : '1', textAlign : 'right'}}>   
                <Select style={{textAlign : 'center'}} onChange={e => selectShop(e)}>
                  {shopList.map((value, index) => 
                    <option key={value.SHOP_INFO_NO} value={value.SHOP_INFO_NO} >{value.SHOP_NAME}</option>
                    )
                  }
               </Select>
               </div>
               </Title>
           
               <Contents>
                <img src={leftButton}/>
               <TemplateContainer>
                    <div className="banner">
                        <div className="speaker"/>
                    </div>
                    <div className="templatediv">
                        <textarea placeholder='내용을 입력해주세요.'></textarea>
                    </div>
                </TemplateContainer>
                <img src={rightButton}/>
                

                   <Table>
                     <tbody>
                        <tr>
                          <th>핸드폰 번호</th>
                          <td><Input type={"number"} value={phoneNumber} placeholder={" - 을 제외한 핸드폰 번호"} name="phoneNumber" id="핸드폰 번호"  onChange={(e)=> changePhone(e)} ref={el => (inputRef.current[0] = el)}/></td>
                        </tr>
                        <tr>
                          <th>스탬프 발급 개수</th>
                          <td><Input type={"number"} value={stampAmount} name="stampAmount" id="스탬프 발급 개수"  onChange={(e)=> changeAmount(e)} ref={el => (inputRef.current[1] = el)}/> 개</td>
                        </tr>
                        <tr>
                          <th>발급 날짜</th>
                          <td>            
                            <DatePicker
                              locale="ko"
                              showPopperArrow={false} //popover 화살표 boolean으로 선택할 수 있음 
                              fixedHeight // calendar의 height 값을 고정시키면 현재달의 비어있는 칸에 지난달과 다음달날짜가 자동으로  표시
                              selected={issuanceDate}
                              id ="발급 일자"
                              ref={el => (inputRef.current[2] = el)}
                              onChange={(e)=> choiceDate1(e)}
                              />
                          </td>
                        </tr>
                        <tr>
                          <th>만료 날짜</th>
                          <td> 
                            <DatePicker
                              locale="ko"
                              showPopperArrow={false} //popover 화살표 boolean으로 선택할 수 있음 
                              fixedHeight // calendar의 height 값을 고정시키면 현재달의 비어있는 칸에 지난달과 다음달날짜가 자동으로  표시
                              selected={expirationDate}
                              id="만료 일자"
                              ref={el => (inputRef.current[3] = el)}
                              onChange={(e)=> choiceDate2(e)}
                              />
                            </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{textAlign : 'right'}}>
                              <Button onClick={issuanceButton}>발급</Button>
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

export default StampIssuance;

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

  img {
    width : 20px;
    margin : 10px;
    height : 100%;
    

    :hover {
      background-color : gray;
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
  max-width : 50px;
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


const TemplateContainer = styled.div`
        width: 200px;
        height: 400px;
        border-radius: 20px;
        border: 7px solid #343434;
        background-color: #fff;
        float: left;    

        
        .banner {
            width: 80px;
            height: 20px;
            border-radius: 0 0 15px 15px;
            background-color: #343434;
            margin: 0px auto;
            margin-bottom : 30px;

            .speaker{
                width: 40px;
                height: 3px;
                border-radius: 0 0 3px 3px;
                background-color: #454545;
                margin: -4px auto;
            }
        }

        .templatediv{
            margin: 0 auto;
            text-align: center;

            textarea {
                width: 190px;
                height: 300px;
                background-color: #fff38e;
                
                border: 0;
            }
        }


`