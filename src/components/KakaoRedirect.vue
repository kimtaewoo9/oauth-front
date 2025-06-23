<template>
    <div>
        카카오 로그인 진행중...
    </div>
</template>

<script>
import axios from 'axios';

export default{
    created(){
        const code = new URL(window.location.href).searchParams.get("code"); 
        this.sendCodeToServer(code); // 백엔드에서 인가코드 넘겨주면 받아서 server에 보냄
    },
    methods:{
        async sendCodeToServer(code){
            const response = await axios.post("http://localhost:8080/member/kakao/doLogin", {code});
            const token = response.data.token;
            localStorage.setItem("token", token);
            window.location.href = "/";
        }
    }
}
</script>