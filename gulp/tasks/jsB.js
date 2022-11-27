import webpack from 'webpack-stream';

export const jsB = () => {
	return app.gulp.src(app.path.src.jsB, {sourcemaps: true})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'JS',
				message: 'Error <%= error.message %>'
			})
		))
		.pipe(app.plugins.include())
		.pipe(app.plugins.beautify.js({
			indent_with_tabs: true,
			indent_size:1,
			max_preserve_newlines: 1
		}))
		.pipe(app.gulp.dest(app.path.build.blocks))
		.pipe(app.plugins.terser({
			keep_fnames: true,
			format: {
				comments: false,
			}
		}))
		.pipe(app.plugins.rename({
			extname: '.min.js'
		}))
		.pipe(app.gulp.dest(app.path.build.blocks))
		.pipe(app.plugins.browsersync.stream());
}