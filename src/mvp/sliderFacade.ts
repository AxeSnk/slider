import Model from "./Model/Model";
import View from "./View/View";
import Presenter from "./Presenter/Presenter";

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider: (options?: any, args?: any) => any;
  }
}

(function($) {
  $.fn.slider = function(options, ...args) {
    const init = () =>
      this.map(function() {
        const data = $(this).data();
        const settings =
          typeof options === "object" ? { ...data, ...options } : data;

        const model = new Model(settings);
        const view = new View(this);
        const presenter = new Presenter(model, view);

        $(this).data("presenter", presenter);

        return this;
      });

    const applyMethod = (method: string, $this: JQuery) => {
      if (!$this.data("presenter")) {
        init();
      }

      const presenter = $this.data("presenter");

      if (presenter[method]) {
        return presenter[method].apply(presenter, args);
      } else {
        return $.error(`Метод ${method} не найден для slider.`);
      }
    };

    if (typeof options === "string") {
      return $(this).map(function() {
        return applyMethod(options, $(this));
      });
    }

    return init();
  };
})(jQuery);
