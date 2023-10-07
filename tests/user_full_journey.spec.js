import { test } from "@playwright/test"
import { RemoveObjectsPage } from "../page-objects/RemoveObjectsPage"
import { EnhancerPage } from "../page-objects/EnhancerPage"
import { RemoveBackgroundPage } from "../page-objects/RemoveBGPage"
import { RemoveWirePage } from "../page-objects/RemoveWirePage"
import { RemoveTextPage } from "../page-objects/RemoveTextPage"
import { SkyChangerPage } from "../page-objects/SkyChangerPage"

test('Verify Remove Objects feature work correctly', async ({ page }) => {
    const removeObjectsPage = new RemoveObjectsPage(page)

    await removeObjectsPage.visit()
    
    await removeObjectsPage.goToEditPage()

    await removeObjectsPage.useAutoAI()
    
    await removeObjectsPage.removeObjects()

    await removeObjectsPage.downloadFile()

})
    
test.skip('Verify Enhancer feature work correctly', async ({ page }) => {
    const enhancerPage = new EnhancerPage(page)

    await enhancerPage.goToEnhancerPage()
    
    await page.waitForTimeout(3000)
    
    await enhancerPage.goToEnhancerEditPage()
  
    await enhancerPage.downloadEnhancerFile()

})

test('Verify Remove BG feature work correctly', async ({ page }) => {
    const removeBgPage = new RemoveBackgroundPage(page)

    await removeBgPage.goToRemoveBGPage()

    await removeBgPage.goToRemoveBgEditPage()

    await page.waitForTimeout(3000)

    await removeBgPage.downloadRemoveBgFile()
        
    })

test('Verify Remove Wire Lines feature work correctly', async ({ page }) => {
    const removeWire = new RemoveWirePage(page)

    await removeWire.goToRemoveWirePage()

    await removeWire.goToRemoveWireEditPage()

    await removeWire.removeWire()

    await removeWire.downloadRemoveWireFile()

})

test('Verify Remove Text feature work correctly', async ({ page }) => {
    const removeText = new RemoveTextPage(page)

    await removeText.goToRemoveTextPage()

    await removeText.goToRemoveTextEditPage()

    await removeText.removeText()

    await removeText.downloadRemoveTextFile()

})

test.only('Verify Sky Changer feature work correctly', async ({page}) => {
    const skyChanger = new SkyChangerPage(page)

    await skyChanger.goToSkyChangerPage()

    await skyChanger.goToSkyChangerEditPage()

    await skyChanger.downloadSkyChangerFile()

})



