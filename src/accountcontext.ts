import AtpAgent from "@atproto/api";
import { LoginEvent } from "./loginform";
import { DullEvent, SimpleEvent } from "./eventutil";

export function createAccountContext(): HTMLElement {
  const loginContext = document.createElement("div");
  loginContext.id = "blanksky-accountContext";
  
  let agent: AtpAgent | undefined = undefined;
  
  //getters... (ugly)
  loginContext.addEventListener(GetAgentEvent.ID, e =>
    (e as GetAgentEvent).payload(agent));
  
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

export class GetAgentEvent extends SimpleEvent<(agent: AtpAgent | undefined) => void> {
  static ID: string = "blanksky-GetAgent";
  constructor(setter: (agent: AtpAgent | undefined) => void) {
    super(GetAgentEvent.ID, setter);
  }
}