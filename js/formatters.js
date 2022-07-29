//создали форматтер, выдающий проценты с третьим знаком после запятой 6,678%
export const percentFormatter = new Intl.NumberFormat("ru-Ru", {
  style: "percent",
  maximumFractionDigits: 3,
});

//7 000 000 P
export const priceFormatter = new Intl.NumberFormat("ru-Ru", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export const priceFormatterDecimals = new Intl.NumberFormat("ru-Ru", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 2,
});
