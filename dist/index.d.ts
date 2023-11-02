export declare class Regon {
    private _key;
    private _service;
    private _wsdl;
    constructor({ key, dev }?: {
        key?: string | undefined;
        dev?: boolean | undefined;
    });
    login(): Promise<any>;
    logout(sid: string): Promise<any>;
    sendEnvelope(envelope: string, sid?: string): Promise<any>;
    getCompanyData(params: SearchParameters): Promise<any>;
}

declare interface SearchParameters {
    KRS?: string | string[];
    NIP?: string | string;
    Regon?: string | string[];
    regonType: 'standard' | 'size9' | 'size14';
}

export { }
