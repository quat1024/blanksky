import AtpAgent from "@atproto/api";
import { makeContext, ContextType, provide } from "./eventutil";

export type LoginHandler = (service: string, identifier: string, password: string) => Promise<void>;

export const CURRENT_AGENT: ContextType<AtpAgent | undefined> = makeContext("blanksky-accountContext");
export const LOGIN_HANDLER: ContextType<LoginHandler> = makeContext("blanksky-doLogin");

export function createAccountContext(): HTMLElement {
  const accountContext = document.createElement("div");
  accountContext.id = "blanksky-accountContext";
  
  let agent: AtpAgent | undefined = undefined;
  
  provide(accountContext, CURRENT_AGENT, () => agent);
  
  provide(accountContext, LOGIN_HANDLER, () => async (service: string, identifier: string, password: string) => {
    agent = new AtpAgent({service});
    await agent.login({identifier, password});
    
    //done logging in
    window.location.hash = "/following";
  });
  
  return accountContext;
}
