# Stencil Checkout Card Component Starter

This is a starter project for building a standalone Web Component using Stencil.
Stencil is also great for building entire apps.

# Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than runtime tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/warunaKulathunga/stencil-checkout-card-component.git

```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).

## How to Catch the Event in Another Project

1. Use the Component in Your Project:
   In your main application or parent component, use the <checkout-card> component as follow

```javascript
<checkout-card
  privacy-details="Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy."
  total_amount="145"
></checkout-card>
```

2. Add an Event Listener:
   Add an event listener to catch the paymentSubmitted event:

```javascript
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const checkoutCard = document.querySelector('checkout-card');
      if (checkoutCard) {
        checkoutCard.addEventListener('paymentSubmitted', function(event) {
          console.log('Payment Details:', event.detail);
        });
      } else {
        console.error('checkout-card component not found');
      }
    });
  </script>
```
