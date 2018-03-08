'use strict';

(function(){

class SeatArrangementComponent {
  constructor($scope, $http, $location, socket) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
    this.socket = socket;
    this.payments = [];
    this.bookedSeats = [];
    this.seats = [];
    this.SeatNo = [];

    $(document).ready(function() {
      $('.seat').click(function() {
        $(this).toggleClass('seatselect');
        var seatid = $(this).attr('id');
        var x = $(this).css('backgroundColor');
      });
    });
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('payment');
    });
  }

  $onInit() {
    console.log("seats are " + this.seats.length);
    this.$scope.movieName = sessionStorage.getItem('bookingMovieName');
    this.$scope.showTime = sessionStorage.getItem('bookingTime');
    this.$scope.showDate = sessionStorage.getItem('bookingDate');
    this.$scope.theatre = sessionStorage.getItem('bookingTheatre');

    this.$http.get('/api/payment')
    .then(response => {
      this.payments = response.data;
      this.bookedSeats = _.flatten( _.map( _.filter(response.data, (detail)=>{ return detail.MovieName === this.$scope.movieName && detail.TheatreName=== this.$scope.theatre } ), (seat)=>{ return seat.SeatNumbers }) );
      console.log('payment details ' + JSON.stringify(this.payments));
      this.socket.syncUpdates('payment', this.payments);
      this.paidmovies = _.where(this.payments, {MovieName:this.$scope.movieName, MovieDate:this.$scope.showDate, MovieTiming:this.$scope.showTime, TheatreName:this.$scope.theatre});
      for(var payment of this.paidmovies) {
        console.log('paid seat no ' + payment.SeatNumbers);
        var seatnums = payment.SeatNumbers.split(',');

        for(let seat of seatnums) {
          console.log('seat no in loop ' + seat.toString());
          var x = document.getElementsByClassName("seat");

        for(var i = 0; i < x.length; i++) {
          console.log('id of divs '+x[i].id);
          if(x[i].id.toString() == seat.toString()) {
            x[i].disabled = true;
            var div = document.getElementById(x[i].id);
            x[i].setAttribute("style","background-color: grey" );
            console.log('matching div ' + x[i].id + ' and ' + x[i].disabled);
          }
        }
      }
    }
  });
}

  selclass(classsel) {
    this.$scope.goldclass = false;
    this.$scope.silverclass = false;
    sessionStorage.setItem('selectedClass', classsel);
    console.log('class stored in the session ' + sessionStorage.getItem('selectedClass'));
    console.log('selected class ' + classsel);

    if(classsel === 'Gold') {
      this.$scope.goldclass = true;
      this.$scope.silverclass = false;
    } else if(classsel === 'Silver') {
      this.$scope.goldclass = false;
      this.$scope.silverclass = true;
    } else {
      this.$scope.goldclass = false;
      this.$scope.silverclass = false;
    }
  }

  isSelected(seatid) {
    if(_.find(this.SeatNo, function(seat){ return seat===seatid})) {
      return true;
    } else {
      return false;
    }
  }

  isBooked(seatid) {
    if(_.find(this.bookedSeats, function(seat){ return seat===seatid})) {
      return true;
    } else {
      return false;
    }
  }

  selseat(seatid) {
    this.paid = false;
    console.log('calling selectseat function');
    this.paidmovies = _.where(this.payments, {MovieName:this.$scope.movieName, MovieDate:this.$scope.showDate, MovieTiming:this.$scope.showTime,TheatreName:this.$scope.theatre});

    for(let pay of this.paidmovies) {
      console.log('paid seatno in selseat ' + pay.SeatNumbers);
      var seatnums = pay.SeatNumbers.split(',');

    for(let seat of seatnums) {
      console.log('paid seats are ' + seat);

    if(seatid == seat) {
      alert('Seat is already booked Plz select any other seat');
      this.paid = true;
      console.log('paid value when seat is matched ' + this.paid);
    }
  }
}

  if(this.paid == false) {
    console.log('paid value when seat is not matched ' + this.paid);

  if(!this.isSelected(seatid) && !this.isBooked(seatid)) {
    document.getElementById('book').disabled = false;
    this.SeatNo.push(seatid);
  } else {
    var a = this.SeatNo.indexOf(seatid);
    this.SeatNo.splice(a, 1);
  }
  alert('pushed seat no ' + this.SeatNo);
} else {
  var a = this.SeatNo.indexOf(seatid);
  this.SeatNo.splice(a, 1);
}

  if(this.SeatNo.length) {
    $('#book').prop('disabled', false);
  } else {
    $('#book').prop('disabled', true);
  }
}

  booking() {
    console.log('booking seats ' + this.SeatNo.length);
    sessionStorage.setItem('selctedSeatNo', this.SeatNo);
    this.$location.path('/onlinepaymentpage');
  }

  main() {
    this.$location.path('/main');
  }

} // end of constructor

angular.module('yeomanApp')
  .component('seatArrangement', {
    templateUrl: 'app/seat-arrangement/seat-arrangement.html',
    controller: SeatArrangementComponent,
    controllerAs: 'seatArrangementCtrl'
  });
})();
