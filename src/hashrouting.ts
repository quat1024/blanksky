import { runPreparationHook } from "./elemutil";
import { createLoginForm } from "./loginform2";
import { createTimeline } from "./timeline";

export function createHashRouterAndBindEvents(): HTMLElement { //maybe split this
  const hashRouter = document.createElement("div");
  hashRouter.id = "blanksky-hashrouter";
  
  window.addEventListener("hashchange", _ => route(hashRouter, window.location.hash));
  hashRouter.addEventListener(InitialRouteEvent.ID, _ => route(hashRouter, window.location.hash));

  return hashRouter;
}

function clear(elem: HTMLElement) {
  while(elem.firstChild) elem.firstChild.remove();
}

async function route(router: HTMLElement, hash: string) {
  if(hash.startsWith("#/")) hash = hash.slice(2);
  else if(hash.startsWith("#")) hash = hash.slice(1);
  
  console.log("routing to", hash);
  
  const split = hash.split("/");
  switch(split[0]) {
    case "login":
      clear(router);
      router.appendChild(createLoginForm());
      runPreparationHook(router);
      break;
    case "following":
      clear(router);
      router.appendChild(createTimeline());
      runPreparationHook(router);
      break;
    default:
      clear(router);
      router.textContent = "hashrouter 404... hash " + hash;
  }
}

export class InitialRouteEvent extends Event {
  static ID: string = "blanksky-initialroute";
  
  constructor() {
    super(InitialRouteEvent.ID, {bubbles: true});
  }
}