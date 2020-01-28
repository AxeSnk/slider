export default class EventEmitter {
  private events: { [key: string]: Array<Function> };

  constructor() {
    this.events = {};
  }

  public on(type: string, callback: Function): void {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  public emit(type: string, arg: any): void {
    if (this.events[type]) {
      this.events[type].forEach(callback => callback(arg));
    }
  }
}
