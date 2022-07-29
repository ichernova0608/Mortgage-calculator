import { percentFormatter } from "./formatters.js";

//проценты по каждой ипотечной программе
const programBase = 0.12;
const programIt = 0.047;
const programGov = 0.067;
const programZero = 0.108;

//показываем ставки на странице
document.querySelector("#base-value").value = programBase;
document.querySelector("#it-value").value = programIt;
document.querySelector("#gov-value").value = programGov;
document.querySelector("#zero-value").value = programZero;

//указываем ставку в label span
document.querySelector("#base-text").innerHTML =
  percentFormatter.format(programBase);
document.querySelector("#it-text").innerHTML =
  percentFormatter.format(programIt);
document.querySelector("#gov-text").innerHTML =
  percentFormatter.format(programGov);
document.querySelector("#zero-text").innerHTML =
  percentFormatter.format(programZero);

//отображение выбранной процентной ставки справа в сводке
const programInputs = document.querySelectorAll('input[name="program"]');
const totalPercent = document.getElementById("total-percent");
programInputs.forEach((input) => {
  //ставка при загрузке страницы первоначально (вместо хх)
  if (input.checked) {
    totalPercent.innerText = percentFormatter.format(input.value);
  }

  //ставка при переключении вкладки процента
  input.addEventListener("click", function () {
    totalPercent.innerHTML = percentFormatter.format(this.value);
  });
});
