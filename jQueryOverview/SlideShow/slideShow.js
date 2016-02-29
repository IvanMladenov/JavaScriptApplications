var leftButton = $('#left'),
    rightButton = $('#right'),
    slide = $('#slide'),
    images = $('img'),
    buttons = $('.btn'),
    numberOfImages = images.length,
    imageWidth = 300,
    animationTime = 500,
    timeout = 3000,
    imageIndex = 0,
    indent = 0,
    autoplay;

function animateImages() {
    indent = imageWidth * Math.abs((imageIndex % numberOfImages));
    slide.animate({
            left: indent * -1
        },
        animationTime
    )
}

function autoPlay(){
    autoplay = setInterval(function () {
            imageIndex--;
            animateImages();
        },
        timeout
    );
}

autoPlay();

leftButton.on('click', function () {
    imageIndex++;
    animateImages();
});

rightButton.on('click', function () {
    imageIndex--;
    animateImages();
});

//stops and resumes autoplay when mouse over or leave
buttons.on('mouseover', function(){
    clearInterval(autoplay);
}).on('mouseleave', function(){
    autoPlay();
});
