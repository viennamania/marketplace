import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {

  //const user = await kv.hgetall('user:me');

  ///const user = await kv.hgetall('user:nevertry');

  //const user = await kv.hgetall('0xabc');

  const user = await kv.hgetall('0xabc');

  ///const user = await kv.get(request.query.id as string);

  

  return response.status(200).json(user);



}