import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Menu1 = () => {

    //0.상수   
    const {token} = useSelector((state) => state.LoginReducer);

    //1.상태변수
    const [member, setMember] = useState({
        name : '',
        phone : '',
        age : 0,
    });

    //2.생명주기
    useEffect(() =>{
        handleMember();
    } , []);

    //3.함수들
    const handleMember = async() => {
        const url = `/ROOT/api/member1/selectone.json`;
        const headers = {"Content-Type" : "application/json", "token" : token};
        const {data} = await axios.get(url , {headers});
        console.log(data);
        if(data.status ===200 ){
            setMember(data.result);
        }
    };

    const handleChangeMember = async(e) => {
        e.preventDefault(); //form 에서 refresh(반짝거림) 방지
        
        const url = `/ROOT/api/member1/update.json`;
        const headers = {"Content-Type" : "application/json" , "token" : token};
        const body = { "name" : member.name , "phone" : member.phone , "age" :member.age};
        const {data} = await axios.put(url , body , {headers});
        console.log(data);
        if(data.status === 200){
            alert('정보가 변경되었습니다.');
        }
    }
    //4.렌더링 화면
    return (
        <div>
            <h3>정보변경</h3>
            <form onSubmit={handleChangeMember}>
                <input type="text" value={member.id} readOnly/>
                <input type="text" value={member.name} onChange={(e) => setMember({...member,name : e.target.value})}/>
                <input type="text" value={member.phone} onChange={(e) => setMember({...member,phone : e.target.value})}/>
                <input type="number" value={member.age} onChange={(e) => setMember({...member,age : Number( e.target.value)})}/>
                <button type="submit">정보변경</button>
            </form>
        </div>
    );
};

export default Menu1;