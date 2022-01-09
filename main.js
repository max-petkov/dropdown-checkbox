$(function () {
  // Variables
  const $showDropdownContent = $(".js-slide-dropdown");
  // const $checkboxLists = $(".checkbox-list");
  const $sectorCheckboxes = $('.checkbox-list--sector [type="checkbox"]');
  const $sectorITCheckboxes = $('.checkbox-list--sector-it [type="checkbox"]');
  const $levelCheckboxes = $('.checkbox-list--level [type="checkbox"]');
  const $languageCheckboxes = $('.checkbox-list--language [type="checkbox"]');
  const $cityCheckboxes = $('.checkbox-list--city [type="checkbox"]');
  const $employmentTypeCheckboxes = $(
    '.checkbox-list--employment-type [type="checkbox"]'
  );
  const $salaryRangeSlider = $("#salary-range-slider");

  // Functions
  function $countCheckboxes($el, $arr) {
    const $checkbox = $el;
    const $counter = $checkbox
      .parents(".checkbox-list")
      .siblings(".form__input")
      .find(".js-count-checked-checkboxes");
    const $inputText = $checkbox
      .parents(".checkbox-list")
      .siblings(".form__input")
      .find("p");

    if ($checkbox.is(":checked")) $arr.push($checkbox.val());

    if (!$checkbox.is(":checked")) {
      $arr.splice($arr.indexOf($checkbox.val()), 1);
    }

    if (!$arr.length) {
      $inputText.css("color", "#b2b6bd");
      $counter.html("");
    } else {
      $inputText.css("color", "#000");
      $counter.html(`(${$arr.length})`);
    }
  }

  // Show checkboxes
  $showDropdownContent.on("click", function () {
    const $dropDown = $(this);
    const $dropDownContent = $(this).siblings(".js-dropdown-content");
    const $chevron = $(this).find("img");

    if ($dropDownContent.is(":visible")) {
      $chevron.removeClass("chevron--active");
      $dropDownContent.slideUp("fast");
      $dropDown.removeClass("border-bottom-radius-none");
    } else {
      $dropDownContent.slideDown("fast");
      $chevron.addClass("chevron--active");
      $dropDown.addClass("border-bottom-radius-none");
    }
  });

  // Show Technology when IT Sektor is checked
  $('[name="it-sector"]').on("change", function () {
    const $checkbox = $(this);
    const $sectorITContainer = $(".sector-container--it");

    if ($checkbox.is(":checked")) $sectorITContainer.fadeIn("slow");
    else {
      $sectorITContainer.fadeOut("slow");
      const $checkboxesIT = $(".checkbox-list--sector-it [type='checkbox']");

      $checkboxesIT.prop("checked", function (i, val) {
        $checkboxesIT[i].checked = false;
      });
      $(".form__input--sector-it p").css("color", "#b2b6bd");
      $(".form__input--sector-it p .js-count-checked-checkboxes").html("");
    }
  });

  // Hide elements when click outside
  $(document).on("mouseup", function (e) {
    if (
      !$(e.target).closest(".js-dropdown-content").length &&
      $(".js-dropdown-content").is(":visible")
    ) {
      $(".js-dropdown-content").slideUp("fast");
      $(".chevron").removeClass("chevron--active");
      $(".js-slide-dropdown").removeClass("border-bottom-radius-none");
    }
  });

  // Fire tabindex
  let $focusedDropdown;
  $(".js-slide-dropdown").focus(function () {
    $focusedDropdown = $(this);
  });

  $("body").on("keydown", function (e) {
    if (e.target.classList.contains("js-slide-dropdown")) {
      $(".js-slide-dropdown").each(($i, $el) => {
        if ($el == document.activeElement) {
          $focusedDropdown.siblings(".js-dropdown-content").slideDown("fast");
        } else {
          $el.nextElementSibling.style.display = "none";
        }
      });
    }

    if (!e.target.classList.contains("js-slide-dropdown")) {
      $(".js-slide-dropdown").each(($i, $el) => {
        $el.nextElementSibling.style.display = "none";
      });
    }
  });

  // Salary Slider
  $salaryRangeSlider.ionRangeSlider({
    skin: "round",
    type: "double",
    min: 350,
    max: 1000,
    from: 450,
    to: 850,
    grid: true,
    prefix: "$",
  });

  // Count Checkboxes
  const $sectorArray = [];
  $sectorCheckboxes.on("change", function () {
    const $checkbox = $(this);
    $countCheckboxes($checkbox, $sectorArray);
  });

  let $sectorITArray = [];
  $('[name="it-sector"]').on("change", () => {
    if (!$(this).checked) $sectorITArray = [];
  });

  $sectorITCheckboxes.on("change", function () {
    const $checkbox = $(this);
    $countCheckboxes($checkbox, $sectorITArray);
  });

  const $levelArray = [];
  $levelCheckboxes.on("change", function () {
    const $checkbox = $(this);
    $countCheckboxes($checkbox, $levelArray);
  });

  const $languageArray = [];
  $languageCheckboxes.on("change", function () {
    const $checkbox = $(this);
    $countCheckboxes($checkbox, $languageArray);
  });

  const $cityArray = [];
  $cityCheckboxes.on("change", function () {
    const $checkbox = $(this);
    $countCheckboxes($checkbox, $cityArray);
  });

  const $employmentTypeArray = [];
  $employmentTypeCheckboxes.on("change", function () {
    const $checkbox = $(this);
    $countCheckboxes($checkbox, $employmentTypeArray);
  });
});
