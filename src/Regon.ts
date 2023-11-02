import { parseStringPromise } from 'xml2js';
import { SearchParameters } from './interfaces';
import {
  loginTemplate,
  logoutTemplate,
  findCompanyTemplate,
} from './envelopes';
import { SERVICE_TEST, SERVICE, WSDL_TEST, WSDL, DEV_KEY } from './constants';

export class Regon {
  private service: string;
  private wsdl: string;

  constructor(private key = DEV_KEY, dev = true) {
    this.service = dev ? SERVICE_TEST : SERVICE;
    this.wsdl = dev ? WSDL_TEST : WSDL;
  }

  async login(): Promise<string> {
    const template = loginTemplate(this.key);
    const data = await this.sendEnvelope<{
      ZalogujResponse: { ZalogujResult: string[] };
    }>(template);

    return data.ZalogujResponse.ZalogujResult[0];
  }

  async logout(sid: string): Promise<boolean> {
    const template = logoutTemplate(sid);
    const data = await this.sendEnvelope<{
      WylogujResponse: { WylogujResult: string[] };
    }>(template);

    return data.WylogujResponse.WylogujResult[0] === 'true';
  }

  async sendEnvelope<T extends unknown = any>(
    body: string,
    sid: string = ''
  ): Promise<T> {
    return fetch(this.service, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
        sid,
      },
      body,
    })
      .then((res) => res.text())
      .then(
        (res) => res.replace(/\n/g, '').match(/<s:Body>(.*?)<\/s:Body>/)![1]
      )
      .then((res) => parseStringPromise(res))
      .catch((error: Error) => console.log(error));
  }

  async search(params: SearchParameters): Promise<any> {
    try {
      const template = findCompanyTemplate(params);

      const sid = await this.login();
      const res = await this.sendEnvelope(template, sid);
      const data = await parseStringPromise(
        res.DaneSzukajPodmiotyResponse.DaneSzukajPodmiotyResult
      );

      await this.logout(sid);

      return data.root.dane[0];
    } catch (error: any) {
      return error.body;
    }
  }

  async searchByNIP(NIP: string | string[]) {
    try {
      const template = findCompanyTemplate({ NIP });

      const sid = await this.login();
      const res = await this.sendEnvelope(template, sid);
      const data = await parseStringPromise(
        res.DaneSzukajPodmiotyResponse.DaneSzukajPodmiotyResult
      );

      await this.logout(sid);

      return data.root.dane[0];
    } catch (error: any) {
      return error.body;
    }
  }

  async searchByKRS(KRS: string | string[]) {
    try {
      const template = findCompanyTemplate({ KRS });

      const sid = await this.login();
      const res = await this.sendEnvelope(template, sid);
      const data = await parseStringPromise(
        res.DaneSzukajPodmiotyResponse.DaneSzukajPodmiotyResult
      );

      await this.logout(sid);

      return data.root.dane[0];
    } catch (error: any) {
      return error.body;
    }
  }

  async searchByREGON(REGON: string | string[]) {
    try {
      const template = findCompanyTemplate({ REGON });

      const sid = await this.login();
      const res = await this.sendEnvelope(template, sid);
      const data = await parseStringPromise(
        res.DaneSzukajPodmiotyResponse.DaneSzukajPodmiotyResult
      );

      await this.logout(sid);

      return data.root.dane[0];
    } catch (error: any) {
      return error.body;
    }
  }
}
