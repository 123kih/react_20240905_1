import { Pagination, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Board = () => {

    // 0. 상수(readonly)
    const navigate = useNavigate(); //페이지 전환


    const columns = [
        { title: '번호', dataIndex: 'no', key: 'no' },
        { title: '제목', dataIndex: 'title', key: 'title' },
        { title: '작성자', dataIndex: 'writer', key: 'writer' },
        { title: '조회수', dataIndex: 'hit', key: 'hit' },
        { title: '날짜', dataIndex: 'regdate', key: 'regdate' }
        ];

    //1.상태변수 (read, wrtie)=> 백엔드에서 데이터를 받아서 보관하는 의미
    const [ list, setList ] =useState([ ]); //게시글 목록
    const [ text, setText ] = useState(''); //검색어
    const [ page, setPage] = useState(1);   //현재페이지
    const [pages , setPages] = useState(1); //전체페이지 개수

    //2.useEffect 컴포넌트 구동시 자동 실행
    useEffect(() => {
        handleData();
    }, [page , text]); //[page,text] page 또는 text의 값이 바뀔때 마다 동작하는 Effect

    //3. 함수들 ...
    const handleData = async() => {
        const url = `/ROOT/api/freeboard1/selectlist.json?page=${page}&text=${text}`;
        const headers = {"Content-Type" : "application/json"};
        const{data} = await axios.get(url,{headers});
        console.log(data)
        if(data.status===200){
            setList(data.result);
            setPages(data.total);
        }
    };

    const onChange = (page, _) => {
        console.log(page);
        setPage(page); // 상태변수 변경 => effect동작 => handleData 호출
    };

    const changeText = (e) => {
        console.log(e.target.value);
        setText(e.target.value);  //상태변수 text가 바뀜 => efeect동작 => handleData 호출
    }

    const onRow = (record,_) => {
        return{
            onClick:()=>{
                console.log(record.no);
                navigate(`/boardcontent/` + record.no);
            }
        }
    }
    return (
        <div>
            <h3>게시판</h3>
            <input type="text" placeholder='검색어' onChange={changeText} />
            <Table dataSource={list} columns={columns} rowKey="no" pagination={false} size="small" onRow={onRow}/>
            <div style={{"marginTop" : "20px"}}>
                <Pagination defaultCurrent={1} total={pages} align="center" onChange={onChange}/>
            </div>
        </div>
    );
};

export default Board;