const {chromium}=require('playwright');
const path=require('path');
(async()=>{
  const dir=process.argv[2], mode=process.argv[3];
  const b=await chromium.launch({args:['--allow-file-access-from-files']});
  const p=await b.newPage({viewport:{width:1080,height:1920}});
  await p.goto('file://'+path.join(dir,'index.html'));
  await p.evaluate(async()=>{await document.fonts.ready; for(const i of document.images){ if(!i.complete) await new Promise(r=>i.onload=r);} });
  await p.waitForTimeout(500);
  if(mode==='preview'){
    const ts=process.argv[4].split(',').map(Number);
    for(const t of ts){ await p.evaluate(t=>render(t),t); await p.screenshot({path:path.join(dir,'prev',`p_${t}.jpg`),type:'jpeg',quality:85}); }
  } else {
    const N=750;
    for(let f=0;f<N;f++){ const t=f/30; await p.evaluate(t=>render(t),t);
      await p.screenshot({path:path.join(dir,'out',String(f).padStart(4,'0')+'.jpg'),type:'jpeg',quality:94});
      if(f%100==0) console.log(f); }
  }
  await b.close();
})();
