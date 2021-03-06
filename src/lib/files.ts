import fs from 'fs';

export function readJson(jsonPath) {
	return JSON.parse(
		fs.readFileSync(jsonPath, {
			encoding: 'utf-8',
		})
	);
}

export function writeJson(jsonPath, value) {
	fs.writeFileSync(jsonPath, JSON.stringify(value, null, 4), {
		encoding: 'utf-8',
	});
}

export function read(file) {
	return fs.readFileSync(file, {
		encoding: 'utf-8',
	});
}

export function write(file, content) {
	fs.writeFileSync(file, content, {
		encoding: 'utf-8',
	});
}
