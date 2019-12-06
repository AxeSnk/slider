import IOptions from './defaultOptions';

export interface IModel {
  getVal(): any 
  getMinVal(): any;
  getMaxVal(): any;
  getStep(): number;
  getRange(): boolean;
  getTooltipMask(): boolean;
  getVerticalMask(): boolean;
  getArrayOfDivisions(): number[];
}

export default class Model implements IModel {
  private val: any; // первоначальное положение одиночного ползунка
  private minVal: any; // минимальное значение диапазона, при слайдере с диапазоном
  private maxVal: any; // маскимальное значение диапазона, при слайдере с диапазоном
  private step: number; // шаг ползунка
  private range: boolean; // диапазон слайдера
  private tooltip: boolean; // подсказка над ползунком
  private vertical: boolean; // вертикальный слайдер
  private arrrayOfDivisions: number[]; // массив делений


  constructor(options: IOptions) {
    this.val = options.val;
    this.minVal = options.minVal;
    this.maxVal = options.maxVal;  
    this.step = options.step;
    this.range = options.range;
    this.tooltip = options.tooltip;
    this.vertical = options.vertical;
    this.arrrayOfDivisions = this.createArrayOfDivisions();

    this.init();
  }
  
  init(): void {
    console.log(this.getArrayOfDivisions());
  }

  // создать массив делений
  createArrayOfDivisions(): number[] {    
    let arr: number[] = [];
    let i: number;
    for( i = this.minVal; i < this.maxVal; i = i + this.step) {
      arr.push(i);
    }
    arr.push(this.maxVal);

    return arr;
  }
  
  getVal(): any {
    return this.val
  }

  getMinVal(): any {
    return this.minVal
  }

  getMaxVal(): any {
    return this.maxVal
  }

  getStep(): number {
    return this.step
  }

  getRange(): boolean {
    return this.range
  }

  getTooltipMask(): boolean {
    return this.tooltip
  }

  getVerticalMask(): boolean{
    return this.vertical
  }

  getArrayOfDivisions(): number[] {
    return this.arrrayOfDivisions
  }

}