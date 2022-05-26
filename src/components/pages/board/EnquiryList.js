import axios from 'axios';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import * as config from '../../../config';
import PageButtons from '../../utils/PageButtons';
import { useNavigate } from 'react-router';
import {format} from 'date-fns';
import Spinner from 'react-spinkit';

const EnquiryList = ({loginCallBack}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [selectUse, setSelectUse] = useState('all');
    const [loading, setLoading] = useState(false);

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
      axios.post(`${config.SERVER_URL}/api/enquiry/board`, {
        page : page,
        startDate : startDate,
        endDate : endDate,
        selectUse : selectUse,
      }).then(response => {
        console.log('DATA' , response.data);
        setList(response.data.enquiryList)
        setLoading(true);
      })
    }, [])

    useEffect(() => {
      axios.post(`${config.SERVER_URL}/api/enquiry/board`, {
        page : page,
        startDate : startDate,
        endDate : endDate,
        selectUse : selectUse,
      }).then(response => {
        console.log('DATA' , response.data);
        setList(response.data.enquiryList)
        setLoading(true);
      })
    },[page, startDate, endDate, selectUse]);

    const goDetail = (idx) =>{
      navigate({ pathname : `/enquiry/detail?idx=${idx}`});
    }


    if(loading === true){
      return (
        <Wrapper>
            <Form>
             <TitleContainer>
                 <div className="title">문의내역</div>
              </TitleContainer>
               
               {list !== undefined && list.length > 0 ? 
                  <Contents>
                  <Table>
    
                     <tbody>
                      {list.map((value, index) => {
                        return(
                          <tr key={value.IDX} onClick={() => goDetail(value.IDX)}>
                            <th>{value.TITLE}</th>
                            <td>{value.DATE != null ? format(value.DATE, 'yyyy-MM-dd') : 'YYYY-MM-DD'}</td>
                          </tr> 
                        ) ;
                      })}
                     </tbody>
                    
                  </Table>
                  <div style={{textAlign : 'right'}}>
                      <Button onClick={() => navigate('/enquiry/write')}>문의글 작성</Button>
                     </div>
                  <PageButtons currentPage={setPage} startDate={startDate} endDate={endDate} selectUse={selectUse} what={'enquiry'}/>
                  </Contents>
                  : 
                  <Contents style={{textAlign : 'center'}}>
                    <div style={{width : '100%', margin : '10px'}}>문의내역이 존재하지 않습니다.</div>
                  </Contents>
                }
               
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

export default EnquiryList;

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

  width : 80%;

  @media screen and (max-width: 767px){
    width : 95%;
  }
`

const TitleContainer = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  font-weight: 800;
  border-bottom : 2px solid rgb(230,230,230);

  .title {
    margin : 20px 20px 10px 20px;
  }

`

const Contents = styled.div`
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
  border-collapse: collapse;
  align-items : center;
  margin : 0px 20px 5px 20px;


  div {
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius : 100px;
    font-weight: bold;

  }

  th, td{
    padding : 10px;
    border-bottom : 1px solid rgb(200, 200, 200);
    height : 30px;

    @media screen and (max-width: 767px){
      padding : 5px;
    }

  }


  th {
    text-align: left;
    font-size: 15px;
    font-weight: 600;

  }

  td {
    text-align: right;
    font-size: 12px;
    font-weight: 400;

  }
  tr{
    transition: 0.5s;
    cursor :pointer;

  }
  tr:hover{
    background-color : rgb(240,240,240);
  }
`


const Button = styled.button`
  margin-right : 20px;
  border : 0;
  border-radius : 3px;
  background-color: rgba(30, 108, 166, 0.9);
  color : white;
  font-size : 14px;
  padding : 3px 5px 3px 5px;
  font-weight : 600;
  transition: 0.5s;
  :hover {
   background-color : rgba(1, 78, 136, 0.9);
  }
  cursor: pointer;
`

