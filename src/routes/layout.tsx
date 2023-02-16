import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./layout.css?inline";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <Header />
      <main>
        <section>
          <Slot />
        </section>
      </main>
      <Footer />
    </>
  );
});
