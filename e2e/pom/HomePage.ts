import type { Page, Locator } from '@playwright/test';

export class HomePage {
  private readonly title: Locator;
  private readonly role: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.title = this.page.getByRole('heading', {
      name: 'Allysson Santos',
      level: 1,
    });
    this.role = this.page.getByRole('heading', {
      name: 'Trabalhando no O Boticário',
      level: 2,
    });
  }

  public async goto() {
    await this.page.goto('/');
  }

  public async isReady() {
    await this.title.isVisible();
    await this.role.isVisible();
  }
}
