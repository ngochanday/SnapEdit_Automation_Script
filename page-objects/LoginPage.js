import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page){
        this.page = page
        this.loginBtn = page.locator('[id="download-button"]') //nhớ nhắc bên dev support đặt lại tên id cho đúng 
        this.loginDialog = page.locator('#headlessui-dialog-panel-4')
        this.googleLoginBtn = page.getByRole('button', { name: 'Continue with Google' })

        this.emailInput = page.locator('[id="identifierId"]')
        this.passwordInput = page.locator('[id=password]')
        this.nextBtn = page.locator('[id="identifierNext"]')

    }

    gotoLoginPage = async () => {
        //Click pn Login button in home screen
        await this.loginBtn.waitFor()
        await this.loginBtn.click()

        //Wait for Dialog appear and click on Login by Google button 
        await this.loginDialog.focus()
        await this.googleLoginBtn.click()

        const authorizeURL = "https://accounts.google.com/v3/signin/identifier?opparams=%253Fcontext_uri%253Dhttps%25253A%25252F%25252Fdev.snapedit.app&dsh=S-1089490287%3A1698657737687281&client_id=934515035182-fambd343db9ca9ors9hjn8l4s0hl9oaj.apps.googleusercontent.com&o2v=1&redirect_uri=https%3A%2F%2Fsnapedit-web-dev.firebaseapp.com%2F__%2Fauth%2Fhandler&response_type=code&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+profile&service=lso&state=AMbdmDkHimVR6eLnifR0GO7d-hDySyQ3217ApTYeqBQoGZP9-0OfXEd_b0_Hb5dItbhJw6X7uEC4DvWSrpiL-Whe1colbsM4OTvc6CFonNJ7xJM-GnZFISbmWlZ8T79kKrMAkM4-EHypxcaRB59RfzwacIMhoL50YBRiWSlTdKU2Oa6jNo_NUUIi7faEDS5JQJRubhA8U8HiM8j__MHnZXObPgeSR_rtd8OHOn2B02m81_xbVJqU_djrq-SyEhPh5DeZ_H3vL9CpXHu8ElHDzOYWTL7ebLfaX30mK-9_3_2IIhTgrUQkxnJiCjp57TLLykJa9TH5522Grbk&theme=glif&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANlVxHPqlVWhwA-9HYNJvnmY1NO7lepY1nXVxquRtGzIvdeYhz3PaloevYr0rcYvNo2eOJ8cYpCwPfDUyzbOpKaIn6QX7kwNewn2_kzUtNNJ6qWLmS2dJ3i7p7eR4nOw8a6l_iaOYNH55RRi0uJXqu0648DfRGw5EaysD5jEyrBZQRdNHQlOW7GNZi0krSRZ7FJtm0R5H2Q4Pi6RpOB8z8t1bdObaRYyXtkLrAH_kqQdome4UWcG8Ywv8loB1Hn5URhF3m-xqh2gmFYgtonVtGrZXweWtfE3FCeXdlraEHuSEGrAMlHFetIT2eRDMEEybizK3SMGubtJ73PreDIzb2NYrZlcr4futOPjkikWZRaiMnKpVbFXxHgakfE-6d8gwKf-DgevtVpIQwAuMeMNQOUMqMwaLuOXb8qZzOd0fndyWZ3GS0Ggw99LiVcA4VTL0v_iYPbm6ELZ2jaL5_Fj_aJcV8E0j-Wd1FAzIQLpy8NRZC03V4%26as%3DS-1089490287%253A1698657737687281%26client_id%3D934515035182-fambd343db9ca9ors9hjn8l4s0hl9oaj.apps.googleusercontent.com%26theme%3Dglif%23&app_domain=https%3A%2F%2Fsnapedit-web-dev.firebaseapp.com&rart=ANgoxccJaNhhX00slhnFPabE-RVWwK6b57A6qaxfxQIzlToFmYPl_cEvGeEqFhmkvyX5F1ks85yn6qq4ybHI5iHBFZRzERfWgQ"

         // Listen for popup events.
        this.page.on('popup', async (popup) => {
            console.log('Popup detected:', popup.url());

            // Interact with the popup.
            await popup.goto(authorizeURL);
            const emailInput = await popup.$('[id="identifierId"]')
            await emailInput.focus()
            await emailInput.type("contact.magiccut.app", {delay : 800})
            await emailInput.type("@gmail.com", {delay : 500})

            const nextBtn = await popup.$('[id="identifierNext"]')
            await nextBtn.click()

            // Close the popup when done.
            await popup.close();
        });
        await this.page.pause()
        
    }


    googleLogin = async () => {
        const { chromium } = require("playwright");

        const browser = await chromium.launch({
            headless: false,
            args: ["--disable-dev-shm-usage"],
        });
        const context = await browser.newContext({});
        const page = await context.newPage();
        const navigationPromise = page.waitForNavigation({
            waitUntil: "domcontentloaded",
        });
        await page.setDefaultNavigationTimeout(0);
        await page.goto(
            "https://accounts.google.com/v3/signin/identifier?opparams=%253Fcontext_uri%253Dhttps%25253A%25252F%25252Fdev.snapedit.app&dsh=S352847852%3A1697652443620054&client_id=934515035182-fambd343db9ca9ors9hjn8l4s0hl9oaj.apps.googleusercontent.com&o2v=1&redirect_uri=https%3A%2F%2Fsnapedit-web-dev.firebaseapp.com%2F__%2Fauth%2Fhandler&response_type=code&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+profile&service=lso&state=AMbdmDmjN9VlqIcSxLJWl_HsohqN_2nfuLntbuWbzc1O91TsaPA2b4UX95khDjYpuEgP-zehn_P0x3bX5_kgFT4zXkFW5oWhrUDzk1PiYg8MtMQvzv-D7mJ3Of_NEhntTaFPPRN3GzSXBP-n1TxGgMHN9xSfDPf2s5s_39pP4-e8UJv3kUJGlDOaRp-7ga6E4epMOUrdfvGslusIFHO9Zk9lV1m4tL7yW9Ajg_IREWMDwZoSDNlf29yMRkPLAezLpSHICD27hWsTDh-cAocNdUu_oz96tR0U93ZjMqEGQb8-nDBL7eyCfYMCHBrEoofh9s44oXBKdho6V-s&theme=glif&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hAN1WB_czsqhEJUX8N685uNvEpudwOTYVJkozAAt6Hun3Eyiyp672o1vp35betLxxcBgtjhvAvxH1Uly45tyPiD73SoJFgXl0FQv3ju9rFZ1cGpxh8z7zMRzG-x788hlOEnQxy19an0pBgpuHUkTIN_CGVgx4VUU56nJOyM4ja_lB6VZeQT0LpGDXOtbWveWTZCbbH0fB1zSd_5kdeBXBoGXmyrelkErGJ5s4Pkpwagxbir2_FyZQfb8rsKuNWXvwcie9ocPlOuFKyxangiScn7jrpj0A-LRCOFk8_AOXY6NNh9TvwpZkXDEwDkWnJptEXq3GKOwANkaXJRl0q8QV8BlDgpXqjGubZTaRAO19knBQTqyf7jFJuAU1S_uh6zx9urQFG4sC10Rhgsg2TGeaUGTZ2gzkv3uAd46BmXOFv2U1JiE8tz5Zo9dBaflkucgj250xLe0WjwUBSRP0zRUGQ0zWZUM0kZMMjaWis92PBu8_ZsDgyw%26as%3DS352847852%253A1697652443620054%26client_id%3D934515035182-fambd343db9ca9ors9hjn8l4s0hl9oaj.apps.googleusercontent.com%26theme%3Dglif%23&app_domain=https%3A%2F%2Fsnapedit-web-dev.firebaseapp.com&rart=ANgoxcei1oK849mhENnPhl72iXZcKQVmYZVA6BmhkThcmPJGpGYZ_lGeRn13i2Pn49meWS1EZ_K83XFSv3H65OBE8WXmzch-pA"
        );
        await navigationPromise;
        await page.waitForSelector('input[type="email"]');
        await page.type('input[type="email"]', "contact.magiccut.app@gmail.com");

        await page.waitForTimeout(3000)

        await page.click("#identifierNext");

        //chưa xử lý được chỗ này -> do google chặn các action automation cần research thêm 

        await page.waitForSelector('input[type="password"]', { visible: true });
        await page.type('input[type="password"]', "SilverAI@2023");
        await page.waitForSelector("#passwordNext", { visible: true });
        await page.click("#passwordNext");
        await navigationPromise;
    }

    
}