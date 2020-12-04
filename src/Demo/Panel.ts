import { IOptions } from '../MVP/utils/IOptions';

class Panel {
  root: HTMLElement;

  $slider: JQuery<Element>;

  form: HTMLFormElement | null;

  input: HTMLInputElement | null;

  constructor(root: HTMLElement, $slider: JQuery<Element>) {
    this.root = root;
    this.$slider = $slider;
    this.form = this.root.querySelector('form');
    if (this.form !== null) {
      this.input = this.form.querySelector('input');

      this.handleChange = this.handleChange.bind(this);
      this.update = this.update.bind(this);
      this.init();
    } else {
      this.input = null;
    }
  }

  private init(): void {
    this.$slider.slider('subscribeToInitModel', this.update);
    this.$slider.slider('subscribeToUpdates', this.update);

    this.form!.addEventListener('change', this.handleChange);
  }

  private handleChange(event: Event): void {
    event.preventDefault();

    const options: { [key: string]: string | number | boolean } = {};
    const target = event.currentTarget as HTMLFormElement;

    [...target.elements].forEach((input) => {
      const {
        name, type, value, checked,
      } = input as HTMLInputElement;
      const hasChecked = type === 'radio' || type === 'checkbox';
      if (type === 'submit') return;

      options[name] = hasChecked ? checked : Number(Number(value.trim()).toFixed(2));
    });

    this.$slider.slider('setState', options);
  }

  private update(state: IOptions): void {
    [...this.form!.elements].forEach((element) => {
      const input = element as HTMLInputElement;
      const { name, type } = input;
      // @ts-ignore
      const defaultValue = state[name];
      const hasChecked = type === 'checkbox';

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
