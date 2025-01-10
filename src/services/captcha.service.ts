import * as TwoCaptcha from '@2captcha/captcha-solver';
import sharp from 'sharp';
import { $api } from '../utils/api';
import { readFileAsBase64 } from '../utils/file.util';

export class CaptchaService {
    private solver: TwoCaptcha.Solver;

    constructor(apiKey: string) {
        this.solver = new TwoCaptcha.Solver(apiKey);
    }

    async fetchAndConvertCaptcha(
        svgUrl: string,
        outputPath: string
    ): Promise<string> {
        try {
            const response = await $api.get(svgUrl, { responseType: 'text' });
            const svgData = response.data;

            await sharp(Buffer.from(svgData))
                .resize({ width: 400 })
                .png()
                .toFile(outputPath);

            console.log(
                `Преобразовываем капчу в PNG и сохраняем в: ${outputPath}`
            );
            return outputPath;
        } catch (error: any) {
            console.error(
                'Ошибка при преобразовании SVG в PNG:',
                error.message
            );
            throw error;
        }
    }

    async solveCaptcha(
        captchaUrl: string,
        outputPath: string
    ): Promise<string> {
        try {
            console.log('Делаем запрос на получение капчи');

            const captchaPath = await this.fetchAndConvertCaptcha(
                captchaUrl,
                outputPath
            );
            const imageBase64 = readFileAsBase64(captchaPath);

            console.log('Отправляем капчу в формате base64 на rucaptcha');

            const ruCaptchaReq = await this.solver.imageCaptcha({
                body: imageBase64,
                numeric: 4,
                min_len: 6,
                max_len: 6,
            });

            console.log('Получаем решение капчи:', ruCaptchaReq.data);
            return ruCaptchaReq.data;
        } catch (error: any) {
            console.error('Ошибка при решении капчи:', error.message);
            throw error;
        }
    }
}
