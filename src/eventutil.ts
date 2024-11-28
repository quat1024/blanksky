export type ContextToken<_> = Symbol;

export function provide<T>(element: Element, kind: ContextToken<T>, getter: () => T) {
  element.addEventListener("context-request", e => {
    if(e instanceof ContextRequestEvent && e.kind == kind) {
      (e as ContextRequestEvent<T>).setter(getter());
      e.stopPropagation(); //found it
    }
  });
}

export function ask<T>(elem: Element, kind: ContextToken<T>): T | undefined {
  let result: T | undefined = undefined;
  elem.dispatchEvent(new ContextRequestEvent<T>(kind, value => result = value)); //synchronous (!)
  return result;
}

class ContextRequestEvent<T> extends Event {
  kind: ContextToken<T>;
  setter: (t: T) => void;
  
  constructor(kind: ContextToken<T>, setter: (t: T) => void) {
    super("context-request", {bubbles: true});
    this.kind = kind;
    this.setter = setter;
  }
}