<template>
    <div>
        구글 로그인 진행중...
    </div>
</template>

<script>
import axios from 'axios';

export default{
    created(){
        // 이제 구글 서버가 .. 여기로 리다이렉트를 해줌 (url에 인가코드 담아서)
        // 구글이 전달해준 인가 코드를 꺼내고 server로 넘김 .
    
        const code = new URL(window.location.href).searchParams.get("code");
        this.sendCodeToServer(code);
    },
    methods:{
        async sendCodeToServer(code){
            // axios로 .. 받아온 인가코드(code에 들어있는 값)로 로그인 요청을 함. axios 요청은 비동기. await, async
            // jwt 토큰을 요청할때는 .. http body를 통해 받아야하므로 post 요청을 한다 .
            const response = await axios.post("http://localhost:8080/member/google/doLogin", {code});
            const token = response.data.token;
            // 받아온 jwt 토큰을 웹 브라우저의 localStorage에 저장하고, 홈화면이로 이동 ..
            localStorage.setItem("token", token);
            window.location.href = "/";
        }
    }
}
</script>