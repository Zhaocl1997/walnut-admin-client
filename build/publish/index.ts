import { spawn } from 'child_process'

const bat = spawn(
  'cmd.exe',
  [
    '/c',
    'D:/projects/walnut/walnut-admin/walnut-admin-client/build/publish/prod.bat',
  ],
  { stdio: 'inherit' }
)

bat.stdout?.on('data', (data) => {
  console.log('stdout?', data.toString())
})

bat.stderr?.on('data', (data) => {
  console.error('stderr', data.toString())
})

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`)
})
