import { Button, Col, Input, InputNumber, Row } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

const Join = () => {

    //1. state 변수
    const [ member , setMember] = useState({
        id    : 'c2',
        pw    : 'c2',
        name  : 'c2',
        phone : '010-0000-0000',
        age   : 1
    });

    //2. 함수 생성
    const changeAge =(value) =>{
        setMember({...member, age:value});
    }

    const handleJoin = async() =>{
        const url=`/ROOT/api/member1/join.json`;
        //파일첨부 아니면 항상 application/json => @RequestBody로 받을 수 있음
        const headers = {"Content-Type" : "application/json"};
        const body={
            id    : member.id , 
            pw    :member.pw , 
            name  :member.name ,
            phone : member.phone ,
            age   : Number(member.age)
        }
        const {data} = await axios.post(url,body,{headers});
        console.log(data);
        if(data.status===200){
            alert('회원가입 성공')
        }
        else{
            alert('회원가입 실패')
        }
    }
    return (
        <div>
            
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <h3> 회원가입</h3>
                    <Input size="large" value={member.id} onChange={(e) =>{setMember({...member, id:e.target.value})}} placeholder="아이디" />
                    <Input.Password size="large" value={member.pw} onChange={(e) =>{setMember({...member, pw:e.target.value})}} placeholder="패스워드" />
                    <Input size="large" value={member.name} onChange={(e) =>{setMember({...member, name:e.target.value})}} placeholder="이름" />
                    <Input size="large" value={member.phone} onChange={(e) =>{setMember({...member, phone:e.target.value})}} placeholder="연락처" />
                    <span>나이 : </span><InputNumber value={member.age} min={1} max={140} onChange={changeAge}/>
                    <div>
                        <Button type="primary" onClick={handleJoin}>회원가입</Button>
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    );
};

export default Join;