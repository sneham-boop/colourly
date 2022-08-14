$(() => {
  let colourAdjust = document.getElementById("color-block");
  let context1 = colourAdjust.getContext("2d");
  let width1 = colourAdjust.width;
  let height1 = colourAdjust.height;

  let colorChange = document.getElementById("color-strip");
  let context2 = colorChange.getContext("2d");
  let width2 = colorChange.width;
  let height2 = colorChange.height;

  let selectedColour = document.getElementById("color-label");

  let x = 0;
  let y = 0;
  let drag = false;
  let rgbaColor = "rgba(174,32,18,1)";

  const fillGradient = () => {
    context1.fillStyle = rgbaColor;
    context1.fillRect(0, 0, width1, height1);

    let grdWhite = context2.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, "rgba(255,255,255,1)");
    grdWhite.addColorStop(1, "rgba(255,255,255,0)");
    context1.fillStyle = grdWhite;
    context1.fillRect(0, 0, width1, height1);

    let grdBlack = context2.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, "rgba(0,0,0,0)");
    grdBlack.addColorStop(1, "rgba(0,0,0,1)");
    context1.fillStyle = grdBlack;
    context1.fillRect(0, 0, width1, height1);
  };

  const click = (event) => {
    x = event.offsetX;
    y = event.offsetY;
    let imageData = context2.getImageData(x, y, 1, 1).data;
    rgbaColor =
      "rgba(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ",1)";
    fillGradient();
  };

  const mousedown = (event) => {
    drag = true;
    changeColor(event);
  };

  const mousemove = (event) => drag && changeColor(event);

  const mouseup = () => (drag = false);

  const changeColor = (event) => {
    x = event.offsetX;
    y = event.offsetY;
    const imageData = context1.getImageData(x, y, 1, 1).data;
    rgbaColor =
      "rgba(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ",1)";
    selectedColour.style.backgroundColor = rgbaColor;
  };

  context1.rect(0, 0, width1, height1);
  fillGradient();

  context2.rect(0, 0, width2, height2);
  let grid1 = context2.createLinearGradient(0, 0, 0, height1);
  grid1.addColorStop(0, "rgba(255, 0, 0, 1)");
  grid1.addColorStop(0.17, "rgba(255, 255, 0, 1)");
  grid1.addColorStop(0.34, "rgba(0, 255, 0, 1)");
  grid1.addColorStop(0.51, "rgba(0, 255, 255, 1)");
  grid1.addColorStop(0.68, "rgba(0, 0, 255, 1)");
  grid1.addColorStop(0.85, "rgba(255, 0, 255, 1)");
  grid1.addColorStop(1, "rgba(255, 0, 0, 1)");
  context2.fillStyle = grid1;
  context2.fill();

  colorChange.addEventListener("click", click, false);
  colourAdjust.addEventListener("mousedown", mousedown, false);
  colourAdjust.addEventListener("mouseup", mouseup, false);
  colourAdjust.addEventListener("mousemove", mousemove, false);

  // Save combination
  $(".colour-selection").click(function () {
    const newColour = $("#color-label").css("background-color");
    $(this).css("background-color", newColour);
  });

  $("#new-combination-container button").click(function () {
    let combination = [];
    $("#colour-selection-container")
      .children("div")
      .each(function () {
        const colorValue = $(this).css("background-color");
        const decimalColour = colorValue.match(/\d+/gi);
        const hexColour = decimalColour
          .map((num) => {
            const col = parseInt(num);
            if (col > 0) return col.toString(16).toUpperCase();
          })
          .join("");
        if (hexColour !== "") combination.push(hexColour);
      });
    $.post(`/api/combinations`, { combination });
  });
});
