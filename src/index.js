import './stylesheets/canvasStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'bootstrap'



import { loadAssets } from './helpers/loaderAssets'
import { initStudio } from './helpers/initStudio'
import { initItems } from './helpers/initItems'
import { startAnimate } from './helpers/startAnimate'
import { prepareHtml } from './helpers/prepareHtml'
import { initScenario } from './helpers/initScenario'



$(document).ready( function() {
  $(window).scroll(function() {
    console.log('scroll event');
  });

  loadAssets({})
    .then(initStudio)
    .then(initItems)
    .then(startAnimate)
    .then(prepareHtml)
    .then(initScenario)
})