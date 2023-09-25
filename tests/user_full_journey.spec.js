import { test } from "@playwright/test"
import { RemoveObjectsPage } from "../page-objects/RemoveObjectsPage"
import { EnhancerPage } from "../page-objects/EnhancerPage"

test.describe('suite 1', () => {
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
    
    test.only('Verify Enhancer feature work correctly', async ({ page }) => {
        const enhancerPage = new EnhancerPage(page)
        // await page.goto("/enhance")

        enhancerPage.goToEnhancerPage()
    
        // await page.pause()
        await page.waitForTimeout(3000)
    
        enhancerPage.goToEnhancerEditPage()
    
        // await page.pause() 
        await page.waitForTimeout(3000)

    
        enhancerPage.downloadEnhancerFile()

        await page.waitForTimeout(3000)
        // await page.pause()
    
    })
})


