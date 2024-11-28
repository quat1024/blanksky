export type Getter<T> = () => T;
export type Setter<T> = (t: T) => void;
export type ContextEvent<T> = { setter: Setter<T> } & Event;
export type ContextType<T> = {
  new (setter: Setter<T>): Event & ContextEvent<T>,
  id: string
}

export function makeContext<T>(id: string): ContextType<T> {
  const className = id + "ContextEvent";
  return {[className]: class extends Event implements ContextEvent<T> {
    static id: string = id;
    setter: Setter<T>;
    constructor(setter: Setter<T>) {
      super(id, {bubbles: true});
      this.setter = setter;
    }
  }}[className]; //What the fuck is javascript even
}

export function provide<T>(element: Element, event: ContextType<T>, getter: Getter<T>){
  element.addEventListener(event.id, e => {
    (e as ContextEvent<T>).setter(getter());
    e.stopPropagation();
  });
}

export function ask<T>(element: Element, event: ContextType<T>): T | undefined {
  let result: T | undefined = undefined;
  element.dispatchEvent(new event(value => result = value));
  return result;
}

