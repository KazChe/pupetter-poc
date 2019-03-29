const CREDS = require('./creds.js');
const puppeteer = require('puppeteer');

async function run() {

const USERNAME_SELECTOR = '#login > div:nth-child(6) > input';
const PASSWORD_SELECTOR = '#login > div:nth-child(7) > input:nth-child(3)';
const BUTTON_SELECTOR = '#login > input.login--panel-form-button';
  const browser = await puppeteer.launch({
  headless: false
  });

    const wait_for_frame = (page, frame_name) => {
        let fulfill_promise;
        const promise = new Promise(x => fulfill_promise = x);

        // check_frame();

        return promise;

        const check_frame = () => {
            const frame = page.frames().find(current_frame => current_frame.name() === frame_name);
            console.log('found it',frame)
            if (frame) {
                fulfill_promise(frame);
            } else {
                page.once('frameattached', check_frame);
            }
        };
    };

  const page = await browser.newPage();
  
  await page.goto('https://goo.gl/6aFhFJ');

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();
  // let _frame;

 // for (let frame of page.frames()){
 //    // Here you can use few identifying methods like url(),name(),title()
 //        console.log(frame.url())
 //        if(frame.url().includes('TopFrameSiteNav10')) {
 //            console.log('FOUND our frame');
 //            // await frame.click('#tabReportsA')
 //            _frame = frame
 //            break;
 //            // frame.click('#tabReportsA');
 //            // await frame.waitForNavigation();
 //            // frame.click('#BusRpts')
 //
 //        // await Promise.all([
 //        //     // frame.$eval('a#tabReportsA', el => el.click()),
 //        //     // console.log('link cliecked')//frame.waitForNavigation(
 //        //         frame.click('#tabReportsA')
 //        // ]).catch(e => console.log(e));
	//     }
 //
 //    }


// Waiting for frame to become attached:
    const frame = await wait_for_frame(page, 'nav');

// Waiting for frame to contain a certain selector:
//     await frame.waitForSelector('#tabReportsA');
    await frame.waitForSelector('//*[@id="tabReportsA"]');


    const button = await frame.$(selector);

    button.click();

    // await Promise.all([
    //     _frame.$eval('#tabReportsA', el => el.click()),
    //     _frame.waitForNavigation()
    //         // _frame.click('#tabReportsA'))
    // ]).catch(e => console.log(e));
    // await page.waitForNavigation();

    // await _frame.click('#BusRpts')


     // browser.close();
}


run();
