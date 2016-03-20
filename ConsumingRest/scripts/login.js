var app = app||{};

(function(scope){
    function login () {
        var username = $('#username').val();
        var password = $('#password').val();

        var objForSend = {
            "username": username,
            "password": password
        };

        $.ajax({
            type: "POST",
            url: "https://baas.kinvey.com/user/kid_bk_D2rnp0l/login",
            data: objForSend,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic a2lkX2JrX0Qycm5wMGw6YTg1NTMwNGQzZjYwNDdjYjkyMTc5ZDhlNmI4MWZlMTQ=");
            },
            success: function (data) {
                sessionStorage.authToken = data._kmd.authtoken;
                scope.listBooks();
            },
            error: function (error) {
                console.error(error);
                alert('Invalid username or password');
            }
        })
    };

    scope.login = login;
})(app);
