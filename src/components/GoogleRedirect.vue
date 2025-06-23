<template>
    <div>
        구글 로그인 진행중...
    </div>
</template>

<script>
import axios from 'axios';

export default{
    created(){
        // 인가 코드를 꺼내고 server로 넘김 .
        const code = new URL(window.location.href).searchParams.get("code");
        this.sendCodeToServer(code);
    },
    methods:{
        async sendCodeToServer(code){
            // axios로 .. 받아온 인가코드(code에 들어있는 값)로 로그인 요청을 함. axios 요청은 비동기. await, async
            const response = await axios.post("http://localhost:8080/member/google/doLogin", {code});
            const token = response.data.token;
            // 받아온 토큰을 웹 브라우저의 localStorage에 저장하고, 홈화면이로 이동 ..
            localStorage.setItem("token", token);
            window.location.href = "/";
        }
    }
}
</script>