import getBrowserAndCookies from "./browserWithCookes.js";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";
import delay from "./delay.js";
import * as fs from 'fs';

const baseUrl = process.env.SERIES_URL;
const numberOfSeasons = Number(process.env.NUMBER_OF_SEASONS);

const { browser, cookies } = await getBrowserAndCookies();
const episodes = [];

for (let i = 1; i <= numberOfSeasons; i++) {

    const url = `${baseUrl}season:${i}`
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.goto(url);

    await delay(1000)

    await scrollPageToBottom(page, {
        size: 500,
        delay: 250
    })

    await delay(1000);

    const links = await page.evaluate(() => {
        let elts = Array.from(document.querySelectorAll(".browse-item-link"));
        return elts.map(e => e.href)
    })

    episodes.push(links);
    console.log(i, "done", "\u0007")
}

fs.writeFileSync('episodes.json', JSON.stringify(episodes));

browser.close();