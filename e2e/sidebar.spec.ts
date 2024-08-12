import { test, expect } from './base';

test.describe('SideBar', () => {
  test('toggle theme', async ({ sideBar, page }) => {
    await sideBar.changeTheme();

    await expect(page.locator('html')).toHaveClass('dark');

    await sideBar.changeTheme();

    await expect(page.locator('html')).not.toHaveClass('dark');
    await expect(page.locator('html')).toHaveClass('light');
  });

  test('links', async ({ sideBar }) => {
    const [links, socialLinks] = await sideBar.getLinkLists();
    const [home, blog, about] = await links.getByRole('link').all();
    const [github, x, linkedin] = await socialLinks.getByRole('link').all();
    // home
    await expect(home).toHaveText('Início');
    await expect(home).toHaveAttribute('href', '/');

    // blog
    await expect(blog).toHaveText('Blog');
    await expect(blog).toHaveAttribute('href', '/blog');

    // about
    await expect(about).toHaveText('Sobre');
    await expect(about).toHaveAttribute('href', '/about');

    // social links

    // github
    await expect(github).toHaveText('GitHub');
    await expect(github).toHaveAttribute(
      'href',
      'https://github.com/allyssonsantos',
    );
    await expect(github).toHaveAttribute('target', '_blank');
    await expect(github).toHaveAttribute('rel', 'noopener nofollow noreferrer');

    // x
    await expect(x).toHaveText('X (Twitter)');
    await expect(x).toHaveAttribute(
      'href',
      'https://twitter.com/_allyssonsantos',
    );
    await expect(x).toHaveAttribute('target', '_blank');
    await expect(x).toHaveAttribute('rel', 'noopener nofollow noreferrer');

    // linkedin
    await expect(linkedin).toHaveText('LinkedIn');
    await expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/allyssonsantos/',
    );
    await expect(linkedin).toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute(
      'rel',
      'noopener nofollow noreferrer',
    );
  });
});
