$(window).on('load', function () {
    var answers;
    if (!localStorage.answers) {
        answers = {};
    } else {
        answers = JSON.parse(localStorage.getItem('answers'));
    }

    var timer,
        timerDiv = $('#timer'),
        temp = 300;

    timer = setInterval(function () {
        temp--;
        if (temp <= 0) {
            clearInterval(timer);
        }
        var minutes = (temp / 60) >> 0,
            seconds = (temp % 60) + '',
            timeDisplay = minutes + ':' + (seconds.length > 1 ? '' : '0') + seconds;
        timerDiv.text('Time remaining: ' + timeDisplay);
    }, 1000);

    $('input:checkbox').change(function () {
        var propName = $(this).parent().text().trim();
        answers[propName] = $(this).attr('value');
        localStorage.setItem('answers', JSON.stringify(answers));
    });


    $('#btn').on('click', function () {
        clearInterval(timer);
        for (var key in answers) {
            var output = $('<p>').text(key + ' ' + answers[key]);
            $('#result').append(output);
        }
        answers = {};
        localStorage.setItem('answers', JSON.stringify(answers));
    });
});
