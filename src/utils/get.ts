import axios from "axios";
import { ProjectType } from "../types";

type TGetComponent = {
  componentName: string;
  projectType: ProjectType;
};
/**
 * @description Get the content of the component using GitHub API
 * @param {TGetComponent} params - An object containing the component name and project type
 * @returns {Promise<string>} - The content of the component as a string
 */
async function getComponent({
  componentName,
  projectType,
}: TGetComponent): Promise<string> {
  try {
    let repoUrl: string;
    let content: string;
    switch (projectType) {
      case ProjectType.REACT:
        repoUrl = `https://raw.githubusercontent.com/VineeTagarwaL-code/v3cn-components/main/react/${componentName}.txt`;
        break;
      case ProjectType.NEXT_JS:
        repoUrl = `https://raw.githubusercontent.com/VineeTagarwaL-code/v3cn-components/main/next/${componentName}.txt`;
        break;
      default:
        throw new Error("Unsupported project type");
    }
    const response = await axios.get(repoUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (response.status === 200) {
      content = response.data;
    } else {
      throw new Error(`Error fetching component: ${response.statusText}`);
    }
    return content;
  } catch (error) {
    throw new Error(`Failed to fetch component: ${(error as Error).message}`);
  }
}
export { getComponent };
