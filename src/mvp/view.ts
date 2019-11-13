import Model from "./model";
import IOptions from './defaultOptions';

export interface IView {

}

export default class View {
    private slider: HTMLDivElement;
    private handle: HTMLDivElement;
    private tooltip: HTMLDivElement;

    constructor(slider: HTMLDivElement, handle: HTMLDivElement, tooltip: HTMLDivElement) {
        this.slider = this.init(slider);
        this.handle = this.createHandle(handle);
        this.tooltip = this.createTooltip(tooltip);
    }

    init(slider: HTMLDivElement): HTMLDivElement {
        slider.classList.add('slider');

        return slider;
    }

    createHandle(handle: HTMLDivElement): HTMLDivElement {
        handle = document.createElement('div');
        handle.classList.add('handle');
        this.slider.append(handle);

        return handle;
    }

    createTooltip(tooltip: HTMLDivElement): HTMLDivElement {
        tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        this.handle.append(tooltip);

        return tooltip;
    }

}