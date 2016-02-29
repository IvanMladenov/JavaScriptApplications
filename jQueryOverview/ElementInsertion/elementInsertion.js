(function(){
    var itemToAdd = $('<div>').text('e')
        .attr('class', 'added')
        .attr('id', 'middle');

    var first = $('<div>')
        .attr('id', 'first')
        .attr('class', 'added')
        .text('Pesho');

    var second = $('<div>')
        .attr('id', 'second')
        .attr('class', 'added')
        .text('gotin');

    $('#wrapper').append(itemToAdd);
    $('#middle').before(first).after(second);
})();
