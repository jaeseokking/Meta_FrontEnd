import React, { useEffect, useState} from 'react';
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { format } from 'date-fns';
registerLocale("ko", ko) // 한국어적용
// const _ = require('lodash');

const Calendar = ({startDate, endDate, sInitDate, eInitDate}) => {
    const [sDate, setSDate] = useState(new Date(sInitDate));
    const [eDate, setEDate] = useState(new Date(eInitDate));

    useEffect(() => {
        setSDate(new Date(sInitDate));
    }, [sInitDate])
    useEffect(() => {
        setEDate(new Date(eInitDate));
    }, [eInitDate])


    function choiceDate1(date) {

        setSDate(date) 
        startDate(moment(date).format('yyyy-MM-DD'))


    }

    function choiceDate2(date) {
        setEDate(date)
        endDate(moment(date).format('yyyy-MM-DD'))
    }

    

    return (
        <>
        <Form>
            <DatePicker
                locale="ko"
                showPopperArrow={false} //popover 화살표 boolean으로 선택할 수 있음 
                fixedHeight // calendar의 height 값을 고정시키면 현재달의 비어있는 칸에 지난달과 다음달날짜가 자동으로  표시
                selected={sInitDate === 0 ? null : sDate}
                onChange={(date) => choiceDate1(date)}
                />
            <div style={{marginRight : 5, marginLeft : 5}}>  -  </div>
            <DatePicker
                locale="ko"
                showPopperArrow={false} //popover 화살표 boolean으로 선택할 수 있음 
                fixedHeight // calendar의 height 값을 고정시키면 현재달의 비어있는 칸에 지난달과 다음달날짜가 자동으로  표시
                selected={eInitDate === 0? null : eDate}
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

// const Button = styled.button`
//   width : 50px;
//   margin-left : 5px;
//   margin-right : 5px;
//   height : 25px;

//   border-radius: 4px;
//   font-size : 15px;
//   outline: 0;
//   border: 0px solid rgba(15, 122, 64, 0.9);
//   background-color : rgba(15, 122, 64, 0.9);
//   color : rgba(255,255,255);

//   &:hover {
//     cursor:pointer;
//   }
// `

// const Button2 = styled.button`
//   width : 50px;
//   margin-left : 5px;
//   margin-right : 5px;
//   height : 25px;

//   border-radius: 4px;
//   font-size : 15px;
//   outline: 0;
//   border: 0px solid rgba(15, 122, 64, 0.9);
//   background-color : rgba(15, 122, 64, 0.9);
//   color : rgba(255,255,255);

//   &:hover {
//     cursor:pointer;
//   }
// `





