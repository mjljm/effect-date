import * as ConfigManager from '@mjljm/configs-manager';

const packageName = 'effect-date';
const packageJson = {
	...ConfigManager.PackageBase,
	...ConfigManager.PackageSubRepo,
	...ConfigManager.PackageEffectTags,
	...ConfigManager.PackageSubRepoPublic,
	name: ConfigManager.PackageBase.name(packageName),
	version: '1.0.0',
	repository: ConfigManager.PackageBase.repository(packageName),
	bugs: ConfigManager.PackageBase.bugs(packageName),
	homepage: ConfigManager.PackageBase.homepage(packageName),
	description: 'A complement to the official effect library dedicated to date and time',
	scripts: {
		...ConfigManager.PackageSubRepo.scripts,
		...ConfigManager.PackageBase.scripts,
		...ConfigManager.PackageSubRepoPublic.scripts
	},
	peerDependencies: {
		'@mjljm-dev/effect-lib': 'workspace:*',
		'@mjljm-dev/effect-templater': 'workspace:*',
		'@mjljm-dev/js-lib': 'workspace:*',
		effect: ConfigManager.Versions.effectVersion
	}
};
export default {
	// Put prettier in first position so the next generated files will get formatted
	'prettier.config.js': ConfigManager.PrettierConfigTemplate,
	'.gitignore': ConfigManager.GitIgnore,
	'.prettierignore': ConfigManager.PrettierIgnore,
	'tsconfig.src.json': ConfigManager.TsConfigSrcLibrary,
	'tsconfig.others.json': ConfigManager.TsConfigOthersNode,
	'tsconfig.json': ConfigManager.TsConfigAll,
	'tsconfig.build.json': ConfigManager.TsConfigBuild,
	'eslint.config.js': ConfigManager.EslintConfigLibraryTemplate,
	'vite.config.ts': 'export default {};',
	'package.json': packageJson
};
