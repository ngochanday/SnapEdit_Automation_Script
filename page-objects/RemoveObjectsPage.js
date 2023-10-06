import { expect } from "@playwright/test"

export class RemoveObjectsPage {
    constructor(page){
        this.page = page
        this.listDemoImages = page.locator('//ul[@id="list-demo-img"]//li')
        this.autoAIButton = page.locator('[id="ai-auto-tab"]')
        this.objectFounded = page.locator('[class="flex-auto"]')
        this.selectAllButton = page.locator('[id="select-all-obj-button"]')
        this.removeButton = page.locator('[id="remove-button"]')
        this.objectItems = page.locator('[class="flex-1 overflow-auto"]')
        this.downloadButton = page.locator('//div[@id="mobile-download-button"]')
        this.dowloadFreeButton = page.locator('[id="download-hd-button"]')
    }

    //define go to Remove Objects Page method
    visit = async () => {
        await this.page.goto("/")
    }


    goToEditPage = async () => {
        const demoImg = this.listDemoImages.first()

        await demoImg.waitFor()
        await demoImg.click()
    }


    useAutoAI = async () => {
        await this.autoAIButton.waitFor()
        await this.autoAIButton.click()

        await this.objectFounded.waitFor()
        const text = await this.objectFounded.innerText()
        console.warn(text)

        //Assertion: verify autoAI return objects successfully
        expect (this.objectFounded).toHaveText("5 objects has been found")

        await this.selectAllButton.waitFor()
        await this.selectAllButton.click()
    }

    removeObjects = async () => {
        const objectItems = this.objectItems
        // console.warn(objectItems.nth(1))

        await objectItems.waitFor()
        //Assert that AI have return Objects list after user use AutoAI
        await expect (objectItems).toBeVisible()

        await this.removeButton.waitFor()
        await this.removeButton.click()

        await this.downloadButton.waitFor()
        await this.downloadButton.click()

    }


    downloadFile = async () => {
        await this.dowloadFreeButton.waitFor()
        
        // Trigger the download action -> click on DownloadHD button
        await this.dowloadFreeButton.click()

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