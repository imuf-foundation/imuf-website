import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = portIndex >= 0 ? args[portIndex + 1] : '8080';
if (!/^\d{2,5}$/.test(port) || Number(port) > 65535) throw new Error('Invalid preview port');
const child = spawn(process.execPath, [fileURLToPath(new URL('../node_modules/@11ty/eleventy/cmd.cjs', import.meta.url)), '--serve', `--port=${port}`], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 1));
