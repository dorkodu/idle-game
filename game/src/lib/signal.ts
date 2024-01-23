export class Signal<T extends any> {
  private listeners: ((args: T) => any)[] = [];

  public add(receiver: (args: T) => any) {
    this.listeners.push(receiver);
  }

  public remove(receiver: (args: T) => any) {
    for (let i = 0; i < this.listeners.length; ++i) {
      if (this.listeners[i] === receiver) {
        this.listeners.splice(i, 1);
        return;
      }
    }
  }

  public dispatch(args: T) {
    for (let i = this.listeners.length - 1; i >= 0; --i) {
      this.listeners[i]?.(args);
    }
  }

  public clear() {
    this.listeners = [];
  }
}