import * as functions from "./modules/functions.js";

functions.isWebp();

// import Swiper, { Navigation, Pagination } from 'swiper';

// const swiper = new Swiper();

document.querySelectorAll(".dropdown").forEach(function (dropdownWrapper) {
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

const ranges = document.querySelectorAll(".calculator__range");

ranges.forEach((el) => {
  el.addEventListener("input", () => {
    let percent = ((el.value - el.min) * 100) / (el.max - el.min) - 0.1;
    el.style.background = `linear-gradient(to right, #176EAE ${percent}%, transparent ${percent}%)`;
  });
});

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

const items = document.querySelectorAll(".calculator__withdraw");

items.forEach((el) => {
  const btn = el.querySelector(".calculator__withdraw-delete");
  btn.addEventListener("click", () => {
    el.remove();
  });
});
