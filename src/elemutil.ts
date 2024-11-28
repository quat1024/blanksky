//cheating with "any" since this is a dependent map
const PREPARATION_HOOKS = new WeakMap<HTMLElement, any>();

export function setPreparationHook<T extends HTMLElement>(element: T, hook: (e?: T) => void) {
  PREPARATION_HOOKS.set(element, hook);
  element.dataset["hooked"] = "true";
}

export function runPreparationHook(root: HTMLElement) {
  let needsHook: HTMLElement | null;
  while(needsHook = root.querySelector("[data-hooked]")) {
    delete needsHook.dataset["hooked"];
    
    let hook = PREPARATION_HOOKS.get(needsHook);
    if(hook) {
      hook(needsHook);
      PREPARATION_HOOKS.delete(needsHook);
    } else {
      console.log("no hook??");
    }
  }
}