import AtpAgent from "@atproto/api";
import { LoginEvent } from "./loginform";
import { provide, ContextToken } from "./eventutil";

export const AGENT: ContextToken<AtpAgent | undefined> = Symbol.for("blanksky-accountContext");

export function createAccountContext(): HTMLElement {
  const loginContext = document.createElement("div");
  loginContext.id = "blanksky-accountContext";
  
  let agent: AtpAgent | undefined = undefined;
  
  provide(loginContext, AGENT, () => agent);
  
  //login event
  loginContext.addEventListener(LoginEvent.ID, async ee => {
    const e: LoginEvent = ee as LoginEvent;
    
    const { service, identifier, password } = e.args;
    console.log("got event on login form, ", service, identifier);
    
    agent = new AtpAgent({ service });
    await agent.login({ identifier, password });
    
    window.location.hash = "/following";
  })
  
  return loginContext;
}

// export class GetAgentEvent2 extends ContextRequestEvent<AtpAgent | undefined> {
//   static ID: string = "blanksky-GetAgent2";
//   constructor(setter: Setter<AtpAgent | undefined>) {
//     super(GetAgentEvent2.ID, setter);
//   }
// }