'use strict';

(function(){

class ShowtimingComponent {
  constructor($scope,$http,$location) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.$location=$location;
    this.movieMaps = [];
    this.movieDetails = [];
    this.movieDates = [];
  }

  $onInit() {
    console.log(sessionStorage.getItem('bookingMovie'));
    if(typeof(Storage) !== "undefined") {
      this.$scope.movieName=sessionStorage.getItem('bookingMovieName');
      this.$scope.moviePoster=sessionStorage.getItem('bookingMoviePoster');
      document.getElementById("date").innerHTML = Date();
    } else {
      console.log("Sorry, your browser does not support web storage...");
    }
    this.$http.get('/api/moviemap')
    .then(response => {
      this.movieMaps = response.data;
      this.movieDetails = _.where(this.movieMaps, {movieName: this.$scope.movieName});
      console.log(JSON.stringify(this.movieDetails));
      this.movieDates = _.pluck(this.movieDetails, 'dates');
      var arr = _.first(this.movieDates, 1).toString();
      console.log('dates ' + arr);
      this.$scope.mdates = arr.split(",");
      console.log('movie dates ' + this.movieDates);
    });
  }

  selectedDate(mdate) {
    console.log("sel date " + mdate);
    sessionStorage.setItem('bookingDate', mdate);
    for(let md of this.movieDates) {
      console.log(md);
      if(md.indexOf(mdate) != -1) {
        this.$scope.dateAvailable = true;
        console.log('index of date ' + md.indexOf(mdate));
        console.log('date dateAvailable ' + this.$scope.dateAvailable);
        break;
      } else {
        this.$scope.dateAvailable = false;
      }
      console.log(md.indexOf(mdate));
    }
    return this.$scope.dateAvailable;
  }

  showTime(mtime,mtheatre) {
    sessionStorage.setItem('bookingTime',mtime);
    sessionStorage.setItem('bookingTheatre',mtheatre);
  }
}

angular.module('yeomanApp')
  .component('showtiming', {
    templateUrl: 'app/showtiming/showtiming.html',
    controller: ShowtimingComponent,
    controllerAs: 'showtimingCtrl'
  });

})();
