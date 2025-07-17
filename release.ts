import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

interface PackageJson {
  version: string
  name: string
  [key: string]: any
}

interface GitConfig {
  remote: string
  branch: string
}

async function prepareRelease(): Promise<void> {
  try {
    console.log('🚀 开始发布流程...')

    const { version: newVersion, changelogPath } = await extractVersionFromChangelog()
    validateVersionFormat(newVersion)

    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const packageJson: PackageJson = JSON.parse(
      await fs.readFile(packageJsonPath, 'utf-8'),
    )

    const currentVersion = packageJson.version
    console.log(`📦 当前版本: v${currentVersion}，待发布版本: v${newVersion}`)

    if (compareVersions(newVersion, currentVersion) <= 0) {
      throw new Error(`❌ changelog 中的版本 (v${newVersion}) 不应小于或等于 package.json 中的当前版本 (v${currentVersion})`)
    }

    packageJson.version = newVersion
    await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
    console.log(`📦 已更新 package.json 版本为 v${newVersion}`)

    const gitConfig = getGitConfig()
    console.log(`🌐 使用远程仓库: ${gitConfig.remote}, 分支: ${gitConfig.branch}`)

    console.log('💾 创建 Git 提交（包含所有当前变更）')
    execSync(`git add .`)
    execSync(`git commit -m "chore: release v${newVersion}"`)

    const tagName = `v${newVersion}`
    console.log(`🏷️ 创建 Git 标签: ${tagName}`)
    execSync(`git tag -a ${tagName} -F ${changelogPath}`)

    console.log('📤 推送代码和标签到远程仓库')
    execSync(`git push ${gitConfig.remote} ${gitConfig.branch}`)
    execSync(`git push ${gitConfig.remote} ${tagName}`)

    console.log('✅ 发布完成！GitHub Actions 将在标签推送后自动触发部署。')
  }
  catch (error: any) {
    console.error('❌ 发布过程中出错:', error.message)
    process.exit(1)
  }
}

function validateVersionFormat(version: string) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`❌ 无效的版本号格式: ${version}。应为 x.y.z`)
  }
}

function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < 3; i++) {
    if (pa[i] > pb[i])
      return 1
    if (pa[i] < pb[i])
      return -1
  }
  return 0
}

async function extractVersionFromChangelog(): Promise<{ version: string, changelogPath: string }> {
  const changelogPath = path.join(process.cwd(), 'changelog-latest.md')
  const content = await fs.readFile(changelogPath, 'utf-8')

  const match = content.match(/^## \[(\d+\.\d+\.\d+)\]/m)
  if (!match) {
    throw new Error('❌ changelog-latest.md 格式错误，无法从第一行提取版本号。应为: ## [x.y.z] - yyyy-mm-dd')
  }

  const version = match[1]
  console.log(`📄 从 changelog-latest.md 提取版本号: v${version}`)
  return { version, changelogPath }
}

function getGitConfig(): GitConfig {
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

  let remote = 'origin'
  try {
    const remoteOutput = execSync('git remote').toString().trim()
    if (remoteOutput) {
      remote = remoteOutput.split('\n')[0]
    }
  }
  catch {
    console.warn('⚠️ 无法获取远程仓库信息，使用默认值 origin')
  }

  return { remote, branch }
}

prepareRelease()
