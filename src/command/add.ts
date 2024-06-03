import { Command } from "commander";
import spinner from "../utils/spinner";

const add = new Command("add");
import addComponent from "./add-component";
add
  .description("Add a new component")
  .argument("[component...]", "the components to add")
  .action(async (components: string[]) => {
    await spinner("Detecting Project Type......");
    if (components.includes("terminal")) {
      addComponent("terminal");
    } else if (components.includes("3d-card")) {
      addComponent("card");
    } else if (components.includes("discord")) {
      addComponent("discord");
    } else if (components.includes("cursor")) {
      addComponent("cursor");
    } else if (components.includes("typing")) {
      addComponent("typing");
    } else {
      console.log("Component not found");
    }
  });

export default add;
