import test from 'node:test';
import assert from 'node:assert/strict';
import { SignJWT } from 'jose';

// Kunci unit test saja, bukan kredensial aplikasi.
const keys = {
  supabase: 'unit-test-supabase-key-not-for-production',
  portal: 'unit-test-portal-key-not-for-production',
  siakad: 'unit-test-siakad-key-not-for-production',
  foreign: 'unit-test-untrusted-key-not-for-production',
};
async function token(key, expires = '5m') {
  return new SignJWT({ nim: 'TEST-USER', role: 'asisten' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(new TextEncoder().encode(key));
}
process.env.SUPABASE_JWT_SECRET = keys.supabase;
process.env.VITE_SUPABASE_ANON_KEY = await token(keys.supabase);
process.env.JWT_SECRET = keys.portal;
process.env.SIAKAD_JWT_SECRET = keys.siakad;
delete process.env.VITE_JWT_SECRET;
const { verifyToken } = await import('../api/auth.ts');

for (const issuer of ['supabase', 'portal', 'siakad']) {
  test(`menerima token valid dari ${issuer}`, async () => {
    const payload = await verifyToken(await token(keys[issuer]));
    assert.equal(payload.nim, 'TEST-USER');
  });
}
test('menolak token dari kunci asing', async () => {
  await assert.rejects(verifyToken(await token(keys.foreign)));
});
test('menolak token kedaluwarsa', async () => {
  await assert.rejects(verifyToken(await token(keys.siakad, Math.floor(Date.now() / 1000) - 60)));
});
test('menolak token tanpa tanda tangan', async () => {
  const header = Buffer.from(JSON.stringify({ alg: 'none' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ nim: 'TEST-USER', role: 'asisten' })).toString('base64url');
  await assert.rejects(verifyToken(`${header}.${payload}.`));
});
