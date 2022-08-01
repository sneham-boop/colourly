$(() => {
  // Set value of colour as per text in span
  function checkDarkness(colour) {
    const c = colour.substring(1); // strip #
    const rgb = parseInt(c, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if (luma < 80) return true;
    return false;
  }

  function setColours() {
    $(".combination")
      .children("span")
      .each(function () {
        const colorValue = `#${$(this).text().trim()}`;
        $(this).css("color", colorValue);
        $(this).css("background-color", colorValue);
      });
  }
  setColours();

  // Display / hide the colour value
  function handlerIn() {
    const colorValue = "#" + $(this).text().trim();
    const isDark = checkDarkness(colorValue);
    isDark ? $(this).css("color", "#FFF") : $(this).css("color", "#000");
  }

  function handlerOut() {
    const colorValue = `#${$(this).text().trim()}`;
    $(this).css("color", colorValue);
  }

  $(".colour").mouseenter(handlerIn).mouseleave(handlerOut);

  // Toggles the collapsible menu
  $("#collapsible-menu-icon").click(function () {
    $("#something").slideToggle();
  });
});