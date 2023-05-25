const OrderValidityTypes = Object.freeze({
  Day: { value: 1, title: "روز" },
  ValidTillDate: { value: 2, title: "معتبر تا تاریخ" },
  ValidTillCancel: { value: 4, title: "معتبر تا لغو" },
  QuickExecution: { value: 8, title: "اجرای فوری و حذف" },
});

export default OrderValidityTypes;
