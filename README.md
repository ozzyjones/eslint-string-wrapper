# ESLint Max-Line String Wrapper

## Features

This extension takes a long string and wraps it on multiple lines to conform with ESLint standards.
Each line of the new string will have **120** characters.

## Creating an Extension

1. Create a new folder for an extesion in `C:\git\VSCodeExtensions` (e.g. folder name "myext")
2. Navigate to "myext" from the command line
3. Run the command `yo code` to begin creating your own extension
    - Note: you may have to use the command `npm install -g yo generator-code` to install the proper packages
    - Follow the prompts to complete the process
4. Open VSCode and select the "myext" from the "Open Folder" menu
5. Edit the files _src/extension.js_, _package.json_ to your liking with the new extension code

Find useful information on [this site](https://code.visualstudio.com/docs/extensions/overview) when in comes to creating new extensions

## How to Install (On My System)

Copy all of the contents from your GIT repository to a place VSCode can access your extension.

`cp -rv /mnt/c/git/VSCodeExtensions/ESLint/myext /mnt/c/Users/Brian\ Jones/.vscode/extensions`

Find more information [here](https://code.visualstudio.com/docs/extensions/yocode#_your-extensions-folder)

## Running (How to Run Extension)

Run this particular extension like this:

1. Open up a javascript file with a very long string
2. Using your cursor and/or mouse, select the entire string
3. Run `CTRL+SHIFT+P` and select the command `ESLint: Wrap String` to wrap the string
(At the current moment, the former string is not deleted but the new _wrapped_ string is simply place below the existing one.)
