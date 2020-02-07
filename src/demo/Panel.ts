class Panel {
  root: HTMLElement;
  $slider: JQuery<Element>;
  form: HTMLFormElement;
  input: HTMLInputElement;

  constructor(root: HTMLElement, $slider: JQuery<Element>) {
    this.root = root;
    this.$slider = $slider;

    this.handleChange = this.handleChange.bind(this);

    this.init();
  }

  init(): void {
    let form = this.root.querySelector("form");
    let input = form.querySelector("input");

    this.form = form;
    this.input = input;

    this.form.addEventListener("change", this.handleChange);
  }

  handleChange(event: Event) {
    event.preventDefault();

    const options: { [key: string]: any } = {};
    const target = event.currentTarget as HTMLFormElement;

    [...target.elements].forEach(input => {
      const { name, type, value, checked } = input as HTMLInputElement;
      const hasChecked = type === "radio" || type === "checkbox";
      if (type === "submit") return;

      options[name] = hasChecked ? checked : value.trim();
    });

    this.$slider.slider("setState", options);
  }
}

export default Panel;
