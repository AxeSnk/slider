class Panel {
  root: HTMLElement;
  $slider: JQuery<Element>;
  form: HTMLFormElement;
  input: HTMLInputElement;

  constructor(root: HTMLElement, $slider: JQuery<Element>) {
    this.root = root;
    this.$slider = $slider;

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

  }
}

export default Panel;
