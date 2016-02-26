function changeColor() {
    var className = $('input:text').val(),
        color = $('#color-picker').val();

    $('.' + className).css('background', color);
}