'use strict';

(function(){

class OnlinepaymentpageComponent {
  constructor($scope, $location) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$location = $location;
    this.totSeats = [];
  }

  $onInit() {
    this.$scope.movieName = sessionStorage.getItem('bookingMovieName');
    this.$scope.theatre = sessionStorage.getItem('bookingTheatre');
    this.$scope.classsel = sessionStorage.getItem('selectedClass');
    this.$scope.showDate = sessionStorage.getItem('bookingDate');
    this.$scope.showTime = sessionStorage.getItem('bookingTime');
    this.$scope.bookingSeats = sessionStorage.getItem('selctedSeatNo');
    this.totSeats = this.$scope.bookingSeats.split(',');
    this.$scope.total = this.totSeats.length;
    sessionStorage.setItem('noofseats',this.$scope.total);
    if(this.$scope.classsel == "Gold")
    sessionStorage.setItem('totamt',this.$scope.total*200);
    else {
      sessionStorage.setItem('totamt',this.$scope.total*150);
    }
    this.$scope.totAmount = sessionStorage.getItem('totamt');
  }

  booking() {
    this.$location.path('/onlinepaymentinfo');
  }
}

angular.module('yeomanApp')
  .component('onlinepaymentpage', {
    templateUrl: 'app/onlinepaymentpage/onlinepaymentpage.html',
    controller: OnlinepaymentpageComponent,
    controllerAs: 'onlinepaymentpageCtrl'
  });
})();
