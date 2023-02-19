import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

import styles from "./post.css?inline";
import CodeViewer from "../code-viewer/code-viewer";
import TagList from "../tag-list/tag-list";
import type { IPost } from "../../models/post.interface";

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
          <CodeViewer code={content}></CodeViewer>
        </section>
      </section>
    );
  }
);
