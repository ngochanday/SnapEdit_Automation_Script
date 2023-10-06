import { test } from "@playwright/test"
import { RemoveObjectsPage } from "../page-objects/RemoveObjectsPage"
import { EnhancerPage } from "../page-objects/EnhancerPage"
import { RemoveBackgroundPage } from "../page-objects/RemoveBGPage"
import { RemoveWirePage } from "../page-objects/RemoveWirePage"

test.describe('Test suite: SnapEdit Website feature flow', () => {
    test('Verify Remove Objects feature work correctly', async ({ page }) => {
        const removeObjectsPage = new RemoveObjectsPage(page)
        removeObjectsPage.visit()
    
        // await page.pause()
        await page.waitForTimeout(3000)

    
        removeObjectsPage.goToEditPage()
    
        // await page.pause()
        await page.waitForTimeout(3000)

    
        removeObjectsPage.useAutoAI()
    
        // await page.pause()
        await page.waitForTimeout(3000)
    
        removeObjectsPage.removeObjects()
    
        // await page.pause()
        await page.waitForTimeout(10000)


        removeObjectsPage.downloadFile()
    
        // await page.pause()
        await page.waitForTimeout(3000)

    })
    
    test.skip('Verify Enhancer feature work correctly', async ({ page }) => {
        const enhancerPage = new EnhancerPage(page)

        enhancerPage.goToEnhancerPage()
    
        // await page.pause()
        await page.waitForTimeout(3000)
    
        enhancerPage.goToEnhancerEditPage()
    
        await page.pause() 
        // await page.waitForTimeout(3000)

    
        enhancerPage.downloadEnhancerFile()

        // await page.pause()
        await page.waitForTimeout(3000)

    
    })

    test('Verify Remove BG feature work correctly', async ({ page }) => {
        const removeBgPage = new RemoveBackgroundPage(page)

        removeBgPage.goToRemoveBGPage()

        // await page.pause()
        await page.waitForTimeout(3000)


        removeBgPage.goToRemoveBgEditPage()

        // await page.pause()
        await page.waitForTimeout(3000)


        removeBgPage.downloadRemoveBgFile()

        // await page.pause()
        await page.waitForTimeout(3000)

        
    })

    test('Verify Remove Wire Lines feature work correctly', async ({ page }) => {
        const removeWire = new RemoveWirePage(page)

        removeWire.goToRemoveWirePage()

        // await page.pause()
        await page.waitForTimeout(3000)

        removeWire.goToRemoveWireEditPage()

        // await page.pause()
        await page.waitForTimeout(3000)

        removeWire.removeWire()

        // await page.pause()

        removeWire.downloadRemoveWireFile()

        // await page.pause()
        await page.waitForTimeout(3000)

        
    })
})


