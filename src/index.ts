import "./index.scss";
import View, { IView } from "./mvp/view/view";
import Model, { IModel } from "./mvp/model/model";
import { defaultOptions } from "./mvp/defaultOptions";
import Presenter from "./mvp/presenter/presenter";

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider(...arg: any): JQuery<Element> | void;
  }
}

(function($) {
  var methods: object = {
    init: function(options?: any) {
      return this.each(function() {
        options = $.extend(defaultOptions, options);

        let model: IModel = new Model(options);
        let view: IView = new View(this);
        let presenter: Presenter = new Presenter(model, view);
      });
    },
    setValue: function(value: number) {
      return this.each(function() {
        let presenter: Presenter = this.data.presenter;
        presenter.setValue(value);
      });
    }
  };

  $.fn.slider = function(method?: any) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Метод с именем " + method + " не существует для jQuery.slider");
    }
  };
})(jQuery);

$(".js-mySlider").slider("setValue", { setValue: 5 });
