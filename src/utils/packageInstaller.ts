import { exec } from "child_process";

const packageInstaller = (command: string) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error", error.message);
    }

    if (stderr) {
      console.error("Error", stderr);
    }

    console.log("Installed Successfully", stdout);
  });
};

export default packageInstaller;
