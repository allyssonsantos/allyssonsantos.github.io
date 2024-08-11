import type { Page, Locator } from '@playwright/test';

export class ArticlePage {
  public readonly title: Locator;
  public readonly image: Locator;
  public readonly likeButton: Locator;
  public readonly loginButton: Locator;
  public readonly comments: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.title = this.page.getByRole('heading', {
      level: 1,
    });
    this.image = this.page.getByRole('img');

    this.likeButton = this.page.getByText('curtidas');
    this.loginButton = this.page.getByText(
      'Faça o login para deixar um comentário',
    );
    this.comments = this.page.getByRole('heading', {
      name: 'Comentários',
      level: 2,
    });
  }

  public async goto() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Blog' }).click();
    await this.page
      .getByRole('main')
      .getByRole('listitem')
      .getByRole('link')
      .click();
  }

  public async isReady() {
    await this.title.isVisible();
    await this.likeButton.isVisible();
    await this.comments.isVisible();
  }

  public async clickLikeButton() {
    await this.likeButton.click();
  }

  public async clickLoginButton() {
    await this.loginButton.click();
  }

  public async getModal() {
    return this.page.getByRole('dialog');
  }

  public async closeModal() {
    const modal = await this.getModal();
    await modal.getByRole('button', { name: 'Fechar modal' }).click();
  }
}
