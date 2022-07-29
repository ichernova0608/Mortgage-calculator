import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

const maxValue = 100000000;
//инпуты
const inputCost = document.querySelector("#input-cost");
const inputDownPayment = document.querySelector("#input-downpayment");
const inputTerm = document.querySelector("#input-term");
const form = document.querySelector("#form");
const totalCost = document.getElementById("total-cost");
const totalMonthPayment = document.getElementById("total-month-payment");

//cleave опции форматирования
const cleavePriceSettings = {
  numeral: true,
  numeralThousandsGroupStyle: "thousand",
  delimiter: " ",
};

//запускаем форматирование cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSettings);
const cleaveDownpayment = new Cleave(inputDownPayment, cleavePriceSettings);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSettings);

calcMortgage();

//отображение и расчет суммы кредита
form.addEventListener("input", function () {
  //расчет суммы кредита
  calcMortgage();
});

function calcMortgage() {
  //проверка, чтобы стоимость недвижимости не была больше максимальной
  let cost = +cleaveCost.getRawValue();
  if (cost > maxValue) {
    cost = maxValue;
  }
  //общая сумма кредита
  const totalAmount = cost - cleaveDownpayment.getRawValue();
  totalCost.innerHTML = priceFormatter.format(totalAmount);
  //ставка по кредиту
  const creditRate = +document.querySelector('input[name = "program"]:checked')
    .value;

  //месячная ставка по кредиту
  const monthRate = (creditRate / 12) * 100;

  //срок кредита в годах
  const mortgageYears = +cleaveTerm.getRawValue();

  //срок кредита в месяцах
  const mortgageMonths = mortgageYears * 12;

  //расчет ежемесячной суммы кредита
  const monthPayment =
    (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - mortgageMonths));

  //отображение ежемесячного платежа в формате с копейками
  totalMonthPayment.innerHTML = priceFormatterDecimals.format(monthPayment);
}

const sliderCost = document.getElementById("slider-cost");
const sliderDownpayment = document.getElementById("slider-downpayment");
const sliderTerm = document.getElementById("slider-term");

noUiSlider.create(sliderCost, {
  start: [12000000],
  connect: "lower",
  // tooltips: true,
  step: 100000,

  range: {
    min: 375000,
    "50%": [10000000, 1000000],
    max: maxValue,
  },

  format: wNumb({
    decimals: 0,
    thousand: " ",
    suffix: "",
  }),
});

noUiSlider.create(sliderDownpayment, {
  start: [1200000],
  connect: "lower",
  // tooltips: true,
  step: 100000,

  range: {
    min: 0,
    "50%": [9000000, 1000000],
    max: 90000000,
  },

  format: wNumb({
    decimals: 0,
    thousand: " ",
    suffix: "",
  }),
});

noUiSlider.create(sliderTerm, {
  start: [1],
  connect: "lower",
  // tooltips: true,
  step: 1,

  range: {
    min: 1,
    max: 30,
  },

  format: wNumb({
    decimals: 0,
    thousand: "",
    suffix: "",
  }),
});

//slider cost
sliderCost.noUiSlider.on("slide", function () {
  const sliderValue = sliderCost.noUiSlider.get();
  inputCost.value = sliderValue;
  cleaveCost.setRawValue(sliderValue);
  calcMortgage();
});

//slider downpayment
sliderDownpayment.noUiSlider.on("slide", function () {
  const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));
  inputDownPayment.value = sliderValue;
  cleaveDownpayment.setRawValue(sliderValue);
  calcMortgage();
});

//slider term
sliderTerm.noUiSlider.on("slide", function () {
  const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));
  inputTerm.value = sliderValue;
  cleaveTerm.setRawValue(sliderValue);
  calcMortgage();
});

//форматирование значения, введенного в инпут inputCost
inputCost.addEventListener("input", function () {
  const value = +cleaveCost.getRawValue();
  //обновляем range slider
  sliderCost.noUiSlider.set(value);

  //проверки на макс цену
  if (value > maxValue) {
    inputCost.closest(".param__details").classList.add("param__details--error");
  }
  if (value <= maxValue) {
    inputCost
      .closest(".param__details")
      .classList.remove("param__details--error");
  }

  //значение зависимости downpayment от inputCost
  const percentMin = value * 0.15;
  const percentMax = value * 0.9;

  sliderDownpayment.noUiSlider.updateOptions({
    range: {
      min: +percentMin,
      max: +percentMax,
    },
  });
});
//возвращает максимальную сумму в инпут при событии change
inputCost.addEventListener("change", function () {
  let value = +cleaveCost.getRawValue();
  if (value > maxValue) {
    inputCost
      .closest(".param__details")
      .classList.remove("param__details--error");
    +cleaveCost.setRawValue(maxValue);
  }
});
