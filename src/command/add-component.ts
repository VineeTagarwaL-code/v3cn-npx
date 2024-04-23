import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";
import path from "path";
import { logger } from '../utils/logger';
import { getProjectDetails, folderExists, writeToFile } from '../utils/detector';
import colors from 'colors';
const directoryname = dirname(__filename);


async function addComponent(componentName: string) {
    try {
        const { isReact, isNextJs, isNextAppSrcRouter, isNextAppRouter, isPageSrcRouter, isPageRouter } = getProjectDetails();
        const terminalPath = path.join(directoryname, `../components/${componentName}.txt`);
        const data = fs.readFileSync(terminalPath, 'utf-8');

        const currentDir = process.cwd();


        if (isReact) {
            console.log(`✅ React project detected.`);
            const uiFolderPath = path.join(currentDir, `./src/components/ui`);
            if (!folderExists(uiFolderPath)) {
                fs.mkdirSync(uiFolderPath, { recursive: true });
            }
            const filePath = path.join(currentDir, `./src/components/ui/${componentName}.tsx`);
            writeToFile(filePath, data, `${componentName}.tsx`);
            logger({ isError: false, message: `✅ Component created at ${filePath}` });
        }
        else if (isNextJs) {
            console.log(`✅ Next project detected.`);
            if (isNextAppSrcRouter) {
                const uiFolderPath = path.join(currentDir, "./src/components/ui");
                if (!folderExists(uiFolderPath)) {
                    fs.mkdirSync(uiFolderPath, { recursive: true });
                }
                const filePath = path.join(currentDir, `./src/components/ui/${componentName}.tsx`);
                writeToFile(filePath, data, `${componentName}.tsx`);
                logger({ isError: false, message: `✅ Component created at ${filePath}` });
            }


         if (isNextAppRouter) {
            const uiFolderPath = path.join(currentDir, "./components/ui")
            if (!folderExists(uiFolderPath)) {
                fs.mkdirSync(uiFolderPath, { recursive: true });
            }
            const filePath = path.join(currentDir, `./components/ui/${componentName}.tsx`);
            writeToFile(filePath, data, `${componentName}.tsx`);
            logger({ isError: false, message: `✅ Component created at ${filePath}` });
        }
        else if (isPageSrcRouter) {

            const uiFolderPath = path.join(currentDir, "./src/components/ui");
            if (!folderExists(uiFolderPath)) {
                fs.mkdirSync(uiFolderPath, { recursive: true });
            }
            const filePath = path.join(currentDir, `./src/components/ui/${componentName}.tsx`);
            writeToFile(filePath, data, `${componentName}.tsx`);
            logger({ isError: false, message: `✅ Component created at ${filePath}` });

        } else if (isPageRouter) {
            const uiFolderPath = path.join(currentDir, "./components/ui");
            if (!folderExists(uiFolderPath)) {
                fs.mkdirSync(uiFolderPath, { recursive: true });
            }
            const filePath = path.join(currentDir, `./components/ui/${componentName}.tsx`);
            writeToFile(filePath, data, `${componentName}.tsx`);
            logger({ isError: false, message: `✅ Component created at ${filePath}` });

        }
    }
        else {
            logger({ isError: true, message: 'Project structure not supported' });
        }
    }
    catch (err: any) {
        logger({ isError: true, message: err })
    }
}

export default addComponent;