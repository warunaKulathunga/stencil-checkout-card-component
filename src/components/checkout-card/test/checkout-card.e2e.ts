import { newE2EPage } from '@stencil/core/testing';

describe('checkout-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<checkout-card></checkout-card>');

    const element = await page.find('checkout-card');
    expect(element).toHaveClass('hydrated');
  });
});
