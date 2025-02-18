import { Clipboard } from "../corex/index"
import { nanoid } from "nanoid"

document.querySelectorAll<HTMLElement>('.clipboard').forEach((rootEl) => {
  const clipboard = new Clipboard(rootEl, {
    id: nanoid(),
    value: "info@netoum.com",
    timeout: 1500
  });

  clipboard.init();
});
