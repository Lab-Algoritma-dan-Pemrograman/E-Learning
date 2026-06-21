export default async function handler(req: any, res: any) {
  return res.status(404).json({ error: 'Not Found' });
}
