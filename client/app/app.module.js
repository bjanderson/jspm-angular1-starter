'use strict'

import angular from 'angular'
import 'angular-ui-router'

import AppConfig from './app.config'
import AppCtrl from './app.controller'

import 'app/modules/html_templates/html_templates.module'
import Home from 'app/modules/home/home.module'

const app = angular
  .module('Main', [
    'HTMLTemplates',
    Home.name,
    'ui.router'
  ])

  .config(AppConfig)

  .controller('AppCtrl', AppCtrl)

export default app

angular.element(document).ready(function () {
  return angular.bootstrap(document, [app.name])
})
