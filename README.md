# Сервис авторизации с капчей

Этот проект демонстрирует, как автоматизировать решение CAPTCHA и авторизацию пользователей через HTTP-запросы. Приложение интегрировано с сервисом [ruCaptcha](https://rucaptcha.com/) для решения CAPTCHA.


## Возможности

-   Получение изображений CAPTCHA (в формате SVG) с сервера и их преобразование в PNG.
-   Решение CAPTCHA с использованием [ruCaptcha](https://rucaptcha.com/).
-   Отправка решения CAPTCHA и учетных данных пользователя для авторизации на сервере.
-   Поддержка cookies для управления сессиями с помощью `axios-cookiejar-support`.


## Технологии

-   **Node.js** с TypeScript
-   [Axios](https://axios-http.com/) для выполнения HTTP-запросов
-   [Sharp](https://sharp.pixelplumbing.com/) для обработки изображений
-   [2Captcha](https://2captcha.com/) официальная библиотека для решения CAPTCHA
-   [Tough Cookie](https://github.com/salesforce/tough-cookie) для работы с cookies


## Требования

1. Установить [Node.js](https://nodejs.org/) (версия 14 или выше).
2. Создать аккаунт на [ruCaptcha](https://rucaptcha.com/) и получить API-ключ.
3. Иметь локальный сервер, работающий на `http://localhost:5000/`, который поддерживает:
    - Запрос капчи (`/captcha`)
    - Проверку капчи (`/captcha/verify`)
    - Авторизацию пользователя (`/auth/login`)


## Установка

1. Склонируйте репозиторий:
    ```bash
    git clone https://github.com/Stas-Z/Auth-simple-captcha-solver.git
    cd Auth-simple-captcha-solver
    ```
2. Установите зависимости:
    ```bash
    npm install
    ```
3. Настройте приложение: В файле config.ts замените на реальные данные:
    ```typescript
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
    ```


## Использование

1. **Запустите приложение:**
    ```bash
    npm run start
    ```
2. Программа выполнит следующие шаги:
    - Получит изображение CAPTCHA с сервера.
    - Решит CAPTCHA с использованием сервиса 2Captcha.
    - Отправит решение и учетные данные пользователя на сервер для авторизации.
    - Выведет результат авторизации в консоль.


## Структура файлов

```bash
    ├── src/
    │   ├── main.ts               # Точка входа приложения
    │   ├── services/             # Основные сервисы приложения
    │   │   ├── auth.service.ts   # Сервис авторизации
    │   │   ├── captcha.service.ts # Сервис обработки капчи
    │   ├── utils/                # Утилиты и конфигурации
    │   │   ├── api.ts            # Настроенный экземпляр Axios с поддержкой cookies
    │   │   ├── config.ts         # Конфигурация приложения
    │   │   ├── file.util.ts      # Утилиты для работы с файлами
    ├── package.json
```


## Пример вывода

```bash
  Делаем запрос на получение капчи
  Преобразовываем капчу в PNG и сохраняем в: ./captcha.png
  Отправляем капчу в формате base64 на rucaptcha
  Получаем решение капчи: 123456
  Делаем запрос на проверку капчи
  Делаем запрос на авторизацию
  Успешная авторизация: { id: 1, email: 'test@test.ru' }
```


## Решение проблем

1. **Капча не решается:**

-   Убедитесь, что ваш RUCAPTCHA_KEY действителен.
-   Проверьте баланс на аккаунте ruCaptcha.
-   Возможно капча решена не правильно, в этом можно убедиться, сравнив ответ от ruCaptcha с captcha.png

2. **Ошибки соединения:**

-   Убедитесь, что сервер на http://localhost:5000 запущен и доступен.

3. **Зависимости:**

-   Убедитесь, что все зависимости установлены. Повторно выполните npm install, если необходимо.
