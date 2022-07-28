const STARTUP_TEXT = `Welcome to Fake Terminal!
 
`;

const PROMPT_TEXT = "Enter Command -> $ ";

// general TODOs: 
// tab autocomplete? If i'm feeling wild

const FILE_SYSTEM = {
    data: null,
    contents: {
        "Desktop": {
            data: null,
            contents: {
                "journal.txt": { contents: null, data: "May 19, 2020\nStarting a new show today called \"Queen's Gambit\". I hope it's good!\n\nMay 20, 2020\nJust finished \"Queen's Gambit\"! It was great." },
                "passwords.txt": { contents: null, data: "linkedin: hiremepls\ninstagram: password12345\ngmail: p@ssw0rd54321" }, // RESUME HERE, reformatting data
                "Chris.txt": { contents: null, data: "Hi, my name is Chris! I like making websites a whole bunch. I also like rock climbing. Please hire me!" },
                "photos": {
                    data: null,
                    contents: {
                        "sweden1.jpg": { contents: null, data: "Error: Cannot print images to the terminal!" },
                        "sweden2.jpg": { contents: null, data: "Error: Cannot print images to the terminal!" },
                        "baby_pics": {
                            data: null,
                            contents: {
                                "baby1.jpg": { contents: null, data: "Error: Cannot print images to the terminal!" },
                                "baby2.jpg": { contents: null, data: "Error: Cannot print images to the terminal!" }
                            }
                        }
                    }
                }
            }
        }
    }
}

class Terminal {
    constructor(domID) {
        this.validate(domID);
        this.wrapper = document.getElementById(domID);
        // assign top margin to wrapper
        window.setTimeout(() => {
            this.wrapper.style.marginTop = this.getTopMargin() + "px";
        }, 1000);

        this.startupText = STARTUP_TEXT;
        this.promptText = PROMPT_TEXT;
        this.currentCommand = "";
        this.mode = "UNIX";

        this.files = FILE_SYSTEM;
        this.rootDirectory = Object.getOwnPropertyNames(this.files["contents"])[0]; // grab the one root file
        this.currentFilePath = this.rootDirectory;

        const elements = this.getDOM();
        
        this.domWrapper = elements[0];
        this.wrapper.appendChild(this.domWrapper);
        this.inputText = elements[1];
        this.focused = false;
        this.history = [];
        this.historyText = [];
        this.historyIndex = 0;

        // set event listeners
        this.wrapper.addEventListener("click", (e) => this.handleClick(e));
        window.addEventListener("click", (e) => this.handleOtherClick(e));
        window.addEventListener("keydown", (e) => this.handleKey(e));
    }

    getTopMargin() {
        const anchor = document.getElementById("interactive-content-anchor");
        if (!anchor) {
            return 0;
        }

        // get top position of anchor
        const topOffset = anchor.offsetTop;

        return topOffset;

    }

    validate(domID) {
        if (!document.getElementById(domID)) {
            throw new Error("Invalid DOM ID provided");
        }
    }

    getDOM() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("chris-term");
        
        const terminalHeader = document.createElement("div");
        terminalHeader.classList.add("terminal-header");

        terminalHeader.appendChild(wrapper);

        this.wrapper.append(terminalHeader);

        this.addStartText(wrapper);
        const inputText = this.addPrompt(wrapper);

        return [wrapper, inputText];
    }

    addStartText(wrapper) {
        const tokens = this.startupText.split('\n');
        for (let i = 0; i < tokens.length; i++) {
            const p = document.createElement("p");
            p.innerHTML = tokens[i].replaceAll(" ", "&nbsp;");
            p.classList.add("startup")
            wrapper.appendChild(p);
        }
    }

    addPrompt(wrapper) {
        const br = document.createElement("br");
        wrapper.appendChild(br);

        const prompt = document.createElement("p");
        const promptString = `~/${this.currentFilePath} $ `;
        prompt.innerHTML = promptString.replaceAll(" ", "&nbsp;");
        prompt.classList.add("prompt");
        wrapper.appendChild(prompt);

        const inputText = document.createElement("p");
        inputText.classList.add("input");
        wrapper.appendChild(inputText);

        return inputText;
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.focused = true;
    }

    handleOtherClick(e) {
        this.focused = false;
    }

    handleKey(e) {
        if (!this.focused || e.isComposing || e.keyCode === 229) {
            return;
        }

        switch (e.key) {
            case "Tab":
            case "Meta":
            case "CapsLock":
            case "Shift":
            case "Control":
            case "Alt":
            case "Delete":
                break;
            case "Backspace":
                // delete previous character
                e.preventDefault();
                this.currentCommand = this.currentCommand.substring(0, this.currentCommand.length - 1)
                this.inputText.innerHTML = this.getCommandHTML(this.currentCommand);
                break;
            case "ArrowLeft":
                // shift cursor left
                break;
            case "ArrowRight":
                // shift cursor right
                break;
            case "Enter":
                const temp = this.currentCommand;
                // submit current command
                this.history.push(this.inputText.innerHTML);
                this.historyText.push(temp);
                this.historyIndex = this.history.length;
                this.currentCommand = "";
                // process command
                if (this.mode === "UNIX") {
                    this.processUnixCommand(temp);
                } else if (this.mode === "Windows") {
                    this.processWindowsCommand(temp);
                }
                // add new prompt
                this.inputText = this.addPrompt(this.domWrapper);
                // after adding prompt, scroll to bottom of window
                this.domWrapper.scrollTop = this.domWrapper.scrollHeight - this.domWrapper.clientHeight;
                break;
            case "ArrowUp":
                e.preventDefault();
                // go one command backwards in history
                this.historyIndex = Math.max(this.historyIndex - 1, 0);
                this.inputText.innerHTML = this.history[this.historyIndex];
                this.currentCommand = this.historyText[this.historyIndex];
                break;
            case "ArrowDown":
                e.preventDefault();
                if (this.historyIndex === this.history.length) {
                    return;
                }
                // go one command forwards in history
                this.historyIndex = Math.min(this.historyIndex + 1, this.history.length - 1);
                this.inputText.innerHTML = this.history[this.historyIndex];
                this.currentCommand = this.historyText[this.historyIndex];
                break;
            default:
                e.preventDefault();
                // alphanumeric keypress or symbol
                this.currentCommand += e.key
                this.inputText.innerHTML = this.getCommandHTML(this.currentCommand);
        }
    }

    addOutput(outputString) {
        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        this.domWrapper.appendChild(br1);
        this.domWrapper.appendChild(br2);

        const outputWrapper = document.createElement("div");
        outputWrapper.classList.add("output-wrapper");
        outputWrapper.innerHTML = outputString;

        this.domWrapper.appendChild(outputWrapper);
    }

    getCommandHTML(command) {
        let result = [];
        const tokens = command.split(" ");
        for (let i = 0; i < tokens.length; i++) {
            if (i === 0) {
                // special highlight span
                result.push(`<span class="highlight">${tokens[i]}</span>`);
            } else {
                result.push(`<span>${tokens[i]}</span>`);
            }
        }
        return result.join("&nbsp;");
    }

    getCommandArgs(command) {
        let result = command.split(" ");
        // must check for quotation marks
        let condensedArgs = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i].startsWith("\"")) {
                // build a new string until we find the ending quotation mark
                let newToken = result[i].substring(1);
                for (let j = i + 1; j < result.length; j++) {
                    if (result[j].endsWith("\"")) {
                        newToken += " " + result[j].substring(0, result[j].length - 1);
                        break;
                    } else {
                        newToken += " " + result[j];
                    }
                }
                condensedArgs.push(newToken);
            } else {
                if (result[i].endsWith("/")) {
                    result[i] = result[i].substring(0, result[i].length - 1);
                }

                condensedArgs.push(result[i])
            }
        }
        return condensedArgs;
    }

    processWindowsCommand(command) {
        console.log("processing windows command string: " + command);
        switch (command) {
            // todo: history, clear, pwd, ls, cd, help, cat, mkdir, mv, rm, cp
            default:     
        }
    }

    processUnixCommand(command) {
        console.log("processing unix command string: " + command);
        const args = this.getCommandArgs(command.trim())
        const keyword = args.shift().toLowerCase();
        console.log("args:", args);
        switch (keyword) {
            case "man":
                // print help commands
                this.printUnixHelp(args);
                break;
            case "history":
                // print history
                this.printHistory();
                break;
            case "clear":
                // clear screen
                this.clearScreen();
                break;
            case "pwd":
                // print working directory
                this.printWorkingDirectory();
                break;
            case "ls":
                // list current directory
                this.listDirectory(args);
                break;
            case "cd":
                // change directory
                this.changeDirectory(args);
                break;
            case "cat":
                // print contents of a file
                if (args.length < 1) {
                    this.addOutput("Error: cat requires a parameter");
                    return;
                }
                this.printFileData(args);
                break;
            case "mkdir":
                // create new directory
                if (args.length < 1) {
                    this.addOutput("Error: mkdir requires a parameter");
                    return;
                }
                this.createNewDirectory(args);
                break;
            case "mv":
                // move file/directory
                if (args.length < 2) {
                    this.addOutput("Error: mv requires two parameters");
                    return;
                }
                this.moveFileDirectory(args);
                break;
            case "rm":
                if (args.length < 1) {
                    this.addOutput("Error: rm requires a parameter");
                    return;
                }
                this.removeFileDirectory(args);
                break;
            case "cp":
                // copy file/directory
                if (args.length < 2) {
                    this.addOutput("Error: cp requires two parameters");
                    return;
                }
                this.copyFileDirectory(args);
                break;
            default:
                this.unknownCommand(command);
        }
    }

    unknownCommand(command) {
        const mysteryCommand = command.split(" ")[0];
        const errorMessage = `Unknown ${this.mode} command: ${mysteryCommand}`;
        this.addOutput(errorMessage);
    }

    printHistory() {
        let result = "";
        for (let i = 0; i < this.history.length; i++) {
            result += `<p>${i + 1}: ${this.history[i]}</p>`;
        }
        this.addOutput(result);
    }

    clearScreen() {
        this.domWrapper.innerHTML = "";
        this.addStartText(this.domWrapper);
    }

    printWorkingDirectory() {
        const result = `<p>/${this.currentFilePath}</p>`;
        this.addOutput(result);
    }

    listDirectory(args=[]) {
        let result = "";
        // if args, use that filepath, else, use current filepath
        const requestPath = args.length > 0 ? this.currentFilePath + "/" + args.join("/") : this.currentFilePath;
        // get the current directory object
        const requestedDirectory = this.getFiles(requestPath);
        // check to see if error was returned
        if (typeof requestedDirectory === "string") {
            this.addOutput(requestedDirectory);
            return;
        }

        if (!requestedDirectory || !requestedDirectory["contents"]) {
            this.addOutput(`Error: ${requestPath} is not a directory`)
            return;
        }


        // get content of the requested directory
        const contents = Object.getOwnPropertyNames(requestedDirectory["contents"]);
        // sort contents alphabetically
        contents.sort();

        // build result, with different colors for folders and directories
        for (let i = 0; i < contents.length; i++) {

            if (requestedDirectory["contents"][contents[i]]["data"] === null) {
                result += `<p class="directory">${contents[i]}/</p>`;
            } else {
                result += `<p class="file">${contents[i]}</p>`;
            }
        }

        this.addOutput(result);
    }

    getFiles(filePath) {
        const tokens = filePath.split('/');
        let dir = this.files;
        const dirStack = [];

        // keep iterating til we get to the end files
        // TODO: reject invalid paths
        for (let i = 0; i < tokens.length; i++) {
            // RESUME: fix this
            // if the current token is ".."
            if (tokens[i] === "..") {
                // go backwards
                // check to see if we can pop, or if we should just go back to root directory
                if (dirStack.length <= 2) {
                    dir = this.files["contents"][this.rootDirectory];
                } else {
                    // pop current directory (maybe works?)
                    dirStack.pop();
                    dir = dirStack.pop();
                }
            } else if (!dir["contents"]) {
                // if the path leads to a file
                return `Error: ${filePath} is not a directory`
            } else if (!dir["contents"].hasOwnProperty(tokens[i])) {
                return "No such file or directory: " + filePath;
            } else {
                dir = dir["contents"][tokens[i]];
                dirStack.push(dir);
            }
        }
        return dir;
    }

    changeDirectory(args=[]) {
        if (args.length == 0) {
            this.currentFilePath = this.rootDirectory; // grab the one root file
            return;
        }

        // we make sure that the file path given is valid
        const potentialPath = this.currentFilePath + "/" + args[0];
        const filesAtDest = this.getFiles(potentialPath);
        if (typeof filesAtDest === "string") {
            // if the getfiles method returns an error string, we output it and do not change directory
            this.addOutput(filesAtDest);
            return;
        } else if(filesAtDest["data"] !== null) {
            // we cannot cd into a file
            this.addOutput(`Error: ${potentialPath} is not a directory`);
            return;
        }
        // we have to change directory to the next filepath
        this.currentFilePath = this.getNewFilePath(potentialPath);
    }

    // this method parses the file path and handles all .. tokens 
    getNewFilePath(potentialPath) {
        const tokens = potentialPath.split("/");
        let result = [];
        
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "..") {
                if (result.length < 2) {
                    result = [];
                } else {
                    result.pop();
                }
            } else {
                result.push(tokens[i]);
            }
        }
        if (result.length === 0) {
            return this.rootDirectory;
        }

        return result.join("/");
    }

    printUnixHelp(args) {
        // prints out all of the available commands, with help descriptions
        let result = "";
        const commands = {
            "man": {
                "short": "Prints out list of commands with instructions",
                "long": "Prints out list of commands with instructions\n      Usage: man [ command ]"
            },
            "history": {
                "short": "Shows all previous commands",
                "long": "Shows all previous commands\n         Usage: history (no arguments)"
            },
            "clear": {
                "short": "Clears the terminal screen",
                "long": "Clears the terminal screen\n       Usage: clear (no arguments)"
            },
            "pwd": {
                "short": "Prints the current working directory",
                "long": "Prints the current working directory\n     Usage: pwd (no arguments)"
            },
            "ls": {
                "short": "Lists the contents of the specified directory",
                "long": "Lists the contents of the specified directory\n    Usage: ls [ file_path ]"
            },
            "cd": {
                "short": "Changes working directory to specified location",
                "long": "Changes working directory to specified location\n    Usage: cd [ file_path ]"
            },
            "cat": {
                "short": "Prints the contents of a specified file",
                "long": "Prints the contents of a specified file\n     Usage: cat &lt;file_name&gt;"
            },
            "mkdir": {
                "short": "Creates a new directory at specified location",
                "long": "Creates a new directory at specified location\n       Usage: mkdir &lt;new_directory_name&gt;"
            },
            "mv": {
                "short": "Moves a file or directory to a new location",
                "long": "Moves a file or directory to a new location\n    Usage: mv &lt;source_file&gt; &lt;destination_location&gt;"
            },
            "cp": {
                "short": "Copies a file or directory to a new location",
                "long": "Copies a file or directory to a new location\n    Usage: cp &lt;source_file&gt; &lt;destination_location&gt;"
            },
            "rm": {
                "short": "Deletes the specified file or directory",
                "long": "Deletes the specified file or directory\n    Usage: rm [-rf] &lt;file_to_remove&gt;"
            }
        }

        if (args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                if (commands[args[i]]) {
                    result += `<p><span class="help">${args[i]}</span>: ${commands[args[i]]["long"]}</p>`;
                } else {
                    result = "Invalid command: " + args[i];
                    return result;
                }
            }
        } else {
            Object.getOwnPropertyNames(commands).forEach((command) => {
                result += `<p><span class="help">${command}</span>: ${commands[command]["short"]}</p>`;
            });
        }

        this.addOutput(result);
    }

    printFileData(args) {
        const filePath = this.currentFilePath + "/" + args[0];
        const file = this.getFiles(filePath);

        // return error for nonexistent file
        if (typeof file === "string") {
            this.addOutput(file);
            return;
        }

        // make sure we return error for directory
        if (file["data"] === null) {
            this.addOutput(`Error: ${filePath} is a directory`);
            return;
        }

        this.addOutput(file["data"]);
    }

    createNewDirectory(args) {
        const filePath = this.currentFilePath + "/" + args[0];
        const file = this.getFiles(filePath);

        // if file already exists, terminate
        if (typeof file !== "string" && file["contents"] !== null) {
            this.addOutput("Error: Directory " + filePath + " already exists");
            return;
        }
        
        // if here, there is no existing directory at the location
        // get parent file
        const pathTokens = filePath.split("/");
        const newDirectoryName = pathTokens.pop();
        const parentDirectory = pathTokens.join("/");
        const parent = this.getFiles(parentDirectory);

        parent["contents"][newDirectoryName] = {data: null, contents: {}}
    }

    moveFileDirectory(args) {
        if (args[0] === args[1]) {
            // no-op
            return;
        }
        const sourceFilePath = this.currentFilePath + "/" + args[0];
        const sourceFile = this.getFiles(sourceFilePath);

        const destFilePath = this.currentFilePath + "/" + args[1];
        const destFile = this.getFiles(destFilePath);

        // check whether file to be moved exists
        if (typeof sourceFile === "string") {
            this.addOutput("No such file or directory: " + sourceFilePath);
            return;
        }

        // if we make it here, we can safely delete the original file
        const sourceData = sourceFile["data"];
        const sourceContents = sourceFile["contents"];
        this.removeFileDirectory(["-rf", args[0]]);

        // Many CASES for destination: they either give us a directory to move it into, or they give us a directory PLUS a new file name
        // Case 1: Destination doesn't exist, but destination parent exists -> we create new file in destination parent with new name
        // Case 2: Destination doesn't exist, and neither does dest. parent -> they gave us a bad file path
        // Case 3: Destination exists, and is a file -> we overwrite that file
        // Case 4: Destination exists, and is a directory -> we create new file in destination with SAME name
        if (typeof destFile === "string") {
            // the destination doesn't exist, so we see if the parent of the destination exists
            const tokens = destFilePath.split("/");
            const destFileName = tokens.pop();
            const destParentFilePath = tokens.join("/");
            const destParent = this.getFiles(destParentFilePath);
            if (typeof destParent === "string") {
                // destination does not exist
                this.addOutput("No such file or directory: " + destFilePath);
                return;
            } else {
                // destination is a directory, with a new file name
                destParent["contents"][destFileName] = { data: sourceData, contents: sourceContents };
                return;
            }
        } 

        // if we're here, then the destination exists. we need to test whether it's a file or not
        const destPathTokens = sourceFilePath.split("/");
        const destFileName = destPathTokens.pop();
        if (destFile["data"] === null) {
            // dest is directory
            destFile["contents"][destFileName] = {data: sourceData, contents: sourceContents};
        } else {
            // dest is file
            destFile["data"] = sourceData;
            destFile["contents"] = sourceContents;
        }

        return 1;
    }

    removeFileDirectory(args) {
        // check for flags
        let flags = null;
        if (args[0].startsWith("-")) {
            // we have flags
            flags = args.shift();
            console.log("flags! " + flags)
        }

        // check if the file to be deleted exists
        const filePath = this.currentFilePath + "/" + args[0];
        const file = this.getFiles(filePath);

        const pathTokens = filePath.split("/");
        const deletedFileName = pathTokens.pop();
        const deletedFileParentPath = pathTokens.join("/");
        const deletedFileParent = this.getFiles(deletedFileParentPath);


        if (typeof file === "string") {
            this.addOutput("No such file or directory: " + filePath);
            return;
        }

        // check if the file to be deleted is directory
        if (file["data"] === null) {
            console.log("deleting directory")
            if (flags && (flags.includes("r") || flags.includes("R")) && (flags.includes("r") || flags.includes("R"))) {
                // delete the directory
                delete deletedFileParent["contents"][deletedFileName];
            } else {
                this.addOutput(`Error: ${deletedFileName} is a directory. Add -rf flags`);
                return;
            }
        } else {
            delete deletedFileParent["contents"][deletedFileName];
        }
    }

    copyFileDirectory(args) {
        if (args[0] === args[1]) {
            // source and dest are the same, no-op
            this.addOutput(`${args[0]} and ${args[1]} are identical (not copied)`);
            return;
        }

        const moveResult = this.moveFileDirectory(args);
        if (moveResult !== 1) {
            // move failed
            return;
        }

        // now that move has finished, we need to replace the file that was previously at this location
        const filePath = this.currentFilePath + "/" + args[0];
        const file = this.getFiles(filePath);
        const filePathTokens = filePath.split("/");
        const fileName = filePathTokens.pop();
        const fileParentName = filePathTokens.join("/");

        this.getFiles(fileParentName)["contents"][fileName] = file;

    }
}

const term = new Terminal("terminal-wrapper");