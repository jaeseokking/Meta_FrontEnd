import React, {useRef, useState} from 'react';
import { CSVLink } from "react-csv";
import styled from "styled-components";
import axios from 'axios'
import * as config from '../../../config'


const headers = [
    {label : "발행번호" , key : "SEQ"},
    {label : "발행날짜", key : "FRT_CREA_DTM"},
    {label : "금액", key : "SALES_TOT_AMT"},
    {label : "사용날짜", key : "CARWASHUSETIME"},
    {label : "사용유무", key : "CARWASHYN"},
]
 





function ExcelDownload({startDate, endDate, selectUse}) {  
    const shop_bizno = sessionStorage.getItem('SHOP_BIZNO');

    var csvLink = useRef();
    var [excelList, setExcelList] = useState([]);

    async function ExcelList(e){

        e.preventDefault()
        await axios.post(`${config.SERVER_URL}/api/exellist`, {
            shop_bizno : shop_bizno,
            startDate : startDate,
            endDate : endDate,
            selectUse : selectUse      
        },{ 
            "headers": {
                "content-type" : "application/json"
            }
        }
        ).then(response => {
           
            setExcelList(response.data)

        }).then(() => {
            setTimeout(() => {
                csvLink.current.link.click();
            }, 1000)

        })

       

    }

    return (
        <>
        <Button onClick={(e) =>  ExcelList(e)}>Export Excel</Button>
            <CSVLink 
            headers={headers} 
            data={excelList} 
            filename= { startDate !== 0 ? `CW${startDate}_${endDate}.csv` : "CWtotal.csv"} 
            target="_blank"
            ref={csvLink}
            >
            </CSVLink>
       
        </>
    );
}

export default ExcelDownload;

const Button = styled.button`
  width : 50px;
  margin-left : 2px;
  margin-right : 5px;
  height : 25px;

  border-radius: 4px;
  font-size : 10px;
  outline: 0;
  border: 0px solid rgba(15, 122, 64, 0.9);
  background-color : rgba(15, 122, 64, 0.9);
  color : rgba(255,255,255);
  
  div {
    text-decoration: none;
  }

  &:hover {
    cursor:pointer;
  }
`