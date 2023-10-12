import 'dotenv/config'
import chrome from 'chrome-cookies-secure';
import puppeteer, { Browser } from 'puppeteer';

const url = 'https://www.chaiflicks.com/browse';

const executeWithCookies = (callback) => {
    chrome.getCookies(url, 'puppeteer', function (err, cookies) {
        if (err) {
            console.log(err, 'error');
            return
        }
        console.log(cookies, 'cookies');
        callback(cookies);
    }, process.env.CHROME_PROFILE) // e.g. 'Profile 2'
}

let browser = null;
let cookies = null;

/**
 * @typedef {Object} BrowserAndCookies
 * @property {Browser} browser
 * @property {PuppeteerCookie[]} cookies
 */

/**
 * 
 * @returns {Promise<BrowserAndCookies>}
 */
export default async function getBrowserAndCookies() {

    if (browser === null && cookies == null) {
        cookies = await getCookies();
        browser = await puppeteer.launch({
            headless: false,
            args: [
                "--flag-switches-begin",
                "--disable-site-isolation-trials",
                "--flag-switches-end",
                "--disable-features=site-per-process",
                "--disable-web-security",
            ]
        });
    }

    return { browser, cookies };
}

const getCookies = async () => {
    return new Promise((resolve) => {
        executeWithCookies(async (chromeCookies) => {
            resolve(chromeCookies);
        });
    })
}


