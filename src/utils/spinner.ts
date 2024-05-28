import { createSpinner } from "nanospinner";

async function spinner(text: string) {
  const spinner = createSpinner(text);
  spinner.start();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  spinner.success();
}

export default spinner;
