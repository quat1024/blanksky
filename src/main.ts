import { createAccountContext } from "./accountcontext";
import { createHashRouterAndBindEvents, InitialRouteEvent } from "./hashrouting";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blanksky")!;

  //account context
  const accountContext = createAccountContext();
  container.appendChild(accountContext);

  //routing
  const hashrouter = createHashRouterAndBindEvents();
  accountContext.appendChild(hashrouter);
  
  if(window.location.hash) {
    //need to kick the tires of the hashrouter (it only does "hashchange")
    hashrouter.dispatchEvent(new InitialRouteEvent());
  } else {
    //it should pick up on this
    window.location.hash = "/login";
  }
});
