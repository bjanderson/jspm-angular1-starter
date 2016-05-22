'use strict'

export default class AppCtrl {

  constructor ($scope) {
    'ngInject'

    let siteName = 'JSPM Angular1 Starter'
    $scope.pageTitle = siteName

    $scope.$on('$stateChangeSuccess', function (event, toState) {
      if (toState.data != null && toState.data.pageTitle != null) {
        $scope.pageTitle = toState.data.pageTitle + ' | ' + siteName
      } else {
        $scope.pageTitle = siteName
      }
    })
  }
}
