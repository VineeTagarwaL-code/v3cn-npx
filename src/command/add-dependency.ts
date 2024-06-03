import { Command } from "commander";
import spinner from "../utils/spinner";
import packageInstaller from "../utils/packageInstaller";

const program = new Command();

export const addDependency = async (componentName: string) => {
  program.action(async () => {
    await spinner("Installing Necessary Dependencies");
    if (componentName === "card") {
      console.log("Installed Sucessfully");
      return;
    }

    if (componentName === "cursor") {
      packageInstaller("npm install framer-motion");
      return;
    }

    if (componentName === "discord") {
      packageInstaller("npm install @radix-ui/react-progress");
      return;
    }

    if (componentName === "terminal") {
      packageInstaller("npm install framer-motion lucide-react");
      return;
    }

    if(componentName === "typing") {
      packageInstaller("npm install react-intersection-observer")
    }
  });

  program.parse(process.argv);
};
