import { BlankskyAccountContext } from "./accountcontext";
import { BlankskyHashRouter } from "./hashrouting";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("blanksky")!;

  //account context
  const accountContext = new BlankskyAccountContext();
  container.appendChild(accountContext);

  //routing
  const hashrouter = new BlankskyHashRouter();
  accountContext.appendChild(hashrouter);
  
  ////// get ready //////
  await accountContext.tryResumeSession();
  
  if(window.location.hash) {
    hashrouter.route(window.location.hash); //go there
  } else if(accountContext.isLoggedIn()) {
    window.location.hash = "/following";
  } else {
    window.location.hash = "/login"
  }
});
