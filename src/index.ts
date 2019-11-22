import "./index.scss";
import View, { IView } from "./mvp/view";
import Model, { IModel } from "./mvp/model";
import { defaultOptions } from './mvp/defaultOptions';
import Presenter from "./mvp/presenter";

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider(options?:any) : JQuery<Element> | void;
  }
}

(function($){
  $.fn.slider = function(options?: any) {

    options = $.extend(defaultOptions, options);

    var make = function(){

      let model: IModel = new Model(options);
      let view: IView = new View(model, this, this);
      let presenter = new Presenter(model, view)

    };

    return this.each(make);
  };
})(jQuery);

$('.mySlider').slider();