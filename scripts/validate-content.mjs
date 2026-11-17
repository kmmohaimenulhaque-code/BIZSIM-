#!/usr/bin/env node
import { cases } from '../shared/cases/index.js';
import { validateCase } from '../shared/validate.js';
import { books, principles } from '../shared/books.js';

const checkUrls = process.argv.includes('--urls');
let failed = 0;

for (const c of cases) {
  const result = validateCase(c);
  if (!result.ok) {
    console.error(`FAIL case ${c.id}:`, result.errors);
    failed++;
  } else {
    console.log(`OK   case ${c.id}`);
  }
}

console.log(`Books: ${books.length}, Principles: ${principles.length}`);
if (failed) {
  console.error(`\n${failed} case(s) failed validation`);
  process.exit(1);
}
console.log('All content checks passed.');
if (checkUrls) {
  console.log('(URL verification not fully implemented in this script stub)');
}
