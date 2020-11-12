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
    // Agathe
    "Agathe_Eric": {
        "title": "Eric White, Patricia-Arquette and Elizabeth Olsen - The Window, February 19th, 2015",
        "text": "Barneys and Vanity Fair joined host Rooney Mara for an intimate dinner celebrating OXFAM, on February 19th, 2015 at Chateau Marmont, West Hollywood. Patricia Arquette founded GiveLove with Rosetta Getty to assist displaced families after the 2010 Haiti earthquake and active Community-led sanitation projects since. For our part, we find Mr White mighty handsome in his Alabama in Olive.<br/><br/>Story by Catie Horseman for The Window, Barney’s online journal of events",
        "variant": "36607135350951",
    }
}

// This function handles assigning dynamic ids to the modals as they pop up.
!(function (d) {
    const modalMediaButtons = document.getElementsByClassName('mediapage__image-button');
    console.log(modalMediaButtons);
    const modalMediaImages = document.getElementsByClassName('mediapage__image');
    for (let i = 0; i < modalMediaButtons.length; i++) {
        let modalMediaButton = modalMediaButtons[i];
        let modalMediaImage = modalMediaImages[i];
        modalMediaButton.id = modalMediaButton.id + `-${i + 1}`;
        modalMediaImage.id = modalMediaImage.id + `-${i + 1}`;
    }
    // Init the counter on the expanded modal as well
    const mediaModalCounter = document.getElementsByClassName('mediapage__modal-footer-counter')[0];
    mediaModalCounter.textContent = `1/${modalMediaButtons.length}`

}(document));

//This handles the opening of the Media Modal.
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

    const index = splitId[splitId.length - 1];
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

    // Don't follow the link
    event.preventDefault();

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

}, false);

//This handles the previous button click
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__modal-previous-media-button')
        && !event.target.matches('.mediapage__modal-previous-media-icon')) {
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
    //Update the image, get the previous image
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

    mediaModalCounter.textContent = `${newMediaModalIndex}/${mediaModalTotal}`;

}, false);

//This handles the next button click
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__modal-next-media-button')
        && !event.target.matches('.mediapage__modal-next-media-icon')) {
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
    //Update the image, get the next image
    const mediaModalImage = document.getElementsByClassName('mediapage__modal-image')[0];
    const nextModalMediaImage = document.getElementsByClassName('mediapage__image')[newMediaModalIndex - 1];
    mediaModalImage.src = nextModalMediaImage.src;

    mediaModalCounter.textContent = `${newMediaModalIndex}/${mediaModalTotal}`

    const altTag = nextModalMediaImage.alt;
    const mediaModalContent = mediaContent[altTag];

    //Set the desired modal title
    const mediaModalTitle = document.getElementsByClassName('mediapage__modal-title')[0];
    mediaModalTitle.textContent = mediaModalContent.title;

    //Set the desired modal text
    const mediaModalText = document.getElementsByClassName('mediapage__modal-text')[0];
    mediaModalText.innerHTML = mediaModalContent.text;

}, false);

