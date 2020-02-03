const puppeteer = require('puppeteer');
const request = require('request-promise');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto('https://www.earningswhispers.com/', {
        waitUntil: 'networkidle0',
      });

    await page.waitForSelector('#GetWhisperIcon' , {
        timeout: 5000
      })
    await page.click('#GetWhisperIcon');  

    await page.waitForSelector('#GetWhisperIcon' , {
        timeout: 5000
      })

    await page.type('#symbol', 'AAPL', {delay: 200});
    await page.keyboard.press('Enter');

    await page.waitForSelector('#lastarrow' , {
        timeout: 5000
      })

    const element = await page.$('#lastarrow');
    const greenArrow = await element.getProperty('greenarrow');
    const redArrow = await element.getProperty('greenarrow');

    const result = greenArrow ? 'green' : redArrow ? 'red' : 'na';

    console.log(result);

    const res = await postEarning({
      Symbol: "AAPL",
      EarningsReleaseDate : "01/01/2020",
      EarningArrow: "green"
    });
    
    await browser.close();


})();



async function postEarning(earnings) {
  const options = {
    method: 'POST'
    ,json: true
    ,uri: 'http://localhost:7071/api/earnings'
    ,body: earnings
    ,headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    return await request(options);
  }
  catch (error) {
    return false;
  }
}


// const request = require('request-promise');

// async function preparePayment(cents) {
//   const options = {
//     method: 'POST'
//     ,json: true
//     ,uri: 'https://pay.org/v1/checkouts'
//     ,body: { 'amount': cents }
//   };
//   try {
//     const response = await request(options);
//     return (response.id == 5);
//   }
//   catch (error) {
//     return false;
//   }
// }