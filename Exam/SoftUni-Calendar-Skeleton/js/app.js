var app = app || {};


(function () {
    var router = Sammy(function () {
        var selector = $('#container');
        var requester = app.requester.load('kid_WJWlK8R2J-', 'ca1277c1264e46ab9d8675c2913f2e82', 'https://baas.kinvey.com/');

        var userViewBag = app.userViews.load(selector);
        var homeViewBag = app.homeViews.load(selector);
        var lecturesViewBag = app.lectureViews.load(selector);

        var userModel = app.userModel.load(requester);
        var lecturesModel = app.lectureModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var lectureController = app.lectureController.load(lecturesViewBag, lecturesModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function(){
            if (!sessionStorage['sessionId']){
                homeController.showWelcomeForUnloged();
            }else {
                homeController.showWelcomeForLogged();
            }
        });

        this.get('#/register/', function(){
            userController.showRegister();
        });

        this.get('#/login/', function(){
            userController.showLogin();
        });

        this.get('#/calendar/list/', function(){
            lectureController.showAllLectures();
        });

        this.get('#/calendar/my/', function(){
            lectureController.showUserLectures();
        });

        this.get('#/calendar/add/', function(){
            lectureController.showAddLecture();
        });

        this.get('#/logout/', function(){
            userController.logoutUser();
        });

        this.get('#/calendar/delete/:lectureId', function(){
            lectureController.showLectureForDelete(this.params['lectureId']);
            //lectureController.deleteLecture(this.params['lectureId']);
        });

        this.get('#/calendar/edit/:lectureId', function(){
            lectureController.showEditLecture(this.params['lectureId']);
        });

        this.bind('redirectUrl', function(ev, data){
            this.redirect(data.url)
        });

        this.bind('register', function(ev, data){
            userController.registerUser(data);
        });

        this.bind('login', function(ev, data){
            userController.loginUser(data);
        });

        this.bind('editLecture', function(ev, data){
            lectureController.editLecture(data);
        });

        this.bind('deleteLecture', function(ev, data){
            lectureController.deleteLecture(data.id);
        });

        this.bind('addLecture', function(ev, data){
            lectureController.addLecture(data);
        });
    });

    router.run('#/');
}());