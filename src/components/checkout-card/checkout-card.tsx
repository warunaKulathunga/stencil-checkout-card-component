import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'checkout-card',
  styleUrl: 'checkout-card.css',
  shadow: true,
})
export class CheckoutCard {
  @Prop() privacyDetails: string;
  @Prop() total_amount: string;
  @State() paymentMethod: any = 'card';
  @State() cardNumber: string = '';
  @State() expirationDate: string = ''; // mm/yy format
  @State() cvv: string = '';

  @State() cardNumberError: string = '';
  @State() expirationDateError: string = '';
  @State() cvvError: string = '';

  @Event() paymentSubmitted: EventEmitter;

  get totalAmount(): number {
    return parseFloat(this.total_amount);
  }

  handlePaymentMethodChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.paymentMethod = target.value;
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    this[name] = target.value;

    // Validate on input change
    if (name === 'cardNumber') {
      this.cardNumberError = this.validateCardNumber(target.value) ? '' : 'Invalid card number';
    }
    if (name === 'expirationDate') {
      this.expirationDateError = this.validateExpirationDate(target.value) ? '' : 'Invalid expiration date';
    }
    if (name === 'cvv') {
      this.cvvError = this.validateCVV(target.value) ? '' : 'Invalid CVV';
    }
  }

  validateCardNumber(cardNumber: string): boolean {
    const regex = /^[0-9]{16}$/;
    return regex.test(cardNumber);
  }

  validateExpirationDate(expirationDate: string): boolean {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
    if (!regex.test(expirationDate)) {
      return false;
    }

    const [expMonth, expYear] = expirationDate.split('/').map(num => parseInt(num, 10));
    const currentYear = new Date().getFullYear() % 100; // Last two digits of current year
    const currentMonth = new Date().getMonth() + 1; // January is 0

    if (expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth)) {
      return true;
    }
    return false;
  }

  validateCVV(cvv: string): boolean {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvv);
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    let isValid = true;

    if (!this.validateCardNumber(this.cardNumber)) {
      this.cardNumberError = 'Invalid card number';
      isValid = false;
    } else {
      this.cardNumberError = '';
    }

    if (!this.validateExpirationDate(this.expirationDate)) {
      this.expirationDateError = 'Invalid expiration date';
      isValid = false;
    } else {
      this.expirationDateError = '';
    }

    if (!this.validateCVV(this.cvv)) {
      this.cvvError = 'Invalid CVV';
      isValid = false;
    } else {
      this.cvvError = '';
    }

    if (isValid) {
      const paymentDetails = {
        paymentMethod: this.paymentMethod,
        cardNumber: this.cardNumber,
        expirationDate: this.expirationDate,
        cvv: this.cvv,
      };

      this.paymentSubmitted.emit(paymentDetails);

      // Reset form fields
      this.paymentMethod = 'card';
      this.cardNumber = '';
      this.expirationDate = '';
      this.cvv = '';

      // Reset error messages
      this.cardNumberError = '';
      this.expirationDateError = '';
      this.cvvError = '';

      alert('Payment successful!');
    } else {
      alert('Please check your payment details.');
    }
  }

  render() {
    return (
      <div class="card">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Payment Method:
            <select onChange={event => this.handlePaymentMethodChange(event)}>
              <option value="card">Card</option>
              <option disabled value="bank">
                Bank
              </option>
              <option disabled value="transfer">
                Transfer
              </option>
            </select>
          </label>

          {this.paymentMethod === 'card' && (
            <div>
              <label>
                Card Number:
                <input type="text" name="cardNumber" value={this.cardNumber} onInput={event => this.handleInputChange(event)} placeholder="1234 5678 9012 3456" required />
                {this.cardNumberError && <p class="error-message">{this.cardNumberError}</p>}
              </label>

              <div class="date-cvv-section">
                <label class="date-label">
                  Expiration Date:
                  <input type="text" name="expirationDate" value={this.expirationDate} onInput={event => this.handleInputChange(event)} placeholder="MM/YY" required />
                  {this.expirationDateError && <p class="error-message">{this.expirationDateError}</p>}
                </label>

                <label class="cvv-label">
                  CVV:
                  <input type="text" name="cvv" value={this.cvv} onInput={event => this.handleInputChange(event)} placeholder="123" required />
                  {this.cvvError && <p class="error-message">{this.cvvError}</p>}
                </label>
              </div>
            </div>
          )}

          <button type="submit" class="checkout-button">
            Pay ${this.totalAmount.toFixed(2)}
          </button>
          <div>
            <p>{this.privacyDetails}</p>
          </div>
        </form>
      </div>
    );
  }
}
