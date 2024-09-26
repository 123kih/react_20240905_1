import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //컴포넌트 실행시 자동으로 실행됨
    useEffect(()=>{
        if(window.confirm('로그아웃할까요?')){
            dispatch({type:'logout'});
            navigate(`/`)
        }else{
            navigate(`/`);
        }
    }, []);


    return (
        <div>

        </div>
    );
};

export default Logout;