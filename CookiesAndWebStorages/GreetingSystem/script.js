(function(){
    while (!localStorage.name){
        localStorage.name = prompt('Enter your name');
    }

    if (!localStorage.totalVisits){
        localStorage.totalVisits = 0;
    }

    if (!sessionStorage.sessionVisits){
        sessionStorage.sessionVisits = 0;
    }

    localStorage.totalVisits++;
    sessionStorage.sessionVisits++;

    $('#greeting').text('Hi, ' + localStorage.name);
    $('#sessionVisits').text('Session visits: ' + sessionStorage.sessionVisits);
    $('#totalVisits').text('Total visits: ' + localStorage.totalVisits);
})();
