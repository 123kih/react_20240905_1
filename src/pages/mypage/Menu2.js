import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Menu2 = () => {
    const { token } = useSelector((state) => state.LoginReducer);

    // 상태변수 reack-hook-form
    const { watch, control, handleSubmit } = useForm({
        defaultValues:{
            "pw": "c1",
            "pw1": "c1",
            "newpw": "c1"
        }
    });

    // 유효성을 통과했을때
    const onSubmit = async(e) => {
        console.log('onSubmit => ', e);

        const url = `/ROOT/api/member1/updatepw.json`;
        const headers = {"Content-Type":"application/json", "token": token};
        const {data} = await axios.put(url, e, {headers});
        console.log(data);
        if(data.status === 200){
            alert('암호가 변경되었습니다.');
        }
    };

    // 유효성검사 실패시
    const onError = (e) => {
        console.log('onError => ', e);
    };

    return (
        <div>
            <h3>암호변경</h3>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Controller
                    control={control}
                    name="pw"
                    rules={{ required: { value: true, message: '현재암호 입력' } }}
                    render={({ field: { onChange, value, ref } }) => (
                        <input type="password" ref={ref} value={value} onChange={onChange} placeholder='현재암호' />
                    )}
                />

                <Controller
                    control={control}
                    name="pw1"
                    rules={{
                        required: { value: true, message: '현재암호 확인 입력' },
                        validate: (val) => {
                            if (watch('pw') !== val) {
                                return "암호가 일치하지 않습니다.";
                            }
                        }
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                        <input type="password" ref={ref} value={value} onChange={onChange} placeholder='현재암호확인' />
                    )}
                />


                <Controller
                    control={control}
                    name="newpw"
                    rules={{ required: { value: true, message: '변경암호 입력' } }}
                    render={({ field: { onChange, value, ref } }) => (
                        <input type="password" ref={ref} value={value} onChange={onChange} placeholder='변경암호' />
                    )}
                />

                <button type="submit">암호변경</button>
            </form>
        </div>
    );
};


export default Menu2;