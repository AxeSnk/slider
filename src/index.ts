import "./index.scss";
import View, { IView } from "./mvp/view/view";
import Model, { IModel } from "./mvp/model/model";
import { defaultOptions } from "./mvp/defaultOptions";
import Presenter from "./mvp/presenter/presenter";
import SliderFacade from './mvp/SliderFacade';

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider(...arg: any): JQuery<Element> | void;
  }
}

(function($) {
    $.fn.slider = function(options?: any) {

      let settings = $.extend(defaultOptions, options)

      let sliderFacade = new SliderFacade(this.get(0), settings)
      
      return sliderFacade;
    }
})(jQuery);

$(".js-mySlider").slider()
