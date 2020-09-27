// Put your application javascript here


// Header

//This is used to show the cart summary.
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.header__cart-button')
        && !event.target.matches('.header__cart-icon')
        && !event.target.matches('.header__cart-total')) {
        return;
    }

    // Don't follow the link
    event.preventDefault();

    let headerCartSummary = document.getElementsByClassName('header__cart-summary')[0];
    // Need to do some math to position this pop up properly, relative to the cart total.
    const headerCartTotal = document.getElementsByClassName('header__cart-total')[0];
    const headerCartTotalRightPosition = headerCartTotal.getBoundingClientRect().right;
    // There is a different right offset if there is a cart total or not.
    let rightOffset;
    if (headerCartTotal.innerHTML != '' && headerCartTotal.innerHTML != undefined) {
        rightOffset = window.innerWidth - headerCartTotalRightPosition - 10;
    } else {
        rightOffset = window.innerWidth - headerCartTotalRightPosition;
    }
    headerCartSummary.style.right = `${rightOffset}px`;
    headerCartSummary.classList.remove("header__cart-summary--hidden");

}, false);

//This is used to hide the cart summary.
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.header__cart-summary-close-button')
        && !event.target.matches('.header__cart-summary-close-icon')) {
        return;
    }

    // Don't follow the link
    event.preventDefault();

    let headerCartSummary = document.getElementsByClassName('header__cart-summary')[0];
    headerCartSummary.classList.add("header__cart-summary--hidden");

}, false);

//Homepage

!(function (d) {
    // Variables to target our base class,  get carousel items, count how many carousel items there are, set the slide to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
    var itemClassName = "homepage__carousel-photo";
    items = d.getElementsByClassName(itemClassName),
        totalItems = items.length,
        slide = 0,
        moving = true;
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
        var next = d.getElementsByClassName('homepage__next-button')[0],
            prev = d.getElementsByClassName('homepage__previous-button')[0];

        next.addEventListener('click', moveNext);
        prev.addEventListener('click', movePrev);
    }

    // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
    function disableInteraction() {
        moving = true;

        setTimeout(function () {
            moving = false
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
            if ((totalItems - 1) > 3) {

                // Checks if the new potential slide is out of bounds and sets slide numbers
                if (newPrevious <= 0) {
                    oldPrevious = (totalItems - 1);
                } else if (newNext >= (totalItems - 1)) {
                    oldNext = 0;
                }

                // Check if current slide is at the beginning or end and sets slide numbers
                if (slide === 0) {
                    newPrevious = (totalItems - 1);
                    oldPrevious = (totalItems - 2);
                    oldNext = (slide + 1);
                } else if (slide === (totalItems - 1)) {
                    newPrevious = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }

                // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.
                // Based on the current slide, reset to default classes.
                items[oldPrevious].className = itemClassName;
                items[oldNext].className = itemClassName;

                // Add the new classes
                items[newPrevious].className = itemClassName + " homepage__carousel-photo--prev";
                items[slide].className = itemClassName + " homepage__carousel-photo--active";
                items[newNext].className = itemClassName + " homepage__carousel-photo--next";
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
                moveNext()
            }, 4000);

            // If it's the last slide, reset to 0, else +1
            if (slide === (totalItems - 1)) {
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
                moveNext()
            }, 4000);

            // If it's the first slide, set as the last slide, else -1
            if (slide === 0) {
                slide = (totalItems - 1);
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
                moveNext()
            }, 4000);
        }
    }

    // make it rain
    initCarousel();

}(document));

// Product Page

//This handles adding to cart.
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.productpage__purchase-button')) {
        return;
    }

    // Don't follow the link
    event.preventDefault();

    const productId = event.target.id.split('-')[1];
    const requestBody = {
        items: [
            {
                "quantity": 1,
                "id": productId,
            }
        ]
    };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/cart/add.js", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify(requestBody));

    xhr.onload = function () {
        if (xhr.status == 200) {
            //Update the cart total manually when response is successful.
            const cartTotal = document.getElementsByClassName('header__cart-total')[0];
            let cartValue = cartTotal.innerHTML;
            let newValue;
            if (cartValue !== '' && cartValue !== undefined) {
                newValue = parseInt(cartValue.match(/\d+/)[0]) + 1;
                newValue = "(" + newValue + ")";
            } else {
                newValue = "(1)";
            }
            while (cartTotal.firstChild) {
                cartTotal.removeChild(cartTotal.firstChild);
            }
            cartTotal.appendChild(document.createTextNode(newValue));

            // Show the cart popup as well.
            let headerCartSummary = document.getElementsByClassName('header__cart-summary')[0];
            headerCartSummary.classList.remove("header__cart-summary--hidden");
        } else {
            // Error case
            console.error(`Error ${xhr.status}: ${xhr.statusText}`);
        }

    }
    xhr.onerror = function () {
        console.error("Request to Add to Cart failed");
    };

}, false);


//This handles the variant image click switch handling.
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.productpage__secondary-product-button')
        && !event.target.matches('.productpage__secondary-image')
        && !event.target.matches('.productpage__secondary-product-title')) {
        return;
    }

    // Don't follow the link
    event.preventDefault();

    //We are splitting a few different elements into "name-id" format, so just need the second part of the id.
    const variantId = event.target.id.split('-')[1];
    const url = new URL(window.location.href);
    url.searchParams.set('variant', variantId);
    window.location.href = url;

}, false);
