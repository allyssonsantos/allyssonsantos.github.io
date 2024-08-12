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
    expect(home).toHaveText('Início');
    expect(home).toHaveAttribute('href', '/');

    // blog
    expect(blog).toHaveText('Blog');
    expect(blog).toHaveAttribute('href', '/blog');

    // about
    expect(about).toHaveText('Sobre');
    expect(about).toHaveAttribute('href', '/about');

    // social links

    // github
    expect(github).toHaveText('GitHub');
    expect(github).toHaveAttribute('href', 'https://github.com/allyssonsantos');
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener nofollow noreferrer');

    // x
    expect(x).toHaveText('X (Twitter)');
    expect(x).toHaveAttribute('href', 'https://twitter.com/_allyssonsantos');
    expect(x).toHaveAttribute('target', '_blank');
    expect(x).toHaveAttribute('rel', 'noopener nofollow noreferrer');

    // linkedin
    expect(linkedin).toHaveText('LinkedIn');
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/allyssonsantos/',
    );
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener nofollow noreferrer');
  });
});
