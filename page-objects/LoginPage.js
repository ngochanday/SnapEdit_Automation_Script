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
}