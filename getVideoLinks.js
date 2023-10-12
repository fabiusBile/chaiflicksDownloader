import getBrowserAndCookies from "./browserWithCookes.js";
import * as fs from 'fs';
import delay from "./delay.js";

const episodes = JSON.parse(fs.readFileSync("./episodes.json"));

const { browser, cookies } = await getBrowserAndCookies();
const seasonToDownload = Number(process.env.SEASON) - 1

for (var e of episodes[seasonToDownload]) {
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    const url = e;
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    let config = undefined;

    var promise = new Promise((resolve) => {
        page.on("response", async (request) => {
            if (request.url().includes("config?autoplay")) {
                let body = await request.text();
                config = JSON.parse(body);
                const currentUrl = config.request.files.progressive.find(e => e.quality == '1080p');
                console.log(e, "added!");

                fs.appendFile('./links.txt', currentUrl.url + "\n", function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });

                await delay(5000);
                resolve();

            }
        });
    })

    await page.goto(url);
    await promise;
}