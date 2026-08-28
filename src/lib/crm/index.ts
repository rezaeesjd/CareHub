/** Future CRM boundary. Only non-clinical lead attribution may cross this boundary. */
export interface CrmLeadMetadata { source?:string; referralCode?:string; channel:'phone'|'whatsapp'|'email'; language:string; status?:string }
