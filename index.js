const CREDS = require('./creds.js');
const puppeteer = require('puppeteer');

async function run() {

const USERNAME_SELECTOR = '#login > div:nth-child(6) > input';
const PASSWORD_SELECTOR = '#login > div:nth-child(7) > input:nth-child(3)';
const BUTTON_SELECTOR = '#login > input.login--panel-form-button';
  const browser = await puppeteer.launch({
  headless: false
  });
  const page = await browser.newPage();
  
  await page.goto('https://goo.gl/6aFhFJ');

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();
  let _frame;
 for (let frame of page.frames()){
    // Here you can use few identifying methods like url(),name(),title()
        console.log(frame.name())
        if(frame.url().includes('TopFrameSiteNav10')) {
            console.log('FOUND our frame');
            // await frame.click('#tabReportsA')
            _frame = frame
            break;
            // frame.click('#tabReportsA');
            // await frame.waitForNavigation();
            // frame.click('#BusRpts')

        // await Promise.all([
        //     // frame.$eval('a#tabReportsA', el => el.click()),
        //     // console.log('link cliecked')//frame.waitForNavigation(
        //         frame.click('#tabReportsA')
        // ]).catch(e => console.log(e));
	    }

    }
    // page.on('framenavigated',frame =>  _frame.click('#tabReportsA'))

    await Promise.all([
        _frame.$eval('#tabReportsA', el => el.click())
    ]).catch(e => console.log(e));

    await Promise.all([
        _frame.$eval('#BusRpts', el => el.click())
    ]).catch(e => console.log(e));

    //todo: must hook into the 'main' frame to click - add this logic
    await Promise.all([
        _frame.$eval('#rcbReportType_Input', el => el.click())
    ]).catch(e => console.log(e));



    // browser.close();
}

//#rcbReportType_Input
run();
