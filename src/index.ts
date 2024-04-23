#!/usr/bin/env node

import { Command } from "commander";
import add from "./command/add";
async function main(){
    const program = new Command()
    .name('v3cn')
    .description("Components like nowhere else ")
    program.addCommand(add);
    program.parse();
}

main()