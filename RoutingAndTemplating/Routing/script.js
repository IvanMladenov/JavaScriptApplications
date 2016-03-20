(function(){
    var router = Sammy(function(){
        var selector = $('#wrapper');

        this.get('/#/Ivan', function(){
            selector.text('Hello ' + 'Ivan')
        });

        this.get('/#/Dragan', function(){
            selector.text('Hello ' + 'Dragan')
        });

        this.get('/#/Miumiun', function(){
            this.redirect('/#/Ivan');
            //selector.text('Hello ' + 'Miumiun')
        });

        this.get('/#/Ahmed', function(){
            selector.text('Hello ' + 'Ahmed')
        });

        this.get('/#/Stamat', function(){
            selector.text('Hello ' + 'Stamat')
        })
    });

    router.run('/#/Dragan')
})();