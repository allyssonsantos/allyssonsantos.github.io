import type { Locator } from '@playwright/test';
import { test, expect } from './base';

async function checkLoginModal(loginModal: Locator) {
  await expect(loginModal).toBeVisible();
  await expect(
    loginModal.getByText('Escolha uma forma de login:'),
  ).toBeVisible();
  await expect(
    loginModal.getByRole('button', { name: 'Entre com sua conta do google' }),
  ).toBeVisible();
}

test('Article page', async ({ articlePage }) => {
  await articlePage.clickLikeButton();
  const likeLoginModal = await articlePage.getModal();
  await checkLoginModal(likeLoginModal);
  await articlePage.closeModal();

  await articlePage.clickLoginButton();
  const loginModal = await articlePage.getModal();
  await checkLoginModal(loginModal);
  await articlePage.closeModal();
});
