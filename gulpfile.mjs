import gulp from "gulp";
import { rimraf as rm } from "rimraf";
import jeditor from "gulp-json-editor";
import { execaCommandSync } from "execa";
import ts from "gulp-typescript";
import merge from "gulp-merge-json";
import yaml from "gulp-yaml";
import concat from "gulp-concat";
import babel from "gulp-babel";
import uglify from "gulp-uglify";

const inputs = ["src/**/*.js"];
const outputs = "dist/";

const merge_options = {
  fileName: "config_default.js",
  exportModule: "module.exports",
  jsonSpace: "  ",
};

const { src, dest, series, parallel } = gulp;

const version = execaCommandSync("git describe --tags", {
  shell: true,
  all: true,
}).stdout;

//yaml转js
const configjs = () => {
  return src("src/config/**/*.yml")
    .pipe(yaml({ schema: "DEFAULT_SAFE_SCHEMA" }))
    .pipe(src("src/config/**/*.json"))
    .pipe(merge(merge_options))
    .pipe(dest("src/config/"));
};

const tsc = () => {
  const ts0 = src("src/lib/**/*.ts")
    .pipe(ts.createProject("tsconfig.json")())
    .js.pipe(concat("mmedia.js"))
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(outputs + "lib"));

  const ts1 = src("src/mmedia-loader.ts")
    .pipe(ts.createProject({ target: "es5", module: "es2015" })())
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(outputs));

  return Promise.all([ts0, ts1]);
};

function js() {
  return src(inputs).pipe(babel()).pipe(uglify()).pipe(dest(outputs));
}

// 清理输出目录
const clean = () => rm(outputs);

//拷贝其他文件
const cpPackageJson = () => {
  return src("package.json")
    .pipe(
      jeditor({
        version: version,
      })
    )
    .pipe(src("README.md"))
    .pipe(src("LICENSE"))
    .pipe(dest(outputs));
};

export const build = series(clean, configjs, parallel(tsc, js), cpPackageJson);
