# `@repay/create-ui`

This cli is used to create a basic react app with Typescript or Javascript. It uses the `@repay/scripts` tool for building and running the app and `@repay/eslint-config` to help you format your code.

## Usage

To use the our CLI, simply run the `create-repay-ui app-name` and follow instructions. After the process is done, you can find your app inside the `app-name` folder.
Use yarn start and yarn build inside the root folder to watch your app in development mode or build it.

The CLI will prompt you to chose between Javscript or Typescript. And will also ask you wheater you'd like to initialize a git repository or not.

In some cases, due to permissions on the user's computer, you might have to use `sudo`

## CLI Commands

```

create-repay-ui <command>

Commands:
 create-repay-ui <app-name>   Creates an app inside <app-name> folder

Options:
    --git, -g      Initialize git repository            [boolean] [default: false]
    --javascript   Use Javascript template              [boolean] [default: false]
    --typescript   Use Typescript template              [boolean] [default: false]
```
