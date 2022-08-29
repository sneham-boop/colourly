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
  $("#collapsible-menu-icon").click(function () {
    $(".menu").slideToggle();
  });

  // Trigger likes update in the database and display them
  $(".material-symbols-rounded").click(function () {
    const id = $(this).attr("id");
    $.post(`/api/likes/${id}`, (data) => {
      const { combination } = data;
      let formattedLikes = "";
      if (combination.likes < 1000) {
        formattedLikes = combination.likes.toString();
      } else {
        const rounded = Math.round(combination.likes / 100) / 10;
        formattedLikes = rounded + "k";
      }
      $(this).css("font-variation-settings", "'FILL' 1");
      $(this).next().html(formattedLikes);
    });
  });

  // Sign in form
  $("#sign-in-form i").click(function () {
    $("#opaque").fadeOut();
  });

  $(".sign-in-link, #menu-sign-in").click(function () {
    if ($(".menu").is(":visible")) {
      $(".menu").slideToggle();
    }

    $("#sign-in-form").show();
    $("#opaque").fadeIn();
    $("#sign-up-form").hide();
  });

  // Sign up form
  $("#sign-up-form i").click(function () {
    $("#opaque").fadeOut();
  });

  $(".sign-up-button, #menu-sign-up").click(function () {
    if ($(".menu").is(":visible")) {
      $(".menu").slideToggle();
    }
    $("#sign-up-form").show();
    $("#opaque").fadeIn();
    $("#sign-in-form").hide();
  });

  // Sign out menu action
  $("#menu-sign-out").click(function () {
    $.post(`/logout`, function () {
      location.reload();
    });
  });

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

  // Float menu show
  $(document).ready(function () {
    let id;
    let userID;
    let combinationUserID;
    $(".float-menu-show").click(function (event) {
      id = this.id;
      userID = $(this).attr("user_id");
      combinationUserID = $(this).attr("combination_user_id");

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

      if (heightDiff <= 240) {
        y -= 240 + 24;
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
      $("#combination-nav-container").css({
        display: "block",
        left: x,
        top: y,
      });
    });

    // Delete
    $("#delete-combination").click(function () {
      console.log("User ID is:",userID,"Combination user ID is:", combinationUserID);
      if (userID === combinationUserID) {
        $.ajax({
          type: "DELETE",
          url: `/api/combinations/${id}`,
          data: { userID, combinationUserID },
          success: function (result) {
            window.location.reload();
          },
        });
      }
    });
  });

  // Float menu hide
  $(document).on("click", function (event) {
    const target = event.target;
    if (!$(target).hasClass("float-menu-show")) {
      $("#combination-nav-container").css({ display: "none" });
    }
  });

  // // Delete
  // $("#delete-combination").click(function () {
  //   console.log(this);
  //   // $.ajax({
  //   //   type: "POST",
  //   //   url: "/api/combinations/:id",
  //   //   data: data,
  //   //   success: success,
  //   //   dataType: dataType
  //   // });
  // });
});
