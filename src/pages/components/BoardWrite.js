import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
    const navigate = useNavigate();
    //여기가 javascript 구현 위치
    //script를 통해 spring boot와 데이터를 주고 받을 수 있음

    //state 변수 [변수명 , 값을 변경 시킬수 있는 메소드명]
    //상태변수에 값을 넣어야 밑에 html에 출력되는 값이 바뀐다.
    const [title, setTitle] = useState('a1');           //제목 보관
    const [content, setContent] = useState('b1');       //내용 보관
    const [writer, setWriter] = useState('c1');         //작성자 보관
    const [imgurl, setImgurl] = useState('logo512.png');//첨부한 이미지표시(x)
    const [imgdata,setImgdata] = useState();
    
    //함수 만들기
    const ChangeTitle = (e) =>{
        console.log(e);
        setTitle(e.target.value);
    }

    const ChangeContent = (e) =>{
        setContent(e.target.value);
    }

    const ChangeWriter = (e) => {
        setWriter(e.target.value);
    }

    const sendData = async(e) => {
        e.preventDefault(); //form의 새로고침 기능 방지(refresh >화면빤짝거림 방지)

        //body에 있는 값을 전송함
        const url = `/ROOT/api/freeboard1/insert.json`;
        const headers = {"Content-Type" :"multipart/form-data"} //파일 있는경우
        const body =new FormData();

        body.append("title",title);
        body.append("content",content);
        body.append("writer",writer);
        body.append("file",imgdata);

        const{data} = await axios.post(url , body , {headers});
        if(data.status ===200) {
            alert('글쓰기 완료');
            navigate(`/board`); //목록으로 이동
        }
    }

    const changeImage = (e) => {
        console.log(e);

        //파일 첨부 됐을 때
        if(e.target.files.length>0){
            setImgurl(URL.createObjectURL(e.target.files[0]));
            setImgdata(e.target.files[0]);
        }else{
            setImgurl('logo512.png');
            setImgdata(null);
        }
    }
    //html 위치
    return (
        <div>
            <form onSubmit={sendData}>
                <h3>게시판 글쓰기</h3>
                <input type="text" value={title} onChange={ ChangeTitle }/>
                <input type="text" value={content}  onChange={ ChangeContent }/>
                <input type="text" value={writer}  onChange={ ChangeWriter }/>
                <img src={imgurl} style={{width:'50px', height : '50px'}}/>
                <input type="file" onChange={changeImage} />
                <button onClick={sendData}>글쓰기</button>
            </form>
        </div>
    );
};

export default BoardWrite;