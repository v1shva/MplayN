/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('userMenu').
component('myAccount', {
    templateUrl: '/components/userMenu/MyAccount',
    controller:['$cookies','User', function UserMenuController($cookies, User) {
        var data = $cookies.getObject('userData');
        this.FirstName = data.user.firstName;
        this.LastName = data.user.lastName;
        this.Gender = data.user.gender;
        this.Country = data.user.country;
        this.BirthDate = data.user.birthDate;
        this.userName = data.user.username;
        this.userEmail = data.user.email;
        var controller = this;
        this.EditBasic = function () {
            let user =  {
                firstName : controller.FirstName,
                lastName : controller.LastName,
                gender : controller.Gender,
                country : controller.Country,
                birthDate: controller.BirthDate
            };
            let res = User.updateUser.post(user);
            res.$promise.then(function(dataRes){
                data.user.firstName =controller.FirstName;
                data.user.lastName =controller.LastName;
                data.user.gender= controller.Gender;
                data.user.country = controller.Country;
                data.user.birthDate = controller.BirthDate;
                $cookies.remove("userData");
                $cookies.putObject('userData', data);
            });
        }
    }]
});