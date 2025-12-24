// backend/services/mockShiprocket.js

export function createMockOrder(orderData) {
  const fakeShipmentId = "SHIP-" + Math.floor(Math.random() * 999999);
  const fakeAwb = "AWB" + Math.floor(Math.random() * 99999999);

  const trackingUrl = `https://hygiena-mock-tracking.com/${fakeAwb}`;

  return {
    success: true,
    order_id: orderData.order_id,
    shipment_id: fakeShipmentId,
    awb_code: fakeAwb,
    tracking_url: trackingUrl
  };
}

// Fake tracking response
export function getMockTrackingStatus(awb) {
  return {
    awb,
    updated_on: new Date().toISOString(),
    status_history: [
      "Order Created",
      "Packing",
      "Ready for Dispatch",
      "In Transit",
      "Out for Delivery",
      "Delivered"
    ]
  };
}
