import React, {useEffect, useState} from 'react';
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
registerLocale("ko", ko) // 한국어적용
const _ = require('lodash');

const Calendar = ({startDate, endDate, currentPage, selectUse}) => {
    
    const [sDate, setSDate] = useState(0);
    const [eDate, setEDate] = useState(0);
    const [use, setUse] = useState('all');

    useEffect(() => {
        setUse(selectUse)
    }, [selectUse])




    function choiceDate1(date) {

        setSDate(date) 
        if(sDate === null){

        }else{
            startDate(moment(sDate).format('yyyy-MM-DD'))
        }
    
          
    
        

    }

    function choiceDate2(date) {
        setEDate(date)

        if(eDate === null){

        }else{
            endDate(moment(eDate).format('yyyy-MM-DD'))
        }
    }

    const OPTIONS = [
        { value: "all", name: "전체" },
        { value: "Y", name: "사용" },
        { value: "N", name: "미사용" },
    ];    
    

    return (
        <>
        <Form>
            <DatePicker
                locale="ko"
                showPopperArrow={false} //popover 화살표 boolean으로 선택할 수 있음 
                fixedHeight // calendar의 height 값을 고정시키면 현재달의 비어있는 칸에 지난달과 다음달날짜가 자동으로  표시
                selected={sDate}
                onChange={(date) => choiceDate1(date)}
                />
            <div style={{marginRight : 5, marginLeft : 5}}>  -  </div>
            <DatePicker
                locale="ko"
                showPopperArrow={false} //popover 화살표 boolean으로 선택할 수 있음 
                fixedHeight // calendar의 height 값을 고정시키면 현재달의 비어있는 칸에 지난달과 다음달날짜가 자동으로  표시
                selected={eDate}
                onChange={(date) => choiceDate2(date)}
             />
           
        </Form>
        </>
    );
  };
export default Calendar;


const Form = styled.div`
    display: flex; 
    flex-direction: row;

    label, input {
        display: block; 
        margin:0 auto;
        margin-top : 0 auto;
        margin-bottom : 0 auto;
        height : 20px;
        font-size : 15px;
        width : 100px;
    }

    select {
        margin-left : 6px;
        height : 26px;
    }
`

const Button = styled.button`
  width : 50px;
  margin-left : 5px;
  margin-right : 5px;
  height : 25px;

  border-radius: 4px;
  font-size : 15px;
  outline: 0;
  border: 0px solid rgba(15, 122, 64, 0.9);
  background-color : rgba(15, 122, 64, 0.9);
  color : rgba(255,255,255);

  &:hover {
    cursor:pointer;
  }
`

const Button2 = styled.button`
  width : 50px;
  margin-left : 5px;
  margin-right : 5px;
  height : 25px;

  border-radius: 4px;
  font-size : 15px;
  outline: 0;
  border: 0px solid rgba(15, 122, 64, 0.9);
  background-color : rgba(15, 122, 64, 0.9);
  color : rgba(255,255,255);

  &:hover {
    cursor:pointer;
  }
`





