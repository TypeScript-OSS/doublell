import esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import fs from 'fs/promises';
import { glob } from 'glob';

const makeMjsBuildSettings = async (options) => ({
  tsconfig: './tsconfig.mjs.json',
  entryPoints: await glob(['./src/*.ts', './src/**/*.ts'], { ignore: ['**/__tests__/**', '**/__test_dependency__/**'] }),
  outdir: './lib/mjs',
  sourcemap: true,
  format: 'esm',
  outExtension: { '.js': '.mjs' },
  plugins: [
    esbuildPluginTsc({ force: true }),
    {
      name: 'fix-mjs-import-and-export-paths',
      setup(build) {
        build.onEnd(async () => {
          const generatedPaths = await glob(['./lib/mjs/*.mjs', './lib/mjs/*.mjs.map', './lib/mjs/**/*.mjs', './lib/mjs/**/*.mjs.map']);
          await Promise.all(
            generatedPaths.map(async (generatedPath) => {
              let data = await fs.readFile(generatedPath, 'utf-8');
              data = data.replace(/\.js\b/g, '.mjs');
              await fs.writeFile(generatedPath, data, 'utf-8');
            })
          );
        });
      }
    }
  ],
  ...options
});

try {
  await esbuild.build(await makeMjsBuildSettings({}));
} catch (e) {
  process.exit(1);
}
