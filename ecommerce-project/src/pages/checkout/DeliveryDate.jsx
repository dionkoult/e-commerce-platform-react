import dayjs from 'dayjs';

export function DeliveryDate({ deliveryOptions, cartItem }) {
  const selectedDdeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  return (
    <div className="delivery-date">
      Delivery date: {dayjs(selectedDdeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
    </div>
  );
}