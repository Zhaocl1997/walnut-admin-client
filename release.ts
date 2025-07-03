import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

interface PackageJson {
  version: string
  name: string
  [key: string]: any
}

// 新增类型定义
interface GitConfig {
  remote: string
  branch: string
}

async function prepareRelease(version: string): Promise<void> {
  try {
    console.log(`🚀 开始准备发布版本 v${version}`)

    // 验证版本号格式
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      throw new Error(`❌ 无效的版本号格式: ${version}`)
    }

    // 读取 package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const packageJson: PackageJson = JSON.parse(
      await fs.readFile(packageJsonPath, 'utf-8'),
    )

    // 更新 package.json 版本号
    console.log(`📦 更新 package.json 版本为 v${version}`)
    packageJson.version = version
    await fs.writeFile(
      packageJsonPath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
    )

    // 读取 changelog-latest.md
    const changelogPath = path.join(process.cwd(), 'changelog-latest.md')
    const changelog = await fs.readFile(changelogPath, 'utf-8')

    // 验证CHANGELOG中是否有该版本的日志
    const versionHeader = `## [${version}]`
    if (!changelog.includes(versionHeader)) {
      throw new Error(`在 changelog-latest.md 中找不到版本 ${version} 的发布说明。请确保格式为：\n## [${version}]`)
    }

    // 提取当前版本的变更日志
    const releaseNotes = extractReleaseNotes(changelog, version)
    console.log(`📝 提取到发布说明：\n${releaseNotes}`)

    // 保存发布说明到临时文件
    await fs.writeFile('release-notes.md', releaseNotes)
    console.log('💾 保存发布说明到 release-notes.md')

    // 获取 Git 配置
    const gitConfig = getGitConfig()
    console.log(`🌐 使用远程仓库: ${gitConfig.remote}, 分支: ${gitConfig.branch}`)

    // 创建 Git 提交
    console.log('💾 创建 Git 提交')
    execSync(`git add ${packageJsonPath} ${changelogPath} release-notes.md`)
    execSync(`git commit -m "chore: release v${version}"`)

    // 创建 Git Tag
    const tagName = `v${version}`
    console.log(`🏷️ 创建 Git 标签: ${tagName}`)
    execSync(`git tag -a ${tagName} -m "Release ${tagName}"`)

    // 自动推送代码和标签
    console.log('📤 推送代码和标签到远程仓库')
    execSync(`git push ${gitConfig.remote} ${gitConfig.branch}`)
    execSync(`git push ${gitConfig.remote} ${tagName}`)

    console.log('✅ 发布准备完成，已推送到远程仓库')
    console.log('⏳ GitHub Actions 将自动创建 Release...')
  }
  catch (error: any) {
    console.error('❌ 发布过程中出错:', error.message)
    process.exit(1)
  }
}

// 获取 Git 配置
function getGitConfig(): GitConfig {
  // 获取当前分支
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

  // 获取远程仓库名称
  let remote = 'origin'
  try {
    const remoteOutput = execSync('git remote').toString().trim()
    if (remoteOutput) {
      // 使用第一个远程仓库
      remote = remoteOutput.split('\n')[0]
    }
  }
  catch (error) {
    console.warn('⚠️ 无法获取远程仓库信息，使用默认值 \'origin\'', error)
  }

  return { remote, branch }
}

// 从 changelog-latest.md 中提取指定版本的发布说明
function extractReleaseNotes(changelog: string, version: string): string {
  const versionHeader = `## [${version}]`
  const startIndex = changelog.indexOf(versionHeader)

  if (startIndex === -1) {
    throw new Error(
      `在 changelog-latest.md 中找不到版本 ${version} 的发布说明。请确保格式为：\n## [${version}]`,
    )
  }

  const nextVersionIndex = changelog.indexOf('\n## [', startIndex + versionHeader.length)
  const endIndex = nextVersionIndex !== -1 ? nextVersionIndex : changelog.length

  const releaseNotes = changelog
    .substring(startIndex, endIndex)
    .trim()

  return releaseNotes
}

// 从命令行参数获取版本号
function getVersionFromArgs(): string {
  const version = process.argv[2]
  if (!version) {
    console.error('❌ 请提供版本号 (例如: 1.2.3)')
    process.exit(1)
  }
  return version
}

// 执行发布准备
(async () => {
  // 检查是否有未提交的更改
  const statusOutput = execSync('git status --porcelain').toString().trim()
  if (statusOutput) {
    console.error('❌ 存在未提交的更改，请先提交或暂存更改')
    console.error(`未提交的文件:\n${statusOutput}`)
    process.exit(1)
  }

  const version = getVersionFromArgs()
  await prepareRelease(version)
})()
