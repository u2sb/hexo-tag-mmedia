const { src, dest, series, parallel } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const yaml = require("gulp-yaml");
const merge = require("gulp-merge-json");
const ts = require("gulp-typescript");
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const tsProject = ts.createProject("tsconfig.json");
const del = require("delete");
const execa = require("execa");
const version = execa.sync("git describe --tags").stdout;

const inputs = ["src/**/*.js"];
const outputs = "dist/";

const merge_options = {
  fileName: "config_default.js",
  exportModule: "module.exports",
  jsonSpace: "  ",
};

//JSON转JS
function configjs() {
  return src("src/config/**/*.yml")
    .pipe(yaml({ schema: "DEFAULT_SAFE_SCHEMA" }))
    .pipe(src("src/config/**/*.json"))
    .pipe(merge(merge_options))
    .pipe(dest("src/config/"));
}

function clean(cb) {
  del(outputs, cb);
}

function copy(cb) {
  return src("package.json", cb)
    .pipe(replace("hexo-mmedia-tag-version", version))
    .pipe(src("README.md", cb))
    .pipe(src("LICENSE", cb))
    .pipe(dest(outputs));
}

function javascript() {
  return src(inputs).pipe(babel()).pipe(uglify()).pipe(dest(outputs));
}

function typescript() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(concat("mmedia.js"))
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(outputs + "lib"));
}

exports.build = series(clean, configjs, parallel(typescript, javascript), copy);
