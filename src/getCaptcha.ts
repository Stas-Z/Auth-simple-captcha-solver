import sharp from 'sharp';
import { $api } from './api';

async function fetchAndConvertCaptcha(svgUrl: string, outputPath: string) {
    try {
        const response = await $api.get(svgUrl, { responseType: 'text' });
        const svgData = response.data;

        await sharp(Buffer.from(svgData))
            .resize({ width: 400 })
            .png()
            .toFile(outputPath);

        console.log(`Капча сохранена как PNG: ${outputPath}`);
        return outputPath;
    } catch (error: any) {
        console.error('Ошибка при преобразовании SVG в PNG:', error.message);
        throw error;
    }
}

export async function getCaptcha(captchaUrl: string, outputPath: string) {
    const pngPath = await fetchAndConvertCaptcha(captchaUrl, outputPath);
    console.log('PNG-файл капчи готов:', pngPath);
}
