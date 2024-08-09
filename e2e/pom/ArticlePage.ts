import type { Page, Locator } from '@playwright/test';

export class ArticlePage {
  public readonly title: Locator;
  public readonly skills: Locator;
  public readonly projects: Locator;
  public readonly companies: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.title = this.page.getByRole('heading', {
      level: 1,
    });
    this.skills = this.page.getByRole('group');

    this.projects = this.page.getByRole('main').getByRole('button');
    this.companies = this.page.getByRole('main').getByRole('listitem');
  }

  public async goto() {
    await this.page.goto('/about');
  }

  public async isReady() {
    await this.title.isVisible();
  }

  public async clickOnProject(project: Locator) {
    await project.click();
  }

  public async getModal() {
    return this.page.getByRole('dialog');
  }

  public async getModalTitle(text: string) {
    const modal = await this.getModal();
    return modal.getByRole('heading', { name: text, level: 2 });
  }

  public async closeModal() {
    const modal = await this.getModal();
    await modal.getByRole('button', { name: 'Fechar modal' }).click();
  }
}
