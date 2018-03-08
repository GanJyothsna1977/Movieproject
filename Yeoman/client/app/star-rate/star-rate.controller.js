'use strict';

(function(){
  class StarRateComponent {

    constructor($http, $scope, socket, $location, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.$scope = $scope;
      this.isLoggedIn = Auth.isLoggedIn;
      this.theatreForm = {};
      this.Movies = [];
      this.MovieData = '';
      this.movieNames = [];
      this.movieDetail = {};
      this.runningMovies = [];
      this.$location = $location;
      this.$scope.givenRating='';

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('starRate');
      });
    }

    $onInit() {
      if(this.isLoggedIn()) {
        this.$location.path('/star-rate');
      } else {
        alert('Please login to rate the movie')
        this.$location.path('/login');
      }
      console.log('getting movies');
      this.$http.get('/api/star-rate')
      .then(response => {
        this.starRates = response.data;
        this.socket.syncUpdates('starRate', this.starRates);
      });

      this.$http.get('/api/movies')
      .then(response => {
        this.Movies = response.data;
        this.socket.syncUpdates('movies', this.Movies);
      });

      this.$http.get('/api/moviemap')
      .then(response => {
        this.MovieMaps = response.data;
        this.movieNames = _.uniq(_.pluck(this.MovieMaps, 'movieName'));
        console.log('Running movies ' + this.movieNames);
        console.log('movies' + this.Movies);

        for(let mname in this.movieNames) {
          this.movieDetail = _.findWhere(this.Movies, {Title : this.movieNames[mname]});
          console.log(JSON.stringify(this.movieDetail));
          this.runningMovies.push(this.movieDetail);
        }
        console.log(this.runningMovies);
      });
    }

  showTiming(movie) {
    if(typeof(Storage) !== "undefined") {
      sessionStorage.setItem('bookingMovieName', movie.Title);
    }
  }

  rateMovie(movieName) {
    this.$scope.movieName = movieName;
  }

    movieRate() {
      var givenR = document.getElementById("showrate").value;
      document.getElementById("showrate").value=0;
      console.log('given rating is ' + givenR);
      this.$scope.givenRating = givenR;
      this.$http.post('/api/star-rate', {
      movieNames: this.$scope.movieName,
      MovieRating: this.$scope.givenRating
    });
    console.log('adding rating');
  }
}

angular.module('yeomanApp')
  .component('starRate', {
    templateUrl: 'app/star-rate/star-rate.html',
    controller: StarRateComponent,
    controllerAs: 'starRateCtrl'
  });
})();
