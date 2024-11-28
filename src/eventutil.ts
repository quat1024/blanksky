export abstract class DullEvent extends Event {
  static get ID(): string {
    throw new Error("need to override ID");
  }
  
  constructor(id: string) {
    super(id, {bubbles: true, composed: true});
  }
}

export abstract class SimpleEvent<T> extends DullEvent {
  payload: T;
  constructor(id: string, payload: T) {
    super(id);
    this.payload = payload;
  }
}

export type Getter<T> = () => T;
export type Setter<T> = (t: T) => void;

export function ask<T>(asker: Element, evtFactory: (setter: Setter<T>) => SimpleEvent<Setter<T>>): T | undefined {
  let t: T | undefined = undefined;
  asker.dispatchEvent(evtFactory(x => t = x));
  return t;
}