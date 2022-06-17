const formatWithSpaces = (num, symbol) => {
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${symbol}`;
};

const itemWrapper = document.querySelector(".calculator__withdraws");
const addReplenishment = document.querySelector("#addReplenishment");
const addWithdrawal = document.querySelector("#addWithdrawal");

const now = new Date();

const depositStartDate = now.toLocaleDateString();

const percentForYear = 10;
const percentForMonth = percentForYear / 12;
const percentForDay = percentForMonth / 30;
const percentForWeek = percentForDay * 7;
const percentFor3Month = percentForMonth * 3;
const percentFor6Month = percentFor3Month * 2;

let replenishment = "";
let withdrawal = "";
let replenishmentId = 1;
let withdrawalId = 1;

let symbol = "₽";
let frequencyList = ['Каждый день', 'Каждую неделю', 'Раз в месяц', 'Раз в квартал', 'Раз в полгода', 'Раз в год'];
let frequency = frequencyList[2];
let chargesList = ['Оставлять на вкладе', 'Выплачивать'];
let charges = chargesList[0];

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
endResult.innerHTML = formattedDepositEndResult;

depositDate.value = depositStartDate;

const setVars = () => {
  depositAmount = document.querySelector("#depositAmount").value;
  depositTerm = document.querySelector("#depositTerm").value;
  income = (depositAmount * 10) / 100;
  formattedIncome = formatWithSpaces(income, symbol);
  yearResult.innerHTML = formattedIncome;
  incomeResult = Number(depositAmount) + Number(income);
  formattedIncomeResult = formatWithSpaces(incomeResult, symbol);
  incomeForYear = ((depositAmount * percentForMonth) / 100) * depositTerm;
  depositEndResult = Number(incomeForYear) + Number(depositAmount);
  formattedDepositEndResult = formatWithSpaces(depositEndResult, symbol);
  endResult.innerHTML = formattedDepositEndResult;
  calcGraphs();
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

if (document.querySelector(".calc-frequency")) {
  const buttons = document.querySelectorAll(".calc-frequency");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      for(let i = 0; i < frequencyList.length; i++){
        if(frequencyList[i] === e.target.getAttribute("data-value")){
          frequency = frequencyList[i]
        }
      }
      setVars();
    });
  });
}

const calcGraphs = () => {
  let dates = [{ date: now, accrued: "-", balance: formatWithSpaces(Number(depositAmount).toFixed(2), symbol), operation: ''}];
  const oldDepositAmount = depositAmount;
  // первые 10 строк
  for (let i = 1; i < 11; i++) {
    // Каждый день 
    if (frequency === frequencyList[0]){
      const accrued = Number(oldDepositAmount) * Number(percentForDay) / 100;
      depositAmount = Number(depositAmount) + Number(accrued);
      const balance = depositAmount;
      dates.push({
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + i),
        accrued: formatWithSpaces(accrued.toFixed(2), symbol),
        balance: formatWithSpaces(balance.toFixed(2), symbol),
        operation: '+'
      });
    } 
    // Каждую неделю 
    else if (frequency === frequencyList[1]){
      const accrued = Number(oldDepositAmount) * Number(percentForWeek) / 100;
      depositAmount = Number(depositAmount) + Number(accrued);
      const balance = depositAmount;
      let week = 6;
      week = week * i;
      dates.push({
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + i + week),
        accrued: formatWithSpaces(accrued.toFixed(2), symbol),
        balance: formatWithSpaces(balance.toFixed(2), symbol),
        operation: '+'
      });
    } 
  }
  // раз в месяц 
  if (frequency === frequencyList[2]){
    let term = 11;
    if (depositTerm < 11) {
      term = Number(depositTerm)+1;
    } 
    for (let i = 1; i < term; i++) {
      const accrued = Number(oldDepositAmount) * Number(percentForMonth) / 100;
      depositAmount = Number(depositAmount) + Number(accrued);
      const balance = depositAmount;
      dates.push({
        date: new Date(now.getFullYear(), now.getMonth() + i, now.getDate()),
        accrued: formatWithSpaces(accrued.toFixed(2), symbol),
        balance: formatWithSpaces(balance.toFixed(2), symbol),
        operation: '+'
      });
    }
  }
  // раз в квартал 
  if (frequency === frequencyList[3]){
    let term = 11;
    if ((depositTerm / 3) < 11) {
      term = Number(depositTerm)/3+1;
    } 
    for (let i = 1; i < term; i++) { 
      const accrued = Number(oldDepositAmount) * Number(percentFor3Month) / 100;
      depositAmount = Number(depositAmount) + Number(accrued);
      const balance = depositAmount;
      let month = 3;
      month = month * i;
      dates.push({
        date: new Date(now.getFullYear(), now.getMonth() + month, now.getDate()),
        accrued: formatWithSpaces(accrued.toFixed(2), symbol),
        balance: formatWithSpaces(balance.toFixed(2), symbol),
        operation: '+'
      });
    }
  }
  // Раз в полгода
  if (frequency === frequencyList[4]){
    let term = 11;
    if ((depositTerm / 6) < 11) {
      if ((depositTerm / 6) % 2 == 0 || (depositTerm / 6) % 2 == 1){
        term = Number(depositTerm)/6+1;
      }
      else{
        term = (Number(depositTerm)/6+1)-1;
      }
    } 
    for (let i = 1; i < term; i++) {
      const accrued = Number(oldDepositAmount) * Number(percentFor6Month) / 100;
      depositAmount = Number(depositAmount) + Number(accrued);
      const balance = depositAmount;
      let month = 6;
      month = month * i;
      dates.push({
        date: new Date(now.getFullYear(), now.getMonth() + month, now.getDate()),
        accrued: formatWithSpaces(accrued.toFixed(2), symbol),
        balance: formatWithSpaces(balance.toFixed(2), symbol),
        operation: '+'
      });
    }
  }
  // Раз в год
  if (frequency === frequencyList[5]){
    let term = 11;
    if ((depositTerm / 12) < 11) {
      if ((depositTerm / 12) % 2 == 0 || (depositTerm / 12) % 2 == 1){
        term = Number(depositTerm)/12+1;
      }
      else{
        term = (Number(depositTerm)/12+1)-1;
      }
    } 
    for (let i = 1; i < term; i++) {
      const accrued = Number(oldDepositAmount) * Number(percentForYear) / 100;
      depositAmount = Number(depositAmount) + Number(accrued);
      const balance = depositAmount;
      dates.push({
        date: new Date(now.getFullYear() + i, now.getMonth(), now.getDate()),
        accrued: formatWithSpaces(accrued.toFixed(2), symbol),
        balance: formatWithSpaces(balance.toFixed(2), symbol),
        operation: '+'
      });
    }
  }

  // // последние 10 строк
  // for (let i = 1; i < 11; i++) {
  //   const oldDepositAmount = depositAmount;
  //   if(frequency === frequencyList[0]){
  //     depositAmount = Number(depositAmount) + Number((Number(depositAmount) * percentForDay) / 100);
  //     const customDate = new Date(now.getFullYear(), now.getMonth() + Number(depositTerm), now.getDate() - 10);
  //     const accrued = (Number(depositAmount) - Number(oldDepositAmount)).toFixed(2);
  //     const balance = (Number(depositAmount) + Number(accrued)).toFixed(2)
  //     dates.push({
  //       date: new Date(customDate.getFullYear(), customDate.getMonth(), customDate.getDate() + i),
  //       accrued: formatWithSpaces(accrued, symbol),
  //       balance: formatWithSpaces(balance, symbol),
  operation: '+'
  //     });
  //   }
  // }

  // удалить дубли 
  const uniqueDates = [];
  const unique = dates.filter(el => {
    const isDuplicate = uniqueDates.includes(el.date);
    if(!isDuplicate) {
      uniqueDates.push(el.date);
      return true;
    }
    return false;
  })

  // сотрировка по дату
  unique.sort(function (a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return c - d;
  });

  // отобразить данные в консоле
//   for (let i = 0; i < unique.length; i++) {
//     console.log(
//       `data: ${unique[i]["date"].toLocaleDateString()} 
// nachisleno: ${unique[i]["accrued"]} 
// balance: ${unique[i]["balance"]}`
//     );
//   }

  // отобразить данные в браузере
  const lists = document.querySelectorAll('.calculator__list-content');
  lists.forEach(el => {
    el.innerHTML = "";
    unique.map(item => {
      const elem = document.createElement('div');
      elem.classList.add('calculator__list-item');
      elem.innerHTML += `<p class="calculator__list-item-p" data-name="Дата">${item['date'].toLocaleDateString()}</p>
<p class="calculator__list-item-p" data-name="Начислено %">${item['accrued']}</p>
<p class="calculator__list-item-p" data-name="Операции">${item['operation']} ${item['accrued']}</p>
<p class="calculator__list-item-p" data-name="Остаток вклада">${formatWithSpaces(item['balance'], '')}</p>`
      el.append(elem)
    })
  })
};

calcGraphs();
isWebp();
setDropdowns();
setRanges();
setGraphs();
setReplenishment(replenishmentId);
setWithdrawal(withdrawalId);
