import { test, expect } from "@playwright/test"

export class RemoveBackgroundPage {
    constructor(page){
        this.page = page
        this.removeBgButton = page.locator('[id="remove-bg-button"]')
        this.productsDropDown = page.locator('//div[@id="product-dropdown"]')
        this.listRemoveBgDemoImg = page.locator('//ul[@id="list-demo-img"]//li')
        this.removeBgDownloadButton = page.locator('(//button[@id="download-button"])[4]')

    }

    goToRemoveBGPage = async () => {
        //Open Home Page
        await this.page.goto("/")
        // await this.page.waitForTimeout(2000)

        //Hover on products dropdown
        await this.productsDropDown.waitFor()
        await this.productsDropDown.click({timeout : 8000})
        //wait the time out to hold on the button for 3 second
        // await this.page.waitForTimeout(2000);

        //Click on Remove BG button in Dropdown list
        await this.removeBgButton.waitFor()
        await this.removeBgButton.click()

        //Assertion the navigation to the url https://dev.snapedit.app/enhance
        await this.page.waitForURL("/remove-bg")

    }

    goToRemoveBgEditPage = async () => {
        const demoImg = this.listRemoveBgDemoImg.first({timeout : 350000})
        console.log(demoImg)
        await demoImg.waitFor()
        await demoImg.click()
    }

    downloadRemoveBgFile = async () => {

        const downloadButton = this.removeBgDownloadButton

        await downloadButton.waitFor()
        await downloadButton.click()

        //Wait for the download event 
        const [download] = await Promise.all([
            //after triggering the download should wait for the download to be detectd by Playwright
            this.page.waitForEvent('download')
        ]);
        //Access to the download file information
        const downloadedFilePath = download.path();
        console.log(`Downloaded file path: ${downloadedFilePath}`)
        const downloadedFileName = download.suggestedFilename()
        console.log(`Downloaded file name: ${downloadedFileName}`)

        // Assertions download file path is not null -> if not null it mean file download successful = passed
        expect(downloadedFilePath).not.toBeNull(); // Ensure a file path is available.
    }
}