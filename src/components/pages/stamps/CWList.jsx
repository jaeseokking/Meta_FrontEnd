import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from 'axios';
import PageButtons from './PageButtons';
import Calendar from './Calendar';
import * as config from '../../../config';


const CWList = () => {
  const [shop_bizno, setShop_Bizno] = useState(sessionStorage.getItem('SHOP_BIZNO'));
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [selectUse, setSelectUse] = useState('all');


  useEffect(() => {
    
      setShop_Bizno(sessionStorage.getItem('SHOP_BIZNO'));
   
  }, [])
  




  useEffect(() => {
    axios.post(`${config.SERVER_URL}/api/board`, {
      shop_bizno : shop_bizno,
      page : page,
      startDate : startDate,
      endDate : endDate,
      selectUse : selectUse
    }).then(response => {
      setList(response.data)
    })
  }, [])

  useEffect(() => {
    axios.post(`${config.SERVER_URL}/api/board`, {
      shop_bizno : shop_bizno,
      page : page,
      startDate : startDate,
      endDate : endDate,
      selectUse : selectUse 
    }).then(response => {
      setList(response.data)
    })
  }, [shop_bizno, page, startDate, endDate, selectUse])




    return (
      <Wrapper>
        <Form>
        <SearchForm>
          <Calendar startDate={setStartDate} endDate={setEndDate} currentPage={setPage} selectUse={setSelectUse}/>     
        </SearchForm>
        {
          list.length > 0 ?
        <Table>
          <thead>
            <tr>
              <th scope="col">발행번호</th>
              <th scope="col">발행일자</th>
              <th scope="col">금액</th>
              <th scope="col">사용일자</th>
              <th scope="col">사용유무</th>
            </tr>
          </thead>
          <tbody>
          {list.length > 0 && list.map((value) => (
            <tr key={value.SEQ}>
              <td key={value.SEQ}>{value.SEQ}</td>
              <td>{value.FRT_CREA_DTM}</td>
              <td>{value.SALES_TOT_AMT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td>{value.CARWASHUSETIME}</td>    
              <td style={{width : 58}}><div><div style={{background : value.CARWASHYN === "N" ? 'rgba(28, 200, 93, 1)' : '#d12', color : '#fff' , width : 20}}>{value.CARWASHYN}</div></div></td>
            </tr>  
          ))        
          }   
          </tbody> 
        </Table>
        :
        <NotData>
          <div>검색된 데이터가 없습니다.</div>
        </NotData>

        }
        
          <PageButtons shop_bizno={shop_bizno}  currentPage={setPage} startDate={startDate} endDate={endDate} selectUse={selectUse}/>
        </Form>
      </Wrapper>
    );
};

export default CWList;


const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background : '#123123';
  flex-direction : column;
  
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 0px 8px 5px rgba(0, 0, 0, 0.1);
  padding : 20px;
  border-radius: 5px;

`;

const NotData = styled.div `
margin-top : 10px;
  border-collapse: collapse;
  width : 700px;
  margin-bottom : 10px;
  overflow: hidden;
  border-radius: 15px;
  align-items : center;



  div {
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius : 100px;
    font-weight: bold;

  }
`

const Table = styled.table`
  margin-top : 10px;
  border-collapse: collapse;
  width : 700px;
  margin-bottom : 10px;
  overflow: hidden;
  border-radius: 15px;
  align-items : center;



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
    border : 2px solid rgb(255, 255, 255);

  }

  th {
    color: rgb(255, 255, 255);
    background-color: rgba(28, 200, 93, 1);

  }

  td {
    padding: 10px;
    background-color: rgb(240, 240, 240);
  }
`





  const SearchForm = styled.div`
    display : flex;
    justify-content: center;
    align-items: center;
    align-self : flex-end;

  `
