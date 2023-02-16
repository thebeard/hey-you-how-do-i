import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./tag-list.css?inline";

export default component$(({ tags }: { tags: string[] }) => {
  useStylesScoped$(styles);

  return (
    <ul class="tags">
      {tags?.map((tag) => (
        <li class="tag" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
});
