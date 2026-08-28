export const ATTRIBUTION_KEY='fc24_attribution';
export type Attribution={ref?:string;landingPage:string;timestamp:string;utmSource?:string;utmMedium?:string;utmCampaign?:string;utmContent?:string;gclid?:string};
const safe=(v:string|null,max=100)=>v?.replace(/[^a-zA-Z0-9_.-]/g,'').slice(0,max)||undefined;
export function parseAttribution(search:string,path='/'):Attribution {const p=new URLSearchParams(search);return {ref:safe(p.get('ref'),24),landingPage:path,timestamp:new Date().toISOString(),utmSource:safe(p.get('utm_source')),utmMedium:safe(p.get('utm_medium')),utmCampaign:safe(p.get('utm_campaign')),utmContent:safe(p.get('utm_content')),gclid:safe(p.get('gclid'),150)};}
export function hasAttributionSignal(value:Attribution){return Boolean(value.ref||value.utmSource||value.utmMedium||value.utmCampaign||value.utmContent||value.gclid);}
export function persistAttribution(storage:Pick<Storage,'getItem'|'setItem'>,value:Attribution){if(!storage.getItem(ATTRIBUTION_KEY)&&hasAttributionSignal(value))storage.setItem(ATTRIBUTION_KEY,JSON.stringify(value));return readAttribution(storage);}
export function readAttribution(storage:Pick<Storage,'getItem'>):Attribution|undefined{try{return JSON.parse(storage.getItem(ATTRIBUTION_KEY)||'') as Attribution;}catch{return undefined;}}
