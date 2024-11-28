import AtpAgent from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { AGENT } from "./accountcontext";
import { ask } from "./eventutil";
import { setPreparationHook } from "./elemutil";

export function createTimeline(): HTMLElement {
  const timeline = document.createElement("div");
  timeline.id = "blanksky-timeline";

  timeline.innerText = "no preparation hook";

  setPreparationHook(timeline, async (_) => {
    let agent: AtpAgent | undefined = ask(timeline, AGENT);
    if (!agent) {
      timeline.innerText = "no agent";
      return;
    }

    timeline.innerText = "loading timeline";
    
    const result = await agent.getTimeline();
    console.log(result);
    if (!result.success) {
      throw new Error("not success");
    }
    const feed: FeedViewPost[] = result.data.feed;

    /////PLACEHOLDER PLACEHOLDER PLACEHOLDER/////
    const list = document.createElement("ul");
    for (const post of feed) {
      const authorElem = document.createElement("b");
      authorElem.textContent = post.post.author.handle;

      const bodyElem = document.createElement("div");
      bodyElem.textContent = (post.post.record as any).text;

      const li = document.createElement("li");
      li.append(authorElem, bodyElem);

      list.appendChild(li);
    }

    while(timeline.firstChild) timeline.firstChild.remove();
    timeline.appendChild(list);
  });

  return timeline;
}
