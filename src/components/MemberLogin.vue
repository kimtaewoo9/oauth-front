<template>
    <div class="login-wrapper">
        <!-- Animated background -->
        <div class="background"></div>
        <div class="particles">
            <div v-for="n in 50" :key="n" class="particle" :style="particleStyle()"></div>
        </div>
        
        <!-- Geometric shapes -->
        <div class="shape shape1"></div>
        <div class="shape shape2"></div>
        <div class="shape shape3"></div>
        
        <v-container class="login-container">
            <v-row justify="center" align="center" style="min-height: 100vh;">
                <v-col cols="12" sm="10" md="6" lg="5" xl="4">
                    <v-card class="glass-card">
                        <v-card-text class="card-content">
                            <h1 class="login-title">WELCOME</h1>
                            <p class="subtitle">시작하기</p>
                            
                            <v-form @submit.prevent="memberLogin" class="login-form">
                                <v-text-field
                                    label="Email"
                                    v-model="email"
                                    prepend-icon="mdi-email-outline"
                                    class="custom-input"
                                    outlined
                                    dense
                                    dark
                                ></v-text-field>
                                
                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    type="password"
                                    prepend-icon="mdi-lock-outline"
                                    class="custom-input"
                                    outlined
                                    dense
                                    dark
                                ></v-text-field>
                                
                                <v-btn 
                                    type="submit" 
                                    class="login-btn"
                                    block 
                                    large
                                    :loading="loading"
                                >
                                    <span class="btn-text">로그인</span>
                                </v-btn>
                            </v-form>
                            
                            <div class="social-login">
                                <p class="social-text">간편 로그인</p>
                                <div class="social-buttons-container">
                                    <div class="social-btn google-btn" @click="googleLogin()">
                                        <img
                                            v-if="hasGoogleImage"
                                            src="@/assets/google_login.png"
                                            alt="Google Login"
                                            class="social-img"
                                            @error="hasGoogleImage = false"
                                        />
                                        <div v-else class="google-text">
                                            <span>G</span> Google
                                        </div>
                                        <div class="social-hover"></div>
                                    </div>
                                    <div class="social-btn kakao-btn" @click="kakaoLogin()">
                                        <img
                                            v-if="hasKakaoImage"
                                            src="@/assets/kakao_login.png"
                                            alt="Kakao Login"
                                            class="social-img"
                                            @error="hasKakaoImage = false"
                                        />
                                        <div v-else class="kakao-text">
                                            <span>K</span> 카카오
                                        </div>
                                        <div class="social-hover"></div>
                                    </div>
                                    <div class="social-btn naver-btn" @click="naverLogin()">
                                        <img
                                            v-if="hasNaverImage"
                                            src="@/assets/naver_login.png"
                                            alt="Naver Login"
                                            class="social-img"
                                            @error="hasNaverImage = false"
                                        />
                                        <div v-else class="naver-text">
                                            <span>N</span> 네이버
                                        </div>
                                        <div class="social-hover"></div>
                                    </div>
                                    <div class="social-btn github-btn" @click="githubLogin()">
                                        <div class="github-content">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="github-icon">
                                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                            <span>GitHub</span>
                                        </div>
                                        <div class="social-hover"></div>
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';

function generateState() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array.toString();
}

export default {
    data() {
        return {
            email: "",
            password: "",
            loading: false,
            hasNaverImage: true,
            hasGoogleImage: true,
            hasKakaoImage: true,
            // google
            googleUrl: "https://accounts.google.com/o/oauth2/auth",
            googleClientId: process.env.VUE_APP_GOOGLE_CLIENT_ID || "495083622583-2fs7mjn5bi85ihp1ge7euogfumd3610m.apps.googleusercontent.com",
            googleRedirectUrl: "http://localhost:3000/oauth/google/redirect",
            googleScope: "openid email profile",
            // kakao
            kakaoUrl: "https://kauth.kakao.com/oauth/authorize",
            kakaoClientId: process.env.VUE_APP_KAKAO_CLIENT_ID || "dc2b1c572cf4112ab3ec7d95dde0b5c7",
            kakaoRedirectUrl: "http://localhost:3000/oauth/kakao/redirect",
            // naver
            naverUrl: "https://nid.naver.com/oauth2.0/authorize",
            naverClientId: process.env.VUE_APP_NAVER_CLIENT_ID || "dfETyOv2dxCwKjl08gw4",
            naverRedirectionUrl: "http://localhost:3000/oauth/naver/redirect",
            // github
            githubUrl: "https://github.com/login/oauth/authorize",
            githubClientId: "Ov23liJJzBKWmp6tL30f",
            githubRedirectUrl: "http://localhost:3000/oauth/github/redirect",
            githubScope: "read:user user:email"
        }
    },
    methods: {
        async memberLogin() {
            this.loading = true;
            try {
                const loginData = {
                    email: this.email,
                    password: this.password
                }
                const response = await axios.post("http://localhost:8080/member/doLogin", loginData);
                const token = response.data.token;
                localStorage.setItem("token", token);
                window.location.href = "/";
            } catch (error) {
                console.error('Login error:', error);
            } finally {
                this.loading = false;
            }
        },
        googleLogin() {
            const auth_uri = `${this.googleUrl}?client_id=${this.googleClientId}&redirect_uri=${this.googleRedirectUrl}&response_type=code&scope=${this.googleScope}`;
            window.location.href = auth_uri;
        },
        kakaoLogin() {
            const auth_uri = `${this.kakaoUrl}?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoRedirectUrl}&response_type=code`;
            window.location.href = auth_uri;
        },
        naverLogin(){
            const state = generateState();
            sessionStorage.setItem('naver_state', state);
            const auth_uri = `${this.naverUrl}?response_type=code&client_id=${this.naverClientId}&redirect_uri=${this.naverRedirectionUrl}&state=${state}`;
            window.location.href = auth_uri
        },
        githubLogin(){
            const state = generateState();
            sessionStorage.setItem('github_state', state);
            const encodedState = encodeURIComponent(state);
            const auth_uri = `${this.githubUrl}?client_id=${this.githubClientId}&redirect_uri=${this.githubRedirectUrl}&scope=${this.githubScope}&state=${encodedState}`;
            window.location.href = auth_uri;
        },
        googleServerLogin() {
            window.location.href = "http://localhost:8080/oauth2/authorization/google";
        },
        particleStyle() {
            return {
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 20 + 's',
                animationDuration: (15 + Math.random() * 10) + 's'
            }
        }
    }
}
</script>

<style scoped>
/* Reset and base styles */
.login-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-container {
    position: relative;
    z-index: 100;
    padding: 20px;
}

.card-content {
    padding: 40px 32px !important;
}

/* Animated gradient background */
.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    z-index: 1;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Floating particles */
.particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    animation: float 20s infinite linear;
}

@keyframes float {
    from {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    to {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
    }
}

/* Glassmorphism card */
.glass-card {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 28px !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.37);
    overflow: visible;
    position: relative;
    transform: translateY(0);
    transition: all 0.3s ease;
    margin: 20px;
    max-width: 420px;
    margin: 20px auto;
}

.glass-card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff0066, #6600ff, #00ff88, #ffaa00, #ff0066);
    background-size: 300% 300%;
    border-radius: 30px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: glowAnimation 3s ease infinite;
    filter: blur(8px);
}

.glass-card:hover::before {
    opacity: 0.8;
}

.glass-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 50px 0 rgba(31, 38, 135, 0.5);
}

@keyframes glowAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Title styles */
.login-title {
    color: white;
    font-size: 2.8rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 8px;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
    animation: pulseText 2s ease-in-out infinite;
    letter-spacing: 4px;
    background: linear-gradient(45deg, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

@keyframes pulseText {
    0%, 100% { 
        transform: scale(1);
        text-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
    }
    50% { 
        transform: scale(1.05);
        text-shadow: 0 0 60px rgba(255, 255, 255, 1);
    }
}

.subtitle {
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
    margin-bottom: 32px;
    font-size: 1.1rem;
    font-weight: 300;
    letter-spacing: 1px;
}

.login-form {
    margin-bottom: 28px;
}

/* Custom input styles */
.custom-input {
    margin-bottom: 20px;
}

.custom-input >>> .v-input__control {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
    min-height: 52px !important;
}

.custom-input >>> .v-text-field__details {
    display: none;
}

.custom-input >>> .v-input__slot {
    padding: 0 20px !important;
    min-height: 52px !important;
}

.custom-input >>> .v-input__slot::before {
    border-color: rgba(255, 255, 255, 0.2) !important;
}

.custom-input >>> .v-input__slot::after {
    border-color: white !important;
}

.custom-input >>> .v-label {
    color: rgba(255, 255, 255, 0.7) !important;
}

.custom-input >>> input {
    color: white !important;
    font-size: 16px;
}

.custom-input >>> .v-icon {
    color: rgba(255, 255, 255, 0.7) !important;
}

/* Login button */
.login-btn {
    margin-top: 20px !important;
    height: 56px !important;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) !important;
    background-size: 200% 200%;
    animation: buttonGradient 4s ease infinite;
    border: none !important;
    border-radius: 18px !important;
    font-weight: 600;
    font-size: 1.1rem !important;
    letter-spacing: 1px;
    text-transform: none !important;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
    margin-bottom: 0 !important;
}

.login-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
}

.login-btn:hover::before {
    left: 100%;
}

.login-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6) !important;
}

.btn-text {
    position: relative;
    z-index: 2;
}

@keyframes buttonGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Social login styles */
.social-login {
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.social-text {
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    margin-bottom: 20px;
    font-size: 0.95rem;
    letter-spacing: 1px;
}

.social-buttons-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
}

.social-btn {
    cursor: pointer;
    position: relative;
    padding: 12px;
    border-radius: 14px;
    transition: all 0.3s ease;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
}

.social-img {
    max-height: 32px;
    width: auto;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    display: block;
}

.social-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 14px;
    transform: scale(0);
    transition: all 0.4s ease;
    z-index: 1;
}

.google-btn .social-hover {
    background: linear-gradient(135deg, rgba(66, 133, 244, 0.3), rgba(234, 67, 53, 0.3));
}

.kakao-btn .social-hover {
    background: linear-gradient(135deg, rgba(255, 235, 0, 0.3), rgba(255, 200, 0, 0.3));
}

.naver-btn .social-hover {
    background: linear-gradient(135deg, rgba(3, 199, 90, 0.3), rgba(0, 160, 70, 0.3));
}

.github-btn .social-hover {
    background: linear-gradient(135deg, rgba(36, 41, 46, 0.3), rgba(16, 21, 26, 0.3));
}

.social-btn:hover .social-hover {
    transform: scale(1);
}

.social-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
}

.social-btn:hover .social-img {
    transform: scale(1.1);
}

/* Text styles for social buttons when images are not available */
.google-text, .kakao-text, .naver-text {
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 2;
    position: relative;
    white-space: nowrap;
}

.google-text span {
    font-size: 1.1rem;
    font-weight: 800;
    background: linear-gradient(135deg, #4285F4, #EA4335);
    color: white;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.kakao-text span {
    font-size: 1.1rem;
    font-weight: 800;
    background: #FEE500;
    color: #3C1E1E;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.naver-text span {
    font-size: 1.1rem;
    font-weight: 800;
    background: #03C75A;
    color: white;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

/* GitHub button styles */
.github-content {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 2;
    position: relative;
    white-space: nowrap;
}

.github-icon {
    width: 22px;
    height: 22px;
    fill: white;
    transition: all 0.3s ease;
}

.github-btn:hover .github-icon {
    transform: scale(1.1) rotate(360deg);
    transition: transform 0.6s ease;
}

/* Geometric shapes */
.shape {
    position: absolute;
    opacity: 0.1;
    z-index: 3;
}

.shape1 {
    top: 10%;
    left: 5%;
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    animation: rotate 25s linear infinite;
}

.shape2 {
    bottom: 15%;
    right: 8%;
    width: 70px;
    height: 70px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
    border-radius: 50%;
    animation: pulse 4s ease-in-out infinite;
}

.shape3 {
    top: 50%;
    right: 5%;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    transform: rotate(45deg);
    animation: rotateSquare 30s linear infinite reverse;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes rotateSquare {
    from { transform: rotate(45deg); }
    to { transform: rotate(405deg); }
}

@keyframes pulse {
    0%, 100% { 
        transform: scale(1); 
        opacity: 0.1;
    }
    50% { 
        transform: scale(1.3); 
        opacity: 0.3;
    }
}

/* Responsive adjustments */
@media (max-width: 960px) {
    .login-title {
        font-size: 2.4rem;
        letter-spacing: 2px;
    }
    
    .glass-card {
        margin: 15px;
        max-width: 380px;
    }
    
    .card-content {
        padding: 32px 28px !important;
    }
}

@media (max-width: 600px) {
    .login-container {
        padding: 15px 10px;
    }
    
    .login-title {
        font-size: 2.2rem;
    }
    
    .subtitle {
        font-size: 1rem;
        margin-bottom: 28px;
    }
    
    .custom-input >>> .v-input__control {
        min-height: 48px !important;
    }
    
    .custom-input >>> .v-input__slot {
        min-height: 48px !important;
    }
    
    .login-btn {
        height: 52px !important;
        font-size: 1rem !important;
    }
    
    .social-btn {
        height: 46px;
    }
    
    .social-buttons-container {
        grid-template-columns: 1fr;
        gap: 12px;
        max-width: 240px;
        margin: 0 auto;
    }
    
    .github-content span,
    .google-text,
    .kakao-text,
    .naver-text {
        font-size: 0.85rem;
    }
    
    .card-content {
        padding: 28px 24px !important;
    }
    
    .glass-card {
        max-width: 340px;
    }
}

@media (max-width: 360px) {
    .glass-card {
        max-width: 300px;
    }
    
    .card-content {
        padding: 24px 20px !important;
    }
    
    .login-title {
        font-size: 2rem;
    }
    
    .social-buttons-container {
        max-width: 200px;
    }
}
</style>
