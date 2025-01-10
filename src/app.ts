import * as fs from 'fs';
import { $api } from './api';
import { config } from './config';
import { getCaptcha } from './getCaptcha';

const TwoCaptcha = require('@2captcha/captcha-solver');

const apiKey = config.rucaptchaKey;

const solver = new TwoCaptcha.Solver(apiKey);

async function solveCaptcha(captchaUrl: string) {
    try {
        const outputPath = './captcha.png';
        await getCaptcha(captchaUrl, outputPath);

        const imageBase64 = fs.readFileSync(outputPath, 'base64');

        const solution = await solver.imageCaptcha({
            body: imageBase64,
            numeric: 4,
            min_len: 6,
            max_len: 6,
        });

        console.log('Решение капчи:', solution.data);

        return solution.data;
    } catch (error: any) {
        console.error('Ошибка при решении капчи:', error.message);
        throw error;
    }
}

async function authenticate(email: string, password: string) {
    try {
        const captchaSolution = await solveCaptcha(config.captchaUrl);

        const captchaVerifyResponse = await $api.post(config.verifyUrl, {
            captchaInput: captchaSolution,
        });

        if (!captchaVerifyResponse.data.success) {
            throw new Error('Капча не прошла проверку на сервере');
        }

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

(async () => {
    const email = config.userData.email;
    const password = config.userData.password;

    await authenticate(email, password);
})();
