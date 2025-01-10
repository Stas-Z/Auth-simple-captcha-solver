import { AuthService } from './services/auth.service';
import { CaptchaService } from './services/captcha.service';
import { config } from './utils/config';

async function startApp() {
    const captchaService = new CaptchaService(config.rucaptchaKey);
    const authService = new AuthService(captchaService);

    const email = config.userData.email;
    const password = config.userData.password;

    try {
        const authResponse = await authService.authenticate(email, password);
        console.log('Авторизация завершена успешно:', authResponse);
    } catch (error: any) {
        console.error('Ошибка приложения:', error.message);
    }
}
startApp();
