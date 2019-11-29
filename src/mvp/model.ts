import IOptions, { defaultOptions } from './defaultOptions';
import { TSParenthesizedType } from 'babel-types';

export interface IModel {
  getWidth(): number;
  getVal(): any 
  getMinVal(): any;
  getMaxVal(): any;
  getStep(): number;
  getRange(): boolean;
  getTooltipMask(): boolean;
  getVerticalMask(): boolean;
  getNumSteps(): number;
  getStepSizeArray(): number[];
}

export default class Model implements IModel {
  private width: number; // ширина слайдера
  private val: any; // первоначальное положение одиночного ползунка
  private minVal: any; // минимальное значение диапазона, при слайдере с диапазоном
  private maxVal: any; // маскимальное значение диапазона, при слайдере с диапазоном
  private step: number; // шаг ползунка
  private range: boolean; // диапазон слайдера
  private tooltip: boolean; // подсказка над ползунком
  private vertical: boolean; // вертикальный слайдер
  private numSteps: number;
  private stepSizeArray: number[];


  constructor(options: IOptions) {
    this.width = options.width;
    this.val = options.val;
    this.minVal = options.minVal;
    this.maxVal = options.maxVal;  
    this.step = options.step;
    this.range = options.range;
    this.tooltip = options.tooltip;
    this.vertical = options.vertical;
    this.numSteps = this.getNumSteps();
    this.stepSizeArray = this.getStepSizeArray();
  }

  getWidth(): number {
    return this.width
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

  getNumSteps(): number {
    let numSteps = this.maxVal / this.step;

    return numSteps;
  }

  getStepSizeArray(): number[] {
    let maxVal = this.maxVal;
    let minVal = this.minVal;
    let step = this.step;
    let array = function() {
      let arr: number[] = [];
      let i: number;
      for( i = minVal; i < maxVal; i = i + step) {
        arr.push(i);
      }
      arr.push(maxVal);
      return arr;
    }

    let stepSizeArray = array();
    return stepSizeArray;
  }

}