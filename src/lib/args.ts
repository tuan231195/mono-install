import yargs from 'yargs';
import path from 'path';
import {
	NpmEngine,
	PnpmEngine,
	ENGINE,
	Engine,
} from '@vdtn359/package-manager-utils';

const engineMap: Record<ENGINE, Engine> = {
	[ENGINE.npm]: new NpmEngine(),
	[ENGINE.pnpm]: new PnpmEngine(),
};

export function getOptions() {
	const args: Record<string, any> = yargs.argv;
	const installArgs = args['_'];
	const installDirectory = path.resolve(args['installDir'] || process.cwd());
	const engineType = args['engine'] || ENGINE.npm;
	const engine: Engine = engineMap[engineType];
	if (!engine) {
		console.error(`Unknown engine ${engine}`);
		process.exit(1);
	}
	const sourcePackageJsonPath = path.resolve(
		args['packageJson'] || `${installDirectory}/package.json`
	);
	const sourcePackageLockPath = path.resolve(
		args['packageLock'] ||
			path.resolve(installDirectory, engine.packageLock)
	);
	const destinationPackageJsonPath = path.resolve(
		`${installDirectory}/package.json`
	);
	const destinationPackageLockPath = path.resolve(
		path.resolve(installDirectory, engine.packageLock)
	);
	return {
		resolve: !!args.resolve,
		dryRun: !!args.dryRun,
		installArgs,
		installDirectory,
		engineType,
		engine,
		sourcePackageLockPath,
		sourcePackageJsonPath,
		destinationPackageJsonPath,
		destinationPackageLockPath,
	};
}
