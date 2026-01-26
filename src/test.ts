import { writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

export async function test() {
  const browser = await chromium.launch({ headless: false })

  const context = await browser.newContext()

  const page = await context.newPage()

  await page.goto('https://www.baidu.com')

  const screenshotBuf = await page.screenshot()
  writeFileSync('screenshot.png', screenshotBuf)

  await browser.close()
}
