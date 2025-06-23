import GoogleRedirect from "@/components/GoogleRedirect.vue";
import KakaoRedirect from "@/components/KakaoRedirect.vue";
import NaverRedirect from "@/components/NaverRedirect.vue";
import GithubRedirect from "@/components/GithubRedirect.vue";
import MemberCreate from "@/components/MemberCreate.vue";
import MemberLogin from "@/components/MemberLogin.vue";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/member/create',
        component: MemberCreate
    },
    {
        path: '/member/login',
        component: MemberLogin
    },
    {
        path: "/oauth/google/redirect",
        component: GoogleRedirect
    },
    {
        path: "/oauth/kakao/redirect",
        component: KakaoRedirect
    },
    {
        path: "/oauth/naver/redirect",
        component: NaverRedirect
    },
    {
        path: "/oauth/github/redirect",
        component: GithubRedirect
    }
]
const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

export default router;