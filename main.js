$(function () {
  // Variables
  const $showDropdownContent = $(".js-slide-dropdown");
  const $sectorCheckboxes = $('.checkbox-list--sector [type="checkbox"]');
  const $sectorITCheckboxes = $('.checkbox-list--sector-it [type="checkbox"]');
  const $levelCheckboxes = $('.checkbox-list--level [type="checkbox"]');
  const $languageCheckboxes = $('.checkbox-list--language [type="checkbox"]');
  const $cityCheckboxes = $('.checkbox-list--city [type="checkbox"]');
  const $parentsDropdown = $(".js-slide-dropdown").parent();
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

  function slideDropdown($slideDirection, $dropdown) {
    if ($slideDirection === "down") {
      $dropdown?.siblings(".js-dropdown-content").slideDown("fast");
      $dropdown?.find(".chevron").addClass("chevron--active");
      $dropdown?.addClass("border-bottom-radius-none");
    }
    if ($slideDirection === "up") {
      $dropdown?.siblings(".js-dropdown-content").slideUp("fast");
      $dropdown?.find(".chevron").removeClass("chevron--active");
      $dropdown?.removeClass("border-bottom-radius-none");
    }
  }

  // Show checkboxes
  $showDropdownContent.on("click", function (e) {
    const $dropdown = $(this);
    const $dropdownContent = $(this).siblings(".js-dropdown-content");

    if ($dropdownContent.is(":visible")) slideDropdown("up", $dropdown);
    else slideDropdown("down", $dropdown);
  });

  // Tabindex
  $parentsDropdown[0] = $parentsDropdown[0].closest(".sector-container");
  let $tabIndex = false;
  $("body").on("keydown", function (e) {
    if (e.keyCode === 9) {
      $tabIndex = true;
    }
  });
  $parentsDropdown.on("focusin", function (e) {
    if (!$tabIndex) return;
    const $dropdown = $(this).find(".js-slide-dropdown");
    slideDropdown("down", $dropdown);
    $tabIndex = false;
  });

  $parentsDropdown.on("focusout", function () {
    if (!$tabIndex) return;
    const $dropdown = $(this).find(".js-slide-dropdown");
    slideDropdown("up", $dropdown);
    $tabIndex = true;
  });

  // Show Technology when IT Sektor is checked
  $('[name="it-sector"]').on("change", function () {
    const $checkbox = $(this);
    const $sectorITContainer = $(".sector-container--it");

    if ($checkbox.is(":checked")) {
      $sectorITContainer.fadeIn("slow");
    } else {
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
    )
      slideDropdown("up", $(".js-slide-dropdown"));
  });

  // Fire tabindex variant 1
  // let $copyFocusedElement;
  // $("form").on("keydown", function (e) {
  //   if (e.key == "Tab") {
  //     if (e.target.classList.contains("js-slide-dropdown")) {
  //       const $focusedEl = $(":focus");
  //       console.log($focusedEl);
  //       if ($copyFocusedElement) slideDropdown("up", $copyFocusedElement);

  //       if ($focusedEl[0] === $(document.activeElement)[0]) {
  //         slideDropdown("down", $focusedEl);
  //         $copyFocusedElement = $($focusedEl[0]);
  //       }
  //     }
  //     if (!e.target.classList.contains("js-slide-dropdown"))
  //       slideDropdown("up", $copyFocusedElement);
  //   }
  // });

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
