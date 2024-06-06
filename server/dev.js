// server/dev.js

const { execSync } = require('child_process');
const os = require('os');

function runCommands(command1, command2, sleepTime = 1) {
  let sleepCommand = '';
  if (os.platform() === 'win32') {
    // Windows 上使用 ping 创建延迟效果
    // 一开始使用 timeout -t 1 命令，但一直报错，所以改用 ping
    sleepCommand = `ping 127.0.0.1 -n ${sleepTime + 1} > nul`;
  } else {
    // Mac 和其他 Unix-like 系统上使用 sleep 命令
    sleepCommand = `sleep ${sleepTime}`;
  }

  const fullCommand = `concurrently ${command1} "${sleepCommand} && ${command2}"`;

  execSync(fullCommand, {
    stdio: 'inherit',
    maxBuffer: 2 * 1024 * 1024,
  });
}

runCommands('vite', 'electron .', 5);
