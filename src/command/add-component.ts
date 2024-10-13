import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import { logger } from "../utils/logger";
import {
  getProjectDetails,
  folderExists,
  writeToFile,
} from "../utils/detector";

import { getComponent } from "../utils/get";
import { ProjectType } from "../types";
const directoryname = dirname(__filename);

// Helper function to create the UI folder and write the component
const createComponent = (
  basePath: string,
  componentName: string,
  data: string
) => {
  const uiFolderPath = path.join(basePath, "components/ui");

  if (!folderExists(uiFolderPath)) {
    fs.mkdirSync(uiFolderPath, { recursive: true });
  }

  const filePath = path.join(uiFolderPath, `${componentName}.tsx`);
  writeToFile(filePath, data, `${componentName}.tsx`);
  logger({ isError: false, message: `✅ Component created at ${filePath}` });
};

// Main function to handle the logic based on project type
async function addComponent(componentName: string) {
  try {
    const {
      isReact,
      isNextJs,
      isNextAppSrcRouter,
      isNextAppRouter,
      isPageSrcRouter,
      isPageRouter,
    } = getProjectDetails();
    const terminalPath = path.join(
      directoryname,
      `../components/${componentName}.txt`
    );
    const currentDir = process.cwd();

    // React project handling
    if (isReact) {
      let data = await getComponent({
        componentName,
        projectType: ProjectType.NEXT_JS,
      });
      console.log(`✅ React project detected.`);
      createComponent(path.join(currentDir, "src"), componentName, data);
    }
    // Next.js project handling
    else if (isNextJs) {
      console.log(`✅ Next.js project detected.`);

      if (isNextAppSrcRouter || isPageSrcRouter) {
        let data = await getComponent({
          componentName,
          projectType: ProjectType.NEXT_JS,
        });
        createComponent(path.join(currentDir, "src"), componentName, data);
      } else if (isNextAppRouter || isPageRouter) {
        let data = await getComponent({
          componentName,
          projectType: ProjectType.NEXT_JS,
        });
        createComponent(currentDir, componentName, data);
      }
    } else {
      logger({ isError: true, message: "❌ Project structure not supported" });
    }
  } catch (err: any) {
    logger({ isError: true, message: err.message || err });
  }
}

export default addComponent;
