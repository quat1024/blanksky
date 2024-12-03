// @ts-nocheck

//TODO TODO TODO: this is https://github.com/terkelg/facon but "instanceof HTMLElement" has been replaced with "instanceof Node"
//this is because i'm getting DocumentFragments for some reason which isn't working
//weird part is their tests aren't catching it, so maybe it's a JSDom difference?
//OH they just never tested nesting facons..... hmm!

export default function h(strings, ...args) {
  const template = document.createElement(`template`);

  template.innerHTML = args.reduce((prev, value, i) =>
    prev + (value instanceof Node ? `<b append=${i}></b>` : value) + strings[i + 1],
    strings[0]
  );

  const content = template.content;

  content.querySelectorAll(`[append]`).forEach(refNode => {
    refNode.parentNode.insertBefore(args[refNode.getAttribute('append')], refNode);
    refNode.parentNode.removeChild(refNode);
  });

  content.collect = ({ attr = 'ref', keepAttribute, to = {} } = {}) => {
    const refElements = content.querySelectorAll(`[${attr}]`);
    return [...refElements].reduce((acc, element) => {
      const propName = element.getAttribute(attr).trim();
      !keepAttribute && element.removeAttribute(attr);
      acc[propName] = acc[propName]
        ? Array.isArray(acc[propName])
          ? [...acc[propName], element]
          : [acc[propName], element]
        : element;
      return acc;
    }, to);
  };

  return content;
}