//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
//

'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean', () =>
  gulp.src('build', { read: false, allowEmpty: true }).pipe(
    clean({
      force: true,
    })
  )
);

gulp.task('copy-node-config', () =>
  gulp.src(['package.json', 'package-lock.json']).pipe(gulp.dest('build'))
);

gulp.task('copy-src', () =>
  gulp.src(['src/**']).pipe(gulp.dest('build'))
);

gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel('copy-node-config', 'copy-src')
  )
);

