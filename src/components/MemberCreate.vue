<template>
    <div class="signup-wrapper">
        <!-- Animated background -->
        <div class="background"></div>
        <div class="particles">
            <div v-for="n in 50" :key="n" class="particle" :style="particleStyle()"></div>
        </div>
        
        <!-- Geometric shapes -->
        <div class="shape shape1"></div>
        <div class="shape shape2"></div>
        <div class="shape shape3"></div>
        
        <v-container class="signup-container">
            <v-row justify="center" align="center" style="min-height: 100vh;">
                <v-col cols="12" sm="8" md="6" lg="5" xl="4">
                    <v-card class="glass-card">
                        <v-card-text class="pa-6">
                            <h1 class="signup-title">JOIN US</h1>
                            <p class="subtitle">새로운 시작</p>
                            
                            <v-form @submit.prevent="memberCreate">
                                <v-text-field
                                    label="Email"
                                    v-model="email"
                                    prepend-icon="mdi-email-outline"
                                    class="custom-input mb-3"
                                    outlined
                                    dense
                                    dark
                                    :rules="emailRules"
                                ></v-text-field>
                                
                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    type="password"
                                    prepend-icon="mdi-lock-outline"
                                    class="custom-input mb-2"
                                    outlined
                                    dense
                                    dark
                                    :rules="passwordRules"
                                ></v-text-field>
                                
                                <v-text-field
                                    label="Confirm Password"
                                    v-model="confirmPassword"
                                    type="password"
                                    prepend-icon="mdi-lock-check-outline"
                                    class="custom-input mb-2"
                                    outlined
                                    dense
                                    dark
                                    :rules="confirmPasswordRules"
                                ></v-text-field>
                                
                                <v-btn 
                                    type="submit" 
                                    class="signup-btn"
                                    block 
                                    large
                                    :loading="loading"
                                >
                                    <span class="btn-text">회원가입</span>
                                </v-btn>
                            </v-form>
                            
                            <div class="login-link">
                                <p class="link-text">
                                    이미 계정이 있으신가요? 
                                    <a href="/login" class="link">로그인</a>
                                </p>
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

export default {
    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
            emailRules: [
                v => !!v || '이메일을 입력해주세요',
                v => /.+@.+\..+/.test(v) || '올바른 이메일 형식이 아닙니다'
            ],
            passwordRules: [
                v => !!v || '패스워드를 입력해주세요',
                v => v.length >= 6 || '패스워드는 6자 이상이어야 합니다'
            ],
            confirmPasswordRules: [
                v => !!v || '패스워드 확인을 입력해주세요',
                v => v === this.password || '패스워드가 일치하지 않습니다'
            ]
        }
    },
    methods: {
        async memberCreate() {
            // 유효성 검사
            if (this.password !== this.confirmPassword) {
                alert('패스워드가 일치하지 않습니다');
                return;
            }
            
            this.loading = true;
            try {
                const registerData = {
                    email: this.email,
                    password: this.password
                }
                await axios.post("http://localhost:8080/member/create", registerData);
                alert('회원가입이 완료되었습니다!');
                window.location.href = "/";
            } catch (error) {
                console.error('Registration error:', error);
                alert('회원가입에 실패했습니다');
            } finally {
                this.loading = false;
            }
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
.signup-wrapper {
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

.signup-container {
    position: relative;
    z-index: 100;
    padding-top: 40px;
    padding-bottom: 20px;
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
    border-radius: 25px !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    overflow: visible;
    position: relative;
    transform: translateY(0);
    transition: all 0.3s ease;
    margin: 20px;
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
    border-radius: 25px;
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
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 12px 35px 0 rgba(31, 38, 135, 0.5);
}

@keyframes glowAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Title styles */
.signup-title {
    color: white;
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 5px;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
    animation: pulseText 2s ease-in-out infinite;
    letter-spacing: 3px;
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
    margin-bottom: 25px;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 1px;
}

/* Custom input styles */
.custom-input >>> .v-input__control {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    overflow: hidden;
}

.custom-input >>> .v-text-field__details {
    display: none;
}

.custom-input >>> .v-input__slot {
    padding: 0 18px !important;
    min-height: 45px !important;
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

/* Signup button */
.signup-btn {
    margin-top: 20px !important;
    height: 48px !important;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) !important;
    background-size: 200% 200%;
    animation: buttonGradient 4s ease infinite;
    border: none !important;
    border-radius: 25px !important;
    font-weight: 600;
    font-size: 1.1rem !important;
    letter-spacing: 1px;
    text-transform: none !important;
    position: relative;
    overflow: hidden;
    box-shadow: 0 5px 25px rgba(102, 126, 234, 0.4);
}

.signup-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
}

.signup-btn:hover::before {
    left: 100%;
}

.signup-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 35px rgba(102, 126, 234, 0.6) !important;
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

/* Login link */
.login-link {
    margin-top: 30px;
    text-align: center;
}

.link-text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

.link {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
}

.link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #f093fb);
    transition: width 0.3s ease;
}

.link:hover::after {
    width: 100%;
}

.link:hover {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
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
    .signup-title {
        font-size: 2rem;
    }
    
    .glass-card {
        margin: 15px;
    }
}

@media (max-width: 600px) {
    .signup-container {
        padding: 15px 10px;
    }
    
    .signup-title {
        font-size: 1.8rem;
    }
    
    .subtitle {
        font-size: 0.9rem;
    }
    
    .glass-card .v-card__text {
        padding: 24px !important;
    }
}
</style>
