import "./index.scss";
import './mvp/sliderFacade';
import Demo from './demo/Demo'

$('.demo__slider').slider()
let test = $('.demo__slider').slider('getValue')
console.log(test[0])