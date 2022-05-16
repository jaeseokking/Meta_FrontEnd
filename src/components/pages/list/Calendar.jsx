import React, {useEffect, useState} from 'react';
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
registerLocale("ko", ko) // 한국어적용
// const _ = require('lodash');

const Calendar = ({startDate, endDate, currentPage, selectUse}) => {
    
    const [sDate, setSDate] = useState(0);
    const [eDate, setEDate] = useState(0);
    const [use, setUse] = useState('all');

    useEffect(() => {
        setUse(selectUse)
    }, [selectUse])


    function Today(e) {
        e.preventDefault();

        setSDate(new Date());
        setEDate(new Date());


    }

    function Week(e){
        e.preventDefault();
        var date = new Date();
        date.setDate(date.getDate() - 7);
        setSDate(date);
        setEDate(new Date());
        
    
    }

    function Month(e){
        e.preventDefault();
        var date = new Date();
        date.setDate(date.getDate() - 30);
        setSDate(date);
        setEDate(new Date());
        
       
     
    }

    function All(e) {
        e.preventDefault();

        setSDate(0);
        setEDate(0);
        

    }


    function SetDate(e){
        e.preventDefault();
        if(sDate === 0 || eDate === 0){
            startDate(0)
            endDate(0)
        }else{
            if(sDate === null){
                startDate(0)
            }else{
                startDate(moment(sDate).format('yyyyMMDD'))
            }
    
            if(eDate === null){
                endDate(0)
            }else{
                endDate(moment(eDate).format('yyyyMMDD'))
            }
    
        }
    
        selectUse(use)
        currentPage(1)
    }

    function choiceDate1(date) {
        setSDate(date)

    }

    function choiceDate2(date) {
        setEDate(date)

    }

    const OPTIONS = [
        { value: "all", name: "전체" },
        { value: "Y", name: "사용" },
        { value: "N", name: "미사용" },
    ];    
    

    return (
        <>
        <Form>
            <Button onClick={(e) => Today(e)}>{"오늘"}</Button>
            <Button onClick={(e) => Week(e)}>{"1주일"}</Button>
            <Button onClick={(e) => Month(e)}>{"1개월"}</Button>
            <Button onClick={(e) => All(e)}>{"전체"}</Button>
        </Form>
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
            <Form>
            <select onChange={(e) => setUse(e.target.value)}>
                {OPTIONS.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
            <Button2 onClick={(e) => SetDate(e)}>{"검색"}</Button2>
             </Form>
           
        </Form>
    
        </>
    );
  };
export default Calendar;


const Form = styled.div`
    display: flex; 
    flex-direction: row;
    align-self: flex-end;
    width : 100%;

    label, input {
        display: block; 
        margin:0 auto;
        margin-top : 0 auto;
        margin-bottom : 0 auto;
        height : 20px;
        font-size : 15px;
        max-width : 80px;


        
    }

    select {
        margin-left : 6px;
        height : 26px;
    }
`

const Button = styled.button`
  max-width : 47px;
  margin-left : 5px;
  margin-right : 5px;
  height : 25px;

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

const Button2 = styled.button`
  margin-left : 5px;
  margin-right : 5px;
  height : 25px;
  width : 50px;

  border-radius: 4px;
  font-size : 15px;
  outline: 0;
  border: 0px solid rgba(1, 78, 136, 0.9);;
  background-color : rgba(1, 78, 136, 0.9);;
  color : rgba(255,255,255);

  &:hover {
    cursor:pointer;
  }
`
