import { expect } from "@playwright/test"

export class EnhancerPage {
    constructor(page){
        this.page = page
        this.prooductsDropDown = page.locator('[class="H14B inline-flex items-center space-x-1.5 cursor-pointer px-3 py-2 rounded-lg transition hover:bg-blue-100 hover:text-blue-500 bg-blue-100 text-blue-500"]')
        this.enhancerButton = page.locator('button:has-text("Enhancer")')
    }

    goToEnhancerPage = async () => {
        //Open Home Page
        await this.page.goto("/")

        //Hover on products dropdown
        await this.prooductsDropDown.waitFor()
        await this.prooductsDropDown.click()
        //wait the time out to keep the hover for 2 second
        await this.page.waitForTimeout(3000);

        //Click on Enhancer button in Dropdown list
        await this.enhancerButton.waitFor()
        await this.enhancerButton.click()

    }
}