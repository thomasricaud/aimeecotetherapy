const fs = require('fs')

const lhrFiles = fs
  .readdirSync('.lighthouseci')
  .filter(f => /^lhr-.*\.json$/.test(f))
const results = new Map()
for (const file of lhrFiles) {
  const json = JSON.parse(fs.readFileSync(`.lighthouseci/${file}`, 'utf8'))
  results.set(json.finalUrl, (json.categories.seo.score * 100).toFixed(0))
}
if (results.size) {
  console.log('SEO checks:')
  for (const [url, score] of results) {
    console.log(`- ${url} → SEO ${score}`)
  }
}

const reportsDir = '.lighthouseci/reports'
if (fs.existsSync(reportsDir)) {
  const reports = fs.readdirSync(reportsDir).filter(f => f.endsWith('.report.html'))
  console.log('SEO reports:')
  for (const report of reports) {
    console.log(`- ${reportsDir}/${report}`)
  }
}
