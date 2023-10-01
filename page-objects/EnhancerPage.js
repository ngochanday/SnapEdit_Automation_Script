import { expect } from "@playwright/test"

export class EnhancerPage {
    constructor(page){
        this.page = page
        this.productsDropDown = page.locator('//div[@id="product-dropdown"]')
        this.enhancerButton = page.locator('[id="enhance-button"]')
        this.listEnhanceDemoImg = page.locator('//ul[@id="list-demo-img"]//li')
        this.enhancerDownloadButton = page.locator('[class="inline-flex items-center justify-center w-full py-3 px-4 bg-blue-500 rounded-lg text-base transition text-white hover:bg-opacity-80"]')
    }

    goToEnhancerPage = async () => {
        //Open Home Page
        await this.page.goto("/")
        // await this.page.waitForTimeout(6000)

        //Hover on products dropdown
        await this.productsDropDown.waitFor()
        await this.productsDropDown.click()
        //wait the time out to hold on the button for 3 second
        await this.page.waitForTimeout(1000);

        //Click on Enhancer button in Dropdown list
        await this.enhancerButton.waitFor()
        await this.enhancerButton.click()

        //Assertion the navigation to the url https://dev.snapedit.app/enhance
        await this.page.waitForURL("/enhance")
    }

    goToEnhancerEditPage = async () => {
        const demoImg = this.listEnhanceDemoImg.first()
        console.log(demoImg)

        await this.page.pause()

        await demoImg.waitFor()
        await demoImg.click()
    }

    downloadEnhancerFile = async () => {
        await this.enhancerDownloadButton.waitFor()
        // Trigger the download action -> click on DownloadHD button
        await this.enhancerDownloadButton.click()
        //Wait for 3 seconds for Playwright to detect your download action 
        await this.page.waitForTimeout(5000)

        //Wait for the download event 
        const [download] = await Promise.all([
            //after triggering the download should wait for the download to be detectd by Playwright
            this.page.waitForEvent('download'),
        ]);

        //Access to the download file information
        const downloadedFilePath = download.path();
        console.log(`Downloaded file path: ${downloadedFilePath}`)
        const downloadedFileName = download.suggestedFilename()
        console.log(`Downloaded file name: ${downloadedFileName}`)

        // Assertions download file path is not null -> if not null it mean file download successful = passed
        expect(downloadedFilePath).not.toBeNull(); // Ensure a file path is available.

        // const download = await Promise.all([
        //     await this.enhancerDownloadButton.click(),
        //     await this.page.waitForTimeout(3000),
        //     await this.page.waitForEvent('download')
        // ])
        // const path = await download[0].path()
        // console.log(path)
    }
}