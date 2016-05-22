'use strict'

import angular from 'angular'
import 'ui-router'

import AppConfig from './app.config'
import AppCtrl from './app.controller'

const app = angular
  .module('Main', [
    'HTMLTemplates',
    'ui.router'
  ])

  .config(AppConfig)

  .controller('AppCtrl', AppCtrl)

export default app

angular.element(document).ready(function () {
  return angular.bootstrap(document, [app.name])
})
