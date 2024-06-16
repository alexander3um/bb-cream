import "./style.css";
import { process } from "./process/process.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="box">
    <div class="box-from">
      <textarea></textarea>
    </div>
    <div class="box-to">
      <textarea readonly></textarea>
    </div>
  </div> 
`;

const from = document.querySelector<HTMLTextAreaElement>(".box-from textarea");
const to = document.querySelector<HTMLTextAreaElement>(".box-to textarea");

if (!from || !to) {
  throw new Error("Браузер-то клоунский");
}

const changeHandler = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;

  if (target) {
    target.classList.remove("error");

    try {
      to.value = process(target.value);
    } catch (error: unknown) {
      target.classList.add("error");
      console.error(error);
    }
  }
};

from.addEventListener("change", changeHandler);
from.addEventListener("keyup", changeHandler);

to.addEventListener("click", async (event) => {
  const target = event.target as HTMLTextAreaElement;

  if (target) {
    await navigator.clipboard.writeText(target.value);
  }
});
