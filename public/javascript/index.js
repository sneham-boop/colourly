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

  // Trigger save or unsave of a combination
  $(".combination-info .material-symbols-rounded").click(function () {
    const id = $(this).attr("id");
    const user = $(this).attr("user");
    if (user) {
      let checkFill = $(this).css("font-variation-settings");
      let save;

      // Save palette
      if (checkFill.includes('"FILL" 0')) {
        save = true;
        checkFill = checkFill.replace('"FILL" 0', '"FILL" 1');
      }
      // Unsave palette
      else if (checkFill.includes('"FILL" 1')) {
        save = false;
        checkFill = checkFill.replace('"FILL" 1', '"FILL" 0');
      }
      $.post(`/combinations/users/saved/`, { id, save }, (data) => {
        // window.location.reload();
        console.log("In the post request.", data);
        $(this).css("font-variation-settings", checkFill);
        $(this).load();
      });
      // .done(()=>{
      //   console.log("In the .done");
      //   $(this).load();
      // });

      // $.ajax({
      //   type: "POST",
      //   url: `/combinations/users/saved/`,
      //   data: { id, save },
      //   success: function (result) {
      //     console.log(result);
      //     $(this).css("font-variation-settings", checkFill);
      //     window.location.reload();
      //     // $(this).css("font-variation-settings", checkFill);
      //   },
      // });

      return;
    }
    // Need to sign in or sign up to save a palette.
    showSignIn();
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

      const menuHeight = $("#combination-nav-container").height();
      const menuHeightOffset = menuHeight + 30;

      console.log(menuHeight);

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
      $("#combination-nav-container").css({
        display: "block",
        left: x,
        top: y,
      });
    });

    // Delete
    $("#delete-combination").click(function () {
      console.log(
        "User ID is:",
        userID,
        "Combination user ID is:",
        combinationUserID
      );
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

  // Float menu & colapsible menu hide
  $(document).on("click", function (event) {
    const target = event.target;
    if (!$(target).hasClass("float-menu-show")) {
      $("#combination-nav-container").css({ display: "none" });
    }

    if (!$(target).hasClass(".menu-icon")) {
      $(".menu").slideUp();
    }
  });
});
