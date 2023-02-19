import {
  component$,
  useClientEffect$,
  useStylesScoped$,
} from "@builder.io/qwik";
import { refractor } from "refractor";
import js from "refractor/lang/javascript.js";
import type { RefractorElement, RefractorRoot, Text } from "refractor";
import styles from "./code-viewer.css?inline";

export default component$(({ code }: { code: string }) => {
  useStylesScoped$(styles);

  useClientEffect$(() => {
    refractor.register(js);
  });

  const rows = code.split(`\r\n`),
    renderCode: (node: RefractorRoot | RefractorElement | Text) => any = (
      node
    ) => {
      if ("type" in node && node.type === "root") {
        return node.children.map((A) => renderCode(A));
      } else if ("type" in node && node.type === "element") {
        return (
          <span
            class={(
              (node.properties?.className ?? {
                className: [],
              }) as unknown as string[]
            ).join(" ")}
          >
            {node.children.map((B) => renderCode(B))}
          </span>
        );
      }
      return node.value;
    },
    customLocClasses: (row: string) => string = (row) => {
      let classes = "loc";
      if (["/**", " * ", " */"].includes(row.substring(0, 3))) {
        classes += " comment";
      }

      return classes;
    };

  return (
    <ol>
      {rows.map((row) => (
        <li class={customLocClasses(row)}>
          {renderCode(refractor.highlight(row, "js"))}{" "}
        </li>
      ))}
    </ol>
  );
});
