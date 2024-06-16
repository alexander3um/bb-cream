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

from.addEventListener("change", (event) => {
  const target = event.target as HTMLTextAreaElement;

  if (target) {
    to.value = process(target.value);
  }
});

to.addEventListener("click", async (event) => {
  const target = event.target as HTMLTextAreaElement;

  if (target) {
    await navigator.clipboard.writeText(target.value);
  }
});
