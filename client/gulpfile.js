'use strict'

var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    maps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    livereload = require('livereload');

var buildDir='../public',
    libOrderJs=['redux.js','react.js','react-dom.js','react-redux.js','redux-thunk.js','react-router.js','react-router-redux.js',
    'promise.min.js','object-assign.min.js','socket.io.min.js','fetch.js','utils.js'
    ];
gulp.task('start',()=>{
    console.log('start gulp')
})

gulp.task('index_html',()=>{
    return gulp.src('./index.html')
            .pipe(gulp.dest(buildDir))
})

gulp.task('lib_concat_dev',()=>{
    return gulp.src('./lib/*.js')
            .pipe(order(libOrderJs))
            .pipe(concat('lib.js'))
            .pipe(gulp.dest(buildDir+'/script'))
})

gulp.task('sass_dev',()=>{
	return gulp.src('./style/*.scss')
            .pipe(maps.init())
		   .pipe(sass({
		   		outputStyle:'compressed'
		   }))
           .pipe(autoprefixer({
               browsers:[
                   'last 2 version',
                   'Android >= 4.0',
                   'IOS >= 6'
               ]
           }))
           .pipe(maps.write('./'))
		   .pipe(gulp.dest(buildDir+'/style'));
});

gulp.task('webpack_dev',()=>{
    return gulp.src('./src/entry.js')
            .pipe(webpack({
                watch:true,
                output:{
                    filename:buildDir+'/script/entry.js'
                },
                module:{
                    loaders:[
                        {
                            test:/\.js$|\.jsx$/,
                            loader:'babel',
                            query:{
                                presets:['react','es2015']
                            }
                        }
                    ]
                },
                resolve:{
                    extensions:['','.jsx','.js','scss']
                },
                devtool:'source-map'
            }))
            .pipe(gulp.dest('./'));
})

gulp.task('start',['index_html','sass_dev'],()=>{

    let server=livereload.createServer({
        port:5811,
        applyCSSLive:false
    });
    server.watch(['../public/style/*.css','../public/index.html','../public/script/*.js']);

    gulp.watch('./*.html',['index_html'])
    gulp.watch('./lib/utils.js',['lib_concat_dev'])
    gulp.watch('./style/*.scss',['sass_dev']);
    gulp.watch(['./src/**/*.js[x]','./src/entry.js'],['webpack_dev']);
})