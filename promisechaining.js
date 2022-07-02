const loginLink = "https://www.hackerrank.com/auth/login";

let email ='tegefer743@weepm.com'
let password = 'tempaccount'
let puppeteer = require('puppeteer')
const codeFile = require('./code')
console.log('Before')

let page;
// initialise the puppeteer
let browserWillbeLauchedPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized', '--start-fullscreen']
})

browserWillbeLauchedPromise.then(function(browserInstance){
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
}) // if newTabPromise is resolved then below function is called resolve(newTab)
.then(function(newTab){
    console.log('New Tab opened');

    page = newTab;

    let pageWillBeOpenedPromise = newTab.goto(loginLink);
    return pageWillBeOpenedPromise;
}).then(function(webPage){
    //console.log('Website Opened')
    let typeEmailPromise = page.type("input[id='input-1']", email, {delay : 50});
    return typeEmailPromise;
}).then(function(){
    let typePasswordPromise = page.type("input[id='input-2']", password, {delay : 50});
    return typePasswordPromise;

}).then(function(){
    let loginPromise = page.click('button[data-analytics="LoginPassword"]', {delay : 50});
    return loginPromise;
}).then(function(){
    // we cannot target the element if the page has not loaded
    let algoWillBeClickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
    return algoWillBeClickedPromise;
}).then(function(){
    let getToWarmupPromise = waitAndClick('input[value="warmup"]', page);
    return getToWarmupPromise;
}).then(function(){
    let waitfor3Seconds = page.waitFor(2000);
    return waitfor3Seconds;
}).then(function(){
    // count the total no of Solve Challenge buttons
    // document.querySelectorAll() -> $$ (shorthand)
    let ChallengesArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay: 100});
    return ChallengesArrPromise;
}).then(function(questionArr){
    console.log("No of Questions: " + questionArr.length);

    let questionWillBeSolvedPromise = questionSolver(page, questionArr[0], codeFile.answers[0]);
});

function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModalPromise = cPage.waitForSelector(selector);
        waitForModalPromise.then(function(){
            let clickModalPromise = cPage.click(selector, {delay :100})
            return clickModalPromise
        }).then(function(){
            resolve()
        }).catch(function(){
            reject()
        })
    })
}

function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClickedPromise = question.click();
        questionWillBeClickedPromise.then(function(){
            //console.log('question clicked')
            let waitForEditorPromise=waitAndClick('.monaco-editor.no-user-select.vs', page);
            return waitForEditorPromise;
        }).then(function(){
            // we'll write code in CUSTOM INPUT text box
            return waitAndClick(".checkbox-input", page);
        }).then(function(){
            return page.waitForSelector('.text-area.custominput')
        }).then(function(){
            return page.type('.text-area.custominput', answer, {delay:10})
        }).then(function(){
            let ctrlOnHoldPromise=page.keyboard.down('Control');
            return ctrlOnHoldPromise;
        }).then(function(){
            let AisPressedPromised = page.keyboard.press('A', {delay:100});
            return AisPressedPromised;
        }).then(function(){
            //console.log('Select All Implemented');
            let XisPressedPromise = page.keyboard.press('X', {delay:20})
            return XisPressedPromise;
        }).then(function(){
            let ctrlIsRelesedPromise=page.keyboard.up('Control')
            return ctrlIsRelesedPromise;
        }).then(function(){
            let waitForEditorPromise=waitAndClick('.monaco-editor.no-user-select.vs', page);
            return waitForEditorPromise;
        }).then(function(){
            let ctrlOnHoldPromise=page.keyboard.down('Control');
            return ctrlOnHoldPromise;          
        }).then(function(){
            let AisPressedPromised = page.keyboard.press('A', {delay:50});
            return AisPressedPromised;
        }).then(function(){
            let VisPressedPromise=page.keyboard.press('V');
            return VisPressedPromise;
        }).then(function(){
            //console.log('Paste Implemented');
            let ctrlIsRelesedPromise=page.keyboard.up('Control')
            return ctrlIsRelesedPromise;
        }).then(function(){
            return page.click('.hr-monaco-submit', {delay:50})
        }).then(function(){
            resolve()
        }).catch(function(err){
            console.log(err);
        })
    });
}


console.log('After');