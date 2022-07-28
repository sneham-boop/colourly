$(() => {
  const setColours = () => {
    $(".combination")
      .children("span")
      .each(function () {
        const colorValue = $(this).text();
        $(this).css("background-color", colorValue);
      });
  };
  setColours();
});
