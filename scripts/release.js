const execa = require('execa')
const semver = require('semver')
const inquirer = require('inquirer')

const curVersion = require('../package.json').version

const release = async () => {
  console.log(`Current version: ${curVersion}`)
  // todo(https://blog.csdn.net/gtLBTNq9mr3/article/details/125252366)
  const bumps = ['patch', 'minor', 'major', 'prerelease']
  const versions = {}
  bumps.forEach((b) => {
    versions[b] = semver.inc(curVersion, b)
  })
  const bumpChoices = bumps.map((b) => ({
    name: `${b} (${versions[b]})`,
    value: b
  }))

  const { bump, customVersion } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type:',
      type: 'list',
      choices: [...bumpChoices, { name: 'custom', value: 'custom' }]
    },
    {
      name: 'customVersion',
      message: 'Input version:',
      type: 'input',
      when: (answers) => answers.bump === 'custom'
    }
  ])

  const version = customVersion || versions[bump]
  process.env.VERSION = version

  const { genDocs } = await inquirer.prompt([
    {
      name: 'genDocs',
      message: `Generate ${version} docs?`,
      type: 'confirm'
    }
  ])

  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      message: `Confirm releasing ${version}?`,
      type: 'confirm'
    }
  ])

  if (yes) {
    // 执行构建打包
    await execa('npm', ['run', 'build'], { stdio: 'inherit' })
    await execa('git', ['add', '.'], { stdio: 'inherit' })
    // 提交打包代码
    try {
      await execa('git', ['commit', '-m', `build: build ${version}`, '-m'], {
        stdio: 'inherit'
      })
    } catch (e) {}
    // 打包文档
    if (genDocs) {
      await execa('npm', ['run', 'docs:build'], { stdio: 'inherit' })
      // await execa('git', ['add', 'docs/.vuepress/dist'], { stdio: 'inherit' })
      await execa('git', ['add', '.'], { stdio: 'inherit' })
      try {
        await execa('git', ['commit', '-m', `build: docs ${version}`], {
          stdio: 'inherit'
        })
      } catch (e) {}
    }
    if (version !== curVersion) {
      // 不给git提交打上tag标签
      await execa('npm', ['--no-git-tag-version', 'version', version], {
        stdio: 'inherit'
      })
      await execa('git', ['add', '.'], { stdio: 'inherit' })
      try {
        await execa('git', ['commit', '-m', `build: release ${version}`], {
          stdio: 'inherit'
        })
        // 获取当前提交的hash值，并打上版本tag
        const { stdout: commitid } = await execa('git', ['rev-parse', 'HEAD'])
        await execa('git', ['tag', '-a', version, '-m', commitid], {
          stdio: 'inherit'
        })
      } catch (e) {}
    }
  }
  // 生成change-log
  require('./gen-changelog')(version)
}

release().catch((err) => {
  console.error(err)
  process.exit(1)
})
