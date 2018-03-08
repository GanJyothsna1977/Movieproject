'use strict';

(function(){

class ConfirmationComponent {
  constructor($scope) {
    this.message = 'Hello';
    this.$scope = $scope;
  }

  $onInit() {
    this.$scope.theatre = sessionStorage.getItem('bookingTheatre');
    this.$scope.movieName = sessionStorage.getItem('bookingMovieName');
    this.$scope.showDate = sessionStorage.getItem('bookingDate');
    this.$scope.showTime = sessionStorage.getItem('bookingTime');
    this.$scope.totAmount = sessionStorage.getItem('totamt');
    this.$scope.bookingSeats = sessionStorage.getItem('selctedSeatNo');
    this.totSeats = this.$scope.bookingSeats.split(',');
    this.$scope.total = this.totSeats.length;
    this.$scope.classsel = sessionStorage.getItem('selectedClass');
    this.$scope.CardName = sessionStorage.getItem('name');
    this.$scope.CardNumber = sessionStorage.getItem('number');
  }
}

angular.module('yeomanApp')
  .component('confirmation', {
    templateUrl: 'app/confirmation/confirmation.html',
    controller: ConfirmationComponent,
    controllerAs: 'confirmationCtrl'
  });
})();
