import fs from "fs";
import path from "path";
import { Color } from "colors";
const currentDir = process.cwd();

interface ProjectDetails {
  isReact: boolean;
  isNextJs: boolean;
  isNextAppSrcRouter: boolean;
  isNextAppRouter: boolean;
  isPageSrcRouter: boolean;
  isPageRouter: boolean;
}

const getProjectDetails = (): ProjectDetails => {
  const packageJsonExists = fs.existsSync(
    path.join(currentDir, "package.json")
  );
  const reactExists =
    packageJsonExists &&
    fs.existsSync(path.join(currentDir, "node_modules", "react")) &&
    !fs.existsSync(path.join(currentDir, "node_modules", "next"));
  const nextJsExists =
    packageJsonExists &&
    fs.existsSync(path.join(currentDir, "node_modules", "next"));
  const nextAppSrcRouterExists = fs.existsSync(
    path.join(currentDir, "src", "app")
  );
  const nextAppRouterExists = fs.existsSync(path.join(currentDir, "app"));
  const pageSrcRouterExists = fs.existsSync(
    path.join(currentDir, "src", "pages")
  );
  const pageRouterExists = fs.existsSync(path.join(currentDir, "pages"));

  return {
    isReact: reactExists,
    isNextJs: nextJsExists,
    isNextAppSrcRouter: nextAppSrcRouterExists,
    isNextAppRouter: nextAppRouterExists,
    isPageSrcRouter: pageSrcRouterExists,
    isPageRouter: pageRouterExists,
  };
};

const folderExists = (uiFolderPath: string): boolean => {
  return fs.existsSync(uiFolderPath);
};

const writeToFile = (
  filePath: string,
  data: string,
  fileName: string
): void => {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("🚨 Error writing file:");
    } else {
      console.log(`✔ Created the component`);
    }
  });
};

export { getProjectDetails, folderExists, writeToFile };
