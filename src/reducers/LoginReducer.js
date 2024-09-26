//리덕스 :  모든 컴포넌트에 공유하고 싶은 변수
//파일명 : src / reducers / LoginReducers.js

const initState = {
    logged : false,
    token : '',
};

const LoginReducer = (state = initState, action) => {

    //로그인 될 때 => logged를 true 로 바꾸고 , token은 백엔드에 받은 토근 보관
    //dispatch({type : 'login' , token : '토큰정보'})
    if(action.type === 'login') {
        //새로고침을 유지하기위해 저장소에 저장
        sessionStorage.setItem("token", action.token);
        return{
            ...state,
            logged : true,
            token : action.token,
        }
    }
    //로그아웃 될 때 => logged를 false로 바꾸고 , token은 빈문자('')로 변경
    //dispatch({type : 'logout' })
    else if(action.type === 'logout'){
        sessionStorage.removeItem("token");
        return{
            ...state,
            logged : false,
            token : '',
        }
    }
    //현재상태변수를 가지고 가기
    else{
        //세션 스토리지는 지우기 전 까지 유지되기때문
        const token = sessionStorage.getItem("token");
        if(token !== null){
            state.logged=true;
            state.token = token ;
        }
        return state;
    }
};

export default LoginReducer;