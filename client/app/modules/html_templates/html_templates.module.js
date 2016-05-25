;(function(){

'use strict';

angular.module('HTMLTemplates', []).run(['$templateCache', function($templateCache) {

  $templateCache.put('modules/home/home.tpl.html', ' <h1>Home</h1> {{ home.title }} <h2>Calculator</h2> <table> <tr> <td>Input 1</td> <td><input type="number" ng-model="home.input1"></td> </tr> <tr> <td>Operator</td> <td><select ng-model="home.operator" ng-options="operator for operator in home.operators"></select></td> </tr> <tr> <td>Input 2</td> <td><input type="number" ng-model="home.input2"></td> </tr> <tr> <td>Result</td> <td><span>{{ home.result }}</span></td> </tr> <tr> <td col-span="2"><button ng-click="home.calculate()">Calculate</button></td> </tr> </table> ');

}]);

})();