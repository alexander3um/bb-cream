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

const resetError = () => {
  from.classList.remove("error");
  to.value = "";
};

const handleError = (error: unknown) => {
  from.classList.add("error");
  console.error(error);
  to.value = error as string;
};

const handleNonBlockingError = (message: string) => {
  from.classList.add("error");
  console.error(message);
};

const changeHandler = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;

  if (target) {
    resetError();

    try {
      to.value = process(target.value, handleNonBlockingError);
    } catch (error: unknown) {
      handleError(error);
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
