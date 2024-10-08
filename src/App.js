import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/components/Home';
import Board from './pages/components/Board';
import Item from './pages/components/Item';
import BoardWrite from './pages/components/BoardWrite';
import Ex01 from './pages/components/Ex01';
import Ex02 from './pages/components/Ex02';
import Admin from './pages/components/Admin';
import Login from './pages/components/Login';
import Join from './pages/components/Join';
import { useSelector } from 'react-redux';
import Logout from './pages/components/Logout';
import BoardContent from './pages/components/BoardContent';
import './App.css';
import MyPage from './pages/MyPage';
import Menu3 from './pages/mypage/Menu3';
import Menu2 from './pages/mypage/Menu2';
import Menu1 from './pages/mypage/Menu1';
import Menu4 from './pages/mypage/Menu4';

const App = () => {

  //redux에서 상태변수 가져오기
  const{ logged ,token} = useSelector((state) => state.LoginReducer);
  console.log(logged , token);

  return (
    <div>
      
      <div className='App'>
        <Link to="/"><button>홈</button></Link>
        <Link to="/board"><button>게시판</button></Link>
        <Link to="/item"><button>물품</button></Link>
        <Link to="/boardwrite"><button>게시판글쓰기</button></Link>
        <Link to="/admin"><button>관리자메뉴</button></Link>
        {logged === false && <Link to="/login"><button>로그인</button></Link>}
        {logged === false && <Link to="/join"><button>회원가입</button></Link>}
        {logged === true && <Link to="/logout"><button>로그아웃</button></Link>}
        {logged === true && <Link to="/mypage/menu1"><button>마이페이지</button></Link>}
      </div>
      <hr/>

      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/board" element={<Board />}/>
          <Route path="/item" element={<Item />}/>
          <Route path="/boardwrite" element={<BoardWrite />}/>
          <Route path="/ex01" element={<Ex01 />}/>
          <Route path="/ex02" element={<Ex02 />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/join" element={<Join />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/boardcontent/:no" element={<BoardContent />}/>
          
          <Route path="/mypage" element={logged ===true ? <MyPage/> : <Navigate to ='/login' />}>
            <Route path="menu1" element={<Menu1 />} />
            <Route path="menu2" element={<Menu2 />} />
            <Route path="menu3" element={<Menu3 />} />
            <Route path="menu4" element={<Menu4 />} />
          </Route>
        </Routes>
      </div>

      
    </div>
  );
};

export default App;