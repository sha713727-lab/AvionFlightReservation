import fs from 'node:fs'

function words(s) {
  return String(s || '')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length
}

function firstSentence(s) {
  const m = String(s).match(/^[^.!?]+[.!?]/)
  return m ? m[0] : s
}

function pull(src, key) {
  const re = new RegExp(`${key}:\\s*\\n\\s*'((?:\\\\'|[^'])*)'`, 'g')
  return [...src.matchAll(re)].map((m) => m[1].replace(/\\'/g, "'"))
}

const a = fs.readFileSync('src/modules/seoLanding/constants/serviceBodiesGroupA.js', 'utf8')
const b = fs.readFileSync('src/modules/seoLanding/constants/serviceBodiesGroupB.js', 'utf8')
const faqs =
  fs.readFileSync('src/modules/seoLanding/constants/serviceFaqsGroupA.js', 'utf8') +
  fs.readFileSync('src/modules/seoLanding/constants/serviceFaqsGroupB.js', 'utf8')
const copy = fs.readFileSync('src/constants/copy.js', 'utf8')

console.log('summaries', pull(a + b, 'speakableSummary').map(words))
console.log(
  'hero',
  words(pull(copy, 'speakableSummary')[0]),
)

let bad = 0
for (const answer of pull(faqs, 'answer')) {
  const n = words(firstSentence(answer))
  if (n > 29) {
    bad += 1
    console.log('BAD', n, firstSentence(answer))
  }
}
console.log('faq first-sentence over 29:', bad)
