import { test } from "@playwright/test"
import { RemoveObjectsPage } from "../page-objects/RemoveObjectsPage"
import { EnhancerPage } from "../page-objects/EnhancerPage"
import { RemoveBackgroundPage } from "../page-objects/RemoveBGPage"
import { RemoveWirePage } from "../page-objects/RemoveWirePage"
import { RemoveTextPage } from "../page-objects/RemoveTextPage"
import { RestorePage } from "../page-objects/RestorePage"
import { SkyChangerPage } from "../page-objects/SkyChangerPage"
import { LoginPage } from "../page-objects/LoginPage"

test('Go to Home Page', async ({ page }) => {
    const removeObjectsPage = new RemoveObjectsPage(page)
    await removeObjectsPage.visit()
})

test('Verify Remove Objects feature work and user able to download file', async ({ page }) => {
    const removeObjectsPage = new RemoveObjectsPage(page)

    // await removeObjectsPage.visit()
    
    await removeObjectsPage.goToEditPage()

    await removeObjectsPage.useAutoAI()
    
    await removeObjectsPage.removeObjects()

    await removeObjectsPage.downloadFile()

})
    
test('Verify Enhancer feature work and user able to download file', async ({ page }) => {
    const enhancerPage = new EnhancerPage(page)

    await enhancerPage.goToEnhancerPage()
    
    await page.waitForTimeout(3000)
    
    await enhancerPage.goToEnhancerEditPage()
  
    await enhancerPage.downloadEnhancerFile()

})

test('Verify Remove BG feature work and user able to download file', async ({ page }) => {
    const removeBgPage = new RemoveBackgroundPage(page)

    await removeBgPage.goToRemoveBGPage()

    await removeBgPage.goToRemoveBgEditPage()

    await page.waitForTimeout(3000)

    await removeBgPage.downloadRemoveBgFile()
        
    })

test('Verify Remove Wire Lines feature work and user able to download file', async ({ page }) => {
    const removeWire = new RemoveWirePage(page)

    await removeWire.goToRemoveWirePage()

    await removeWire.goToRemoveWireEditPage()

    await removeWire.removeWire()

    await removeWire.downloadRemoveWireFile()

})

test('Verify Remove Text feature work and user able to download file', async ({ page }) => {
    const removeText = new RemoveTextPage(page)

    await removeText.goToRemoveTextPage()

    await removeText.goToRemoveTextEditPage()

    await removeText.removeText()

    await removeText.downloadRemoveTextFile()

})

test('Verify Restore Old Image feature work and user able to download file', async ({ page }) => {
    const restoreImg = new RestorePage(page)

    await restoreImg.goToRestorePage()
    
    await page.waitForTimeout(3000)
    
    await restoreImg.goToRestoreEditPage()

    await restoreImg.downloadRestorerFile()

})

test('Verify Sky Changer feature work and user able to download file', async ({page}) => {
    const skyChanger = new SkyChangerPage(page)

    await skyChanger.goToSkyChangerPage()

    await skyChanger.goToSkyChangerEditPage()

    await skyChanger.downloadSkyChangerFile()

})

test('Verify user can login by use GG account', async ({page}) => {
    const loginPage = new LoginPage(page)

    await page.goto("/")

    await loginPage.gotoLoginPage()
})


