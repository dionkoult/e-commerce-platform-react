import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('PaymentSummary component', () => {
  let loadCart;
  let user;
  let sampleSummary;

  function Location() {
    const location = useLocation();

    return (
      <div data-testid="url-path">{location.pathname}</div>
    );
  }

  beforeEach(async () => {
    loadCart = vi.fn();
    user = userEvent.setup();

    axios.get.mockImplementation(async () => {
      return {
        data: {
          totalItems: 6,
          productCostCents: 12570,
          shippingCostCents: 0,
          totalCostBeforeTaxCents: 12570,
          taxCents: 1257,
          totalCostCents: 13827
        }
      };
    });

    const sample = await axios.get();
    sampleSummary = sample.data;

    render(
      <MemoryRouter>
        <Location />
        <PaymentSummary loadCart={loadCart} paymentSummary={sampleSummary} />
      </MemoryRouter>
    );
  });

  it('displays the correct dollar amount', async () => {
    expect(screen.getByTestId('payment-summary-row-items'))
      .toHaveTextContent('Items (6)');

    expect(screen.getByTestId('payment-summary-row-shipping'))
      .toHaveTextContent('Shipping & handling:$0.00');

    expect(screen.getByTestId('payment-summary-row-total-before-tax'))
      .toHaveTextContent('Total before tax:$125.70');

    expect(screen.getByTestId('payment-summary-row-estimated-tax'))
      .toHaveTextContent('Estimated tax (10%):$12.57');

    expect(screen.getByTestId('payment-summary-row-order-total'))
      .toHaveTextContent('Order total:$138.27');
  });


  it('clicks the Place Order button', async () => {
    const button = screen.getByTestId('place-order-button');
    await user.click(button);

    expect(loadCart).toHaveBeenCalledWith();
    
    expect(screen.getByTestId('url-path'))
      .toHaveTextContent('/orders');
  });
});