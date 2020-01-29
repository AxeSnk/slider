import "./index.scss";
import { defaultOptions } from "./mvp/defaultOptions";
import SliderFacade from "./mvp/sliderFacade";

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider(options?: any): any;
  }
}

(function($) {
  $.fn.slider = function(options?: any) {
    options = $.extend(defaultOptions, options);

    let con: SliderFacade = new SliderFacade(this, options)
    return con
  };
})(jQuery);

$(".js-mySlider").slider();
