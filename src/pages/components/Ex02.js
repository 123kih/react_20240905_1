import React from 'react';
import {useForm} from 'react-hook-form'
const Ex02 = () => {
    //1. 상태변수
    const {register, watch, handleSubmit} = useForm();

    //2.상태변수의 값을 실시간으로 확인하기
    console.log(watch());
    
    //3.onSubmit, onError 함수 만들기
    const onSubmit=(obj) =>{
        console.log('onSubmit =>',obj);
        
    }

    const onError =(err) =>{
        console.log('onError => ',err);
        if(typeof err.userid!== 'undefined'){
            alert(err.userid.message)
            return;
        }
        if(typeof err.userpw!== 'undefined'){
            alert(err.userpw.message)
            return;
    }
}
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit,onError)}>
            <input type="text" {...register('userid', {
                required:{
                    value:true,
                    message:"아이디를 입력하세요."
                }
            })}/>
                

                <input type="password" {...register('userpw', {
                required:{
                    value:true,
                    message:"암호를 입력하세요."
                }
            })}/>

            <input type="submit" value="로그인"/>
            </form>
        </div>
    );
};

export default Ex02;