const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
const kit = require('gulp-kit')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const babelify = require('babelify')
const nunjucksRender = require('gulp-nunjucks-render')
const fs = require('fs')

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/**/*',
	dist: './dist',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
	php: './src/php/**/*.php',
	distPhp: './dist/php',
	njk: './src/templates/**/*.njk',
	video: './src/video/*.*',
	videoDist: './dist/video/',
	languages: './src/locales/**/*.json',
	languagesDist: './dist/locales/',
}

const languages = ['pl', 'en']
const pages = ['index', 'contact', 'privacy-policy', 'project1', 'projects']

function buildAllPages(done) {
	const tasks = []

	languages.forEach(lang => {
		pages.forEach(page => {
			const dataPath = `./src/locales/${lang}/${page}.json`
			if (!fs.existsSync(dataPath)) {
				console.warn(`⚠️ Brakuje pliku tłumaczeń: ${dataPath}`)
				return
			}
			let data = {}
			if (fs.existsSync(dataPath)) {
				const raw = fs.readFileSync(dataPath, 'utf-8')
				if (raw.trim()) {
					try {
						data = JSON.parse(raw)
					} catch (err) {
						console.error(`❌ Błąd składni JSON w pliku: ${dataPath}`)
						console.error(err.message)
					}
				} else {
					console.warn(`⚠️ Pusty plik tłumaczenia: ${dataPath}`)
				}
			} else {
				console.warn(`⚠️ Brak pliku tłumaczenia: ${dataPath}`)
			}

			const pageTask = () =>
				src(`./src/templates/pages/${page}.njk`)
					.pipe(
						nunjucksRender({
							path: ['./src/templates/'],
							data: {
								lang: data,
								langCode: lang,
							},
						})
					)
					.pipe(dest(lang === 'pl' ? './dist' : `./dist/${lang}`))

			tasks.push(pageTask)
		})
	})

	return parallel(...tasks)(done)
} 

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest))
	done()
}

function javaScript(done) {
	console.log('Kompiluję JavaScript...')
	browserify({
		entries: ['./src/js/app.js'],
		debug: true,
	})
		.transform(
			babelify.configure({
				presets: ['@babel/preset-env'],
			})
		)
		.bundle()
		.on('error', function (err) {
			console.error('❌ Błąd JS:', err.message)
			done(err)
		})
		.pipe(source('app.min.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.jsDest))
		.on('end', () => {
			done()
		})
}

function phpScript(done) {
	src(paths.php).pipe(dest(paths.distPhp))
	done()
}

function video(done) {
	src(paths.video).pipe(dest(paths.videoDist))
	done()
}

// function handleLanguages(done) {
// 	src(paths.languages).pipe(dest(paths.languagesDist))
// 	done()
// }

function convertImages(done) {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest))
	done()
}

// function handleKits(done) {
// 	src(paths.html).pipe(kit()).pipe(dest('./'))
// 	done()
// }

function cleanStuff(done) {
	src(paths.dist, { read: false }).pipe(clean())
	done()
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './dist/',
		},
	})

	done()
}

function watchForChanges(done) {
	watch('./dist/**/*.html').on('change', reload)
	watch(
		[paths.njk, paths.html, paths.sass, paths.js, paths.video, paths.languages],
		parallel(buildAllPages, sassCompiler, javaScript, phpScript)
	).on('change', reload)
	watch(paths.img, convertImages).on('change', reload)
	done()
}

const mainFunctions = parallel(buildAllPages, sassCompiler, javaScript, convertImages, phpScript, video)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)
