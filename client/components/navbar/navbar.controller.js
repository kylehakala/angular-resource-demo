'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title': 'Students',
    'state': 'student'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('badassStudentManagerApp')
  .controller('NavbarController', NavbarController);
