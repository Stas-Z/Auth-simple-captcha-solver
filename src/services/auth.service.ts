import { $api } from '../utils/api';
import { config } from '../utils/config';
import { CaptchaService } from './captcha.service';

export class AuthService {
    private captchaService: CaptchaService;

    constructor(captchaService: CaptchaService) {
        this.captchaService = captchaService;
    }

    async authenticate(email: string, password: string): Promise<any> {
        try {
            const captchaSolution = await this.captchaService.solveCaptcha(
                config.captchaUrl,
                './captcha.png'
            );
            console.log('Делаем запрос на проверку капчи');
            const captchaVerifyResponse = await $api.post(config.verifyUrl, {
                captchaInput: captchaSolution,
            });

            if (!captchaVerifyResponse.data.success) {
                throw new Error('Капча не прошла проверку на сервере');
            }
            console.log('Делаем запрос на авторизацию');
            const loginResponse = await $api.post(config.loginUrl, {
                email,
                password,
                captchaInput: captchaSolution,
            });

            console.log('Успешная авторизация:', loginResponse.data);
            return loginResponse.data;
        } catch (error: any) {
            console.error('Ошибка авторизации:', error.message);
            throw error;
        }
    }
}
