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
    serverUrl: '', // http://localhost:5000/
    captchaUrl: '', // url for requset captcha
    verifyUrl: '', // url for for verify captcha
    loginUrl: '', // url for authorization
    userData: {
        email: '', // test@test.ru
        password: '', // password
    },
    rucaptchaKey: 'YOUR_API_KEY', // rucaptcha key
};
