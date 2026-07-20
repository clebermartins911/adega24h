import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: ["**/*_backup.js", "**/backup_codigo/**"],
    },

    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: {
            js,
        },

        extends: ["js/recommended"],

        languageOptions: {
            globals: globals.node,
            ecmaVersion: "latest",
            sourceType: "module",
        },

        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "no-unreachable": "error",
            "no-extra-semi": "warn",
        },
    },
]);
