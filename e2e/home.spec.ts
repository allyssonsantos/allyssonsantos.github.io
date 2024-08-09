import { test, expect } from './base';

test('Home page', async ({ homePage }) => {
  await homePage.isReady();

  await expect(
    homePage.page.getByRole('heading', {
      name: 'Trabalhando no O Boticário',
      level: 2,
    }),
  ).toBeVisible();
  await expect(homePage.posts).toHaveCount(1);
});
