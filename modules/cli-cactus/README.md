# `@repay/create-app-cli`

This cli is used to create a basic react app with Typescript or Javascript. It uses the @repay/scripts tool for building and running the app and @repay/eslint-config to help you format your code.

## Usage

To use the our CLI, simply run the create-app `app-name` and follow instructions. After the process is done, you can find your app inside the `app-name` folder.
Use yarn start and yarn build inside the root folder to watch your app in development mode or build it.

The CLI will prompt you to chose between Javscript or Typescript. And will also ask you wheater you'd like to initialize a git repository or not.

## CLI Commands

```

create-app <command>

Commands: 
 create-app <app-name>   Creates an app inside <app-name> folder
 
Options: 
    --git, -g      initialize git repository            [boolean] [default: false]
```