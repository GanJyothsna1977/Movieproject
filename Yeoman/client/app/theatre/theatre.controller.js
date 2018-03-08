'use strict';

(function(){

class TheatreComponent {
  constructor($http, $scope, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.Theatres = [];
   this.TheatreData = {theatreName:'',city:'',area:''};
  }

  $onInit() {
    this.$http.get('/api/theatre')
    .then(response => {
      this.Theatres = response.data;
      this.socket.syncUpdates('theatre', this.Theatres);
    });
  }

  addTheatre(theatre) {
    var tname = _.pluck(this.TheatreData.theatreName, 'theatreName');
    console.log('tnames ' + tname);
    this.$scope.existingTheatre = _.findWhere(this.Theatres, {theatreName:this.TheatreData.theatreName});
    this.$scope.existingCity = _.findWhere(this.Theatres, {city:this.TheatreData.city});
    this.$scope.existingArea = _.findWhere(this.Theatres, {area:this.TheatreData.area});
    console.log('existingTheatre ' + this.$scope.existingTheatre);
    if(this.$scope.existingTheatre && this.$scope.existingCity && this.$scope.existingArea)
    alert('Theatre is already added in the DB');
    else {
      console.log('added theatre');
      this.$http.post('/api/theatre', {
        theatreName:this.TheatreData.theatreName,
        city:this.TheatreData.city,
        area:this.TheatreData.area
      });
    this.TheatreData = {_id:'', theatreName:'', city:'', area:''};
  }
}

  editTheatre(theatre) {
    console.log('getting theatre');
       this.$http.get('/api/theatre/' + theatre._id)
       .then(response => {
         this.TheatreData = {_id:response.data._id, theatreName:response.data.theatreName, city:response.data.city, area:response.data.area}
       });
     }

updateTheatre(TheatreData) {
console.log('updating');
  console.log(this.TheatreData._id);
  this.$http.put('/api/theatre/' + this.TheatreData._id, {
    theatreName: this.TheatreData.theatreName,
    city:this.TheatreData.city,
    area: this.TheatreData.area
  })
  .then(response => {
    console.log('updated');
  });
  this.TheatreData = {_id:'', theatreName:'', city:'', area:''};
}

  deleteTheatre(theatre) {
    console.log('Theatre Deleted' + theatre.theatreName);
    this.$http.delete('/api/theatre/' + theatre._id);
  }
}

angular.module('yeomanApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    controllerAs: 'theatreCtrl'
  });
})();
