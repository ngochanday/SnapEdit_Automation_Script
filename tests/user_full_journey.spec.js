import { test } from "@playwright/test"
import { RemoveObjectsPage } from "../page-objects/RemoveObjectsPage"
import { EnhancerPage } from "../page-objects/EnhancerPage"

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

test('Verify Enhancer feature work correctly', async ({ page }) => {
    const enhancer = new EnhancerPage(page)
    enhancer.goToEnhancerPage()

    await page.pause()

})
