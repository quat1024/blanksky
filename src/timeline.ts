import AtpAgent from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { AGENT } from "./accountcontext";
import { ask } from "./eventutil";

export async function createTimeline(uhh: HTMLElement): Promise<HTMLElement> {
  let agent: AtpAgent | undefined = ask(uhh, AGENT);
  
  if(!agent) {
    const lament = document.createElement("span");
    lament.innerText = "no agent";
    return lament;
  }
  
  return makeTimelineAsdf(agent);
}

export async function makeTimelineAsdf(agent: AtpAgent): Promise<HTMLElement> {
  const result = await agent.getTimeline();
  console.log(result);
  if(!result.success) {
    throw new Error("not success");
  }
  const feed: FeedViewPost[] = result.data.feed;
  
  /////PLACEHOLDER PLACEHOLDER PLACEHOLDER/////
  const list = document.createElement("ul");
  for(const post of feed) {
    const authorElem = document.createElement("b");
    authorElem.textContent = post.post.author.handle;
    
    const bodyElem = document.createElement("div");
    bodyElem.textContent = (post.post.record as any).text;
    
    const li = document.createElement("li");
    li.append(authorElem, bodyElem);
    
    list.appendChild(li);
  }
  
  return list;
}