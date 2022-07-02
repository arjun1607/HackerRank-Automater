const loginLink = "https://www.hackerrank.com/auth/login";

let email ='tegefer743@weepm.com';
let password = 'tempaccount';
let puppeteer = require('puppeteer');
const codeFile = require('./code');
console.log('Before');

let page;


(async function() {
    try {
        const browserInstance = await puppeteer.launch({
            headless: false,
            args: ["--start-maximized"],
            defaultViewport: null
        });

        let newTab = await browserInstance.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[id='input-1']", email, { delay: 50 });
        await newTab.type("input[type='password']", password, { delay: 50 });
        await newTab.click("button[data-analytics='LoginPassword']", { delay: 50 });
        await waitAndClick(".topic-card a[data-attr1='algorithms']", newTab);
        await waitAndClick('input[value="warmup"]', newTab);
        let questionsArr = await newTab.$$('.challenge-submit-btn', { delay: 50 });
        // console.log(challengePromise.length);
        return questionWillBeSolved = questionSolver(newTab, questionsArr[0], codeObj.answers[0]);

    } catch (error) {
        console.log(error);
    }
})();

async function waitAndClick(selector, cPage) {
    try {
        await cPage.waitForSelector(selector);
        let selectorClicked = await cPage.click(selector);
        return selectorClicked;
    } catch (err) {
        return err;
    }
}

async function questionSolver(page, question, answer) {
    try {
        await question.click();
        await waitAndClick('.monaco-editor.no-user-select.vs', page);
        await waitAndClick('.checkbox-input', page);
        await page.waitForSelector('textarea.custominput', page);
        await page.type("textarea.custominput", answer, { delay: 10 });
        await page.keyboard.down("Control");
        await page.keyboard.press("A", { delay: 100 });
        await page.keyboard.press("X", { delay: 100 });
        await page.keyboard.up("Control");
        await waitAndClick('.monaco-editor.no-user-select.vs', page);
        await page.keyboard.down("Control");
        await page.keyboard.press("A", { delay: 100 });
        await page.keyboard.press("V", { delay: 100 });
        await page.keyboard.up("Control");
        await page.click(".hr-monaco-submit", { delay: 50 });
    } catch (err) {
        console.log(err);
    }
}

console.log("After");