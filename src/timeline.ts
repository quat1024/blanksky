import { Agent } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { CURRENT_AGENT } from "./accountcontext";
import { ask } from "./eventutil";

export class BlankskyTimeline extends HTMLElement {
  async connectedCallback() {
    let agent: Agent | undefined = ask(this, CURRENT_AGENT);
    if (!agent) {
      this.innerText = "no agent";
      return;
    }

    this.innerText = "loading timeline";

    const result = await agent.getTimeline();
    console.log(result);
    if (!result.success) {
      this.innerText = "failed loading timeline";
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

    while (this.firstChild) this.firstChild.remove();
    this.appendChild(list);
  }
}
customElements.define("blanksky-timeline", BlankskyTimeline);
