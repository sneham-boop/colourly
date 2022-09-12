$(() => {
  // Set value of colour as per text in span
  function checkDarkness(colour) {
    const c = colour.substring(1); // strip #
    const rgb = parseInt(c, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if (luma < 100) return true;
    return false;
  }

  function setColours() {
    $(".combination")
      .children("span")
      .each(function () {
        const colorValue = `#${$(this).text().trim()}`;
        $(this).css({ color: colorValue });
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
  $("#collapsible-menu-icon").click(function (event) {
    event.stopPropagation();
    $(".menu").slideToggle();
  });

  // Sign in form
  // Show sign in function
  const showSignIn = () => {
    if ($(".menu").is(":visible")) {
      $(".menu").slideToggle();
    }

    $("#sign-in-form").show();
    $("#opaque").fadeIn();
    $("#sign-in-form input[type|='email']").focus();
    $("#sign-up-form").hide();
  };

  // Hide
  $("#sign-in-form i").click(function () {
    $("#opaque").fadeOut();
  });

  $(".sign-in-link, #menu-sign-in").click(showSignIn);

  // Sign up form hide
  $("#sign-up-form i").click(function () {
    $("#opaque").fadeOut();
  });

  // Sign up form show
  $(".sign-up-button, #menu-sign-up").click(function () {
    if ($(".menu").is(":visible")) {
      $(".menu").slideToggle();
    }
    $("#sign-up-form").show();
    $("#opaque").fadeIn();
    $("#sign-up-form input[type|='email']").focus();
    $("#sign-in-form").hide();
  });

  // Sign out menu action
  $("#menu-sign-out").click(function () {
    $.post(`/logout`, function () {
      location.reload();
    });
  });

  // Save combination function
  function saveACombination(CID, UID) {
    // Combination ID coming through the heart within combination-info or the float menu
    const comb_id = $(this).attr("comb_id") || CID;
    const userID = $(this).attr("user_id") || UID;

    $(document).find();
    if (userID) {
      let checkFill = $(`#heart-${comb_id}`).css("font-variation-settings");
      let save;

      // Save palette
      if (checkFill.includes('"FILL" 0')) {
        save = true;
        checkFill = checkFill.replace('"FILL" 0', '"FILL" 1');
      }
      // Unsave palette
      else {
        save = false;
        checkFill = checkFill.replace('"FILL" 1', '"FILL" 0');
      }

      $.ajax({
        type: "POST",
        url: `/combinations/users/saved/`,
        data: { id: comb_id, save },
        success: (result) => {
          $(`#heart-${comb_id}`).css("font-variation-settings", checkFill);
          $(`#likes-${comb_id}`).load(location.href + ` #likes-${comb_id}`);
        },
      });
      return;
    }
    // Need to sign in or sign up to save a palette.
    showSignIn();
  }

  // Save triggered from .combination-info
  $(".combination-info .material-symbols-rounded").click(saveACombination);

  // Copy colour
  $(".colour").click(function (event) {
    const colourValue = $(this).text().trim();

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(colourValue)
        .then(() => {
          $(this).html(`<span class="material-symbols-rounded">done</span>`);
        })
        .then(() => {
          $(this).mouseleave(() => {
            $(this)
              .html(colourValue)
              .css("color", "#" + colourValue);
          });
        });
    } else {
      console.log("Browser Not compatible");
    }
  });

  // Float menu show and controls
  $(document).ready(function () {
    let id;
    let userID;
    let createdBy;
    let colours;
    $(".float-menu-show").click(function (event) {
      id = this.id;
      userID = $(this).attr("user_id");
      createdBy = $(this).attr("created_by");
      colours = $(this).attr("colours");

      const width = $(window).width();
      const height = $(window).height();

      let x = $(this).offset().left - 16;
      let y = $(this).offset().top + 27;

      let screenClickX = event.clientX;
      let screenClickY = event.clientY;

      const widthDiff = width - screenClickX;
      const heightDiff = height - screenClickY;

      $("#upper-triangle").css({
        display: "block",
        left: "8px",
        top: "-15px",
      });
      $("#lower-triangle").css({
        display: "none",
        left: "8px",
      });

      const menuHeight = $("#combination-nav-container").height();
      const menuHeightOffset = menuHeight + 30;

      if (heightDiff <= menuHeightOffset) {
        y -= menuHeightOffset;
        $("#upper-triangle").css({
          display: "none",
        });
        $("#lower-triangle").css({
          display: "block",
        });
      }
      if (widthDiff < 275) {
        x -= 225;
        if ($("#lower-triangle").css("display") === "block") {
          $("#lower-triangle").css({
            left: "233px",
          });
        } else {
          $("#upper-triangle").css({
            left: "233px",
          });
        }
      }

      // Status of "Save" text in float menu
      $heart = $(`#heart-${id}`);
      let checkFill = $heart.css("font-variation-settings");
      if (checkFill.includes('"FILL" 0')) {
        $("#combination-nav-container #save-combination-menu p")
          .empty()
          .append("Save");
      } else {
        $("#combination-nav-container #save-combination-menu p")
          .empty()
          .append("Unsave");
      } 

      $("#combination-nav-container").css({
        display: "block",
        left: x,
        top: y,
      });
    });

    // Delete triggered from float menu
    $("#delete-combination").click(function () {
      if (userID === createdBy) {
        $.ajax({
          type: "DELETE",
          url: `/api/combinations/${id}`,
          data: { userID, createdBy },
          success: function (result) {
            window.location.reload();
          },
        });
      }
    });

    // Save triggered from float menu
    $("#save-combination-menu").click(() => saveACombination(id, userID));

    // Open palette from float menu
    $(
      "#open-palette-combination-menu, #view-fullscreen-combination-menu"
    ).click(function () {
      const coloursArray = colours.split(",");
      const width = `${Math.round(100 / coloursArray.length)}%`;

      let coloursHTML = "";

      coloursArray.forEach((colour) => {
        coloursHTML = coloursHTML.concat(
          `<div style="background-color:#${colour};"></div>`
        );
      });

      $("#palette-fullscreen-palette").empty().append(coloursHTML);
      $("#palette-fullscreen").css({ display: "inline" });
      $("#palette-fullscreen-palette div").css({ width: width });
    });
  });

  $("#palette-fullscreen-cancel").click(() => {
    $("#palette-fullscreen").css({ display: "none" });
  });

  // Float menu & colapsible menu hide
  $(document).on("click", function (event) {
    const target = event.target;
    if (!$(target).hasClass("float-menu-show")) {
      $("#combination-nav-container").css({ display: "none" });
    }

    if (!$(target).hasClass(".navbar-toggler")) {
      $("#navbarText").collapse("hide");
    }
  });

  $(document).scroll(function () {
    $("#combination-nav-container").css({ display: "none" });
    $("#navbarText").collapse("hide");
  })

});
