// Put your application javascript here

//Helper functions

function _positionHeaderCartSummary() {
  let headerCartSummary = document.getElementsByClassName(
    "header__cart-summary"
  )[0];
  // Need to do some math to position this pop up properly, relative to the cart total.
  const headerCartTotal =
    document.getElementsByClassName("header__cart-total")[0];
  const headerCartTotalRightPosition =
    headerCartTotal.getBoundingClientRect().right;
  // There is a different right offset if there is a cart total or not.
  let rightOffset;
  if (
    headerCartTotal.innerHTML != "" &&
    headerCartTotal.innerHTML != undefined
  ) {
    rightOffset = window.innerWidth - headerCartTotalRightPosition - 10;
  } else {
    rightOffset = window.innerWidth - headerCartTotalRightPosition;
  }
  headerCartSummary.style.right = `${rightOffset}px`;
}

function _formatNumberWithCommas(number) {
  let parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function _getAndShowCartSummary() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (xhr.status == 200) {
        let cartJSON = JSON.parse(xhr.responseText);
        //Now to parse the json.
        const cartSummaryItemsList = document.getElementsByClassName(
          "header__cart-summary-item-list-container"
        )[0];
        const items = cartJSON.items;
        for (let i = 0; i < items.length; i++) {
          for (let j = 0; j < items[i].quantity; j++) {
            const headerCartSummaryItem = document.createElement("div");
            headerCartSummaryItem.classList.add("header__cart-summary-item");
            headerCartSummaryItem.id = `SummaryItem-${j}-${items[i].variant_id}`;
            // Image handling
            const headerCartSummaryItemImageContainer =
              document.createElement("div");
            headerCartSummaryItemImageContainer.classList.add(
              "header__cart-summary-item-image-container"
            );
            const headerCartSummaryImage = document.createElement("img");
            headerCartSummaryImage.classList.add(
              "header__carty-summary-item-image"
            );
            headerCartSummaryImage.src = items[i].image;
            headerCartSummaryImage.alt = `${items[i].title}`;
            headerCartSummaryItemImageContainer.appendChild(
              headerCartSummaryImage
            );
            headerCartSummaryItem.appendChild(
              headerCartSummaryItemImageContainer
            );
            // Description Handling
            const headerCartSummaryItemDescriptionContainer =
              document.createElement("div");
            headerCartSummaryItemDescriptionContainer.classList.add(
              "header__cart-summary-item-description-container"
            );
            const headerCartSummaryItemTitle = document.createElement("h4");
            headerCartSummaryItemTitle.classList.add(
              "header__cart-summary-item-title"
            );
            headerCartSummaryItemTitle.innerHTML = items[i].title;
            headerCartSummaryItemDescriptionContainer.appendChild(
              headerCartSummaryItemTitle
            );

            const headerCartSummaryVariantTitle = document.createElement("h6");
            headerCartSummaryVariantTitle.classList.add(
              "header__cart-summary-item-variant-title"
            );
            headerCartSummaryVariantTitle.innerHTML = items[i].variant_title;
            headerCartSummaryItemDescriptionContainer.appendChild(
              headerCartSummaryVariantTitle
            );

            const headerCartSummaryItemPrice = document.createElement("h6");
            headerCartSummaryItemPrice.classList.add(
              "header__cart-summary-item-price"
            );
            headerCartSummaryItemPrice.id = `VariantPrice-${j}-${items[i].quantity}-${items[i].variant_id}`;
            const price = items[i].price.toString();
            const formattedPrice = `${price.substr(
              0,
              price.length - 2
            )}.${price.slice(-2)}`;
            headerCartSummaryItemPrice.innerHTML = `$${formattedPrice}`;
            headerCartSummaryItemDescriptionContainer.appendChild(
              headerCartSummaryItemPrice
            );

            // Remove Button Handling in Cart Summary
            const headerCartSummaryRemoveButton =
              document.createElement("button");
            headerCartSummaryRemoveButton.classList.add(
              "header__cart-summary-remove-button"
            );
            headerCartSummaryRemoveButton.id = `RemoveButton-${j}-${items[i].quantity}-${items[i].variant_id}`;
            headerCartSummaryRemoveButton.innerHTML = "Remove";
            headerCartSummaryItemDescriptionContainer.appendChild(
              headerCartSummaryRemoveButton
            );

            headerCartSummaryItem.appendChild(
              headerCartSummaryItemDescriptionContainer
            );
            cartSummaryItemsList.appendChild(headerCartSummaryItem);
          }
        }
        // Set the subtotal
        const subTotal = cartJSON.items_subtotal_price.toString();
        let formattedSubTotal;
        // Need to handle when 0.
        if (subTotal === "0") {
          formattedSubTotal = subTotal;
        } else {
          formattedSubTotal = _formatNumberWithCommas(
            `${subTotal.substr(0, subTotal.length - 2)}.${subTotal.slice(-2)}`
          );
        }
        let cartSubTotal = document.getElementsByClassName(
          "header__cart-summary-subtotal"
        )[0];
        cartSubTotal.innerHTML = `Subtotal: $${formattedSubTotal}`;

        //Finally show the summary!
        let headerCartSummary = document.getElementsByClassName(
          "header__cart-summary"
        )[0];
        headerCartSummary.classList.remove("header__cart-summary--hidden");
      } else {
        // Error case
        console.error(`Error ${xhr.status}: ${xhr.statusText}`);
      }
    }
  };
  xhr.open("GET", "/cart.js", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.send();
}

function _hideCartSummary() {
  let headerCartSummary = document.getElementsByClassName(
    "header__cart-summary"
  )[0];
  headerCartSummary.classList.add("header__cart-summary--hidden");

  //And remove all of the items in the cart.
  const cartSummaryItemsList = document.getElementsByClassName(
    "header__cart-summary-item-list-container"
  )[0];
  while (cartSummaryItemsList.hasChildNodes()) {
    cartSummaryItemsList.removeChild(cartSummaryItemsList.lastChild);
  }
}

// Header

// //This is used to show the cart summary.
// document.addEventListener('click', function (event) {
//     // If the clicked element doesn't have the right selector, bail
//     if (!event.target.matches('.header__cart-button')
//         && !event.target.matches('.header__cart-icon')
//         && !event.target.matches('.header__cart-total')) {
//         return;
//     }
//     // Don't follow the link
//     event.preventDefault();

//     // If it is not already showing, get the cart contents into the summary and show it!
//     let headerCartSummaryHidden = document.getElementsByClassName('header__cart-summary--hidden');
//     if (headerCartSummaryHidden.length === 1) {
//         _positionHeaderCartSummary();
//         _getAndShowCartSummary();
//     } else {
//         _hideCartSummary();
//     }

// }, false);

//This is used to hide the cart summary.
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (
      !event.target.matches(".header__cart-summary-close-button") &&
      !event.target.matches(".header__cart-summary-close-icon")
    ) {
      return;
    }

    // Don't follow the link
    event.preventDefault();

    _hideCartSummary();
  },
  false
);

//This is used to remove a product from the cart in the cart summary.
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches(".header__cart-summary-remove-button")) {
      return;
    }

    // Don't follow the link
    event.preventDefault();

    const removeButtonId = event.target.id;
    //Need to split out the individual pieces of the id for the useful information needed for our dynamic behaviour. It has 4 parts.
    const removeButtonIdArray = removeButtonId.split("-");
    const label = removeButtonIdArray[0]; //Not super useful, it is parsed out.
    const itemIndex = removeButtonIdArray[1];

    // We are only using the item quantity label to track ids on the page. If a user were to remove multiple quantities of a product from
    // their cart, this number is no longer accurate, so we need to use JS to get a true count.
    const itemQuantityLabel = removeButtonIdArray[2];
    const variantId = removeButtonIdArray[3];

    //This gets us a true count of this variant on the summary.
    const otherItemsInSummaryList = document.querySelectorAll(
      'div[id^="SummaryItem"]'
    );
    let otherCopiesOfVariantInSummaryCount = 0;
    for (let i = 0; i < otherItemsInSummaryList.length; i++) {
      if (otherItemsInSummaryList[i].id.includes(variantId)) {
        otherCopiesOfVariantInSummaryCount =
          otherCopiesOfVariantInSummaryCount + 1;
      }
    }
    const newItemQuantity = otherCopiesOfVariantInSummaryCount - 1;

    const requestBody = {
      id: variantId,
      quantity: newItemQuantity,
    };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/cart/change.js", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify(requestBody));

    xhr.onload = function () {
      if (xhr.status == 200) {
        //Update the cart total manually when response is successful.
        const cartTotal =
          document.getElementsByClassName("header__cart-total")[0];
        let cartValue = cartTotal.innerHTML;
        let newValue;
        if (cartValue !== "" && cartValue !== undefined) {
          newValue = parseInt(cartValue.match(/\d+/)[0]) - 1;
          if (newValue === 0) {
            newValue = "";
          } else {
            newValue = "(" + newValue + ")";
          }
          while (cartTotal.firstChild) {
            cartTotal.removeChild(cartTotal.firstChild);
          }
          cartTotal.appendChild(document.createTextNode(newValue));
        }
        // Also update the subtotal and remove the item from the summary.
        const variantPriceLabel = "VariantPrice";
        const variantPriceId = `${variantPriceLabel}-${itemIndex}-${itemQuantityLabel}-${variantId}`;
        const variantPriceElement = document.getElementById(variantPriceId);
        const variantPriceValue = variantPriceElement.innerHTML;
        const variantPriceNumber = parseInt(
          variantPriceValue.replace("$", "").replace(".", "").replace(",", "")
        );

        let subTotal = document.getElementsByClassName(
          "header__cart-summary-subtotal"
        )[0];
        let subTotalValue = subTotal.innerHTML;
        let subTotalNumber = parseInt(
          subTotalValue
            .replace("Subtotal: $", "")
            .replace(".", "")
            .replace(",", "")
        );
        let newSubTotal = (subTotalNumber - variantPriceNumber).toString();
        //Need to handle 0 case.
        let newSubTotalString;
        if (newSubTotal === "0") {
          newSubTotalString = newSubTotal;
        } else {
          newSubTotalString = _formatNumberWithCommas(
            `${newSubTotal.substr(
              0,
              newSubTotal.length - 2
            )}.${newSubTotal.slice(-2)}`
          );
        }
        subTotal.innerHTML = `Subtotal: $${newSubTotalString}`;
        //Remove the item!
        const summaryItemLabel = "SummaryItem";
        const summaryItemId = `${summaryItemLabel}-${itemIndex}-${variantId}`;
        document.getElementById(summaryItemId).remove();
      } else {
        // Error case
        console.error(`Error ${xhr.status}: ${xhr.statusText}`);
      }
    };
    xhr.onerror = function () {
      console.error("Request to Remove From Cart Summary failed");
    };
  },
  false
);

//This handles the mobile expansion from the hamburger icon
//This is used to hide the cart summary.
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (
      !event.target.matches(".header__hamburger-menu-button") &&
      !event.target.matches(".header__hamburger-menu-icon") &&
      !event.target.matches(".header__hamburger-menu-close-icon") &&
      !event.target.matches(".mobile-nav-modal-overlay")
    ) {
      return;
    }

    // Don't follow the link
    event.preventDefault();

    //Check if expanded or not (have to check default, cart, about, locations, media, and journal headers)
    const headerNavContainerExpanded = document.getElementsByClassName(
      "header-nav-container--mobile-expanded"
    );
    const headerNavContainerExpandedCart = document.getElementsByClassName(
      "header-nav-container--mobile-expanded-cart"
    );
    const headerNavContainerExpandedAbout = document.getElementsByClassName(
      "header-nav-container--mobile-expanded-about"
    );
    const headerNavContainerExpandedLocations = document.getElementsByClassName(
      "header-nav-container--mobile-expanded-locations"
    );
    const headerNavContainerExpandedMedia = document.getElementsByClassName(
      "header-nav-container--mobile-expanded-media"
    );
    const headerNavContainerExpandedJournal = document.getElementsByClassName(
      "header-nav-container--mobile-expanded-journal"
    );
    if (
      headerNavContainerExpanded.length === 0 &&
      headerNavContainerExpandedCart.length === 0 &&
      headerNavContainerExpandedAbout.length === 0 &&
      headerNavContainerExpandedLocations.length === 0 &&
      headerNavContainerExpandedMedia.length === 0 &&
      headerNavContainerExpandedJournal.length === 0
    ) {
      //Trigger the expansion
      const main = document.getElementById("main");
      main.classList.add("main--mobile-expanded");
      const header = document.getElementsByClassName("header")[0];
      header.classList.add("header--mobile-expanded");
      const headerNavContainer = document.getElementsByClassName(
        "header-nav-container"
      )[0];
      // Show the close icon as well.
      const menuHamburgerIcon = document.getElementsByClassName(
        "header__hamburger-menu-icon"
      )[0];
      menuHamburgerIcon.classList.add("header__hamburger-menu-icon--hidden");
      const menuHamburgerCloseIcon = document.getElementsByClassName(
        "header__hamburger-menu-close-icon"
      )[0];
      menuHamburgerCloseIcon.classList.remove(
        "header__hamburger-menu-close-icon--hidden"
      );
      //There are different headers on different pages. Need to do further refinement here.
      // Default pages
      if (document.getElementsByClassName("header-background").length > 0) {
        const headerBackground =
          document.getElementsByClassName("header-background")[0];
        headerBackground.classList.add("header-background--mobile-expanded");
        headerNavContainer.classList.add(
          "header-nav-container--mobile-expanded"
        );
      } else if (
        document.getElementsByClassName("header-background-collections")
          .length > 0
      ) {
        // Shop Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-collections"
        )[0];
        headerBackground.classList.add("header-background--mobile-expanded");
        headerNavContainer.classList.add(
          "header-nav-container--mobile-expanded"
        );
      } else if (
        document.getElementsByClassName("header-background-cart").length > 0
      ) {
        // Cart Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-cart"
        )[0];
        headerBackground.classList.add("header-background--mobile-expanded");
        headerNavContainer.classList.add(
          "header-nav-container--mobile-expanded-cart"
        );
      } else if (
        document.getElementsByClassName("header-background-about").length > 0
      ) {
        // About Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-about"
        )[0];
        headerBackground.classList.add("header-background--mobile-expanded");
        headerNavContainer.classList.add(
          "header-nav-container--mobile-expanded-about"
        );
      } else if (
        document.getElementsByClassName("header-background-locations").length >
        0
      ) {
        // Locations Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-locations"
        )[0];
        headerBackground.classList.add("header-background--mobile-expanded");
        headerNavContainer.classList.add(
          "header-nav-container--mobile-expanded-locations"
        );
      } else if (
        document.getElementsByClassName("header-background-media").length > 0
      ) {
        // Media Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-media"
        )[0];
        headerBackground.classList.add("header-background--mobile-expanded");
        headerNavContainer.classList.add(
          "header-nav-container--mobile-expanded-media"
        );
      } else if (
        document.getElementsByClassName("header-background-journal").length > 0
      ) {
        // Journal Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-journal"
        )[0];
        headerBackground.classList.add("header-background--mobile-expanded");
        headerNavContainer.classList.add(
          "header-nav-container--mobile-expanded-journal"
        );
      }
      const headerLinksContainer = document.getElementsByClassName(
        "header-links-container"
      )[0];
      headerLinksContainer.classList.add(
        "header-links-container--mobile-expanded"
      );
      const headerLinksContainerMobile = document.getElementsByClassName(
        "header-links-container-mobile"
      )[0];
      headerLinksContainerMobile.classList.remove(
        "header-links-container-mobile--hidden"
      );

      //Add the overlay
      const mobileMenuOverlay = document.getElementsByClassName(
        "mobile-nav-modal-overlay"
      )[0];
      mobileMenuOverlay.classList.remove("mobile-nav-modal-overlay--hidden");
      const body = document.getElementsByTagName("body")[0];
      body.style.overflowY = "hidden";
    } else {
      // Minimize it
      const main = document.getElementById("main");
      main.classList.remove("main--mobile-expanded");
      const header = document.getElementsByClassName("header")[0];
      header.classList.remove("header--mobile-expanded");
      const headerNavContainer = document.getElementsByClassName(
        "header-nav-container"
      )[0];
      // Hide the close icon as well.
      const menuHamburgerCloseIcon = document.getElementsByClassName(
        "header__hamburger-menu-close-icon"
      )[0];
      menuHamburgerCloseIcon.classList.add(
        "header__hamburger-menu-close-icon--hidden"
      );
      const menuHamburgerIcon = document.getElementsByClassName(
        "header__hamburger-menu-icon"
      )[0];
      menuHamburgerIcon.classList.remove("header__hamburger-menu-icon--hidden");
      //There are different headers on different pages. Need to do further refinement here.
      // Default pages
      if (document.getElementsByClassName("header-background").length > 0) {
        const headerBackground =
          document.getElementsByClassName("header-background")[0];
        headerBackground.classList.remove("header-background--mobile-expanded");
        headerNavContainer.classList.remove(
          "header-nav-container--mobile-expanded"
        );
      } else if (
        document.getElementsByClassName("header-background-collections")
          .length > 0
      ) {
        // Shop Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-collections"
        )[0];
        headerBackground.classList.remove("header-background--mobile-expanded");
        headerNavContainer.classList.remove(
          "header-nav-container--mobile-expanded"
        );
      } else if (
        document.getElementsByClassName("header-background-cart").length > 0
      ) {
        // Cart Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-cart"
        )[0];
        headerBackground.classList.remove("header-background--mobile-expanded");
        headerNavContainer.classList.remove(
          "header-nav-container--mobile-expanded-cart"
        );
      } else if (
        document.getElementsByClassName("header-background-about").length > 0
      ) {
        // About Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-about"
        )[0];
        headerBackground.classList.remove("header-background--mobile-expanded");
        headerNavContainer.classList.remove(
          "header-nav-container--mobile-expanded-about"
        );
      } else if (
        document.getElementsByClassName("header-background-locations").length >
        0
      ) {
        // Locations Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-locations"
        )[0];
        headerBackground.classList.remove("header-background--mobile-expanded");
        headerNavContainer.classList.remove(
          "header-nav-container--mobile-expanded-locations"
        );
      } else if (
        document.getElementsByClassName("header-background-media").length > 0
      ) {
        // Media Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-media"
        )[0];
        headerBackground.classList.remove("header-background--mobile-expanded");
        headerNavContainer.classList.remove(
          "header-nav-container--mobile-expanded-media"
        );
      } else if (
        document.getElementsByClassName("header-background-journal").length > 0
      ) {
        // Journal Pages
        const headerBackground = document.getElementsByClassName(
          "header-background-journal"
        )[0];
        headerBackground.classList.remove("header-background--mobile-expanded");
        headerNavContainer.classList.remove(
          "header-nav-container--mobile-expanded-journal"
        );
      }
      const headerLinksContainer = document.getElementsByClassName(
        "header-links-container"
      )[0];
      headerLinksContainer.classList.remove(
        "header-links-container--mobile-expanded"
      );
      const headerLinksContainerMobile = document.getElementsByClassName(
        "header-links-container-mobile"
      )[0];
      headerLinksContainerMobile.classList.add(
        "header-links-container-mobile--hidden"
      );

      //Remove the overlay
      const mobileMenuOverlay = document.getElementsByClassName(
        "mobile-nav-modal-overlay"
      )[0];
      mobileMenuOverlay.classList.add("mobile-nav-modal-overlay--hidden");
      const body = document.getElementsByTagName("body")[0];
      body.style.overflowY = "scroll";
      headerLinksContainer.style.paddingRight = "";
    }
  },
  false
);

//Homepage

!(function (d) {
  // Variables to target our base class,  get carousel items, count how many carousel items there are, set the slide to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
  var itemClassName = "homepage__carousel-photo";
  (items = d.getElementsByClassName(itemClassName)),
    (totalItems = items.length),
    (slide = 0),
    (moving = true);
  let interval;

  // To initialise the carousel we'll want to update the DOM with our own classes
  function setInitialClasses() {
    // Target the last, initial, and next items and give them the relevant class.
    // This assumes there are three or more items.
    items[items.length - 1].classList.add("homepage__carousel-photo--prev");
    items[0].classList.add("homepage__carousel-photo--active");
    items[1].classList.add("homepage__carousel-photo--next");
  }

  // Set click events to navigation buttons

  function setEventListeners() {
    var next = d.getElementsByClassName("homepage__next-button")[0],
      prev = d.getElementsByClassName("homepage__previous-button")[0];

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);
  }

  // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if (!moving) {
      // temporarily disable interactivity
      disableInteraction();
      // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
      var newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

      // Test if carousel has more than three items
      if (totalItems - 1 > 3) {
        // Checks if the new potential slide is out of bounds and sets slide numbers
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }

        // Check if current slide is at the beginning or end and sets slide numbers
        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }

        // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.
        // Based on the current slide, reset to default classes.
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        // Add the new classes
        items[newPrevious].className =
          itemClassName + " homepage__carousel-photo--prev";
        items[slide].className =
          itemClassName + " homepage__carousel-photo--active";
        items[newNext].className =
          itemClassName + " homepage__carousel-photo--next";
      }
    }
  }

  // Next navigation handler
  function moveNext() {
    // Check if moving
    if (!moving) {
      // Clear automatic moving interval
      clearInterval(interval);
      interval = setInterval(function () {
        moveNext();
      }, 4000);

      // If it's the last slide, reset to 0, else +1
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Previous navigation handler
  function movePrev() {
    // Check if moving
    if (!moving) {
      // Clear automatic moving interval
      clearInterval(interval);
      interval = setInterval(function () {
        moveNext();
      }, 4000);

      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Initialise carousel
  function initCarousel() {
    if (totalItems > 0) {
      setInitialClasses();
      setEventListeners();

      // Set moving to false now that the carousel is ready
      moving = false;
      interval = setInterval(function () {
        moveNext();
      }, 4000);
    }
  }

  // make it rain
  initCarousel();
})(document);

// Collection Page

//This handles sorting the products on the page in alphabetical order.
!(function (d) {
  let productTiles = document.getElementsByClassName(
    "collectionpage__product-tile"
  );
  if (productTiles.length == 0) {
    return;
  }
  let productTitles = document.getElementsByClassName(
    "collectionpage__product-tile-title"
  );
  let productImages = document.getElementsByClassName(
    "collectionpage__product-tile-image"
  );
  let productLinks = document.getElementsByClassName(
    "collectionpage__product-tile-link"
  );
  let productArray = [];
  for (let i = 0; i < productTiles.length; i++) {
    let product = {};
    product.title = productTitles[i].textContent;
    product.image = productImages[i].src;
    product.link = productLinks[i].href;
    productArray.push(product);
  }
  productArray = productArray.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
  for (let j = 0; j < productArray.length; j++) {
    productTitles[j].textContent = productArray[j].title;
    productImages[j].src = productArray[j].image;
    productLinks[j].href = productArray[j].link;
    productTiles[j].classList.remove("collectionpage__product-tile--hidden");
  }
})(document);

// Product Page

//This handles adding to cart.
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches(".productpage__purchase-button")) {
      return;
    }

    // Don't follow the link
    event.preventDefault();

    const variantId = event.target.id.split("-")[1];
    const requestBody = {
      items: [
        {
          quantity: 1,
          id: variantId,
        },
      ],
    };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/cart/add.js", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify(requestBody));

    xhr.onload = function () {
      if (xhr.status == 200) {
        //Update the cart total manually when response is successful.
        const cartTotal =
          document.getElementsByClassName("header__cart-total")[0];
        let cartValue = cartTotal.innerHTML;
        let newValue;
        if (cartValue !== "" && cartValue !== undefined) {
          newValue = parseInt(cartValue.match(/\d+/)[0]) + 1;
          newValue = "(" + newValue + ")";
        } else {
          newValue = "(1)";
        }
        while (cartTotal.firstChild) {
          cartTotal.removeChild(cartTotal.firstChild);
        }
        cartTotal.appendChild(document.createTextNode(newValue));

        // If it is not already showing, get the cart contents into the summary and show it!
        let headerCartSummaryHidden = document.getElementsByClassName(
          "header__cart-summary--hidden"
        );
        if (headerCartSummaryHidden.length === 1) {
          _positionHeaderCartSummary();
          _getAndShowCartSummary();
        } else {
          // Otherwise hide it first and then show it.
          _hideCartSummary();
          _positionHeaderCartSummary();
          _getAndShowCartSummary();
        }
      } else {
        // Error case
        console.error(`Error ${xhr.status}: ${xhr.statusText}`);
      }
    };
    xhr.onerror = function () {
      console.error("Request to Add to Cart failed");
    };
  },
  false
);

//This handles the variant image click switch handling.
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (
      !event.target.matches(".productpage__secondary-product-button") &&
      !event.target.matches(".productpage__secondary-image") &&
      !event.target.matches(".productpage__secondary-product-title")
    ) {
      return;
    }

    // Don't follow the link
    event.preventDefault();

    //We are splitting a few different elements into "name-id" format, so just need the second part of the id.
    const variantId = event.target.id.split("-")[1];
    const url = new URL(window.location.href);
    url.searchParams.set("variant", variantId);
    window.location.href = url;
  },
  false
);

//This handles the opening of the Care Guide Modal.
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (
      !event.target.matches(".productpage__product-care-guide-button") &&
      !event.target.matches(".productpage__product-care-guide-button-icon")
    ) {
      return;
    }

    // Don't follow the link
    event.preventDefault();

    //Depending on if the hidden class is there or not, show or hide the modal!
    const hiddenProductCareModalOverlay = document.getElementsByClassName(
      "productpage__product-care-guide-modal-overlay--hidden"
    )[0];
    // If it is hidden show it!
    if (hiddenProductCareModalOverlay) {
      hiddenProductCareModalOverlay.classList.remove(
        "productpage__product-care-guide-modal-overlay--hidden"
      );
      // Remove the scroll bar and add appropriate padding
      const body = document.getElementsByTagName("body")[0];
      body.style.overflowY = "hidden";
      body.style.paddingRight = "15px";
    }
  },
  false
);

//This handles the closing of the Care Guide Modal.
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (
      !event.target.matches(
        ".productpage__product-care-guide-modal-close-button"
      ) &&
      !event.target.matches(".productpage__product-care-guide-modal-close-icon")
    ) {
      return;
    }

    // Don't follow the link
    event.preventDefault();

    const productCareModalOverlay = document.getElementsByClassName(
      "productpage__product-care-guide-modal-overlay"
    )[0];
    // Hide it!
    if (productCareModalOverlay) {
      productCareModalOverlay.classList.add(
        "productpage__product-care-guide-modal-overlay--hidden"
      );
      const body = document.getElementsByTagName("body")[0];
      body.style.overflowY = "scroll";
      body.style.paddingRight = "";
    }
  },
  false
);

// This function randomizes the accent images on the product page, so it rotates through the list of images on refresh.
!(function (d) {
  const productImageAccentList = document.getElementsByClassName(
    "productpage__primary-image-accent"
  );
  if (productImageAccentList.length > 0) {
    // As we duplicate product accent images on both mobile and desktop, we need to divide the real number by two.
    // We need to show both the mobile and the desktop one potentially.
    const uniqueProductImageCount = productImageAccentList.length / 2;

    // This gets the index of the image to be shown.
    const indexOfImageToShow = Math.floor(
      Math.random() * uniqueProductImageCount
    );
    // This gets the other index of the image to be shown.
    const otherIndexOfImageToShow =
      indexOfImageToShow + uniqueProductImageCount;
    productImageAccentList[indexOfImageToShow].classList.remove(
      "productpage__primary-image-accent--hidden"
    );
    productImageAccentList[otherIndexOfImageToShow].classList.remove(
      "productpage__primary-image-accent--hidden"
    );
  }
})(document);

// Cart page

//This is used to remove a product from the cart on the cart page.
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches(".cartpage__item-remove-button")) {
      return;
    }

    // Don't follow the link
    event.preventDefault();

    const cartRemoveButtonId = event.target.id;
    // Need to split out the individual pieces of the id for the useful information needed for our dynamic behaviour. It has 4 parts.
    const cartRemoveButtonIdArray = cartRemoveButtonId.split("-");
    const label = cartRemoveButtonIdArray[0]; //Not super useful, it is parsed out.
    const itemIndex = cartRemoveButtonIdArray[1];

    // We are only using the item quantity label to track ids on the page. If a user were to remove multiple quantities of a product from
    // their cart, this number is no longer accurate, so we need to use JS to get a true count.
    const itemQuantityLabel = cartRemoveButtonIdArray[2];
    const variantId = cartRemoveButtonIdArray[3];

    //This gets us a true count of this variant on the page.
    const otherItemsOnPageList = document.querySelectorAll(
      'div[id^="CartItem"]'
    );
    let otherCopiesOfVariantOnPageCount = 0;
    for (let i = 0; i < otherItemsOnPageList.length; i++) {
      if (otherItemsOnPageList[i].id.includes(variantId)) {
        otherCopiesOfVariantOnPageCount = otherCopiesOfVariantOnPageCount + 1;
      }
    }
    const newItemQuantity = otherCopiesOfVariantOnPageCount - 1;

    const requestBody = {
      id: variantId,
      quantity: newItemQuantity,
    };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/cart/change.js", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify(requestBody));

    xhr.onload = function () {
      if (xhr.status == 200) {
        console.log("JOEL TEST");
        console.log(xhr);
        let cartJSON = JSON.parse(xhr.responseText);
        //handle the empty response separately.
        if (cartJSON.items.length == 0) {
          const cartPageHeadings = document.getElementsByClassName(
            "cartpage__headings-container"
          )[0];
          cartPageHeadings.classList.add(
            "cartpage__headings-container--hidden"
          );

          const cartPageFooter = document.getElementsByClassName(
            "cartpage__footer-container"
          )[0];
          cartPageFooter.classList.add("cartpage__footer-container--hidden");

          const emptyCartContainer = document.getElementsByClassName(
            "cartpage__empty-cart-container--hidden"
          )[0];
          emptyCartContainer.classList.remove(
            "cartpage__empty-cart-container--hidden"
          );
        }
        //Update the cart total manually when response is successful.
        const cartTotal = document.getElementsByClassName(
          "header__cart-total--selected"
        )[0];
        let cartValue = cartTotal.innerHTML;
        let newValue;
        if (cartValue !== "" && cartValue !== undefined) {
          newValue = parseInt(cartValue.match(/\d+/)[0]) - 1;
          if (newValue === 0) {
            newValue = "";
          } else {
            newValue = "(" + newValue + ")";
          }
          while (cartTotal.firstChild) {
            cartTotal.removeChild(cartTotal.firstChild);
          }
          cartTotal.appendChild(document.createTextNode(newValue));
        }
        // // Also update the subtotal and remove the item from the summary.
        const cartVariantPriceLabel = "CartVariantPrice";
        const cartVariantPriceId = `${cartVariantPriceLabel}-${itemIndex}-${itemQuantityLabel}-${variantId}`;
        const cartVariantPriceElement =
          document.getElementById(cartVariantPriceId);
        const cartVariantPriceValue = cartVariantPriceElement.innerHTML;
        const cartVariantPriceNumber = parseInt(
          cartVariantPriceValue
            .replace("$", "")
            .replace(".", "")
            .replace(",", "")
        );

        let cartSubTotal = document.getElementsByClassName(
          "cartpage__total-amount"
        )[0];
        let cartSubTotalValue = cartSubTotal.innerHTML;
        let cartSubTotalNumber = parseInt(
          cartSubTotalValue.replace("$", "").replace(".", "").replace(",", "")
        );
        let newCartSubTotal = (
          cartSubTotalNumber - cartVariantPriceNumber
        ).toString();
        //Need to handle 0 case.
        let newCartSubTotalString;
        if (newCartSubTotal === "0") {
          newCartSubTotalString = newCartSubTotal;
        } else {
          newCartSubTotalString = _formatNumberWithCommas(
            `${newCartSubTotal.substr(
              0,
              newCartSubTotal.length - 2
            )}.${newCartSubTotal.slice(-2)}`
          );
        }
        cartSubTotal.innerHTML = `$${newCartSubTotalString}`;
        //Remove the item!
        const cartItemLabel = "CartItem";
        const cartItemId = `${cartItemLabel}-${itemIndex}-${itemQuantityLabel}-${variantId}`;
        document.getElementById(cartItemId).remove();
      } else {
        // Error case
        console.error(`Error ${xhr.status}: ${xhr.statusText}`);
      }
    };
    xhr.onerror = function () {
      console.error("Request to Remove from Cart failed");
    };
  },
  false
);
