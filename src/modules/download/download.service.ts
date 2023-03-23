import { Injectable } from '@nestjs/common';
import fs from 'fs';
import https from 'https';
import { join } from 'path';

@Injectable()
export class DownloadService {
	constructor() {
	}
	
	download(url, name, cb) {
		let dest = join(__dirname, '../../../', 'public', 'images', 'users', name);
		const file = fs.createWriteStream(dest);
		https
			.get(url, function(response) {
				response.pipe(file);
				file.on('finish', function() {
					file.close(cb); // close() is async, call cb after close completes.
				});
			})
			.on('error', function(err) {
				// Handle errors
				fs.unlink(dest, cb(err.message)); // Delete the file async. (But we don't check the result)
			});
	};
}
