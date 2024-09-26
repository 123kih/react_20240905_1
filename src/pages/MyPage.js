import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MyPage = () => {
    return (
        <div>
            <h3>마이페이지</h3>
            <Link to ={`/mypage/menu1`}><button>정보변경</button></Link>
            <Link to ={`/mypage/menu2`}><button>암호변경</button></Link>
            <Link to ={`/mypage/menu3`}><button>회원탈퇴</button></Link>
            
            <Outlet/>
        </div>
    );
};

export default MyPage;