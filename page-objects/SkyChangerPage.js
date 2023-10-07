import { test, expect } from "@playwright/test"

export class SkyChangerPage {
    constructor(page){
        this.page = page
        this.skyChangerButton = page.locator('[id="change-sky-button"]')
        this.productsDropDown = page.locator('//div[@id="product-dropdown"]')
        this.listRemoveBgDemoImg = page.locator('//ul[@id="list-demo-img"]//li')
        this.skyChangerDownloadButton = page.locator('(//button[@id="download-button"])[4]')
        this.skyChangerPreview = page.locator('(//canvas)[4]')

    }

    goToSkyChangerPage = async () => {
        //Open Home Page
        await this.page.goto("/")
        // await this.page.waitForTimeout(2000)

        //Hover on products dropdown
        await this.productsDropDown.waitFor()
        await this.productsDropDown.click({timeout : 8000})
        //wait the time out to hold on the button for 3 second
        // await this.page.waitForTimeout(2000);

        //Click on Sky Changer button in Dropdown list
        await this.skyChangerButton.waitFor()
        await this.skyChangerButton.click()

        //Assertion the navigation to the url https://dev.snapedit.app/change-sky
        await this.page.waitForURL("/change-sky")

    }

    goToSkyChangerEditPage = async () => {
        const demoImg = this.listRemoveBgDemoImg.first({timeout : 350000})
        // console.log(demoImg)
        await demoImg.waitFor()
        await demoImg.click()
    }

    downloadSkyChangerFile = async () => {
        await this.skyChangerPreview.waitFor({timeout : 600000})

        const downloadButton = this.skyChangerDownloadButton

        await downloadButton.waitFor({timeout : 60000})
        // await downloadButton.click()

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