const BOOT_LINES = [
  { prefix: '[SYS_INIT]', text: 'Loading Memory Allocator...', status: 'OK' },
  { prefix: '[KERN]',     text: 'Mounting C++20 Runtime...',   status: 'OK' },
  { prefix: '[NET]',      text: 'Establishing secure link...',  status: 'OK' },
  { prefix: '[STATUS]',   text: 'Systems Online.',              status: null },
]

let idx = 0;
for (let i = 0; i < 6; i++) {
  if (idx < BOOT_LINES.length) {
    console.log("Adding:", BOOT_LINES[idx]);
    idx++;
  }
}
