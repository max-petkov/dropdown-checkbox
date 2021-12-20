$(function () {
  // Variables
  const $showCheckboxes = $(".js-slide-checkbox");
  const $checkboxLists = $(".checkbox-list");
  const $sectorCheckboxes = $('.checkbox-list--sector [type="checkbox"]');
  const $levelCheckboxes = $('.checkbox-list--level [type="checkbox"]');
  const $languageCheckboxes = $('.checkbox-list--language [type="checkbox"]');
  const $cityCheckboxes = $('.checkbox-list--city [type="checkbox"]');
  const $employmentTypeCheckboxes = $(
    '.checkbox-list--employment-type [type="checkbox"]'
  );

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

    if ($checkbox.is(":checked")) {
      $arr.push($checkbox.val());
    }

    if (!$checkbox.is(":checked"))
      $arr.splice($arr.indexOf($checkbox.val()), 1);

    if (!$arr.length) {
      $inputText.css("color", "#b2b6bd");
      $counter.html("");
    } else {
      $inputText.css("color", "#000");
      $counter.html(`(${$arr.length})`);
    }
  }

  // Show checkboxes
  $showCheckboxes.on("click", function () {
    const $checkboxContainer = $(this).siblings(".checkbox-list");
    const $chevron = $(this).find("img");

    if ($checkboxContainer.is(":visible")) {
      $chevron.removeClass("chevron--active");
      $checkboxContainer.slideUp("fast");
    } else {
      $checkboxContainer.slideDown("fast");
      $chevron.addClass("chevron--active");
    }
  });

  // Hide elements when click outside
  $(document).on("mouseup", function (e) {
    if (
      !$(e.target).closest($checkboxLists).length &&
      $($checkboxLists).is(":visible")
    ) {
      $($checkboxLists).slideUp("fast");
      $(".chevron").removeClass("chevron--active");
    }
  });

  // Count Checkboxes
  const $sectorArray = [];
  $sectorCheckboxes.on("change", function () {
    const $checkbox = $(this);
    $countCheckboxes($checkbox, $sectorArray);
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
