
// This helper function gets the image from a node (if it exists), or returns nothing if none is found.
function __getImageFromNode(childNode) {
    let imageSrc = "";
    console.log(childNode);
    if (childNode.firstChild) {
        return __getImageFromNode(childNode.firstChild);
    }
    else if (childNode.tagName === "IMG") {
        imageSrc = childNode.src;
    }
    console.log(imageSrc);
    return imageSrc;
}

// This function handles constructing the image carousels in each article as it appears.
!(function (d) {
    const journalArticles = document.getElementsByClassName('journalpage__article');
    for (let i = 0; i < journalArticles.length; i++) {
        const journalArticle = journalArticles[i];
        console.log(journalArticle);
        let childrenNodes = journalArticle.childNodes;
        let images = [];
        let nodesToRemove = [];
        for (let j = 0; j < childrenNodes.length; j++) {
            let childNode = childrenNodes[j];
            console.log(childNode);
            // Filter out the images!
            const imageSrc = __getImageFromNode(childNode);
            if (imageSrc !== "") {
                nodesToRemove.push(j);
                images.push(imageSrc)
                journalArticle.removeChild(childrenNodes[j]);
            }
        }
        //Add a div with JUST the images in it.
        const imageCarousel = document.createElement("div");
        imageCarousel.classList.add('journalpage__image-carousel');
        imageCarousel.id = `JournalImageCarousel-${i}`;

        const imageCarouselMask = document.createElement("div");
        imageCarouselMask.classList.add("journalpage__image-mask");
        imageCarouselMask.id = `JournalImageMask-${i}`;
        imageCarousel.appendChild(imageCarouselMask);

        for (let k = 0; k < images.length; k++) {
            const carouselImage = document.createElement("img");
            carouselImage.classList.add('journalpage__carousel-image');
            if (k == 0) {
                carouselImage.classList.add('journalpage__carousel-image--initial');
            }
            carouselImage.id = `JournalArticleImage-${i}-${k}`;
            carouselImage.src = images[k];
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
            previousImageButton.innerHTML = `<img src="https://cdn.shopify.com/s/files/1/0260/1789/0397/t/7/assets/arrow-left.png" />`;
            carouselFooterContainer.appendChild(previousImageButton);

            const imageCounter = document.createElement("span");
            imageCounter.innerHTML = `1/${images.length}`;
            imageCounter.classList.add('journalpage__imageCounter');
            imageCounter.id = `JournalCarouselImageCounter-${i}`;
            carouselFooterContainer.appendChild(imageCounter);

            const nextImageButton = document.createElement("button");
            nextImageButton.classList.add('journalpage__carousel-next-image-button');
            nextImageButton.id = `JournalCarouselFooterNextImageButton-${i}`;
            nextImageButton.innerHTML = `<img src="https://cdn.shopify.com/s/files/1/0260/1789/0397/t/7/assets/arrow-right.png" />`;
            imageCarousel.appendChild(carouselFooterContainer);
            carouselFooterContainer.appendChild(nextImageButton);
        }

        journalArticle.appendChild(imageCarousel);
    }
}(document));