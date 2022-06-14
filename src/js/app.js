const itemWrapper = document.querySelector(".calculator__withdraws");
const addReplenishment = document.querySelector("#addReplenishment");
const addWithdrawal = document.querySelector("#addWithdrawal");
let replenishment = "";
let withdrawal = "";
let replenishmentId = 1;
let withdrawalId = 1;

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
    el.addEventListener("input", () => {
      let percent = ((el.value - el.min) * 100) / (el.max - el.min) - 0.1;
      el.style.background = `linear-gradient(to right, #176EAE ${percent}%, transparent ${percent}%)`;
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

isWebp();
setDropdowns();
setRanges();
setGraphs();
setReplenishment(replenishmentId);
setWithdrawal(withdrawalId);
