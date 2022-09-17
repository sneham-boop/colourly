$(() => {
  let saturationLightnessBlock = document.getElementById("color-block");
  let context1 = saturationLightnessBlock.getContext("2d");
  let width1 = saturationLightnessBlock.width;
  let height1 = saturationLightnessBlock.height;

  let hueStrip = document.getElementById("color-strip");
  let context2 = hueStrip.getContext("2d");
  let width2 = hueStrip.width;
  let height2 = hueStrip.height;

  let selectedColour = document.getElementById("colour-value");
  let rgbaColor = "rgba(255,0,0,1)";

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

  const adjHue = (x, y) => {
    let imageData = context2.getImageData(x, y, 1, 1).data;
    rgbaColor =
      "rgba(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ",1)";
    fillGradient();
  };

  context1.rect(0, 0, width1, height1);
  fillGradient();

  context2.rect(0, 0, width2, height2);
  let grid1 = context2.createLinearGradient(0, 0, 0, height1);
  grid1.addColorStop(0, "rgba(255, 0, 0, 1)");
  grid1.addColorStop(0.142, "rgba(255, 255, 0, 1)");
  grid1.addColorStop(0.284, "rgba(0, 255, 0, 1)");
  grid1.addColorStop(0.426, "rgba(0, 255, 255, 1)");
  grid1.addColorStop(0.568, "rgba(0, 0, 255, 1)");
  grid1.addColorStop(0.852, "rgba(255, 0, 255, 1)");
  grid1.addColorStop(1, "rgba(255, 0, 0, 1)");
  context2.fillStyle = grid1;
  context2.fill();

  // Colour adjustment
  const adjSaturationLightness = (x, y) => {
    const imageData = context1.getImageData(x, y, 1, 1).data;
    rgbaColor =
      "rgba(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ",1)";
    selectedColour.style.backgroundColor = rgbaColor;
  };

  const boundingAreaBlock = saturationLightnessBlock.getBoundingClientRect();
  $("#drag-container").css({
    top: boundingAreaBlock.top,
    left: boundingAreaBlock.left,
  });

  const boundingAreaStrip = hueStrip.getBoundingClientRect();
  $("#drag-color-strip-container").css({
    top: boundingAreaStrip.top,
    left: boundingAreaStrip.left,
  });

  // Drag selector
  function dragElement(el, bound, moveVertically) {
    let newX = 0,
      newY = 0,
      initialX = 0,
      initialY = 0;
    if (el) el.onmousedown = requestDrag;

    function requestDrag(e) {
      e.preventDefault();
      // Mouse position
      initialX = e.clientX;
      initialY = e.clientY;
      document.onmouseup = endDrag;
      document.onmousemove = beginDrag;
    }

    function beginDrag(e) {
      e.preventDefault();

      // Calculate position
      newX = initialX - e.clientX;
      newY = initialY - e.clientY;
      initialX = e.clientX;
      initialY = e.clientY;

      // New position
      const x = el.offsetLeft - newX;
      const y = el.offsetTop - newY;

      // Strip
      if (moveVertically) {
        if (e.clientY > bound.top && e.clientY < bound.bottom)
          el.style.top = y + "px";
        adjHue(x + 7.5, y + 19);
        const sel = document.getElementById("drag-selector");
        adjSaturationLightness(sel.offsetLeft + 12, sel.offsetTop + 12);
      }
      // Block
      else {
        if (e.clientX > bound.left && e.clientX < bound.right)
          el.style.left = x + "px";
        if (e.clientY > bound.top && e.clientY < bound.bottom)
          el.style.top = y + "px";
        adjSaturationLightness(el.offsetLeft + 12, el.offsetTop + 12);
      }
    }

    function endDrag() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  $("#drag-container").mouseover(function () {
    dragElement(
      document.getElementById("drag-selector"),
      boundingAreaBlock,
      false
    );
  });

  $("#drag-color-strip-container").mouseover(function () {
    dragElement(
      document.getElementById("drag-color-strip-selector"),
      boundingAreaStrip,
      true
    );
  });

  // Save combination
  $(".selected-col").click(function () {
    const newColour = $("#colour-value").css("background-color");
    $(this).css("background-color", newColour);
  });

  $("#new-combination-container button").click(function () {
    let combination = [];
    $("#selected-cols")
      .children("div")
      .each(function () {
        const colorValue = $(this).css("background-color");
        const decimalColour = colorValue.match(/\d+/gi);
        if (decimalColour.length === 4) return;
        const hexColour = decimalColour
          .map((num) => {
            let col = parseInt(num);
            if (col > 0) {
              col = col.toString(16);
              if (col.length === 1) col = `0${col}`;
              return col.toUpperCase();
            }
            if (col === 0) return "00";
          })
          .join("");
        if (hexColour !== "") combination.push(hexColour);
      });
    $.post(
      `/api/combinations`,
      { combination },
      function (response, textStatus) {
        const { redirectLink } = response;
        if (redirectLink) {
          window.location.href = redirectLink;
        } else {
          $("#error-location").replaceWith(textStatus);
        }
      }
    );
  });
});
