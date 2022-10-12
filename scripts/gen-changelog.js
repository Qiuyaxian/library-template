const execa = require('execa')
const cc = require('conventional-changelog')
const config = require('conventional-changelog-angular')
// https://zhuanlan.zhihu.com/p/392303778/
// https://www.proyy.com/6976891381914533918.html
module.exports = (version) => {
  const fileStream = require('fs').createWriteStream(`CHANGELOG.md`)
  cc({
    config,
    releaseCount: 0,
    pkg: {
      transform(pkg) {
        pkg.version = `v${version}`
        return pkg
      }
    }
  })
    .pipe(fileStream)
    .on('close', async () => {
      await execa('git', ['add', 'CHANGELOG.md'], { stdio: 'inherit' })
      await execa(
        'git',
        ['commit', '-m', `chore: ${version} changelog [ci skip]`],
        { stdio: 'inherit' }
      )
    })
}
