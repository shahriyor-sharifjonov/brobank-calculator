const formatWithSpaces = (num, symbol) => {
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${symbol}`;
};

const itemWrapper = document.querySelector(".calculator__withdraws");
const addReplenishment = document.querySelector("#addReplenishment");
const addWithdrawal = document.querySelector("#addWithdrawal");
let percentForYear = 10;
let percentForMonth = percentForYear / 12;
let replenishment = "";
let withdrawal = "";
let replenishmentId = 1;
let withdrawalId = 1;

let symbol = "$";

let depositAmount = document.querySelector("#depositAmount").value;
let depositTerm = document.querySelector("#depositTerm").value;
let depositDate = document.querySelector("#depositDate");

let endResult = document.querySelector("#endResult");
let yearResult = document.querySelector("#yearResult");

let income = (depositAmount * percentForYear) / 100;
let formattedIncome = formatWithSpaces(income, symbol);

let incomeForYear = Math.round(
  ((depositAmount * percentForMonth) / 100) * depositTerm
);

let incomeResult = Number(depositAmount) + Number(income);
let formattedIncomeResult = formatWithSpaces(incomeResult, symbol);

let depositEndResult = Number(incomeForYear) + Number(depositAmount);
let formattedDepositEndResult = formatWithSpaces(depositEndResult, symbol);

yearResult.innerHTML = formattedIncome;
endResult.innerHTML = formattedIncomeResult;

const today = new Date();
depositDate.value = today.toLocaleDateString("ru-RU", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

const setVars = () => {
  depositAmount = document.querySelector("#depositAmount").value;
  depositTerm = document.querySelector("#depositTerm").value;
  income = (depositAmount * 10) / 100;
  formattedIncome = formatWithSpaces(income, symbol);
  yearResult.innerHTML = formattedIncome;
  incomeResult = Number(depositAmount) + Number(income);
  formattedIncomeResult = formatWithSpaces(incomeResult, symbol);
  incomeForYear = Math.round(
    ((depositAmount * percentForMonth) / 100) * depositTerm
  );
  depositEndResult = Number(incomeForYear) + Number(depositAmount);
  formattedDepositEndResult = formatWithSpaces(depositEndResult, symbol);
  endResult.innerHTML = formattedDepositEndResult;
};

const isWebp = () => {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  testWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
};

const setDropdowns = () => {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(function (dropdownWrapper) {
    const dropdownBtn = dropdownWrapper.querySelector(".dropdown__button");
    const dropdownList = dropdownWrapper.querySelector(".dropdown__list");
    const dropdownItems = dropdownList.querySelectorAll(".dropdown__list-item");
    const dropdownInput = dropdownWrapper.querySelector(
      ".dropdown__input_hidden"
    );

    dropdownBtn.addEventListener("click", function () {
      dropdownList.classList.toggle("dropdown__list_visible");
      this.classList.toggle("dropdown__button_active");
    });

    dropdownItems.forEach(function (listItem) {
      listItem.addEventListener("click", function (e) {
        dropdownItems.forEach(function (el) {
          el.classList.remove("dropdown__list-item_active");
        });
        e.target.classList.add("dropdown__list-item_active");
        dropdownBtn.innerText = this.innerText;
        dropdownInput.value = this.dataset.value;
        dropdownList.classList.remove("dropdown__list_visible");
      });
    });

    document.addEventListener("click", function (e) {
      if (e.target !== dropdownBtn) {
        dropdownBtn.classList.remove("dropdown__button_active");
        dropdownList.classList.remove("dropdown__list_visible");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Tab" || e.key === "Escape") {
        dropdownBtn.classList.remove("dropdown__button_active");
        dropdownList.classList.remove("dropdown__list_visible");
      }
    });
  });
};

const setRanges = () => {
  const ranges = document.querySelectorAll(".calculator__range");

  ranges.forEach((el) => {
    const parent = el.parentElement;
    const value = parent.querySelector(".calculator__input");
    const suffix = el.getAttribute("data-suffix")
      ? el.getAttribute("data-suffix")
      : "";
    el.addEventListener("input", () => {
      setVars();
      let percent = ((el.value - el.min) * 100) / (el.max - el.min) - 0.1;
      el.style.background = `linear-gradient(to right, #176EAE ${percent}%, transparent ${percent}%)`;
      value.value = `${el.value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${suffix}`;
    });
  });
};

const setGraphs = () => {
  const graphBtn = document.querySelector(".calculator__footer-btn");
  const graphCon = document.querySelector(".calculator__list");
  let graphOpen = false;

  graphBtn.addEventListener("click", () => {
    graphCon.classList.toggle("active");
    graphOpen = !graphOpen;
    graphOpen
      ? (graphBtn.innerHTML = "Скрыть график выплат")
      : (graphBtn.innerHTML = "Показать график выплат");
  });
};

const setItems = () => {
  const items = document.querySelectorAll(".calculator__withdraw");
  items.forEach((el) => {
    const btn = el.querySelector(".calculator__withdraw-delete");
    btn.addEventListener("click", () => {
      el.remove();
    });
  });
};

const setReplenishment = (id) => {
  replenishment = `
    <div class="calculator-title">
      <p>Пополнение ${id}</p>
      <button class="calculator__withdraw-delete" type="button">Удалить</button>
    </div>
    <div class="calculator__withdraw-form"> 
      <div class="calculator__withdraw-item">
        <p class="calculator__withdraw-label">Сумма</p>
        <input class="calculator__withdraw-input" type="text" value="100 000 ₽">
      </div>
      <div class="calculator__withdraw-item">
        <p class="calculator__withdraw-label">Дата</p>
        <input class="calculator__withdraw-input" type="text" value="30.07.2022">
      </div>
      <div class="calculator__withdraw-item">
        <p class="calculator__withdraw-label">Периодичность</p>
        <div class="dropdown"> 
          <button class="dropdown__button" type="button">Разовое</button>
          <ul class="dropdown__list"> 
            <li class="dropdown__list-item" data-value="Не разовое">Не разовое</li>
            <li class="dropdown__list-item dropdown__list-item_active" data-value="Разовое">Разовое</li>
          </ul>
          <input class="dropdown__input_hidden" type="text" name="select-period" value="">
        </div>
      </div>
    </div>
  `;
};

const setWithdrawal = (id) => {
  withdrawal = `
    <div class="calculator-title">
      <p>Снятие ${id}</p>
      <button class="calculator__withdraw-delete" type="button">Удалить</button>
    </div>
    <div class="calculator__withdraw-form"> 
      <div class="calculator__withdraw-item">
        <p class="calculator__withdraw-label">Сумма</p>
        <input class="calculator__withdraw-input" type="text" value="100 000 ₽">
      </div>
      <div class="calculator__withdraw-item">
        <p class="calculator__withdraw-label">Дата</p>
        <input class="calculator__withdraw-input" type="text" value="30.09.2022">
      </div>
      <div class="calculator__withdraw-item">
        <p class="calculator__withdraw-label">Периодичность</p>
        <div class="dropdown"> 
          <button class="dropdown__button" type="button">Разовое</button>
          <ul class="dropdown__list"> 
            <li class="dropdown__list-item" data-value="Не разовое">Не разовое</li>
            <li class="dropdown__list-item dropdown__list-item_active" data-value="Разовое">Разовое</li>
          </ul>
          <input class="dropdown__input_hidden" type="text" name="select-period" value="">
        </div>
      </div>
    </div>
  `;
};

addReplenishment.addEventListener("click", () => {
  setDropdowns();
  const div = document.createElement("div");
  div.classList.add("calculator__withdraw");
  div.innerHTML = replenishment;
  itemWrapper.append(div);
  setReplenishment((replenishmentId += 1));
  setItems();
  setDropdowns();
});

addWithdrawal.addEventListener("click", () => {
  setDropdowns();
  const div = document.createElement("div");
  div.classList.add("calculator__withdraw");
  div.innerHTML = withdrawal;
  itemWrapper.append(div);
  setWithdrawal((withdrawalId += 1));
  setItems();
  setDropdowns();
});

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

if (document.querySelector(".choose-symbol")) {
  const buttons = document.querySelectorAll(".choose-symbol");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      symbol = e.target.getAttribute("data-value");
      setVars();
    });
  });
}

isWebp();
setDropdowns();
setRanges();
setGraphs();
setReplenishment(replenishmentId);
setWithdrawal(withdrawalId);
