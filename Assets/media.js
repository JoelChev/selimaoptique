// This Javascript file contains all the Media Data (and Javascript) for the Media page.

var test = {
    "joel": "huzzzah!"
}

const mediaContent = {
    // Adri O
    "Adri_Lycra": {
        "title": "Lycra Ad // 2006",
        "text": "Featuring the <a class='test' href='/'>Adri-0</a> in black",
        "variant": "",
    },
    "Adri_Jane": {
        "title": "JANE // October 2003",
        "text": "Featuring the Adri-0 in tortoise",
        "variant": "",
    },
    "Adri_Gaga": {
        "title": "GagaFashionLand.com // May 2012",
        "text": "Lady Gaga wears the <a class='test' href='/'>Adri-0</a>",
        "variant": "",
    },
    "Adri_Parlour": {
        "title": "Parlour Magazine // 2011",
        "text": "A beautiful shot of the <a class='test' href='/'>Adri-0</a> in Crystal Pink",
        "variant": "",
    },
    "Adri_Elle": {
        "title": "Elle France // 2001",
        "text": "Featuring <a class='test' href='/'>Adri-0</a> in Black",
        "variant": "",
    },
    "Adri_Muppets": {
        "title": "Lady Gaga Cameo in Muppets Most Wanted 2014 trailer",
        "text": "Screen grab of Lady Gaga’s Cameo In Muppets Most Wanted 2014 sequel.. She wears the <a class='test' href='/'>Adri-0</a>!",
        "variant": "",
    },
    // Alabama
    "Alabama_Eric": {
        "title": "Eric White, Patricia-Arquette and Elizabeth Olsen - The Window, February 19th, 2015",
        "text": "Barneys and Vanity Fair joined host Rooney Mara for an intimate dinner celebrating OXFAM, on February 19th, 2015 at Chateau Marmont, West Hollywood. Patricia Arquette founded GiveLove with Rosetta Getty to assist displaced families after the 2010 Haiti earthquake and active Community-led sanitation projects since. For our part, we find Mr White mighty handsome in his Alabama in Olive.<br/><br/>Story by Catie Horseman for The Window, Barney’s online journal of events",
        "variant": "",
    }
}

// Media Page Section

// this helper function sets the product content on the desktop modal when it appears!
function _setProductContentDesktop(productJSON, selectedVariant, variantId) {
    //Now we have the selected variant!

    //Set the product image!
    const variantImage = selectedVariant.featured_image.src;
    const mediaModalProductImage = document.getElementsByClassName('mediapage__modal-product-image')[0];
    mediaModalProductImage.src = variantImage;


    //Set the product title!
    const productTitle = productJSON.title;
    const mediaModalProductTitle = document.getElementsByClassName('mediapage__modal-product-title')[0];
    mediaModalProductTitle.textContent = productTitle;

    //Set the variant title!
    const variantTitle = selectedVariant.public_title;
    const mediaModalVariantTitle = document.getElementsByClassName('mediapage__modal-product-variant-title')[0];
    mediaModalVariantTitle.textContent = variantTitle;

    // Set the price!
    const price = selectedVariant.price.toString();
    const formattedPrice = `${price.substr(0, price.length - 2)}.${price.slice(-2)}`;
    const mediaModalProductPrice = document.getElementsByClassName('mediapage__modal-product-price')[0];
    mediaModalProductPrice.innerHTML = `${formattedPrice}`;

    //Set the link!
    let collection = "gentlemen";
    // Check if product is in ladies collection. If not, it is gentlemen!
    for (let i = 0; i < productJSON.tags.length; i++) {
        if (productJSON.tags[i] === 'ladies') {
            collection = 'ladies';
            break;
        }
    }
    let url = `/collections/${collection}/products/${productJSON.handle}`;

    //If there is a variant defined, append it to the url too.
    if (variantId !== undefined && variantId !== null && variantId != '') {
        url = url + `?variant=${variantId}`;
    }
    const mediaModalLink = document.getElementsByClassName('mediapage__modal-product-link')[0];
    mediaModalLink.href = url;
}

// this helper function sets the product content on the mobile modal when it appears!
function _setProductContentMobile(productJSON, selectedVariant, variantId) {
    //Now we have the selected variant!

    //Set the product image!
    const variantImage = selectedVariant.featured_image.src;
    const mediaModalProductImage = document.getElementsByClassName('mediapage__modal-mobile-product-image')[0];
    mediaModalProductImage.src = variantImage;


    //Set the product title!
    const productTitle = productJSON.title;
    const mediaModalProductTitle = document.getElementsByClassName('mediapage__modal-mobile-product-title')[0];
    mediaModalProductTitle.textContent = productTitle;

    //Set the variant title!
    const variantTitle = selectedVariant.public_title;
    const mediaModalVariantTitle = document.getElementsByClassName('mediapage__modal-mobile-product-variant-title')[0];
    mediaModalVariantTitle.textContent = variantTitle;

    // Set the price!
    const price = selectedVariant.price.toString();
    const formattedPrice = `${price.substr(0, price.length - 2)}.${price.slice(-2)}`;
    const mediaModalProductPrice = document.getElementsByClassName('mediapage__modal-mobile-product-price')[0];
    mediaModalProductPrice.innerHTML = `${formattedPrice}`;

    //Set the link!
    let collection = "gentlemen";
    // Check if product is in ladies collection. If not, it is gentlemen!
    for (let i = 0; i < productJSON.tags.length; i++) {
        if (productJSON.tags[i] === 'ladies') {
            collection = 'ladies';
            break;
        }
    }
    let url = `/collections/${collection}/products/${productJSON.handle}`;

    //If there is a variant defined, append it to the url too.
    if (variantId !== undefined && variantId !== null && variantId != '') {
        url = url + `?variant=${variantId}`;
    }
    const mediaModalLink = document.getElementsByClassName('mediapage__modal-mobile-product-link')[0];
    mediaModalLink.href = url;
}

//This helper function sets the media in a modal on desktop after a user clicks on one of the arrow keys!
function _setMediaModalDesktopContentOnTransition(newMediaModalIndex) {
    //Update the image, get the previous or next image
    const mediaModalImage = document.getElementsByClassName('mediapage__modal-image')[0];
    const nextModalMediaImage = document.getElementsByClassName('mediapage__image')[newMediaModalIndex - 1];
    mediaModalImage.src = nextModalMediaImage.src;

    const altTag = nextModalMediaImage.alt;
    const mediaModalContent = mediaContent[altTag];

    //Set the desired modal title
    const mediaModalTitle = document.getElementsByClassName('mediapage__modal-title')[0];
    mediaModalTitle.textContent = mediaModalContent.title;

    //Set the desired modal text
    const mediaModalText = document.getElementsByClassName('mediapage__modal-text')[0];
    mediaModalText.innerHTML = mediaModalContent.text;

    const mediaModalCounter = document.getElementsByClassName('mediapage__modal-footer-counter')[0];
    const mediaModalIndexAndTotal = mediaModalCounter.textContent.split("/");
    const mediaModalTotal = parseInt(mediaModalIndexAndTotal[1]);
    mediaModalCounter.textContent = `${newMediaModalIndex}/${mediaModalTotal}`;
}

//This helper function sets the media in a modal on mobile after a user clicks on one of the arrow keys!
function _setMediaModalMobileContentOnTransition(newMediaModalIndex) {
    //Update the image, get the previous or next image
    const mediaModalImage = document.getElementsByClassName('mediapage__modal-mobile-image')[0];
    const nextModalMediaImage = document.getElementsByClassName('mediapage__image')[newMediaModalIndex - 1];
    mediaModalImage.src = nextModalMediaImage.src;

    //Update the expanded mobile image too!
    const mediaModalExpandedImage = document.getElementsByClassName('mediapage__modal-overlay-mobile-expanded-image')[0];
    mediaModalExpandedImage.src = nextModalMediaImage.src;

    const altTag = nextModalMediaImage.alt;
    const mediaModalContent = mediaContent[altTag];

    //Set the desired modal title
    const mediaModalTitle = document.getElementsByClassName('mediapage__modal-mobile-title')[0];
    mediaModalTitle.textContent = mediaModalContent.title;

    //Set the desired modal text
    const mediaModalText = document.getElementsByClassName('mediapage__modal-mobile-text')[0];
    mediaModalText.innerHTML = mediaModalContent.text;

    const mediaModalCounter = document.getElementsByClassName('mediapage__modal-mobile-footer-counter')[0];
    const mediaModalIndexAndTotal = mediaModalCounter.textContent.split("/");
    const mediaModalTotal = parseInt(mediaModalIndexAndTotal[1]);
    mediaModalCounter.textContent = `${newMediaModalIndex}/${mediaModalTotal}`;
}

//This function handles getting a product when an image is clicked on from the media page.
function _getProductDetailsAndShowModal(productHandle, variantId, showModal) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (xhr.status == 200) {
                let productJSON = JSON.parse(xhr.responseText);
                //Now to parse the json.
                for (let i = 0; i < productJSON.variants.length; i++) {
                    let selectedVariant;
                    if (variantId !== undefined && variantId !== null && variantId !== '') {
                        // If the variantId is defined, we need to try to find it.
                        if (productJSON.variants[i].id === parseInt(variantId)) {
                            selectedVariant = productJSON.variants[i];
                        } else {
                            // If this isn't it, continue.
                            continue;
                        }
                    } else {
                        // If the variantId is not defined, just use the first one.
                        selectedVariant = productJSON.variants[0];
                    }

                    _setProductContentDesktop(productJSON, selectedVariant, variantId);
                    _setProductContentMobile(productJSON, selectedVariant, variantId);

                    if (showModal) {
                        _showMediaPageModal();
                    }
                    break;
                }
            }
        }
        else {
            // Error case
            console.error(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }
    xhr.open("GET", `/products/${productHandle}.js`, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send();
}

// A helper function to use when the arrows are clicked on.
function _getProductDetailsAndShowNextModal(newMediaModalIndex) {
    //Get the next image so we can get the proper product and variant ids!
    const nextModalMediaImage = document.getElementsByClassName('mediapage__image')[newMediaModalIndex - 1];
    const splitId = nextModalMediaImage.id.split("-");

    const altTag = splitId[1];
    const variantId = mediaContent.variant;
    const productHandle = splitId[splitId.length - 2];

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (xhr.status == 200) {
                let productJSON = JSON.parse(xhr.responseText);
                console.log(productJSON);
                //Now to parse the json.
                for (let i = 0; i < productJSON.variants.length; i++) {
                    let selectedVariant;
                    if (variantId !== undefined && variantId !== null && variantId !== '') {
                        // If the variantId is defined, we need to try to find it.
                        if (productJSON.variants[i].id === parseInt(variantId)) {
                            selectedVariant = productJSON.variants[i];
                        } else {
                            // If this isn't it, continue.
                            continue;
                        }
                    } else {
                        // If the variantId is not defined, just use the first one.
                        selectedVariant = productJSON.variants[0];
                    }

                    _setProductContentDesktop(productJSON, selectedVariant, variantId);
                    _setProductContentMobile(productJSON, selectedVariant, variantId);
                    _setMediaModalDesktopContentOnTransition(newMediaModalIndex);
                    _setMediaModalMobileContentOnTransition(newMediaModalIndex);

                    //Set the query parameters for navigation
                    const url = new URL(window.location.href);
                    url.searchParams.set('selected-media', altTag);
                    history.pushState({}, null, url);

                    break;
                }
            }
        }
        else {
            // Error case
            console.error(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }
    xhr.open("GET", `/products/${productHandle}.js`, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send();
}

// A helper function to show the modal on the Media Page (on both desktop and mobile).
function _showMediaPageModal() {
    //Depending on if the hidden class is there or not, show or hide the modal!
    const hiddenMediaModalOverlay = document.getElementsByClassName('mediapage__modal-overlay--hidden')[0];
    // If it is hidden show it!
    if (hiddenMediaModalOverlay) {
        hiddenMediaModalOverlay.classList.remove('mediapage__modal-overlay--hidden');
        // Remove the scroll bar and add appropriate padding
        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'hidden';
        body.style.paddingRight = '15px';
    }
    //Depending on if the hidden class is there or not, show or hide the modal on mobile too!
    const hiddenMediaModalMobileOverlay = document.getElementsByClassName('mediapage__modal-overlay-mobile--hidden')[0];
    // If it is hidden show it!
    if (hiddenMediaModalMobileOverlay) {
        hiddenMediaModalMobileOverlay.classList.remove('mediapage__modal-overlay-mobile--hidden');
        // Remove the scroll bar and add appropriate padding
        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'hidden';
        body.style.paddingRight = '15px';
    }

}

// This function handles assigning dynamic ids to the modals on the Media Page as they pop up.
!(function (d) {
    const modalMediaButtons = document.getElementsByClassName('mediapage__image-button');
    const modalMediaImages = document.getElementsByClassName('mediapage__image');
    if (modalMediaButtons.length > 0 && modalMediaImages.length > 0) {
        for (let i = 0; i < modalMediaButtons.length; i++) {
            let modalMediaButton = modalMediaButtons[i];
            let modalMediaImage = modalMediaImages[i];
            modalMediaButton.id = modalMediaButton.id + `-${i + 1}`;
            modalMediaImage.id = modalMediaImage.id + `-${i + 1}`;
        }
        // Init the counter on the expanded modal for desktop
        const mediaModalCounter = document.getElementsByClassName('mediapage__modal-footer-counter')[0];
        mediaModalCounter.textContent = `1/${modalMediaButtons.length}`;

        // Init the counter on the expanded modal for mobile
        const mediaModalMobileCounter = document.getElementsByClassName('mediapage__modal-mobile-footer-counter')[0];
        mediaModalMobileCounter.textContent = `1/${modalMediaButtons.length}`;
    }
}(document));

// This function opens a media modal if there are query parameters on refresh of the Media Page
!(function (d) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedMedia = urlParams.get('selected-media');
    if (selectedMedia !== undefined && selectedMedia !== null && selectedMedia !== '') {
        let allImages = document.getElementsByTagName("img");
        let selectedImage;
        for (let i = 0, len = allImages.length; i < len; ++i) {
            if (allImages[i].alt === selectedMedia) {
                selectedImage = allImages[i];
            }
        }
        //If an image is found that matches the alt tag, display it!
        if (selectedImage !== undefined && selectedImage !== null) {
            // The id is a combination of identifier-alt_tag-product_id-index
            const splitId = selectedImage.id.split("-");

            const altTag = splitId[1];
            const mediaModalContent = mediaContent[altTag];
            const productHandle = splitId[splitId.length - 2];
            _getProductDetailsAndShowModal(productHandle, mediaModalContent.variant, true);
            const index = splitId[splitId.length - 1];

            // This handles the desktop display

            // Set the counter based on which image is expanded.
            const mediaModalCounter = document.getElementsByClassName('mediapage__modal-footer-counter')[0];
            const mediaModalIndexAndTotal = mediaModalCounter.textContent.split("/");
            const mediaModalTotal = parseInt(mediaModalIndexAndTotal[1]);

            //Set the desired image in the modal
            const mediaModalImage = document.getElementsByClassName('mediapage__modal-image')[0];
            const selectedModalMediaImage = document.getElementsByClassName('mediapage__image')[index - 1];
            mediaModalImage.src = selectedModalMediaImage.src;

            //Set the desired modal title
            const mediaModalTitle = document.getElementsByClassName('mediapage__modal-title')[0];
            mediaModalTitle.textContent = mediaModalContent.title;

            //Set the desired modal text
            const mediaModalText = document.getElementsByClassName('mediapage__modal-text')[0];
            mediaModalText.innerHTML = mediaModalContent.text;

            //Set the footer counter
            mediaModalCounter.textContent = `${index}/${mediaModalTotal}`;


            // This handles the mobile display

            // Set the counter based on which image is expanded.
            const mediaModalMobileCounter = document.getElementsByClassName('mediapage__modal-mobile-footer-counter')[0];
            const mediaModalMobileIndexAndTotal = mediaModalMobileCounter.textContent.split("/");
            const mediaModalMobileTotal = parseInt(mediaModalMobileIndexAndTotal[1]);

            //Set the desired image in the modal
            const mediaModalMobileImage = document.getElementsByClassName('mediapage__modal-mobile-image')[0];
            const selectedModalMobileMediaImage = document.getElementsByClassName('mediapage__image')[index - 1];
            mediaModalMobileImage.src = selectedModalMobileMediaImage.src;

            //Set the desired modal title
            const mediaModalMobileTitle = document.getElementsByClassName('mediapage__modal-mobile-title')[0];
            mediaModalMobileTitle.textContent = mediaModalContent.title;

            //Set the desired modal text
            const mediaModalMobileText = document.getElementsByClassName('mediapage__modal-mobile-text')[0];
            mediaModalMobileText.innerHTML = mediaModalContent.text;

            //Set the footer counter
            mediaModalMobileCounter.textContent = `${index}/${mediaModalMobileTotal}`;

            //This handles the expanded mobile display

            //Set the expanded modal image!
            const mediaModalExpandedImage = document.getElementsByClassName('mediapage__modal-overlay-mobile-expanded-image')[0];
            mediaModalExpandedImage.src = selectedModalMobileMediaImage.src;
        }
    }
}(document));


//This handles the opening of the Media Modal (on desktop AND mobile)
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__image-button')
        && !event.target.matches('.mediapage__image')) {
        return;
    }
    // The id is a combination of identifier-alt_tag-product_id-index
    const splitId = event.target.id.split("-");

    const altTag = splitId[1];
    const mediaModalContent = mediaContent[altTag];
    const productHandle = splitId[splitId.length - 2];
    _getProductDetailsAndShowModal(productHandle, mediaModalContent.variant, true);
    const index = splitId[splitId.length - 1];
    // Set the counter based on which image is expanded.
    const mediaModalCounter = document.getElementsByClassName('mediapage__modal-footer-counter')[0];
    const mediaModalIndexAndTotal = mediaModalCounter.textContent.split("/");
    const mediaModalTotal = parseInt(mediaModalIndexAndTotal[1]);

    //This handles the desktop display

    //Set the desired image in the modal
    const mediaModalImage = document.getElementsByClassName('mediapage__modal-image')[0];
    const selectedModalMediaImage = document.getElementsByClassName('mediapage__image')[index - 1];
    mediaModalImage.src = selectedModalMediaImage.src;

    //Set the desired modal title
    const mediaModalTitle = document.getElementsByClassName('mediapage__modal-title')[0];
    mediaModalTitle.textContent = mediaModalContent.title;

    //Set the desired modal text
    const mediaModalText = document.getElementsByClassName('mediapage__modal-text')[0];
    mediaModalText.innerHTML = mediaModalContent.text;

    //Set the footer counter
    mediaModalCounter.textContent = `${index}/${mediaModalTotal}`;

    // This handles the mobile display

    // Set the counter based on which image is expanded.
    const mediaModalMobileCounter = document.getElementsByClassName('mediapage__modal-mobile-footer-counter')[0];
    const mediaModalMobileIndexAndTotal = mediaModalMobileCounter.textContent.split("/");
    const mediaModalMobileTotal = parseInt(mediaModalMobileIndexAndTotal[1]);

    //Set the desired image in the modal
    const mediaModalMobileImage = document.getElementsByClassName('mediapage__modal-mobile-image')[0];
    const selectedModalMobileMediaImage = document.getElementsByClassName('mediapage__image')[index - 1];
    mediaModalMobileImage.src = selectedModalMobileMediaImage.src;

    //Set the desired modal title
    const mediaModalMobileTitle = document.getElementsByClassName('mediapage__modal-mobile-title')[0];
    mediaModalMobileTitle.textContent = mediaModalContent.title;

    //Set the desired modal text
    const mediaModalMobileText = document.getElementsByClassName('mediapage__modal-mobile-text')[0];
    mediaModalMobileText.innerHTML = mediaModalContent.text;

    //Set the footer counter
    mediaModalMobileCounter.textContent = `${index}/${mediaModalMobileTotal}`;


    //This handles the expanded mobile display

    //Set the expanded modal image!
    const mediaModalExpandedImage = document.getElementsByClassName('mediapage__modal-overlay-mobile-expanded-image')[0];
    mediaModalExpandedImage.src = selectedModalMobileMediaImage.src;

    //Set the query parameters for navigation
    const url = new URL(window.location.href);
    url.searchParams.set('selected-media', altTag);
    history.pushState({}, null, url);

    // Don't follow the link
    event.preventDefault();

}, false);

//This handles the closing of the Media Modal.
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__modal-close-button')
        && !event.target.matches('.mediapage__modal-close-button-icon')) {
        return;
    }

    // Don't follow the link
    event.preventDefault();

    const mediaModalOverlay = document.getElementsByClassName('mediapage__modal-overlay')[0];
    // Hide it!
    if (mediaModalOverlay) {
        mediaModalOverlay.classList.add('mediapage__modal-overlay--hidden');
        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'scroll';
        body.style.paddingRight = '';
    }

    const mobileMediaOverlay = document.getElementsByClassName('mediapage__modal-overlay-mobile')[0];
    // Hide it on mobile too!
    if (mobileMediaOverlay) {
        mediaModalOverlay.classList.add('mediapage__modal-overlay-mobile--hidden');
        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'scroll';
        body.style.paddingRight = '';
    }

    // Clear the query parameter too.
    const url = new URL(window.location.href);
    url.searchParams.delete('selected-media');
    history.pushState({}, null, url);

}, false);

//This handles the closing of the Media Modal on mobile.
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__modal-mobile-back-button')
        && !event.target.matches('.mediapage__modal-mobile-back-button-icon')) {
        return;
    }

    // Don't follow the link
    event.preventDefault();

    const mediaModalOverlay = document.getElementsByClassName('mediapage__modal-overlay')[0];
    // Hide it!
    if (mediaModalOverlay) {
        mediaModalOverlay.classList.add('mediapage__modal-overlay--hidden');
        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'scroll';
        body.style.paddingRight = '';
    }

    const mobileMediaOverlay = document.getElementsByClassName('mediapage__modal-overlay-mobile')[0];
    // Hide it on mobile too!
    if (mobileMediaOverlay) {
        mobileMediaOverlay.classList.add('mediapage__modal-overlay-mobile--hidden');
        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'scroll';
        body.style.paddingRight = '';
    }

    // Clear the query parameter too.
    const url = new URL(window.location.href);
    url.searchParams.delete('selected-media');
    history.pushState({}, null, url);

}, false);

//This handles the opening of the Expanded Mobile Media Modal
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__modal-mobile-image')) {
        return;
    }

    const mobileExapndedMediaOverlayHidden = document.getElementsByClassName('mediapage__modal-overlay-mobile-expanded--hidden')[0];
    if (mobileExapndedMediaOverlayHidden) {
        mobileExapndedMediaOverlayHidden.classList.remove('mediapage__modal-overlay-mobile-expanded--hidden');
    }
    // Don't follow the link
    event.preventDefault();

}, false);

//This handles the closing of the Expanded Mobile Media Modal
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__modal-expanded-close-button')
        && !event.target.matches('.mediapage__modal-expanded-close-button-icon')) {
        return;
    }

    const mobileExapndedMediaOverlay = document.getElementsByClassName('mediapage__modal-overlay-mobile-expanded')[0];
    if (mobileExapndedMediaOverlay) {
        mobileExapndedMediaOverlay.classList.add('mediapage__modal-overlay-mobile-expanded--hidden');
    }
    // Don't follow the link
    event.preventDefault();

}, false);

//This handles the previous button click
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__modal-previous-media-button')
        && !event.target.matches('.mediapage__modal-previous-media-icon')
        && !event.target.matches('.mediapage__modal-mobile-previous-media-button')
        && !event.target.matches('.mediapage__modal-mobile-previous-media-icon')) {
        return;
    }

    // Don't follow the link
    event.preventDefault();

    // Get the counter and increment it!
    const mediaModalCounter = document.getElementsByClassName('mediapage__modal-footer-counter')[0];
    const mediaModalIndexAndTotal = mediaModalCounter.textContent.split("/");
    const mediaModalIndex = parseInt(mediaModalIndexAndTotal[0]);
    const mediaModalTotal = parseInt(mediaModalIndexAndTotal[1]);

    let newMediaModalIndex = (mediaModalIndex - 1);
    if (newMediaModalIndex === 0) {
        newMediaModalIndex = mediaModalTotal;
    }
    _getProductDetailsAndShowNextModal(newMediaModalIndex);

}, false);

//This handles the next button click
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__modal-next-media-button')
        && !event.target.matches('.mediapage__modal-next-media-icon')
        && !event.target.matches('.mediapage__modal-mobile-next-media-button')
        && !event.target.matches('.mediapage__modal-mobile-next-media-icon')) {
        return;
    }

    // Don't follow the link
    event.preventDefault();

    // Get the counter and increment it!
    const mediaModalCounter = document.getElementsByClassName('mediapage__modal-footer-counter')[0];
    const mediaModalIndexAndTotal = mediaModalCounter.textContent.split("/");
    const mediaModalIndex = parseInt(mediaModalIndexAndTotal[0]);
    const mediaModalTotal = parseInt(mediaModalIndexAndTotal[1]);

    let newMediaModalIndex = (mediaModalIndex + 1) % (mediaModalTotal + 1);
    if (newMediaModalIndex === 0) {
        newMediaModalIndex = 1;
    }
    _getProductDetailsAndShowNextModal(newMediaModalIndex);

}, false);

// Product Page Section

// A helper function to show the product media modal on the product page (on both desktop and mobile).
function _showProductMediaModal() {
    //Depending on if the hidden class is there or not, show or hide the modal!
    const hiddenProductMediaModalOverlay = document.getElementsByClassName('productpage__media-modal-overlay--hidden')[0];
    // If it is hidden show it!
    if (hiddenProductMediaModalOverlay) {
        hiddenProductMediaModalOverlay.classList.remove('productpage__media-modal-overlay--hidden');
        // Remove the scroll bar and add appropriate padding
        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'hidden';
        body.style.paddingRight = '15px';
    }
    // //Depending on if the hidden class is there or not, show or hide the modal on mobile too!
    // const hiddenMediaModalMobileOverlay = document.getElementsByClassName('mediapage__modal-overlay-mobile--hidden')[0];
    // // If it is hidden show it!
    // if (hiddenMediaModalMobileOverlay) {
    //     hiddenMediaModalMobileOverlay.classList.remove('mediapage__modal-overlay-mobile--hidden');
    //     // Remove the scroll bar and add appropriate padding
    //     const body = document.getElementsByTagName('body')[0];
    //     body.style.overflowY = 'hidden';
    //     body.style.paddingRight = '15px';
    // }

}

// This function handles assigning dynamic ids to the media on the Product Page as they pop up.
!(function (d) {
    const productMediaButtons = document.getElementsByClassName('productpage__media-image-button');
    const productMediaImages = document.getElementsByClassName('productpage__media-image');
    const productMediaMobileButtons = document.getElementsByClassName('productpage__media-mobile-image-button');
    const productMediaMobileImages = document.getElementsByClassName('productpage__media-mobile-image');
    if (productMediaButtons.length > 0 && productMediaImages.length > 0
        && productMediaMobileButtons.length > 0 && productMediaMobileImages.length > 0) {
        for (let i = 0; i < productMediaButtons.length; i++) {
            let productMediaButton = productMediaButtons[i];
            let productMediaImage = productMediaImages[i];
            let productMediaMobileButton = productMediaMobileButtons[i];
            let productMediaMobileImage = productMediaMobileImages[i];
            productMediaButton.id = productMediaButton.id + `-${i + 1}`;
            productMediaImage.id = productMediaImage.id + `-${i + 1}`;
            productMediaMobileButton.id = productMediaMobileButton.id + `-${i + 1}`;
            productMediaMobileImage.id = productMediaMobileImage.id + `-${i + 1}`;
        }
        // // Init the counter on the expanded modal for desktop
        const productMediaModalCounter = document.getElementsByClassName('productpage__media-modal-footer-counter')[0];
        productMediaModalCounter.textContent = `1/${productMediaButtons.length}`;

        // // Init the counter on the expanded modal for mobile
        // const mediaModalMobileCounter = document.getElementsByClassName('mediapage__modal-mobile-footer-counter')[0];
        // mediaModalMobileCounter.textContent = `1/${modalMediaButtons.length}`;
    }
}(document));

//This handles the opening of the Media Modal on the Product Page (on desktop AND mobile)
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.productpage__media-image-button')
        && !event.target.matches('.productpage__media-image')
        && !event.target.matches('.productpage__media-mobile-image-button')
        && !event.target.matches('.productpage__media-mobile-image')) {
        return;
    }
    // The id is a combination of identifier-alt_tag-product_id-index
    const splitId = event.target.id.split("-");

    const altTag = splitId[1];
    const mediaModalContent = mediaContent[altTag];
    //     const productHandle = splitId[splitId.length - 2];
    //     _getProductDetailsAndShowModal(productHandle, mediaModalContent.variant, true);
    const index = splitId[splitId.length - 1];
    // Set the counter based on which image is expanded.
    const productMediaModalCounter = document.getElementsByClassName('productpage__media-modal-footer-counter')[0];
    const productMediaModalIndexAndTotal = productMediaModalCounter.textContent.split("/");
    const productMediaModalTotal = parseInt(productMediaModalIndexAndTotal[1]);

    //     //This handles the desktop display

    //     //Set the desired image in the modal
    const productMediaModalImage = document.getElementsByClassName('productpage__media-modal-image')[0];
    //Get the mobile image as it is full-sized!
    const selectedProductMediaImage = document.getElementsByClassName('productpage__media-mobile-image')[index - 1];
    productMediaModalImage.src = selectedProductMediaImage.src;

    //Set the desired modal title
    const productMediaModalTitle = document.getElementsByClassName('productpage__media-modal-title')[0];
    productMediaModalTitle.textContent = mediaModalContent.title;

    //Set the desired modal text
    const productMediaModalText = document.getElementsByClassName('productpage__media-modal-text')[0];
    productMediaModalText.innerHTML = mediaModalContent.text;

    //Set the footer counter
    productMediaModalCounter.textContent = `${index}/${productMediaModalTotal}`;

    //     // This handles the mobile display

    //     // Set the counter based on which image is expanded.
    //     const mediaModalMobileCounter = document.getElementsByClassName('mediapage__modal-mobile-footer-counter')[0];
    //     const mediaModalMobileIndexAndTotal = mediaModalMobileCounter.textContent.split("/");
    //     const mediaModalMobileTotal = parseInt(mediaModalMobileIndexAndTotal[1]);

    //     //Set the desired image in the modal
    //     const mediaModalMobileImage = document.getElementsByClassName('mediapage__modal-mobile-image')[0];
    //     const selectedModalMobileMediaImage = document.getElementsByClassName('mediapage__image')[index - 1];
    //     mediaModalMobileImage.src = selectedModalMobileMediaImage.src;

    //     //Set the desired modal title
    //     const mediaModalMobileTitle = document.getElementsByClassName('mediapage__modal-mobile-title')[0];
    //     mediaModalMobileTitle.textContent = mediaModalContent.title;

    //     //Set the desired modal text
    //     const mediaModalMobileText = document.getElementsByClassName('mediapage__modal-mobile-text')[0];
    //     mediaModalMobileText.innerHTML = mediaModalContent.text;

    //     //Set the footer counter
    //     mediaModalMobileCounter.textContent = `${index}/${mediaModalMobileTotal}`;

    _showProductMediaModal();

    //     //This handles the expanded mobile display

    //     //Set the expanded modal image!
    //     const mediaModalExpandedImage = document.getElementsByClassName('mediapage__modal-overlay-mobile-expanded-image')[0];
    //     mediaModalExpandedImage.src = selectedModalMobileMediaImage.src;

    //     //Set the query parameters for navigation
    //     const url = new URL(window.location.href);
    //     url.searchParams.set('selected-media', altTag);
    //     history.pushState({}, null, url);

    // Don't follow the link
    event.preventDefault();

}, false);

