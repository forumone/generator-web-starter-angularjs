angular.module('myApp').controller('LayoutController', function($mdSidenav, $scope) {

  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.closeSidenav = function(menuId) {
    $mdSidenav(menuId).close();
  };
  var originatorEv;
  $scope.openMenu = function ($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
});
