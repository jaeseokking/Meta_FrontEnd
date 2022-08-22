import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import CalendarSetting from '../list/CalendarSetting';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';
import LoadingForeground from '../../layout/LoadingForeground';



const StampSetting = ({loginCallBack}) => {
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [disInput, setDisInput] = useState(false);
  const [disInput2, setDisInput2] = useState(false); 
  const [disInput3, setDisInput3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState('');
  const [resLoading, setResLoading] = useState(true);

  const [value, SetValue] = useState({
    minimum_price : undefined,
    minimum_count : undefined,
    completion_stamp : '',
    reward : '',
    stamp_exp : undefined,
  })

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
            alert(result);
            navigate("/login")
          }
          if(result === "SUCCESS"){
            console.log(shopList)
            if(shopList.length < 1){
              alert("등록된 가맹점이 없습니다. 가맹점을 등록해주세요.")
              navigate('/info/shop/create');          
            }
            setShopList(shopList);
            setShop(shopList[0].SHOP_INFO_NO);       
  
          }
          if(result === "TOKEN EXPIRED"){
            alert(result);
            navigate("/login")
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

  getShopDetail();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(()=> {
    const data = {
      SHOP_INFO_NO : shop
    }
    try {
    axios.post(`${config.SERVER_URL}/api/getStampSetting`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        const {setting , result} = res.data;     

        if(result === "TOKEN ERROR"){
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
          //초기 세팅값이 없는 경우 
          setStartDate(0);
          setEndDate(0);
          setDisInput(false);
          setDisInput2(false);
          setDisInput3(false);


          SetValue({
            minimum_price : undefined,
            minimum_count : undefined,
            completion_stamp : '',
            reward : '',
            stamp_exp : undefined,
          })


          if(setting !== null){
            if(setting.START_DATE){
              setStartDate(setting.START_DATE);
            }

            if(setting.END_DATE){
              setEndDate(setting.END_DATE)
            }
            
            

        
            SetValue({
              minimum_price : setting.MINIMUM_PRICE === 0 ? "0" : setting.MINIMUM_PRICE,
              minimum_count : setting.MINIMUM_COUNT === 0 ? "0" : setting.MINIMUM_COUNT,
              completion_stamp : setting.COMPLETION_STAMP,
              reward : setting.REWARD,
              stamp_exp : setting.STAMP_EXP === 0 ? "0" : setting.STAMP_EXP
            })

            if(setting.MINIMUM_PRICE === undefined){
              setDisInput(true);
            }

            if(setting.MINIMUM_COUNT === undefined){
              setDisInput2(true);
            }

            if(setting.STAMP_EXP === undefined){
              setDisInput3(true);
            }


            setLoading(true);
            return;
          }


          
          setLoading(true);
          return;
        }
        if(result === "TOKEN EXPIRED"){
          alert(result);
          navigate("/login")
        }
          
      })
      .catch(ex => {
      })
    } catch (error) {
      console.log(error);
      
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop]);





  function valueChange(e){
    SetValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const SettingButton = () => {
    setResLoading(false);
    if(window.confirm("스탬프 발급 조건을 설정하시겠습니까?") === false){
      setResLoading(true);
      return;
    }

    setTimeout(() => {setting()}, 500);
    
  function setting(){
    for(let i = 0; i<inputRef.current.length; i++){
      if(inputRef.current[i].value === ""){
        if(i < 3){
          inputRef.current[i].value = "";
          if(i === 0){
            if(disInput === true){
              continue;
            }
          }else if(i === 1){
            if(disInput2 === true){
              continue;
            }
          }else if(i === 2){
            if(disInput3 === true){
              continue;
            }
          }
          
          alert(inputRef.current[i].id + "을 설정해주세요.");

        }else{
          alert(inputRef.current[i].id + "를 입력해주세요.");
        }
        inputRef.current[i].focus();
        setResLoading(true);
        return;
      }
      if(i == 3){
        if(inputRef.current[i].value > 50){
          console.log( inputRef.current[i].value)
          alert('완료 스탬프 개수는 최대 50개까지 가능합니다')
          inputRef.current[i].value = 50;
          inputRef.current[i].focus();
          setResLoading(true);
          return;
        }
      }

    }


    const data = {
      minimum_price : value.minimum_price,
      minimum_count : value.minimum_count,
      startDate : startDate,
      endDate : endDate,
      completion_stamp : value.completion_stamp,
      reward : value.reward,
      stamp_exp : value.stamp_exp,
      shop_info_no : shop
    }

    try {
      axios.post(`${config.SERVER_URL}/api/stampSetting`, JSON.stringify(data), {
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
          alert("스탬프 발급조건이 설정되었습니다.")
          window.location.reload();
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
        setResLoading(true);
      });
    } catch (error) {
      console.log(error);
      
    } 
  }
    
  
  }
 
 
  function lockInput(e){

    if(e.target.id === 'money'){
        SetValue({
          ...value,
          minimum_price : undefined
        })
      setDisInput(!disInput);
    }
    else if(e.target.id === 'count'){
        SetValue({
          ...value,
          minimum_count : undefined
        })
      setDisInput2(!disInput2);
    }else if(e.target.id === 'exp'){
      SetValue({
        ...value,
        stamp_exp : undefined
      })
      setDisInput3(!disInput3);

    }
  }

  function selectShop(e){
    setShop(e.target.value);
  }

  if(loading === true){
    return (
        <Wrapper>
            {resLoading === false &&
              <LoadingForeground/>
            }
            <Form>
               <Title>스탬프 발급 조건 설정 
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
                   <Table>
                     <tbody>
                        <tr>
                          <th>1회발급 최소금액</th>
                          <td><Input type={"number"} value={value.minimum_price || ""} style={{background : disInput ? "#d3d3d3" : null}} placeholder={disInput ? "조건없음" : "ex) 1000"} name="minimum_price" id="최소금액"  onChange={(e)=>valueChange(e)} disabled={disInput} ref={el => (inputRef.current[0] = el)}/> 원
                          <input className="checkbox" type="checkbox" id="money"  onChange={(e) => lockInput(e)} checked={disInput} />조건없음</td>
                        </tr>
                        <tr>
                          <th>1회발급 최소건수</th>
                          <td><Input type={"number"} value={value.minimum_count || ""} style={{background : disInput2 ? "#d3d3d3" : null}}  placeholder={disInput2 ? "조건없음" : "ex) 1"} name="minimum_count" id="최소건수"  onChange={(e)=>valueChange(e)} disabled={disInput2} ref={el => (inputRef.current[1] = el)}/> 개
                          <input className="checkbox" type="checkbox" onChange={(e) => lockInput(e)} checked={disInput2} id="count"/>조건없음</td>
                        </tr>
                        <tr>
                          <th>이벤트 기간</th>
                          <td><CalendarSetting startDate={setStartDate} endDate={setEndDate} sInitDate={startDate} eInitDate={endDate} /></td>
                        </tr>
                        <tr>
                          <th>발급후 사용기간</th>
                          <td><Input type={"number"} value={value.stamp_exp || ""} style={{background : disInput3 ? "#d3d3d3" : null}} placeholder={disInput3 ? "무제한" : "ex) 30"} name="stamp_exp" id="사용기간"  onChange={(e)=>valueChange(e)} ref={el => (inputRef.current[2] = el)}/> 일
                          <input className="checkbox" type="checkbox" onChange={(e) => lockInput(e)} checked={disInput3} id="exp" />조건없음</td>
                        </tr>
                        <tr>
                          <th>완료 스탬프 개수</th>
                          <td><Input type={"number"} name="completion_stamp" id="완료 개수" placeholder="ex) 10"onChange={(e)=>valueChange(e)} value={value.completion_stamp || ""} ref={el => (inputRef.current[3] = el)}/> 개</td>
                        </tr>
                        <tr>
                          <th>스탬프 보상</th>
                          <td><Input value={value.reward || ""} name="reward" placeholder="ex) 할인 2000원" maxLength="5"  id="스탬프 보상" onChange={(e)=>valueChange(e)} ref={el => (inputRef.current[4] = el)}/></td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{textAlign : 'right' , border : '0'}}>
                              <Button onClick={SettingButton}>설정</Button>
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

export default StampSetting;

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

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .checkbox {
    margin-left : 30px;
  }

  tr:last-child td{
    height : 50px;
  }

 
`
const Button = styled.button`
  font-family: 'SCDream_Bold';
  margin-top : 10px;
  width : 150px;
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

  &:hover{
    width : 170px;
    height : 34px;
    font-size : 22px;
    border-radius: 5px;

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
  cursor: pointer;
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  font-family: inherit;
`