import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import axios from 'axios';
import * as config from '../../../config';
import {format} from 'date-fns';
import { useNavigate } from 'react-router';
import Spinner from 'react-spinkit';


const StampDetail = ({loginCallBack}) => {

    const [loading, setLoading] = useState(false);
    
    
    const navigate = useNavigate();

    let getParameter = (key) => {
        return new URLSearchParams(window.location.search).get(key);
    }

    const [seq, setSEQ] = useState('');
    const [stampCode, setStampCode] = useState('');
    const [compDTM, setCompDTM] = useState('');
    const [endDTM, setEndDTM] = useState('');
    const [useYN, setUseYN] = useState('');
    const [userKey, setUserKey] = useState('');

    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
      const seq = getParameter('seq');
      const stampCode = getParameter('stampcode');
      const stampType = getParameter('type');
      if(seq ===null || seq ==='' || stampCode ===null || stampCode ==='' || stampType ==='' || stampType ===null || !(stampType ==='rs' || stampType === 'ms')){
        alert('잘못된 URL 경로입니다.');
        navigate('/stamp/list')
      }

      axios.post(`${config.SERVER_URL}/api/stamp/detail`, {
        SEQ : seq,
        STAMP_CODE :  stampCode,
        STAMP_TYPE : stampType
      }).then(response => {

        if(response.data.result === 'NO DATA'){
          alert('접근권한이 없거나 없는 데이터입니다.');
          navigate('/stamp/list')
        }
        if(response.data.result === 'SUCCESS'){
          const detail = response.data.stampDetail;
          setSEQ(detail.SEQ);
          setStampCode(detail.STAMP_CODE);
          setCompDTM(format(detail.STAMP_COMP_DTM, 'yyyy-MM-dd HH:mm'));
          if(detail.STAMP_END_DTM != null){
            setEndDTM(format(detail.STAMP_END_DTM, 'yyyy-MM-dd'));
          }else{
          
          }
          setUseYN(detail.STAMP_USE_YN);
          setUserKey(detail.USER_KEY ? detail.USER_KEY : detail.USER_PHONE);
          console.log(useYN);
          setLoading(true);
        }else{
          navigate('/login');
        }
        
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkUse = (e) => {
      setUseYN(e.target.value);
    }

    const updateStamp = () => {
      axios.post(`${config.SERVER_URL}/api/stamp/update`, {
        SEQ : seq,
        STAMP_CODE : stampCode,
        STAMP_USE_YN : useYN

      }).then(response => {
        console.log(response);
        const status = response.data.result;
        if(status === 'SUCCESS'){
          alert('수정완료')
          window.location.reload();
        }else{
          alert('수정실패')
          window.location.reload();
        }
      })

    }


    if(loading === true){
      return (
        <Wrapper>
            <Form>
               <Title>스탬프 조회 및 수정</Title>
               <Contents>
                <Table>
                     <tbody>
                        <tr>
                          <th>발행번호</th>
                          <td>{seq}</td>
                        </tr>
                        <tr>
                          <th>사용자</th>
                          <td>{userKey}</td>
                        </tr>
                        <tr>
                          <th>발행일자</th>
                          <td>{compDTM}</td>
                        </tr>
                        <tr>
                          <th>만료일자</th>
                          <td>{endDTM}</td>
                        </tr>
                        <tr>
                          <th>사용여부</th>
                          <td>
                              사용<input type="radio" name="use_yn" value="Y" checked={useYN === 'Y'} onChange={(e) => checkUse(e)}/> 
                              &nbsp;&nbsp;&nbsp; 미사용<input type="radio" name="use_yn" value="N" checked={useYN === 'N'} onChange={(e) => checkUse(e)}/>
                          </td>
                        </tr>
            
                        <tr>
                          <td colSpan={3} style={{textAlign : 'right'}}>
                            <Button style={{backgroundColor : '#714DDA' }} onClick={() => updateStamp()}>수정</Button>
                            <Button style={{ backgroundColor : 'rgba(150, 150, 150, 0.9)', marginRight : '30px'}} onClick={()=> navigate('/stamp/list')}>확인</Button>
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

export default StampDetail;

const Wrapper = styled.div`
  font-family: 'SCDream';
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width : 100%;
  padding-left: 50px;
  padding-top : 50px;


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
  margin : 30px 30px 0px 30px;
  display : flex;
  flex-direction: column;
  border-radius: 5px;
 
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

  tr:last-child td:last-child{
    border-bottom : 0;
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