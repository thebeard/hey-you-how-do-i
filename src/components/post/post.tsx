import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import docco from "react-syntax-highlighter/dist/cjs/styles/hljs/paraiso-dark";

import styles from "./post.css?inline";
import TagList from "../tag-list/tag-list";
import type { IPost } from "../../models/post.interface";

SyntaxHighlighter.registerLanguage("javascript", js);

interface PostProps {
  mode?: "back" | "close";
  onExit$?: QRL<(id?: string) => void>;
  post: IPost;
}

export default component$(
  ({ mode = "close", onExit$ = $(() => {}), post }: PostProps) => {
    useStylesScoped$(styles);

    const { title, content, tags = [] } = post,
      goHome$ = $(() => {
        document.querySelector("#post-container")?.classList.add("closing");
        document.querySelector("#post-wrapper")?.classList.add("closing");
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      });

    return (
      <section
        id="post-wrapper"
        onClick$={() => {
          mode === "close" ? onExit$() : goHome$();
        }}
      >
        <section id="post-container">
          <h2>How to {title}</h2>
          <TagList tags={tags}></TagList>
          <SyntaxHighlighter
            language="typescript"
            style={docco}
            showLineNumbers={true}
            customStyle={{
              padding: 0,
              margin: "1.75em 0 0 -7px",
              fontSize: "0.9rem",
              maxHeight: "65vh",
              overflowX: "hidden",
            }}
          >
            {content}
          </SyntaxHighlighter>
        </section>
      </section>
    );
  }
);
