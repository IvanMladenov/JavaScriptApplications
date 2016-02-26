(function(){
    var input = JSON.parse(
        '[{"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"}, ' +
        '{"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"},' +
        '{"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}]'
    );

    $('body').append($('<table>').append($('<tr>')
        .append($('<th>').text('Manifacturer').attr('class', 'head'))
        .append($('<th>').text('Model').attr('class', 'head'))
        .append($('<th>').text('Year').attr('class', 'head'))
        .append($('<th>').text('Price').attr('class', 'head'))
        .append($('<th>').text('Class').attr('class', 'head'))
    ));

    for (var i = 0; i < input.length; i++) {
        //console.log(input[i].year);
        var manifacturer = input[i].manufacturer,
            model = input[i].model,
            year = input[i].year,
            price = input[i].price,
            carClass = input[i].class;

        var currentRow = $('<tr>')
            .append($('<td>').text(manifacturer))
            .append($('<td>').text(model))
            .append($('<td>').text(year))
            .append($('<td>').text(price))
            .append($('<td>').text(carClass));

        $('tbody').append(currentRow);
    }
})();


