import IOptions from "../MVP/defaultOptions";

class Panel {
  root: HTMLElement;
  $slider: any;
  form: HTMLFormElement;
  input: HTMLInputElement;

  constructor(root: HTMLElement, $slider: JQuery<Element>) {
    this.root = root;
    this.$slider = $slider;

    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);

    this.init();
  }

  private init(): void {
    const form = this.root.querySelector("form");
    const input = form.querySelector("input");
    this.form = form;
    this.input = input;

    this.$slider.slider("subscribeToInitModel", this.update);
    this.$slider.slider("subscribeToUpdates", this.update);

    this.form.addEventListener("change", this.handleChange);
  }

  private handleChange(event: Event): void {
    event.preventDefault();

    const options: { [key: string]: any } = {};
    const target = event.currentTarget as HTMLFormElement;

    [...target.elements].forEach((input) => {
      const { name, type, value, checked } = input as HTMLInputElement;
      const hasChecked = type === "radio" || type === "checkbox";
      if (type === "submit") return;

      options[name] = hasChecked ? checked : value.trim();
    });

    this.$slider.slider("setState", options);
  }

  private update(state: IOptions): void {
    [...this.form.elements].forEach((element) => {
      const input = element as HTMLInputElement;
      const { name, type } = input;
      const defaultValue = state[name];
      const hasChecked = type === "radio" || type === "checkbox";

      if (defaultValue === undefined) return;

      if (hasChecked) {
        input.checked = defaultValue as boolean;
      } else {
        input.value = defaultValue.toString();
      }
    });
  }
}

export default Panel;
