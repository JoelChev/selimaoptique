
// This helper function gets the image from a node (if it exists), or returns nothing if none is found.
function __getImageFromNode(childNode) {
    let imageSrc = "";
    if (childNode.firstChild) {
        return __getImageFromNode(childNode.firstChild);
    }
    else if (childNode.tagName === "IMG") {
        imageSrc = childNode.src;
    }
    return imageSrc;
}

// This function handles constructing the image carousels in each article as it appears.
!(function (d) {
    const journalArticles = document.getElementsByClassName('journalpage__article');
    for (let i = 0; i < journalArticles.length; i++) {
        const journalArticle = journalArticles[i];
        let childrenNodes = journalArticle.childNodes;
        let images = [];
        let imageNodesToRemove = [];
        for (let j = 0; j < childrenNodes.length; j++) {
            let childNode = childrenNodes[j];
            // Filter out the images!
            const imageSrc = __getImageFromNode(childNode);
            if (imageSrc !== "") {
                imageNodesToRemove.push(j);
                images.push(imageSrc)
                journalArticle.removeChild(childrenNodes[j]);
            }
        }
        // Now to handle hiding the appropriate text. We only want the first paragraph to be shown the rest are hidden unless expanded.
        const paragraphChildrenNodes = journalArticle.getElementsByTagName("P");
        for (let k = 0; k < paragraphChildrenNodes.length; k++) {
            if (k > 0) {
                paragraphChildrenNodes[k].className += `journalpage__article-element--body-${i}`;
                paragraphChildrenNodes[k].className += ` journalpage__article-element--hidden`;
            }
        }

        //Add a button to expand the article out

        const readMoreButton = document.createElement("button");
        readMoreButton.innerHTML = "Read More";
        readMoreButton.classList.add("journalpage__read-more-button");
        readMoreButton.id = `JournalReadMoreButton-${i}`;
        journalArticle.appendChild(readMoreButton);

        //Add a div with JUST the images in it.
        const imageCarousel = document.createElement("div");
        imageCarousel.classList.add('journalpage__image-carousel');
        imageCarousel.id = `JournalImageCarousel-${i}`;

        const imageCarouselMask = document.createElement("div");
        imageCarouselMask.classList.add("journalpage__image-mask");
        imageCarouselMask.id = `JournalImageMask-${i}`;
        imageCarousel.appendChild(imageCarouselMask);

        for (let m = 0; m < images.length; m++) {
            const carouselImage = document.createElement("img");
            carouselImage.classList.add('journalpage__carousel-image');
            if (m == 0) {
                carouselImage.classList.add('journalpage__carousel-image--active');
            }
            if (m == 1) {
                carouselImage.classList.add('journalpage__carousel-image--next');
            }
            if (m == images.length - 1) {
                carouselImage.classList.add('journalpage__carousel-image--prev');
            }
            carouselImage.id = `JournalArticleImage-${i}-${m}`;
            carouselImage.src = images[m];
            imageCarouselMask.appendChild(carouselImage);
        }

        //Add an ability to go through the images if there are more than one!
        if (images.length > 1) {
            const carouselFooterContainer = document.createElement("div");
            carouselFooterContainer.classList.add('journalpage__image-carousel-footer-container');
            carouselFooterContainer.id = `JournalCarouselFooterContainer-${i}`;

            const previousImageButton = document.createElement("button");
            previousImageButton.classList.add('journalpage__carousel-previous-image-button');
            previousImageButton.id = `JournalCarouselFooterPreviousImageButton-${i}`;
            previousImageButton.innerHTML = `<img class="journalpage__carousel-previous-image-button-icon" id="JournalCarouselFooterPreviousImageButtonIcon-${i}" src="https://cdn.shopify.com/s/files/1/0260/1789/0397/t/7/assets/arrow-left.png" />`;
            carouselFooterContainer.appendChild(previousImageButton);

            const imageCounter = document.createElement("span");
            imageCounter.innerHTML = `1/${images.length}`;
            imageCounter.classList.add('journalpage__imageCounter');
            imageCounter.id = `JournalCarouselImageCounter-${i}`;
            carouselFooterContainer.appendChild(imageCounter);

            const nextImageButton = document.createElement("button");
            nextImageButton.classList.add('journalpage__carousel-next-image-button');
            nextImageButton.id = `JournalCarouselFooterNextImageButton-${i}`;
            nextImageButton.innerHTML = `<img class="journalpage__carousel-next-image-button-icon" id="JournalCarouselFooterNextImageButtonIcon-${i}" src="https://cdn.shopify.com/s/files/1/0260/1789/0397/t/7/assets/arrow-right.png" />`;
            imageCarousel.appendChild(carouselFooterContainer);
            carouselFooterContainer.appendChild(nextImageButton);
        }

        journalArticle.appendChild(imageCarousel);
    }
}(document));

//This handles the read more button click
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.journalpage__read-more-button')) {
        return;
    }

    const readMoreButtonId = event.target.id;
    //Need to parse out the article index
    const articleIndex = readMoreButtonId.split("-")[1];
    if (event.target.innerHTML === "Read More") {
        //Expand Case
        const journalArticleElementsHidden = document.getElementsByClassName(`journalpage__article-element--body-${articleIndex}`);
        for (let i = 0; i < journalArticleElementsHidden.length; i++) {
            journalArticleElementsHidden[i].classList.remove(`journalpage__article-element--hidden`);
        }
        event.target.innerHTML = "Read Less";
    } else {
        //Contract Case
        const journalArticleElementsHidden = document.getElementsByClassName(`journalpage__article-element--body-${articleIndex}`);
        for (let i = 0; i < journalArticleElementsHidden.length; i++) {
            journalArticleElementsHidden[i].classList.add(`journalpage__article-element--hidden`);
        }
        event.target.innerHTML = "Read More";
    }

}, false);



//This handles the previous image button press in the journal image carousels
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.journalpage__carousel-previous-image-button')
        && !event.target.matches('.journalpage__carousel-previous-image-button-icon')) {
        return;
    }
    const nextButtonId = event.target.id;
    //Need to parse out the carousel index
    const carouselIndex = nextButtonId.split("-")[1];

    const carouselFooterCounter = document.getElementById(`JournalCarouselImageCounter-${carouselIndex}`);
    const carouselFooterIndexAndTotal = carouselFooterCounter.textContent.split("/");
    const imageIndex = parseInt(carouselFooterIndexAndTotal[0]) - 1;
    const imageTotal = parseInt(carouselFooterIndexAndTotal[1]) - 1;
    let nextImageIndex = imageIndex + 1;
    let previousImageIndex = imageIndex - 1;
    let previousPreviousImageIndex = imageIndex - 2;
    if (imageIndex == imageTotal) {
        nextImageIndex = 0;
    }
    if (imageIndex == 0) {
        previousImageIndex = imageTotal;
        previousPreviousImageIndex = imageTotal - 1;
    }
    if (imageIndex == 1) {
        previousPreviousImageIndex = imageTotal;
    }

    //Now get the right images and change their class!
    const activeImage = document.getElementById(`JournalArticleImage-${carouselIndex}-${imageIndex}`);
    const previousPreviousImage = document.getElementById(`JournalArticleImage-${carouselIndex}-${previousPreviousImageIndex}`);
    const previousImage = document.getElementById(`JournalArticleImage-${carouselIndex}-${previousImageIndex}`);
    const nextImage = document.getElementById(`JournalArticleImage-${carouselIndex}-${nextImageIndex}`);

    previousImage.classList.remove('journalpage__carousel-image--prev');
    previousImage.classList.add('journalpage__carousel-image--active');

    activeImage.classList.remove('journalpage__carousel-image--active');
    activeImage.classList.add('journalpage__carousel-image--next');

    nextImage.classList.remove('journalpage__carousel-image--next');

    previousPreviousImage.classList.add('journalpage__carousel-image--prev');

    //Finally update the counter!
    const newImageIndex = previousImageIndex + 1;
    const newImageTotal = imageTotal + 1;
    carouselFooterCounter.textContent = `${newImageIndex}/${newImageTotal}`;

}, false);

//This handles the next image button press in the journal image carousels
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.journalpage__carousel-next-image-button')
        && !event.target.matches('.journalpage__carousel-next-image-button-icon')) {
        return;
    }
    const nextButtonId = event.target.id;
    //Need to parse out the carousel index
    const carouselIndex = nextButtonId.split("-")[1];

    const carouselFooterCounter = document.getElementById(`JournalCarouselImageCounter-${carouselIndex}`);
    const carouselFooterIndexAndTotal = carouselFooterCounter.textContent.split("/");
    const imageIndex = parseInt(carouselFooterIndexAndTotal[0]) - 1;
    const imageTotal = parseInt(carouselFooterIndexAndTotal[1]) - 1;
    let nextImageIndex = imageIndex + 1;
    let nextNextImageIndex = imageIndex + 2;
    let previousImageIndex = imageIndex - 1;
    if (imageIndex == imageTotal) {
        nextImageIndex = 0;
        nextNextImageIndex = 1;
    }
    if (imageIndex == imageTotal - 1) {
        nextNextImageIndex = 0;
    }
    if (imageIndex == 0) {
        previousImageIndex = imageTotal;
    }

    //Now get the right images and change their class!
    const activeImage = document.getElementById(`JournalArticleImage-${carouselIndex}-${imageIndex}`);
    const previousImage = document.getElementById(`JournalArticleImage-${carouselIndex}-${previousImageIndex}`);
    const nextImage = document.getElementById(`JournalArticleImage-${carouselIndex}-${nextImageIndex}`);
    const nextNextImage = document.getElementById(`JournalArticleImage-${carouselIndex}-${nextNextImageIndex}`);

    previousImage.classList.remove('journalpage__carousel-image--prev');
    activeImage.classList.remove('journalpage__carousel-image--active');
    activeImage.classList.add('journalpage__carousel-image--prev');
    nextImage.classList.remove('journalpage__carousel-image--next');
    nextImage.classList.add('journalpage__carousel-image--active');
    nextNextImage.classList.add('journalpage__carousel-image--next');

    //Finally update the counter!
    const newImageIndex = nextImageIndex + 1;
    const newImageTotal = imageTotal + 1;
    carouselFooterCounter.textContent = `${newImageIndex}/${newImageTotal}`;

}, false);