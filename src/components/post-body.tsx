import { Fragment } from "react";
import type { PostBlock } from "@/data/types";

/** Text with **bold** parts. */
function RichText({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : <Fragment key={index}>{part}</Fragment>));
}

/** A blog post's body, from the blocks the API returns. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="prose-page">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <h2 key={index}>{block.text}</h2>;
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={index}>
                <code>{block.code}</code>
              </pre>
            );
          default:
            return (
              <p key={index}>
                <RichText text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
