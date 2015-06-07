require('es6-shim');
var gulp = require('gulp');
var Builder = require('systemjs-builder');
var Package = require('./package.json');
var Typescript = require('./jspm_packages/github/mhegazy/typescript@v1.5-beta2/')
var gulpTs = require('gulp-typescript');
 
gulp.task('default', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        out: 'output.js'
      }));
  return tsResult.js.pipe(gulp.dest('built/local'));
});

var baseConfig = {
    path: 'app/main',
    outputFile: 'build/main.js',
    config: {
      transpiler: 'babel',
      paths: {
      'app/*': 'build/*'
    }}
  };


function getBuilder(config){
  return Promise.resolve(new Builder(config));
}

function configureBuilder(options){
  return function applyConfig(builder){
    builder.config(options);
    return builder;
  }
}

function loadConfigFile(filename){
  return function withBuilder(builder){
    return builder.loadConfig(filename)
      .then(function(){ return builder; });
  }
}

function build(buildTask){
  return getBuilder()
    .then(loadConfigFile(Package.jspm.configFile))
    .then(configureBuilder(buildTask.config))
    .then(function(builder){
      return builder.build(buildTask.path, buildTask.outputFile, buildTask.outputOptions);
    });
}

function mergeConfig(config){
  var c = Object.assign(Object.create(null), baseConfig, config);;
  return c;
}

gulp.task('compile:app',function(){
  return gulp.src(['app/**/*.ts'])
    .pipe(gulpTs({
      typescript: Typescript,
      target: 'es6',
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      noEmitHelpers: true,
      minify: true
    }))
    .js.pipe(gulp.dest('build'));
});

gulp.task('build:all:dev',['compile:app'], function(){
  return build(baseConfig);
});

gulp.task('build:all:min',['compile:app'], function(){
  return build(
    mergeConfig({
      outputOptions:{ 
        minify: true,
        mangle: true
    }}));
});

gulp.task('build:lib',['compile:app'], function(){
  return build(
    mergeConfig({
      path: 'app/**/* - [app/**/*]',
      outputFile: 'build/lib.js',
      outputOptions:{ 
        minify: true,
        mangle: true
    }}));
});

gulp.task('build:app',['compile:app'], function(){
  return build(
    mergeConfig({
      outputFile: 'build/app.js',
      path: 'app/main - app/lib'
    }));
});

gulp.task('build',['build:app']);
gulp.task('lib',['build:lib']);


