import { SearchParameters } from './interfaces';

export const loginTemplate = (key: string): string => `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>
    </soap:Header>
    <soap:Body>
        <ns:Zaloguj>
            <ns:pKluczUzytkownika>${key}</ns:pKluczUzytkownika>
        </ns:Zaloguj>
    </soap:Body>
</soap:Envelope>
`;

export const logoutTemplate = (sid: string): string => `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj</wsa:Action>
    </soap:Header>
    <soap:Body>
        <ns:Wyloguj>
            <ns:pIdentyfikatorSesji>${sid}</ns:pIdentyfikatorSesji>
        </ns:Wyloguj>
    </soap:Body>
</soap:Envelope>
`;

export const findCompanyTemplate = (params: SearchParameters): string => {
  let regonType = 'standard';

  if (params.REGON?.length === 9) {
    regonType = 'size9';
  }

  if (params.REGON?.length === 14) {
    regonType = 'size14';
  }

  return `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty</wsa:Action>
    </soap:Header>
    <soap:Body>
        <ns:DaneSzukajPodmioty>
            <ns:pParametryWyszukiwania>
                ${params.REGON ? `<dat:Regon>${params.REGON}</dat:Regon>` : ''}
                ${params.NIP ? `<dat:Nip>${params.NIP}</dat:Nip>` : ''}
                ${params.KRS ? `<dat:Krs>${params.KRS}</dat:Krs>` : ''}
                ${
                  Array.isArray(params.NIP)
                    ? `<dat:Nipy>${params.NIP.join(',')}</dat:Nipy>`
                    : ''
                }
                ${
                  Array.isArray(params.REGON) && regonType === 'size9'
                    ? `<dat:Regony9zn>${params.REGON.join(',')}</dat:Regony9zn>`
                    : ''
                }
                ${
                  Array.isArray(params.KRS)
                    ? `<dat:Krsy>${params.KRS}</dat:Krsy>`
                    : ''
                }
                ${
                  Array.isArray(params.REGON) && regonType === 'size14'
                    ? `<dat:Regony14zn>${params.REGON}</dat:Regony14zn>`
                    : ''
                }
            </ns:pParametryWyszukiwania>
        </ns:DaneSzukajPodmioty>
    </soap:Body>
</soap:Envelope>
`;
};
