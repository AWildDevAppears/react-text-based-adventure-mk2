# React Text Based Adventure

The React Text Based Adventure is an MVP built project, it is built in with upgrades in mind.
It utilises Contentful as a back end, where it stores all of the in game scenes, items, etc.

## Building the project

For any information on building, running or testing the project please refer to the [react docs](./README-React.md)

## Set up

In order to build this project, you will need to connect it to Contentful, you can do this by taking a copy of
[this config file](./src/config.example.js) and duplicating it into a new config.js file. Once you have this file,
please update all of the config variables to match your setup.


## WebAssembly

This project is set up with WebAssembly that is written in Rust.
In order to compile the wasm you will need [Rust](https://www.rust-lang.org/en-US/) installed.

Once you have Rust installed you will need to install a few modules:

```
cargo install wasm-pack
cargo install cargo-generate
```

Now you have these modules, cd into the `wasm` directory and run `wasm-pack init` to compile the wasm file


