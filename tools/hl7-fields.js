#!/usr/bin/env node
// Print every non-empty field of an HL7 v2 message with its position (e.g. PID-5).
// Usage: node tools/hl7-fields.js samples/ADT_A01.hl7
// MIT License - see LICENSE. No dependencies.
'use strict';
const fs = require('fs');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node tools/hl7-fields.js <message.hl7>');
  process.exit(1);
}

const raw = fs.readFileSync(file, 'utf8').replace(/\r\n|\n/g, '\r').trim();
if (!raw.startsWith('MSH')) {
  console.error('Not an HL7 v2 message: it must start with MSH.');
  process.exit(1);
}
const fs1 = raw[3]; // field separator, usually |

for (const line of raw.split('\r').filter(Boolean)) {
  const parts = line.split(fs1);
  const id = parts[0];
  // MSH-1 is the field separator itself, so MSH numbering is shifted by one.
  const fields = id === 'MSH' ? [fs1].concat(parts.slice(1)) : parts.slice(1);
  console.log(id);
  fields.forEach((value, i) => {
    if (value !== '') console.log(`  ${id}-${i + 1}`.padEnd(10) + value);
  });
}
