import { Dialog } from "../corex/index"
import { nanoid } from "nanoid"

document.querySelectorAll<HTMLElement>(".menu").forEach((rootEl) => {
  const menu = new Dialog(rootEl, { id: nanoid(), closeOnInteractOutside: true, dir: "ltr", preventScroll: false
})
  menu.init()

  document.querySelectorAll<HTMLAnchorElement>(".close-menu").forEach((link) => {
    link.addEventListener("click", function () {
        menu.api.setOpen(false);
    });
  });
})


