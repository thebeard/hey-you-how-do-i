import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

import styles from "./username-prompt.css?inline";
import { updateUser } from "../../modules/user";

interface UsernamePromptProps {
  onUsernameUpdate$?: QRL<(id: string) => void>;
}

export default component$(
  ({ onUsernameUpdate$ = $(() => Promise.resolve()) }: UsernamePromptProps) => {
    useStylesScoped$(styles);
    const username = useSignal<string>(),
      onInputChange$ = $((event: KeyboardEvent) => {
        username.value = (event.target as HTMLInputElement).value;
      });

    // @todo Work with long names ... responsively?
    useOnDocument(
      "keypress",
      $((event: Event) => {
        if ((event as KeyboardEvent).key === "Enter") {
          updateUser(username.value ?? "");
          onUsernameUpdate$(username.value ?? "");
        }
      })
    );

    return (
      <div id="username-prompt-wrapper">
        <div id="username-prompt-container">
          <label for="username">Whats ya' name?</label>
          <input
            name="username"
            placeholder="It's okay, you can lie"
            value={username.value}
            onInput$={onInputChange$}
            autoFocus
          ></input>
          {(username.value?.length ?? 0) > 1 && <p>Press enter bud...</p>}
        </div>
      </div>
    );
  }
);
