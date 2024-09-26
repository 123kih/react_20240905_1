import React from 'react';

const AdminMenu1 = (props) => {

    console.log(props);

    return (
        <div>
            관리자메뉴1
            {props.title}
            <button onClick={ () => { props.childToParent( {no : 1 } )}}>부모함수호출</button>
        </div>
    );
};

export default AdminMenu1;