import { Regon } from '../src';

describe('REGON class', () => {
  test('Should return login ID', async () => {
    const regon = new Regon();
    const sid = await regon.login();

    expect(sid).toBeDefined();
    expect(sid).toHaveLength(20);
  });

  test('Should return true on logout', async () => {
    const regon = new Regon();
    const sid = await regon.login();
    const isOut = await regon.logout(sid);

    expect(isOut).toBe(true);
  });

  test('Should return company on search', async () => {
    const regon = new Regon();
    const data = await regon.search({ REGON: '000331501' });
    expect(data).toBeDefined();
  });

  test('Should return company on searchByNIP', async () => {
    const regon = new Regon();
    const data = await regon.searchByNIP('5422936413');

    expect(data).toBeDefined();
  });

  test('Should return company on searchByKRS', async () => {
    const regon = new Regon();
    const data = await regon.searchByKRS('5422936413');

    expect(data).toBeDefined();
  });

  test('Should return company on searchByKRS', async () => {
    const regon = new Regon();
    const data = await regon.searchByREGON('000331501');

    expect(data).toBeDefined();
  });
});
