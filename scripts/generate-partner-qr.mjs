import QRCode from 'qrcode'; import fs from 'node:fs'; import path from 'node:path';
const args=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,all)=>v.startsWith('--')?(a.push([v.slice(2),all[i+1]]),a):a,[]));
const code=(args.code||'').toUpperCase(); if(!/^[A-Z]{1,3}[0-9]{3}$/.test(code)||!args.name)throw new Error('Use --code H001 --name "Hotel Example"');
const base=process.env.PUBLIC_SITE_URL;if(!base)throw new Error('PUBLIC_SITE_URL is required; no placeholder domain will be generated.');
const url=new URL('/en/',base);url.searchParams.set('ref',code);url.searchParams.set('utm_source','partner');url.searchParams.set('utm_medium','referral');
const dir='public/assets/partners',out=path.join(dir,`${code}.svg`);fs.mkdirSync(dir,{recursive:true});await QRCode.toFile(out,url.toString(),{type:'svg',margin:2,color:{dark:'#08344e',light:'#ffffff'}});
const metadataPath='data/partners.internal.json';fs.mkdirSync('data',{recursive:true});let metadata=[];try{metadata=JSON.parse(fs.readFileSync(metadataPath,'utf8'))}catch{};metadata=metadata.filter(p=>p.code!==code);metadata.push({code,name:args.name,url:url.toString(),createdAt:new Date().toISOString()});fs.writeFileSync(metadataPath,JSON.stringify(metadata,null,2)+'\n');console.log(`Partner: ${args.name}\nCode: ${code}\nURL: ${url}\nQR: ${out}\nMetadata: ${metadataPath}`);
