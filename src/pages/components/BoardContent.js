import { Button, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const BoardContent = () => {

    //0. 상수

    const headers = { "Content-Type": "application/json" };
    //<Route path="/boardcontent/:no" element={<BoardContent />} />
    const param = useParams();
    console.log(param.no); //위의 경로 :no와 param.no의 이름이 같아야 함.
    const no = param.no;

    //1. 상태변수
    const [row, setRow] = useState({}); // {   }
    const [reply, setReply] = useState([]); // [ {}, {} ]
    const [obj, setObj] = useState({
        content: '',
        writer: '',
        bno: { no: no }
    });
    const [chk, setChk] = useState(false); // useEffect를 호출하기 위한 변수

    //2. 생명 주기
    useEffect(() => {
        //데이터를 받는 순서는 보장 안됨. 위에 것부터 순서대로 뜨지 않음
        handleDataOne();
        handleDataReply();
    }, [no, chk]);

    //3. 함수들
    const handleDataOne = async () => {
        const url = `/ROOT/api/freeboard1/selectone.json?no=${no}`;
        const { data } = await axios.get(url, { headers });
        console.log(data);
        if (data.status === 200) {
            setRow(data.result);
        }
    };

    const handleDataReply = async () => {
        const url = `/ROOT/api/freeboardreply1/selectlist.json?bno=${no}`;
        const { data } = await axios.get(url, { headers });
        console.log(data);
        if (data.status === 200) {
            setReply(data.result);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const url = `/ROOT/api/freeboardreply1/insert.json`;
        const { data } = await axios.post(url, obj, { headers });
        console.log(data);
        if (data.status === 200) {
            alert('답글 등록 완료');
            setChk(!chk);
            setObj({ ...obj, content: '', writer: '' }); //입력창 초기화
        }
    };

    const handleDelete = async (rno) => {
        if (window.confirm('삭제하시겠습니까?')) {
            const url = `/ROOT/api/freeboardreply1/delete.json`;
            const { data } = await axios.delete(url, { headers: headers, data: { no: rno } });
            if (data.status === 200) {
                alert('답글이 삭제되었습니다.');
                setChk(!chk);
            }
        }
    };

    //4. 화면 랜더링
    return (
        <div>
            <h3>게시글 상세화면</h3>
            <Link to={`/board`}><Button>목록으로</Button></Link><br />
            <Button>변경</Button>
            <Button>삭제</Button>
            <Button>이전글</Button>
            <Button>다음글</Button>
            <hr />
            <p>{row.no}</p>
            <p>{row.title}</p>
            <p>{row.content}</p>
            <p>{row.writer}</p>
            <p>{row.hit}</p>
            <p>{row.regdate}</p>
            <hr />

            <form onSubmit={onSubmit}>
                <Input type="text" value={obj.content}
                    onChange={(e) => { setObj({ ...obj, content: e.target.value }) }} placeholder="답글 내용" />
                <Input type="text" value={obj.writer}
                    onChange={(e) => { setObj({ ...obj, writer: e.target.value }) }} placeholder="답글 작성자" />
                <br />
                <Button htmlType="submit">답글 작성</Button>
            </form>
            <table>
                <tbody>
                    {
                        reply.map((item) => (
                            <tr key={item.no}>
                                <td>{item.no}</td>
                                <td>{item.content}</td>
                                <td>{item.writer}</td>
                                <td>{item.regdate}</td>
                                <td><Button onClick={() => handleDelete(item.no)}>삭제</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default BoardContent;