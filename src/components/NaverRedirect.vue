<template>
    <div>
        네이버 로그인 진행중...
    </div>
</template>

<script>
import axios from 'axios';

export default{
    created(){
        const urlParams = new URL(window.location.href).searchParams;
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const storedState = sessionStorage.getItem('naver_state'); 

        // 내가 저장 sessionStorage에 저장 해놓은 state랑 비교함 .
        if (state !== storedState) {
            alert("비정상적인 접근입니다. 다시 시도해주세요.");
            window.location.href = "/member/doLogin";
            return;
        }

        // 4. 검증이 성공하면, state 값을 세션 스토리지에서 제거합니다. (재사용 방지)
        sessionStorage.removeItem('naver_state');

        this.sendCodeToServer(code,state); // 백엔드에서 인가코드 넘겨주면 받아서 server에 보냄
    },
    methods:{
        async sendCodeToServer(code,state){
            const response = await axios.post("http://localhost:8080/member/naver/doLogin", {code, state});
            const token = response.data.token;
            localStorage.setItem("token", token);
            window.location.href = "/";
        }
    }
}
</script>