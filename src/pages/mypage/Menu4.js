import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Menu4 = () => {

    const [list,setList] =useState([]);

    //상수
    const {token} = useSelector((state) => state.LoginReducer);
    const scriptUrl = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;
    const open = useDaumPostcodePopup(scriptUrl);
    

    // 상태변수
    const { control, handleSubmit, setValue ,setFocus} = useForm({
        defaultValues : {
            "postCode": "",
            "address": "",
            "address1": ""
        }
    }); 

    useEffect(() =>{
        handleAddress();
    }, []);

    const handleAddress =async() => {
        const url = `/ROOT/api/memberaddress1/selectlist.json`;
        const headers = {"Content-Type" : "application/json", token:token};
        const {data} =await axios.get(url,{headers});
        console.log(data);
        if(data.status===200){
            setList(data.result);
        }
    }

    //클릭했을 때 팝업 표시
    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    //팝업에서 주소를 선택했을 때
    const handleComplete = (data) => {
        console.log(data);
        setValue("postCode" , data.zonecode);
        setValue("address" , data.roadAddress);
        setFocus("address1");
    }

    const onSubmit = async(obj) => {
        console.log('onSubmit => ', obj);

        const url =`/ROOT/api/memberaddress1/insert.json`;
        const headers = {"Content-Type" : "application/json" , token: token};
        const {data} = await axios.post(url , obj, {headers});
        if(data.status ===200){
            alert('주소등록완료');
        }
    };

    const onError = (e) => {
        console.log('onError => ', e);
    };

    return (
        <div>
            <h3>주소관리</h3>
            <form onSubmit={handleSubmit(onSubmit , onError)}>
            <Controller
                name="postCode"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: '우편번호입력'
                    }
                }}
                render={({ field: { onChange, value, ref } }) => (
                    <input type="text" ref={ref} value={value} readOnly/>
                )}
            />
            <button onClick={handleClick}>우편번호검색</button><br />
            <Controller
                name="address"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: '주소입력하세요'
                    }
                }}
                render={({ field: { onChange, value, ref } }) => (
                    <input type="text" ref={ref} value={value} readOnly />
                )}
            />
            <Controller
                name="address1"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: '상세주소입력하세요'
                    }
                }}
                render={({ field: { onChange, value, ref } }) => (
                    <input type="text" ref={ref} value={value} onChange={onChange} placeholder='상세주소' />
                )}
            />
            <div>
                <button type='submit'>주소등록</button>
            </div>
            </form>

            <table>
                <tbody>
                    {
                        list.map(obj => (
                            <tr key={obj.no}>
                                <td>{obj.no}</td>
                                <td>{obj.post_code}</td>
                                <td>{obj.address}</td>
                                <td>{obj.address1}</td>
                                <td>{obj.regdate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        
    );
};

export default Menu4;