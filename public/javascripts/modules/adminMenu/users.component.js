/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('adminMenu').
component('users', {
    templateUrl: '/components/adminMenu/users',
    controller:['User','$state', function UsersController(User, $state) {
        this.users = "";
        this.makeAdminUser = "";
        this.makeModUser = "";
        var controller = this;
        this.getUsers = function () {
            var res = User.getAllUsers.post();
            res.$promise.then(function(dataRes){
                controller.users = dataRes.items;

            });
        }
        this.getUsers();
        this.checkedUsers = [];
        this.checked = function (item) {
            if(item.checked) this.checkedUsers.push(item.attributes["name"].value);
            else {
                var index = this.checkedUsers.indexOf(item.attributes["name"].value);
                if (index > -1) {
                    this.checkedUsers.splice(index, 1);

                }
            }
        }

        this.deleteUsers = function () {
            $(".modal-backdrop").hide();
            $state.go('loading');
            var res = User.deleteUsers.post({users: this.checkedUsers});
            res.$promise.then(function(dataRes){
                $state.go('adminUsers');
            });
        }

        this.makeAdmin = function (item) {
            $(".modal-backdrop").hide();
            console.log(this.makeAdminUser);
            $state.go('loading');
            var res = User.makeAdmin.post({id: this.makeAdminUser});
            res.$promise.then(function(dataRes){
                console.log(dataRes);
                $state.go('adminUsers');
            });
        }

        this.makeMod = function (item) {
            $(".modal-backdrop").hide();
            $state.go('loading');
            var res = User.makeMod.post({id: this.makeModUser});
            res.$promise.then(function(dataRes){
                $state.go('adminUsers');
            });
        }
    }]
});