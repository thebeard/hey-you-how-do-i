import { component$, useClientEffect$, useStylesScoped$ } from "@builder.io/qwik";
import type { QwikJSX } from "@builder.io/qwik";
import { refractor } from "refractor";
import js from "refractor/lang/javascript.js";
import type { RefractorElement, RefractorRoot, Text } from "refractor";
import styles from "./code-viewer.scss?inline";

type RefractorNode = RefractorRoot | RefractorElement | Text;
type RefractorRenderElement = [(node: RefractorNode) => boolean, (node: any) => QwikJSX.Element];

export default component$(({ code }: { code: string }) => {
  useStylesScoped$(styles);

  refractor.register(js);

  useClientEffect$(() => {
    refractor.register(js);
  });

  const rows = code.split(`\r\n`),
    renderCode: (node: RefractorNode) => QwikJSX.Element = node => {
      const getClasses: (node: RefractorElement) => string = ({ properties }) =>
          (properties?.className as string[]).join(" "),
        elementDict: RefractorRenderElement[] = [
          [
            node => "type" in node && node.type === "root",
            (node: RefractorRoot) => <>{node.children.map(child => renderCode(child))}</>
          ],
          [
            node => "type" in node && node.type === "element",
            (node: RefractorElement) => (
              <span class={getClasses(node)}>{node.children.map(child => renderCode(child))}</span>
            )
          ],
          [() => true, (node: Text) => <>{node.value}</>]
        ],
        findRefractorElement: (node: RefractorNode) => () => any = (node: RefractorNode) => {
          const [, render] = elementDict.find(([find]) => find(node)) as RefractorRenderElement;
          return () => render(node);
        };

      const render = findRefractorElement(node);
      return render();
    },
    customLocClasses: (row: string) => string = row => {
      let classes = "loc";
      if (["/**", " * ", " */"].includes(row.substring(0, 3))) {
        classes += " comment";
      }

      return classes;
    };

  return (
    <ol>
      {rows.map(row => (
        <li class={customLocClasses(row)}>{renderCode(refractor.highlight(row, "js"))}</li>
      ))}
    </ol>
  );
});
