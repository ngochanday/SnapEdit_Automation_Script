import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page){
        this.page = page
        this.loginBtn = page.locator('[id="download-button"]') //nhớ nhắc bên dev support đặt lại tên id cho đúng 
        this.loginDialog = page.locator('[id="headlessui-dialog-panel-6"]')
        this.googleLoginBtn = page.locator('//body//div[@id="headlessui-portal-root"]//div//div//button[1]')

    }

    gotoLoginPage = async () => {
        //Open Home Page
        // await this.page.goto("/")

        //Click pn Login button in home screen
        await this.loginBtn.waitFor()
        await this.loginBtn.click()

        //Wait for Dialog appear and click on Login by Google button 
        await this.loginDialog.waitFor()
        await this.googleLoginBtn.click()
    }
}