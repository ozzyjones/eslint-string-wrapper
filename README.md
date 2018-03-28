# ESLint Max-Line String Wrapper

## Features

This extension takes a long string and wraps it on multiple lines to conform with ESLint standards.
Each line of the new string will have **120** characters.

## Creating an Extension

1. Create a new folder for an extension (e.g. folder name "myext") and navigate into that folder from the command line
2. Run the command `yo code` to begin creating your own extension
    - The user can also initialize a git repository with this tool
    - Note: you may have to use the command `npm install -g yo generator-code` to install the proper packages
    - Follow the prompts to complete the process
3. Open VSCode and select the "myext" from the "Open Folder" menu
4. Edit the files _src/extension.js_, _package.json_ to your liking with the new extension code

Find useful information on [this site](https://code.visualstudio.com/docs/extensions/overview) when in comes to creating new extensions

## How to Install (On My System)

Copy all of the contents from your GIT repository to a place VSCode can access your extension, the **.vscode/extensions** folder.

> Note: In Windows, the default location for this folder is in the folder: `C:\Users\[User Name]`
>
> Example: `C:\Users\[User Name]\.vscode\extensions`

Find more information [here](https://code.visualstudio.com/docs/extensions/yocode#_your-extensions-folder)

Learn more about the VSCode Extension API [here](https://code.visualstudio.com/docs/extensionAPI/vscode-api)

## Running (How to Run Extension)

Run this particular extension like this:

1. Open up a javascript file with a very long string
2. Using your cursor and/or mouse, select the entire string
3. Run `CTRL+SHIFT+P` and select the command `ESLint: Wrap String` to wrap the string
(At the current moment, the former string is not deleted but the new _wrapped_ string is simply place below the existing one.)

### Development ###

Linting:

`grunt lint [--fix]`

Testing:

`npm test`
