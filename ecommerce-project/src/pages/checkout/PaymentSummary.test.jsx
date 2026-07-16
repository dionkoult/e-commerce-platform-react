import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';
import userEvent from '@testing-library/user-event';

describe('PaymentSummary component', () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();
  });

  it('displays the correct dollar amount', async () => {
    const sample = await axios.get('http://localhost:3000/api/payment-summary');
    const sampleSummary = sample.data;

    render(
      <MemoryRouter>
        <PaymentSummary loadCart={loadCart} paymentSummary={sampleSummary} />
      </MemoryRouter>
    );

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
});