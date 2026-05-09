import { validateTemplateRegistry } from '../src/template-engine/validation';

const issues = validateTemplateRegistry();

if (issues.length > 0) {
  console.error('Template registry validation failed:');
  for (const issue of issues) {
    console.error(`- [${issue.code}] ${issue.message}`);
  }
  process.exit(1);
}

console.log('Template registry validation passed.');
