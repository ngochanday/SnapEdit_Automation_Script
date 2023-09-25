import { expect } from "@playwright/test"

export class RemoveObjectsPage {
    constructor(page){
        this.page = page
        this.demoImage = page.locator('li.inline-block button')
        this.autoAIButton = page.locator('[class="py-3 border-b-2 text-sm font-semibold cursor-pointer text-center border-gray-200 text-neutral"]')
        this.objectFounded = page.locator('[class="flex-auto"]')
        this.selectAllButton = page.locator('[class="text-blue-500 flex justify-end items-center cursor-pointer"]')
        this.removeButton = page.locator('[class="px-4 pb-4"]')
        this.objectItems = page.locator('[class="flex-1 overflow-auto"]')
        this.downloadButton = page.locator('[class="inline-block align-middle py-3 px-4"]')
        this.dowloadFreeButton = page.locator('[class="btn block w-full py-3 px-4 bg-primary text-white rounded-lg text-base transition hover:bg-opacity-80 focus:bg-primary-focus focus:text-white w-full font-medium"]')
    }

    //define go to Remove Objects Page method
    visit = async () => {
        await this.page.goto("/")
    }


    goToEditPage = 
    async () => {
        const demoImage =  this.demoImage.first()
        //Tap on first demo image -> go to Edit page
        await demoImage.waitFor()
        await demoImage.click()
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

        // await this.page.waitForTimeout(10000) // Pause for 10 seconds

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

        // Assertions download file path is not null -> if not null it mean file download successful = passed
        expect(downloadedFilePath).not.toBeNull(); // Ensure a file path is available.
    }

}