'use strict'

export default function AppConfig ($urlRouterProvider) {
  'ngInject'

  $urlRouterProvider.otherwise('/home')
}
