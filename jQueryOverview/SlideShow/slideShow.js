var leftButton = $('#left'),
    rightButton = $('#right'),
    slide = $('#slide'),
    images = $('img'),
    numberOfImages = images.length,
    imageWidth = 300,
    animationTime = 500,
    timeout = 5000,
    imageIndex = 0,
    indent = 0;

function animateImages() {
    indent = imageWidth * Math.abs((imageIndex % numberOfImages));
    slide.animate({
            left: indent * -1
        },
        animationTime
    )
}

setInterval(function () {
        imageIndex--;
        animateImages();
    },
    timeout
);

leftButton.on('click', function () {
    imageIndex--;
    animateImages();
});

rightButton.on('click', function () {
    imageIndex++;
    animateImages();
});
