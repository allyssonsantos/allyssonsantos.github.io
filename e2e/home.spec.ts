import { test, expect } from './base';

test('blog link', async ({ homePage }) => {
  await homePage.isReady();

  await expect(
    homePage.page.getByRole('heading', {
      name: 'Trabalhando no O Boticário',
      level: 2,
    }),
  ).toBeVisible();
});
