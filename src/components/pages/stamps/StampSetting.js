import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import CalendarSetting from '../list/CalendarSetting';
import axios from 'axios';
import * as config from '../../../config';



const StampSetting = () => {

  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [selectUse, setSelectUse] = useState('all');
  const [disInput, setDisInput] = useState(false);
  const [disInput2, setDisInput2] = useState(false); 

  const [value, SetValue] = useState({
    minimum_price : '',
    minimum_count : '',
    completion_stamp : '',
    reward : ''
  })



  function valueChange(e){
    console.log(value);
    console.log(e.target.name)
    SetValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const SettingButton = () => {
    const data = {
      minimum_price : value.minimum_price,
      minimum_count : value.minimum_count,
      startDate : startDate,
      endDate : endDate,
      completion_stamp : value.completion_stamp,
      reward : value.reward

    }
    console.log(data);
    // try {
    //   axios.post(`${config.SERVER_URL}/api/login`, JSON.stringify(data), {
    //     headers: {
    //       "Content-Type": `application/json`,
    //     },
    //     xhrFields: {
    //       withCredentials: true
    //     },
    // })
    //   .then(res => {
        
          
    //   })
    //   .catch(ex => {
    //     console.log("login request fail : " + ex);
    //   })
    //   .finally(() => {console.log("login request end")});
    // } catch (error) {
    //   console.log(error);
      
    // } 
  
  }
 
 
  function lockInput(e){

    if(e.target.id === 'money'){
      if(disInput){
        SetValue({
          minimum_price : ''
        })
      }else{
        SetValue({
          minimum_price : 0
        })
      }
      setDisInput(!disInput);
      
      
    }else if(e.target.id === 'count'){
      if(disInput2){
        SetValue({
          minimum_count : ''
        })
      }else{
        SetValue({
          minimum_count : 1
        })
      }
      setDisInput2(!disInput2);
    
    }
  }


    return (
        <Wrapper>
            <Form>
               <Title>스탬프 발급 조건 설정</Title>
               <Contents>
                   <Table>
                     <tbody>
                        <tr>
                          <th>1회발급 최소금액</th>
                          <td><Input type={"number"} value={value.minimum_price || ""} placeholder="ex) 1000" name="minimum_price" id="minimum_price"  onChange={(e)=>valueChange(e)} disabled={disInput}/> 원</td>
                          <td><input type="checkbox" id="money"  onClick={(e) => lockInput(e)}/>조건없음</td>
                        </tr>
                        <tr>
                          <th>1회발급 최소건수</th>
                          <td><Input type={"number"} value={value.minimum_count || ""} placeholder="ex) 1" name="minimum_count" id="minimum_count"  onChange={(e)=>valueChange(e)} disabled={disInput2}/> 개</td>
                          <td><input type="checkbox" id="count" onClick={(e) => lockInput(e)}/>조건없음</td>
                        </tr>
                        <tr>
                          <th>이벤트 기간</th>
                          <td><CalendarSetting startDate={setStartDate} endDate={setEndDate} currentPage={setPage} selectUse={setSelectUse}/></td>
                        </tr>
                        <tr>
                          <th>완료 스탬프 개수</th>
                          <td><Input type={"number"} name="completion_stamp" id="completion_stamp" placeholder="ex) 10" onChange={(e)=>valueChange(e)} value={value.completion_stamp || ""}/> 개</td>
                        </tr>
                        <tr>
                          <th>스탬프 보상</th>
                          <td><Input value={value.reward || ""} name="reward" placeholder="ex) 할인 2000원" id="reward" onChange={(e)=>valueChange(e)}/></td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{textAlign : 'right'}}>
                              <Button onClick={SettingButton}>설정</Button>
                          </td>
                        </tr>
                     </tbody>
                     
                   </Table>
               </Contents>
            </Form>
        </Wrapper>
    );
};

export default StampSetting;

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
  padding : 10px;
`

const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  font-weight: 800;

`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
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