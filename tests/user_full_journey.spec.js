import { test } from "@playwright/test"
import { RemoveObjectsPage } from "../page-objects/RemoveObjectsPage"

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
});
