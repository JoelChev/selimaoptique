// This Javascript file contains all the Media Data (and Javascript) for the Media page.

var test = {
    "joel": "huzzzah!"
}

const mediaContent = {
    "Agathe-Eric": {
        "title": "Eric White, Patricia-Arquette and Elizabeth Olsen - The Window, February 19th, 2015",
        "text": "Barneys and Vanity Fair joined host Rooney Mara for an intimate dinner celebrating OXFAM, on February 19th, 2015 at Chateau Marmont, West Hollywood. Patricia Arquette founded GiveLove with Rosetta Getty to assist displaced families after the 2010 Haiti earthquake and active Community-led sanitation projects since. For our part, we find Mr White mighty handsome in his Alabama in Olive.<br/><br/>Story by Catie Horseman for The Window, Barney’s online journal of events",
        "variant": "36607135350951",
    }
}

//This handles the opening of the Media Modal.
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.mediapage__image-button')
        && !event.target.matches('.mediapage__image')) {
        return;
    }

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

    mediaModalCounter.textContent = `${newMediaModalIndex}/${mediaModalTotal}`

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

    const newMediaModalIndex = (mediaModalIndex + 1) % mediaModalTotal;

    mediaModalCounter.textContent = `${newMediaModalIndex}/${mediaModalTotal}`

}, false);

