'use strict';

(function(){

class OnlinepaymentinfoComponent {
  constructor($scope, $location, $http) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$location = $location;
    this.$http = $http;
    this.payment = {TheatreName:'', MovieName:'', MovieDate:'', MovieTiming:'', Class:'', SeatNumbers:'', NumberOfTickets:'', TotalCost:''};
  }

  $onInit() {
    this.payment.TheatreName = sessionStorage.getItem('bookingTheatre');
    this.payment.MovieName = sessionStorage.getItem('bookingMovieName');
    this.payment.MovieDate = sessionStorage.getItem('bookingDate');
    this.payment.MovieTiming = sessionStorage.getItem('bookingTime');
    this.payment.Class = sessionStorage.getItem('selectedClass');
    this.payment.SeatNumbers = sessionStorage.getItem('selctedSeatNo');
    this.payment.NumberOfTickets = sessionStorage.getItem('noofseats');
    this.payment.TotalCost = sessionStorage.getItem('totamt');
    console.log(this.payment.TheatreName);
    this.$scope.totAmount = sessionStorage.getItem('totamt');
  }

  makePayment() {
    var name=isNaN( document.myForm.cardname.value );
    var cno=document.myForm.inputNumber.value;
    console.log("name in number " + name);
    if( ! (isNaN( document.myForm.cardname.value ))) {
      alert( "Enter the name in Characters and not numbers" );
      document.myForm.cardname.focus() ;
      return false;
    }
    else if(cno.length<16) {
      alert( "Enter valid card no" );
      document.myForm.cardno.focus() ;
      return false;
    }
    else {
    console.log(this.payment.TheatreName);
    this.$http.post('/api/payment', {
    TheatreName: this.payment.TheatreName,
    MovieName: this.payment.MovieName,
    MovieDate: this.payment.MovieDate,
    MovieTiming: this.payment.MovieTiming,
    Class: this.payment.Class,
    SeatNumbers: this.payment.SeatNumbers,
    NumberOfTickets: this.payment.NumberOfTickets,
    TotalCost: this.payment.TotalCost
  });
    console.log(sessionStorage.getItem('bookingTheatre'));
    console.log('amount paid');
    this.$location.path('/confirmation');
  }
}

  confirmation() {
    this.$location.path('/confirmation');
  }
}

angular.module('yeomanApp')
  .component('onlinepaymentinfo', {
    templateUrl: 'app/onlinepaymentinfo/onlinepaymentinfo.html',
    controller: OnlinepaymentinfoComponent,
    controllerAs: 'onlinepaymentinfoCtrl'
  });
})();
