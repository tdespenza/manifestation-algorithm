const fs = require('fs');
const data = JSON.parse(fs.readFileSync('coverage/coverage-final.json', 'utf8'));

const filesToCheck = ['Questionnaire.vue', 'questionnaire.ts', 'analysis.ts', 'useNetwork.ts', 'NetworkRanking.vue', 'QuestionItem.vue'];

filesToCheck.forEach(target => {
  const key = Object.keys(data).find(k => k.includes(target));
  if (!key) return;
  const file = data[key];
  
  const uncovStmts = Object.entries(file.s).filter(([k,v]) => v === 0).map(([k]) => file.statementMap[k].start.line);
  const uncovBranches = Object.entries(file.b).filter(([k,v]) => v.some(c => c === 0)).map(([k]) => {
    const br = file.branchMap[k];
    return `${br.type}@line${br.loc.start.line}`;
  });
  const uncovFns = Object.entries(file.f).filter(([k,v]) => v === 0).map(([k]) => {
    const fn = file.fnMap[k];
    return `${fn.name || '(anon)'}@line${fn.decl.start.line}`;
  });
  
  if (uncovStmts.length || uncovBranches.length || uncovFns.length) {
    console.log(`\n=== ${target} ===`);
    if (uncovStmts.length) console.log('Uncov stmts lines:', [...new Set(uncovStmts)].sort((a,b)=>a-b));
    if (uncovBranches.length) console.log('Uncov branches:', uncovBranches);
    if (uncovFns.length) console.log('Uncov functions:', uncovFns);
  }
});
