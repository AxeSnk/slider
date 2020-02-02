import { defaultOptions } from "./defaultOptions";
import Model from "./model/model";
import View from "./view/view";
import Presenter from "./presenter/presenter";


declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider(options?: any, method?: any): any;
  }
}

(function($) {
  $.fn.slider = function(options, ...args) {

    const init = () => this.map(function(){
      options = $.extend(defaultOptions, options)

      const settings = typeof options === 'object' ? { ...$(this).data(), ...options } : $(this).data();

      const model = new Model(settings);
      const view = new View(this);
      const presenter = new Presenter(model, view);

      $(this).data('presenter', presenter);

      return this;
    });

    const applyMethod = (method: string, $this: JQuery) => {
      if (!$this.data('presenter')) {
        init();
      }

      const presenter = $this.data('presenter');

      if (presenter[method]) {
        return presenter[method].apply(presenter, args);
      } else {
        return $.error(`${method} method does not exist.`);
      }
    };

    if (typeof options === 'string') {
      return $(this).map(function() {
        return applyMethod(options, $(this));
      });
    }

    return init();
  }
})(jQuery);