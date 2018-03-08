'use strict';

(function() {
  class MainController {

    constructor($http, $scope, socket, $location) {
      this.$http = $http;
      this.socket = socket;
      this.$scope = $scope;
      this.theatreForm = {};
      this.Movies = [];
      this.MovieData = '';
      this.movieNames = [];
      this.movieDetail = {};
      this.runningMovies = [];
      this.ratedDetails=[];
      this.$location = $location;
      this.avgRating = 0;
      this.nowShowing = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('main');
      });
    }

    $onInit() {
      console.log('getting movies');
      this.$http.get('/api/movies')
      .then(response => {
        this.Movies = response.data;
        this.socket.syncUpdates('movies', this.Movies);
      });

//finding the movie details by comparing movies and movie mapping
      this.$http.get('/api/moviemap')
      .then(response => {
        this.MovieMaps = response.data;
        this.movieNames = _.uniq(_.pluck(this.MovieMaps,'movieName'));
        console.log('Running movies ' + this.movieNames);
        console.log('movies' + this.Movies);

//star ratings
//calculating avgrating and updating or adding into movies
      this.$http.get('/api/star-rate')
      .then(response => {
        this.starRates = response.data;
        this.socket.syncUpdates('starRate', this.starRates);
        this.ratedMovies = _.uniq(_.pluck(this.starRates,'movieNames'));
        this.ratings = _.uniq(_.pluck(this.starRates,'MovieRating'));
        console.log('the rated movies are ' + this.ratedMovies);
        console.log('the ratings are ' + this.ratings);

        for(let mname of this.movieNames) {
          this.ratedDetails = _.where(this.starRates, {movieNames : mname});
          console.log('Rated details are ' + JSON.stringify(this.ratedDetails));
          var sum = 0;
          for(var i=0; i<this.ratedDetails.length; i++) {
            sum = sum + this.ratedDetails[i].MovieRating;
          }
          this.avgRating = sum/this.ratedDetails.length;
          this.rmovies = _.where(this.Movies,{Title:mname});

          for(let rmovie of this.rmovies) {
            console.log('updating movie ' + rmovie.Title);
            console.log('movie id is ' + rmovie._id + ', movie name is ' + rmovie.Title);
            console.log('avg rating while updating ' + this.avgRating.toFixed(2));
            this.$http.put('/api/movies/' + rmovie._id, {
              avgRating: this.avgRating
            });
          }
          this.movieDetail = _.findWhere(this.Movies, {Title: mname});
          console.log('movie detail ' + JSON.stringify(this.movieDetail));
          this.runningMovies.push(this.movieDetail);
        }

        for(let m of this.runningMovies)
        console.log('runnning movies with avgRating '+m.Title+', ' + JSON.stringify(m.avgRating));
      }); //end of star rate
    });//end of mapping
  }

  addThing() {
    console.log('add is called');
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }

  showTiming(movie) {
    if(typeof(Storage) !== "undefined") {
      console.log(movie);
      sessionStorage.setItem('bookingMovieName',movie.Title);
      sessionStorage.setItem('bookingMoviePoster',movie.Poster);
    } else {
      console.log("Sorry, your browser does not support web storage...");
    }
    this.$location.path('/showtiming');
  }
}

  angular.module('yeomanApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
    });
})();
