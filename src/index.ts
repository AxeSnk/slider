import "./index.scss";
import View, { IView } from "./mvp/view";
import Model from "./mvp/model";
import { defaultOptions } from './mvp/defaultOptions';

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider(options:any) : JQuery<Element> | void;
  }
}

(function($){
    $.fn.slider = function(options?: any) {

      options = $.extend(defaultOptions, options);

      var make = function(){

          let view: IView = new View(this,this,this,this);
      };

      return this.each(make);
    };
})(jQuery);

$('.mySlider').slider(true);