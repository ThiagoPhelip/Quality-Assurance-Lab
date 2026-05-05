import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../fixtures/users';

test.describe('Login Flow - Automation Practice', () => {
  test('@smoke should access login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await expect(page).toHaveURL(/login/);
  });

  test('@regression should try login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(users.valid.email, users.valid.password);

    await expect(page).not.toHaveURL(/error/);
  });

  test('@negative should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(users.invalid.email, users.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
