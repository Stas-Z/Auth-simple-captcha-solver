import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { config } from './config';

const jar = new CookieJar();

export const $api = wrapper(
    axios.create({
        baseURL: config.serverUrl,
        jar,
        withCredentials: true,
    })
);
