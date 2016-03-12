$('#button').on('click', function(){
    var name = $('#name').val(),
        jobTitle = $('#job-title').val(),
        website = $('#website').val();

    var personObj = {
        "name": name,
        "jobTitle": jobTitle,
        "website": website
    };

    $.ajax({
        type: 'POST',
        url: "https://baas.kinvey.com/appdata/kid_bk_D2rnp0l/Persons",
        headers: {
            'Authorization': 'Basic SXZhbjoxMjM0'
        },
        data: personObj,
        success: function(){$('#msg').html($('<div>').text('Success'))},
        error: function(er){console.log(er)}
    })
});

$('#list').on('click', function(){
    $.get('tableTemplate.html', function(template){
        var json = {}
        ;

        $.ajax({
            type: 'GET',
            url: "https://baas.kinvey.com/appdata/kid_bk_D2rnp0l/Persons",
            headers: {
                'Authorization': 'Basic SXZhbjoxMjM0'
            },
            success: function(data){
                json['persons'] = data;
                showCollection(json);
            },
            error: function(er){console.log(er)}
        });

        function showCollection(obj){
            var rendered = Mustache.render(template, obj);
            $('#table').html(rendered);
        }
    })
});