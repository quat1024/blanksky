import { BlankskyAccountContext } from "./accountcontext";
import { BlankskyHashRouter } from "./hashrouting";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blanksky")!;

  //account context
  
  const accountContext = new BlankskyAccountContext();
  container.appendChild(accountContext);

  //routing
  const hashrouter = new BlankskyHashRouter();
  accountContext.appendChild(hashrouter);
  
  if(window.location.hash) {
    hashrouter.route(window.location.hash);
  } else {
    //hashchange event should pick up on this
    window.location.hash = "/login";
  }
});
