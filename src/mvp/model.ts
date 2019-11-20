import IOptions, { defaultOptions } from './defaultOptions';

export interface IModel {
  getMinVal(): any;
  getMaxVal(): any;
}

export default class Model implements IModel {
  private minVal: any;
  private maxVal: any;

  constructor(options: IOptions) {
    this.minVal = options.minVal;
    this.maxVal = options.maxVal;  
  }

  getMinVal(): any {
    return this.minVal;
  }

  getMaxVal(): any {
    return this.maxVal;
  }
}