/**
 * Rehype plugin that turns standalone images into styled image cards.
 *
 * Markdown renders ![alt](src) as <p><img alt="..." src="..."></p>.
 * This plugin finds those single-image paragraphs and replaces them with:
 *
 *   <figure class="image-card">
 *     <img alt="..." src="...">
 *     <figcaption>alt text</figcaption>   ← only when alt is non-empty
 *   </figure>
 *
 * The transformation runs at build time so no client-side JS is needed.
 */
export function rehypeImageCard() {
  return (tree) => {
    transformChildren(tree);
  };
}

function transformChildren(node) {
  if (!node.children) return;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    // Ignore whitespace-only text nodes when checking children.
    const meaningful = child.children
      ? child.children.filter(
          (c) => !(c.type === "text" && c.value.trim() === "")
        )
      : [];

    if (
      child.tagName === "p" &&
      meaningful.length === 1 &&
      meaningful[0].tagName === "img"
    ) {
      const img = meaningful[0];
      const alt = img.properties?.alt ?? "";

      node.children[i] = {
        type: "element",
        tagName: "figure",
        properties: { className: ["image-card"] },
        children: [
          img,
          ...(alt
            ? [
                {
                  type: "element",
                  tagName: "figcaption",
                  properties: {},
                  children: [{ type: "text", value: alt }],
                },
              ]
            : []),
        ],
      };
    } else {
      transformChildren(child);
    }
  }
}
