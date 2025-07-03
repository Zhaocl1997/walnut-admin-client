import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

interface PackageJson {
  version: string
  name: string
  [key: string]: any
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

    // 读取 CHANGELOG.md
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md')
    const changelog = await fs.readFile(changelogPath, 'utf-8')

    // 验证CHANGELOG中是否有该版本的日志
    const versionHeader = `## [${version}]`
    if (!changelog.includes(versionHeader)) {
      throw new Error(`在 CHANGELOG.md 中找不到版本 ${version} 的发布说明。请确保格式为：\n## [${version}]`)
    }

    // 提取当前版本的变更日志
    const releaseNotes = extractReleaseNotes(changelog, version)
    console.log(`📝 提取到发布说明：\n${releaseNotes}`)

    // 保存发布说明到临时文件（供CI使用）
    await fs.writeFile('release-notes.md', releaseNotes)
    console.log('💾 保存发布说明到 release-notes.md')

    // 创建 Git 提交
    console.log('💾 创建 Git 提交')
    execSync(`git add ${packageJsonPath} ${changelogPath} release-notes.md`)
    execSync(`git commit -m "chore: release v${version}"`)

    // 创建 Git Tag
    const tagName = `v${version}`
    console.log(`🏷️ 创建 Git 标签: ${tagName}`)
    execSync(`git tag -a ${tagName} -m "Release ${tagName}"`)

    console.log('✅ 本地发布准备完成')
    console.log('📤 请执行以下命令推送到远程仓库：')
    console.log(`git push origin main && git push origin ${tagName}`)
  }
  catch (error: any) {
    console.error('❌ 发布过程中出错:', error.message)
    process.exit(1)
  }
}

// 从 CHANGELOG.md 中提取指定版本的发布说明
function extractReleaseNotes(changelog: string, version: string): string {
  const versionHeader = `## [${version}]`
  const startIndex = changelog.indexOf(versionHeader)

  if (startIndex === -1) {
    throw new Error(
      `在 CHANGELOG.md 中找不到版本 ${version} 的发布说明。请确保格式为：\n## [${version}]`,
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
  const version = getVersionFromArgs()
  await prepareRelease(version)
})()
