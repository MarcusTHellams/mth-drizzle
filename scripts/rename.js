const fs = require('fs-extra');

fs.renameSync(`${process.cwd()}/build`, `${process.cwd()}/build1`)