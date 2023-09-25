import { test } from "@playwright/test"
import { RemoveObjectsPage } from "../page-objects/RemoveObjectsPage"
import { EnhancerPage } from "../page-objects/EnhancerPage"

test.describe('suite 1', () => {
    test('Verify Remove Objects feature work correctly', async ({ page }) => {
        const removeObjectsPage = new RemoveObjectsPage(page)
        removeObjectsPage.visit()
    
        await page.pause()
    
        removeObjectsPage.goToEditPage()
    
        await page.pause()
    
        removeObjectsPage.useAutoAI()
    
        await page.pause()
    
        removeObjectsPage.removeObjects()
    
        await page.pause()
    
        removeObjectsPage.downloadFile()
    
        await page.pause()
    })
    
    test.skip('Verify Enhancer feature work correctly', async ({ page }) => {
        const enhancerPage = new EnhancerPage(page)
        enhancerPage.goToEnhancerPage()
    
        await page.pause()
    
        enhancerPage.goToEnhancerEditPage()
    
        await page.pause()
    
        enhancerPage.downloadEnhancerFile()
    
        await page.pause()
    
    })
})


