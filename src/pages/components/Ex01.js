import React, { useState } from 'react';

const Ex01 = () => {

    //1. state 변수 생성
    //변수명 : board , board의 값을 바꾸는 메소드 : setBoard
    const[board,setBoard] = useState(
        { no : 1, title : '게시글1', content : '내용2', writer:'가나다', hit:1, regdate:'2024-09-06'}
    );

    const [ list, setList] = useState(
        [
            { no : 1, title : '게시글3', content : '내용2', writer:'가나다', hit:1, regdate:'2024-09-06'},
            { no : 2, title : '게시글1', content : '내용2', writer:'가나다', hit:1, regdate:'2024-09-06'},
            { no : 3, title : '게시글1', content : '내용2', writer:'가나다', hit:1, regdate:'2024-09-06'}
        ]

    );

    //2.함수 생성
    const changeTitle=() =>{

        setBoard({...board, title:'변경글2'}); //...board(전개연산자) : 위의 board내용이 그대로 들고와짐
    }

    return (
        <div>
            <h3>Ex01 실습</h3>
            { board.no }<br/>
            { board.title }<br/>
            { board.content }<br/>
            { board.writer }<br/>
            { board.hit }<br/>
            { board.regdate }<br/>
            <button onClick={changeTitle}>제목바꾸기</button>
            <hr/>
            <table>
                <tbody>
                    {
                        list.map(obj=> (
                            <tr>
                                <td>{obj.no}</td>
                                <td>{obj.title}</td>
                                <td>{obj.content}</td>
                                <td>{obj.writer}</td>
                                <td>{obj.hit}</td>
                                <td>{obj.regdate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Ex01;