var app = app || {};

app.loginMenu = function () {
    $.get('templates/loginTemplate.html', function (templ) {
        $('#wrapper').html(templ);

        $('#login').on('click', function(){
            var username = $('#username').val(),
                username = $('#password').val()
        });
    });
}

