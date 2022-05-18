import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../utils/RefreshToken';
import Calendar from '../list/Calendar';

const NoticeList = ({loginCallBack}) => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [selectUse, setSelectUse] = useState('all');

    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
    },[]);

    return (
        <Wrapper>
            <Form>
               <Title>공지사항</Title>
               <Contents>
                {/* <SearchForm>
                        <Calendar startDate={setStartDate} endDate={setEndDate} currentPage={setPage} selectUse={setSelectUse}/>     
                </SearchForm> */}
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
                    <tr>
                        <td>1</td>
                        <td>2022-01-22</td>
                        <td>10,000</td>
                        <td>2022-01-23 10:00</td>    
                        <td><div><div style={{background : 'rgba(1, 78, 136, 0.9)', color : '#fff' , width : 20}}>N</div></div></td>
                    </tr>  
                    <tr>
                        <td>1</td>
                        <td>2022-01-22</td>
                        <td>10,000</td>
                        <td>2022-01-23 10:00</td>    
                        <td><div><div style={{background : 'rgba(1, 78, 136, 0.9)', color : '#fff' , width : 20}}>N</div></div></td>
                    </tr>  
                    <tr>
                        <td>1</td>
                        <td>2022-01-22</td>
                        <td>10,000</td>
                        <td>2022-01-23 10:00</td>    
                        <td><div><div style={{background : 'rgba(1, 78, 136, 0.9)', color : '#fff' , width : 20}}>N</div></div></td>
                    </tr>  
                    <tr>
                        <td>1</td>
                        <td>2022-01-22</td>
                        <td>10,000</td>
                        <td>2022-01-23 10:00</td>    
                        <td><div><div style={{background : 'rgba(1, 78, 136, 0.9)', color : '#fff' , width : 20}}>N</div></div></td>
                    </tr>  
                    <tr>
                        <td>1</td>
                        <td>2022-01-22</td>
                        <td>10,000</td>
                        <td>2022-01-23 10:00</td>    
                        <td><div><div style={{background : 'rgba(1, 78, 136, 0.9)', color : '#fff' , width : 20}}>N</div></div></td>
                    </tr>   
                </tbody>
                </Table>
               </Contents>
            </Form>
        </Wrapper>
    );
};

export default NoticeList;

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