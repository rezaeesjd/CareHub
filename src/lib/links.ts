import {site} from '../config/site'; import {t,type Lang} from '../i18n/content';
export function whatsappUrl(lang:Lang,ref?:string){const message=`${t[lang].message}${ref?`\nReferral: ${ref}`:''}`;return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;}
export const phoneUrl=()=>`tel:${site.phone}`; export const emailUrl=()=>`mailto:${site.email}`;
export function canonical(path:string,base=site.url){return base?new URL(path,base.endsWith('/')?base:`${base}/`).toString():path;}
