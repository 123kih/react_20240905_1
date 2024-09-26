import { Button, Col, Input, Row } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    //0.변수
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //1.state 변수
    const [id, setId] = useState('c1');
    const [pw, setPw] = useState('c1');

    //2.함수 생성
    const handleLogin =async() => {
        const url =`/ROOT/api/member1/login.json`;
        const headers={"Content-Type" : "application/json"};
        const body={id : id , pw : pw}
        const {data} =await axios.post(url, body, {headers});
        console.log(data);

        if(data.status == 200){
            dispatch({type:'login', token:data.result});
            alert('로그인 성공')
            navigate(`/`);
        }
        else{
            alert('로그인 실패')
        }
    };

    return (
        <div>
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <h3> 로그인</h3>
            <Input size="large" value={id} onChange={(e) => {setId(e.target.value)}} placeholder='아이디'/>
            <Input size="large" value={pw} onChange={(e) => {setPw(e.target.value)}} placeholder='비밀번호'/>
            <Button type='primary' onClick={handleLogin}>로그인</Button>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    );

};

export default Login;