import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    //1. state 변수
    const[list, setList] = useState([]);

    //2. 함수생성
    const handleList = async() => {
        const url = `/ROOT/api/home1/itemlist.do`;
        const headers= {"Content-Type ": "application/json"};

        const {data} = await axios.get(url,{headers});
        console.log(data);

        if(data.status ===200){
            setList(data.result);
        }
    }

    //3. 생명주기
    useEffect(() => {
        handleList();
    },[]);

    return (
        <div>
            <h3>홈화면</h3>
            <table>
                <tbody>
                    {
                        list.map(obj => (
                            <tr key={obj.no}>
                                <td><img src={obj.imageurl} style={{width:'50px',height:'50px'}}/></td>
                                <td>{obj.no}</td>
                                <td>{obj.name}</td>
                                <td>{obj.price}</td>
                                <td>{obj.regdate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Home;