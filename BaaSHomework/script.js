var module = (function(){
    var listCountries = function(){
        $.ajax({
        type:"GET",
        url:"https://baas.kinvey.com/appdata/kid_bk_D2rnp0l/Countries",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic SXZhbjoxMjM0");
        },
        success: function(data){
            for (var index in data) {
                $('#wrapper').append($('<div>').text(data[index].name))
            }
            $('#wrapper').append($('<hr>'));
        },
        error: function(err){}
    })};

    var deleteCountry = function(name){
        var link = 'https://baas.kinvey.com/appdata/kid_bk_D2rnp0l/Countries' + '?query={"name":"' + name + '"}';
        $.ajax({
            type:"DELETE",
            url:link,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic SXZhbjoxMjM0");
            },
            success: function(data){},
            error: function(err){}
        })};

    var postCountry = function(name){
        $.ajax({
            type:"POST",
            url:"https://baas.kinvey.com/appdata/kid_bk_D2rnp0l/Countries",
            data: {"name":name},
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic SXZhbjoxMjM0");
            },
            success: function(data){},
            error: function(err){}
        })};

    var listTownsByCountry = function(country){
        var link = 'https://baas.kinvey.com/appdata/kid_bk_D2rnp0l/Towns' + '?query={"country":{"name":"' + country + '"}}';
        $.ajax({
            type:"GET",
            url: link,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic SXZhbjoxMjM0");
            },
            success: function(data){
                for (var index in data) {
                    $('#wrapper').append($('<div>').text(data[index].name))
                }
                $('#wrapper').append($('<hr>'));
            },
            error: function(err){}
        })};

    return {
        listCountries: listCountries,
        postCountry: postCountry,
        deleteCountry: deleteCountry,
        listTownsByCountry:listTownsByCountry
    }
})();

$('#list-countries').on('click', function(){
    module.listCountries();
});

$('#post-country').on('click', function(){
    var country = $('#country-name').val();
    module.postCountry(country);
});

$('#delete-country').on('click', function(){
    var countryForDelete = $('#delete-this').val();
    module.deleteCountry(countryForDelete);
});

$('#list-towns').on('click', function(){
    var country = $('#choose-town').val();
    module.listTownsByCountry(country);
});
