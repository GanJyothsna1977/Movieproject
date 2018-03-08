'use strict';

(function(){

class MoviesComponent {
  constructor($http, $scope, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.MovieData = '';

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('movies');
    });
  }

  $onInit() {
    console.log('getting movies');
    this.$http.get('/api/movies')
      .then(response => {
        this.Movies = response.data;
        console.log(this.Movies);
        this.socket.syncUpdates('movies', this.Movies);
      });
    }

  SearchMovie() {
     var key = 'b630612abe3b6332380d943cc619e381';
      this.$http.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${this.$scope.MovieName}&year=${this.$scope.Year}`).then(response=> {
        console.log(response.data.results[0].id);
        var MovieID = response.data.results[0].id;
        console.log('movie id is ' + MovieID);
        this.$http.get(`https://api.themoviedb.org/3/movie/${MovieID}?api_key=${key}&language=en-US`).then(response => {
          console.log(response.data);
        this.MovieData = {
            Title: response.data.title,
            Year: response.data.release_date.substring(0,4),
            Genre: _.pluck(response.data.genres, 'name').join(),
            Overview: response.data.overview,
            ReleaseDate: response.data.release_date,
            Poster: `http://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
            Duration: `${response.data.runtime} minutes`,
            Production: response.data.production_companies[0].name
          };
        });
      });
    }

    addMovie() {
      var mname = _.pluck(this.Movies, 'Title');
      console.log('mnames ' + mname);
      this.$scope.existingMovie = _.findWhere(this.Movies, {Title:this.MovieData.Title});
      console.log('existingMovie ' + this.$scope.existingMovie);
      if(this.$scope.existingMovie)
      alert('Movie is already added in the DB');
      else{
        console.log('adding movie');
        this.$http.post('/api/movies', {
          Poster: this.MovieData.Poster,
          Title: this.MovieData.Title,
          Genre:  this.MovieData.Genre,
          Overview: this.MovieData.Overview,
          ReleaseDate: this.MovieData.ReleaseDate,
          Duration: this.MovieData.Duration,
          Production: this.MovieData.Production
        });
        this.MovieData = '';
      }
    }

deleteMovie(movie) {
  console.log('Movie Deleted' + movie.Title);
    this.$http.delete('/api/Movies/' + movie._id);
  }
}

angular.module('yeomanApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });
})();
