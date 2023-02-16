import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

import styles from "./post-summary.css?inline";
import { timeSince } from "../../modules/utility";
import TagList from "../tag-list/tag-list";
import type { IPostSummary } from "../../models/post-summary.interface";

interface PostSummaryProps {
  onPostSelect$?: QRL<(id: string) => void>;
  post: IPostSummary;
}

export default component$(
  ({ onPostSelect$ = $(() => {}), post }: PostSummaryProps) => {
    useStylesScoped$(styles);

    const { id, title, datePublished, tags = [] } = post,
      date = new Date(datePublished);

    return (
      <article onClick$={() => onPostSelect$(id)}>
        <h3>{title}</h3>
        <footer>
          <time dateTime={date.toISOString()}>{timeSince(date.getTime())}</time>
          <TagList tags={tags}></TagList>
        </footer>
      </article>
    );
  }
);
