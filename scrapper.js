const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:"networkidle0",});

    const [el] = await page.$x('//*[@id="shipmentResults"]/div[1]/div[1]/div/dl[1]/dd[4]/a');
    const txt = await el.getProperty('textContent');
    const departureDate = await txt.jsonValue();
    const depDateFix = departureDate.replace(/\s+/g, "").trim();

    const [el2] = await page.$x('//*[@id="shipmentResults"]/div[1]/div[1]/div/dl[2]/dd[3]');
    const txt2 = await el2.getProperty('textContent');
    const arrivalDate = await txt2.jsonValue();
    const arrivalDateFix = arrivalDate.replace(/\s+/g, "").trim();

    const [el3] = await page.$x('//*[@id="vassel"]');
    const txt3 = await el3.getProperty('textContent');
    const vesselName  = await txt3.jsonValue();
    const vesselNameFix = vesselName.replace(/\s+/g, "").trim();

    const [el4] = await page.$x('//*[@id="shipmentResults"]/div[1]/div[1]/div/dl[3]/dd[4]');
    const txt4 = await el4.getProperty('textContent');
    const voyageNumber = await txt4.jsonValue();
    const voyageNumberFix = voyageNumber.replace(/\s+/g, "").trim();

    const [el5] = await page.$x('//*[@id="shipmentResults"]/div[1]/div[1]/div/dl[4]/dd[3]');
    const txt5 = await el5.getProperty('textContent');
    const transitTime = await txt5.jsonValue();
    const transitTimeFix = transitTime.replace(/\s+/g, "");



    console.log({depDateFix, arrivalDateFix, vesselNameFix, voyageNumberFix, transitTimeFix});
    browser.close();
 
}

scrapeProduct('https://www.maersk.com/schedules/#?from=20JS07ETK8AE1&to=31RTK5H2BLBS3&fromServiceMode=CY&toServiceMode=CY&date=2020-08-23&dateType=D&numberOfWeeks=4&containerIsoCode=42G1&vesselFlag=');