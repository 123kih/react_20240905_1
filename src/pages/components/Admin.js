import React, { useState } from 'react';
import AdminMenu1 from './AdminMenu1';
import AdminMenu2 from './AdminMenu2';
import AdminMenu3 from './AdminMenu3';
import { Button } from 'antd';

const Admin = () => {
    //1. 상태변수 menu = 1 
    const [menu, setMenu] = useState(1);

    //2.메뉴번호를 바꿀 함수 생성
    const changeMenu= (no) => {
        setMenu(no);
    }

    //3. AdminMenu1.js 에서 호출할 메소드
    const childToParent = (data) => {
        console.log(data);
        alert('childToParent 호출됨');
    }
    return (
        <div>
            <Button type="dashed">primary button</Button>
            <button onClick={ () => changeMenu(1) } >메뉴1표시</button>
            <button onClick={ () => changeMenu(2) }>메뉴2표시</button>
            <button onClick={ () => changeMenu(3) }>메뉴3표시</button>
            <hr/>
            {menu ===1 && <AdminMenu1 title="제목1" childToParent={childToParent}/>}
            {menu ===2 && <AdminMenu2 />}
            {menu ===3 && <AdminMenu3 />}
        </div>
    );
};

export default Admin;