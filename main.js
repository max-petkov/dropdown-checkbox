$(function () {
  const $sectorContainer = $(".sector-value");
  const $sectorCheckBoxList = $(".sector-list");
  const $sectorCheckBoxes = $('.find-job__sector [type="checkbox"]');
  const $form = $(".find-job__form");

  $sectorContainer.on("click", () => $sectorCheckBoxList.slideToggle("fast"));
});

const sectorCheckBoxes = document.querySelectorAll(
  '.find-job__sector [type="checkbox"]'
);
const displayCheckboxValue = document.querySelector(".sector-value p");
const emptyArray = [];

sectorCheckBoxes.forEach((el, i) => {
  el.addEventListener("change", function () {
    if (el.checked) {
      emptyArray.push(el.value);
      displayCheckboxValue.textContent = `${emptyArray.join(", ")}`;

      if (!emptyArray.length) displayCheckboxValue.textContent = "Сектор";
    }

    if (!el.checked) {
      emptyArray.splice(emptyArray.indexOf(el.value), 1);
      displayCheckboxValue.textContent = `${emptyArray.join(", ")}`;

      if (!emptyArray.length) displayCheckboxValue.textContent = "Сектор";
    }
  });
});
