import { spawn, exec } from 'child_process'

import { paths } from '../_generated/paths'
import { generatedPublishBatFileName } from '../utils/paths'

// use `pscp` to upload all the files under `dist` to cloud server specific locaiton
// see more publish config in `build/publish/config.ts`
exec('esno build/generate/genPublishBat.ts', (err, stdout, stderr) => {
  if (err) return

  const bat = spawn(
    'cmd.exe',
    ['/c', generatedPublishBatFileName.split('/').slice(-1)[0]],
    {
      stdio: 'inherit',
      cwd: `${paths.build}\\_generated`,
    }
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
})
