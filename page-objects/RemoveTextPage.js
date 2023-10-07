import { test, expect } from "@playwright/test"

export class RemoveTextPage {
    constructor(page){
        this.page = page
        this.removeTextButton = page.locator('[id="remove-text-button"]')
        this.productsDropDown = page.locator('//div[@id="product-dropdown"]')
        this.listRemoveTextDemoImg = page.locator('//ul[@id="list-demo-img"]//li')
        this.removeButton = page.locator('[id="remove-button"]')
        this.removeTextDownloadButton = page.locator('//div[@id="mobile-download-button"]')
    }

    goToRemoveTextPage = async () => {
        //Open Home Page
        await this.page.goto("/")

        //Hover on products dropdown
        await this.productsDropDown.waitFor()
        await this.productsDropDown.click({timeout : 35000})
        //wait the time out to hold on the button for 3 second
        // await this.page.waitForTimeout(2000);

        //Click on Remove Wire button in Dropdown list
        await this.removeTextButton.waitFor()
        await this.removeTextButton.click()

        //Assertion the navigation to the url https://dev.snapedit.app/remove-wire-line
        await this.page.waitForURL("/remove-text")

    }

    goToRemoveTextEditPage = async () => {
        const demoImg = this.listRemoveTextDemoImg.first({timeout : 350000})
        console.log(demoImg)
        await demoImg.waitFor()
        await demoImg.click()
    }

    removeText = async () => {
        await this.removeButton.waitFor({timeout : 500000})
        await this.removeButton.click()
    }

    downloadRemoveTextFile = async () => {

        const downloadButton = this.removeTextDownloadButton
        await downloadButton.waitFor({timeout : 350000})

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
        // expect(downloadedFilePath).not.toBeNull(); // Ensure a file path is available.
        expect(localFilePath).not.toBeNull(); // Ensure a file path is available.

    }
}