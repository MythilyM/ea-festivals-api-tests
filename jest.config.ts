import type {Config} from "jest";

const config: Config = {
    roots: ["<rootDir>/tests"],
    moduleFileExtensions: ["ts", "js"],
    testMatch: ["**/*.spec.ts"],
    preset: "ts-jest",
};

export default config;