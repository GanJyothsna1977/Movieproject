'use strict';

(function(){

class MoviemapComponent {
  constructor($http, $scope, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.theatreForm = {};
    this.dates = [];
    this.time = [];
    this.moviemaps=[];
    this.mapping = {};
    this.$scope = $scope;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('moviemap');
    });
  }

$onInit() {
  console.log(this.dates);
  this.$http.get('/api/movies')
  .then(response => {
    this.Movies = response.data;
  });

  this.$http.get('/api/moviemap')
  .then(response => {
    this.moviemaps = response.data;
    this.socket.syncUpdates('moviemap', this.moviemaps);
  });

  this.$http.get('/api/theatre')
  .then(response => {
    this.Theatres = response.data;
    this.cityNames = _.uniq(_.pluck(this.Theatres, 'city'));
    this.cityMappings = _.groupBy(this.Theatres, (theatre)=>{ return theatre.city; });
    console.log(this.Theatres);
    console.log(this.cityMappings);
  });
}

addMapping() {
  this.mapping = {
    movieName: this.theatreForm.movie,
    city: this.theatreForm.city,
    theatre: this.theatreForm.theatreName,
    dates: this.dates,
    times: this.time
  };

  this.$http.post('/api/moviemap',this.mapping);
  console.log('adding mapping');
  console.log(this.theatreForm);
  this.mapping = {};
  this.theatreForm = {};
  this.dates = [];
  this.time = [];
}

addDate() {
  var d = new Date (this.theatreForm.seldate).getDate();
  var m = new Date (this.theatreForm.seldate).getMonth()+1;
  var y = new Date (this.theatreForm.seldate).getFullYear();
  this.dates.push(`${d}-${m}-${y}`);
  console.log(this.dates);
}

deleteDate(i) {
  console.log('date deleted');
  this.dates.splice(i,1);
}

addTime() {
  var time = new Date(this.theatreForm.seltime);
  var hours = time.getHours(this.theatreForm.seltime) > 12 ? time.getHours(this.theatreForm.seltime) - 12 : time.getHours();
  var am_pm = time.getHours(this.theatreForm.seltime) >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  var minutes = time.getMinutes(this.theatreForm.seltime) < 10 ? "0" + time.getMinutes(this.theatreForm.seltime) : time.getMinutes();
  var seconds = time.getSeconds(this.theatreForm.seltime) < 10 ? "0" + time.getSeconds(this.theatreForm.seltime) : time.getSeconds();

  time = hours + ":" + minutes + am_pm;
  this.time.push(time);
  console.log(this.time);
}

deleteTime(i) {
  this.time.splice(i,1);
}

deletemoviemap(moviemap) {
  console.log('MovieMap Deleted' + moviemap.movieName);
    this.$http.delete('/api/moviemap/' + moviemap._id);
  }

} /* end of moviemap component */

angular.module('yeomanApp')
  .component('moviemap', {
    templateUrl: 'app/moviemap/moviemap.html',
    controller: MoviemapComponent,
    controllerAs: 'moviemapCtrl'
  });
})();
