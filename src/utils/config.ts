export interface IUserData {
    email: string;
    password: string;
}
export interface IConfig {
    serverUrl: string;
    captchaUrl: string;
    verifyUrl: string;
    loginUrl: string;
    userData: IUserData;
    rucaptchaKey: string;
}

export const config: IConfig = {
    serverUrl: 'http://localhost:5000/', // Укажите URL вашего сервера
    captchaUrl: 'captcha', // URL для получения капчи
    verifyUrl: 'captcha/verify', // URL для проверки капчи
    loginUrl: 'auth/login', // URL для авторизации
    userData: {
        email: 'test@test.ru', // Ваш email
        password: 'A2345678*', // Ваш пароль
    },
    rucaptchaKey: 'YOUR_API_KEY', // Ваш API-ключ 2Captcha
};
