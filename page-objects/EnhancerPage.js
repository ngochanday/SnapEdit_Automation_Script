import { expect } from "@playwright/test"

export class EnhancerPage {
    constructor(page){
        this.page = page
        this.productsDropDown = page.locator('//div[@id="product-dropdown"]')
        this.enhancerButton = page.locator('[id="enhance-button"]')
        this.listEnhanceDemoImg = page.locator('//ul[@id="list-demo-img"]//li')
        this.upscale4XSize = page.locator('[id="4x-pro-size"]')
        this.enhancerDownloadButton = page.locator('(//button[@id="download-button"])[4]')
    }

    goToEnhancerPage = async () => {
        //Open Home Page
        await this.page.goto("/")
        // await this.page.waitForTimeout(2000)

        //Hover on products dropdown
        await this.productsDropDown.waitFor()
        await this.productsDropDown.click({timeout : 8000})
        //wait the time out to hold on the button for 3 second
        // await this.page.waitForTimeout(2000);

        //Click on Enhancer button in Dropdown list
        await this.enhancerButton.waitFor()
        await this.enhancerButton.click()

        //Assertion the navigation to the url https://dev.snapedit.app/enhance
        await this.page.waitForURL("/enhance")

    }

    goToEnhancerEditPage = async () => {
        const demoImg = this.listEnhanceDemoImg.first({timeout : 350000})
        console.log(demoImg)
        await demoImg.waitFor()
        await demoImg.click()
    }

    downloadEnhancerFile = async () => {

        const downloadButton = this.enhancerDownloadButton

        await downloadButton.waitFor()
        // await downloadButton.click()

        // await this.page.waitForTimeout(5000)

        //Wait for the download event 
        const [download] = await Promise.all([
            //after triggering the download should wait for the download to be detectd by Playwright
            this.page.waitForEvent('download'),
            await downloadButton.click()
        ]);
        //Access to the download file information
        const downloadedFilePath = download.path();
        console.log(`Downloaded file path: ${downloadedFilePath}`)
        const downloadedFileName = download.suggestedFilename()
        console.log(`Downloaded file name: ${downloadedFileName}`)

        // Specify the local directory where you want to save the downloaded file
        const localDirectoryPath = '/Users/hando/Documents/DownloadFiles/';

        // Combine the local directory path and the filename to create the full local path
        const localFilePath = localDirectoryPath + downloadedFileName;

        // Save the file locally using .saveAs()
        await download.saveAs(localFilePath);

        console.log(`File saved locally at: ${localFilePath}`);

        // Assertions download file path is not null -> if not null it mean file download successful = passed
        expect(localFilePath).not.toBeNull(); // Ensure a file path is available.
        
    }
}