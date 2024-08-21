import { newSpecPage } from '@stencil/core/testing';
import { CheckoutCard } from '../checkout-card';

describe('checkout-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CheckoutCard],
      html: `<checkout-card></checkout-card>`,
    });
    expect(page.root).toEqualHtml(`
      <checkout-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </checkout-card>
    `);
  });
});
