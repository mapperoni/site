// Build-time script to generate search index data
// Run this during build: node src/markdoc/generate-search-data.mjs

import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import * as path from 'path'

const slugify = slugifyWithCounter()

function toString(node) {
  let str =
    node.type === 'text' && typeof node.attributes?.content === 'string'
      ? node.attributes.content
      : ''
  if ('children' in node) {
    for (let child of node.children) {
      str += toString(child)
    }
  }
  return str
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }
  if (node.type === 'heading' || node.type === 'paragraph') {
    let content = toString(node).trim()
    if (node.type === 'heading' && node.attributes.level <= 2) {
      let hash = node.attributes?.id ?? slugify(content)
      sections.push([content, hash, []])
    } else {
      sections.at(-1)?.[2].push(content)
    }
  } else if ('children' in node) {
    for (let child of node.children) {
      extractSections(child, sections, false)
    }
  }
}

function generateSearchData() {
  const pagesDir = path.resolve('./src/app')
  const files = glob.sync('**/page.md', { cwd: pagesDir })

  const data = files.map((file) => {
    const url = file === 'page.md' ? '/' : `/${file.replace(/\/page\.md$/, '')}`
    const md = fs.readFileSync(path.join(pagesDir, file), 'utf8')

    const ast = Markdoc.parse(md)
    const title = ast.attributes?.frontmatter?.match(/^title:\s*(.*?)\s*$/m)?.[1]
    const sections = [[title, null, []]]
    extractSections(ast, sections)

    return { url, sections }
  })

  return data
}

// Generate and write the data
const data = generateSearchData()
const outputDir = path.resolve('./.generated')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}
const outputPath = path.join(outputDir, 'search-data.json')
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
console.log(`Search data generated: ${outputPath}`)
