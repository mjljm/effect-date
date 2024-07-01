import * as ConfigManager from '@parischap/configs-manager';
import merge from 'deepmerge';
import { basename, resolve } from 'node:path/win32';

const packageName = basename(resolve())
const packageJson = merge.all([
	ConfigManager.packageBase(packageName),
	ConfigManager.packageSubRepo,
	ConfigManager.packageEffectTags,
	{
		version: '1.0.0',
		description: 'A complement to the official effect library dedicated to date and time',
		peerDependencies: {
			...ConfigManager.params.workspaceDevDep('js-lib'),
			...ConfigManager.params.workspaceDevDep('effect-lib'),
			...ConfigManager.params.workspaceDevDep('effect-templater'),
			effect: ConfigManager.versions.effectVersion
		}
	}
]);

export default {
	// Put prettier in first position so the next generated files will get formatted
	[ConfigManager.params.prettierConfigFileName]: ConfigManager.prettierConfigTemplate,
	[ConfigManager.params.gitIgnoreFileName]: ConfigManager.gitIgnore,
	[ConfigManager.params.prettierIgoreFileName]: ConfigManager.prettierIgnore,
	[ConfigManager.params.projectTsConfigFileName]: ConfigManager.tsConfigSrcLibrary,
	[ConfigManager.params.nonProjectTsConfigFileName]: ConfigManager.tsConfigOthers,
	[ConfigManager.params.tsConfigFileName]: ConfigManager.tsConfig,
	[ConfigManager.params.eslintTsConfigFileName]: ConfigManager.tsConfigCheck,
	[ConfigManager.params.eslintConfigFileName]: ConfigManager.eslintConfigLibraryTemplate,
	[ConfigManager.params.viteConfigFileName]: 'export default {};',
	[ConfigManager.params.packageJsonFileName]: packageJson
};
