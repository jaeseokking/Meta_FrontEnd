import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../utils/RefreshToken';
import Calendar from '../list/Calendar';
import axios from 'axios';
import PageButtons from './PageButtons';
import * as config from '../../../config';
import {format} from 'date-fns';
import { useNavigate } from 'react-router';


const StampList = ({loginCallBack}) => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [selectUse, setSelectUse] = useState('all');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
    },[]);

    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
    },[page, startDate, endDate, selectUse]);



    useEffect(() => {
      axios.post(`${config.SERVER_URL}/api/stamp/board`, {
        page : page,
        startDate : startDate,
        endDate : endDate,
        selectUse : selectUse
      }).then(response => {
        console.log('DATA' , response.data);
        setList(response.data.stampList)
        setLoading(true);
      })
    }, [])
  
    useEffect(() => {
      axios.post(`${config.SERVER_URL}/api/stamp/board`, {
        page : page,
        startDate : startDate,
        endDate : endDate,
        selectUse : selectUse 
      }).then(response => {
        setList(response.data.stampList)
        setLoading(true);

      })
    }, [page, startDate, endDate, selectUse])
  

    if(loading === true){
      return (
        <Wrapper>
            <Form>
               <Title>스탬프 조회</Title>
               <Contents>
                <SearchForm>
                        <Calendar startDate={setStartDate} endDate={setEndDate} currentPage={setPage} selectUse={setSelectUse}/>     
                </SearchForm>
                <Table>
                <thead>
                    <tr>
                    <th>발행번호</th>
                    <th scope="col">스탬프 코드</th>
                    <th scope="col">발행일자</th>
                    <th scope="col">유효일자</th>
                    <th scope="col">스탬프 개수</th>
                    <th scope="col">사용유무</th>
                    </tr>
                </thead>
                <tbody>
                {list.length > 0 && list.map((value, index) => {
                    const COMP_DTM = new Date(value.STAMP_COMP_DTM);
                    const END_CTM = new Date(value.STAMP_END_DTM);
                    return(
                    <tr key={value.SEQ} onClick={() => navigate({ pathname : `/stamp/detail?seq=${value.SEQ}&stampcode=${value.STAMP_CODE}`})}>
                      <td>{value.SEQ}</td>
                      <td>{value.STAMP_CODE}</td>
                      <td>{format(COMP_DTM, 'yyyy-MM-dd HH:mm')}</td>
                      <td>{format(END_CTM, 'yyyy-MM-dd')}</td>
                      <td>{value.STAMP_CNT}</td>
                      <td style={{width : 58}}><div><div style={{background : value.STAMP_USE_YN === "N" ? 'rgba(28, 200, 93, 1)' : '#d12', color : '#fff' , width : 20}}>{value.STAMP_USE_YN}</div></div></td>
                    </tr> 
                    );
                  })}
                </tbody>
                </Table>
                <PageButtons currentPage={setPage} startDate={startDate} endDate={endDate} selectUse={selectUse}/>
               </Contents>
            </Form>
        </Wrapper>
      );
    }else{
      return (
        <div>
          loading.....
        </div>
      )
    }

};

export default StampList;

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

  width : 80%;

  @media screen and (max-width: 767px){
    width : 95%;
  }
`

const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  font-weight: 800;

`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
  flex-direction: column;
 
`

const Input = styled.input`
   height : 20px;
   text-align: end;
`


const SearchForm = styled.div`
    display : flex;
    align-items: center;
    align-self : end;
    justify-content: center;
    width : '100%';
  
    @media screen and (max-width: 767px){
        display: inline-block;
        align-items: center;
        align-self : end;
        justify-content: flex-end;
    }

`



const Table = styled.table`
  margin-top : 10px;
  border-collapse: collapse;
  margin-bottom : 10px;
  overflow: hidden;
  border-radius: 15px;
  align-items : center;
  width : 100%;


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
    font-size: 13px;

  }

  th {
    color: rgb(255, 255, 255);
    background-color: rgba(1, 78, 136, 0.9);;

  }

  td {
    padding: 7px;
    background-color: rgb(240, 240, 240);
  }
`