class EventEmitter {
  private events: { [key: string]: Array<Function> };

  constructor() {
    this.events = {};
    this.on = this.on.bind(this);
    this.emit = this.emit.bind(this);
  }

  public on(type: string, callback: Function): void {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  public emit(type: string, arg?: any): void {
    if (this.events[type]) {
      this.events[type].forEach(callback => callback(arg));
    }
  }
}

export default EventEmitter;
