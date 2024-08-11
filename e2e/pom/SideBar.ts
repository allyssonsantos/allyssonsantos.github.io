import type { Page, Locator } from '@playwright/test';

export class SideBar {
  public readonly sidebar: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.sidebar = this.page.getByRole('navigation');
  }

  public async isReady() {
    await this.sidebar.isVisible();
  }

  public async changeTheme() {
    const themeSwitch = this.page.getByLabel('Trocar tema');
    await themeSwitch.click();
  }
}
