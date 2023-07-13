import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/welcome' };

export async function middleware() {
   
   const greeting = await get('greeting');


  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js
  return NextResponse.json(greeting);

   


}


/*
import { NextResponse } from "next/server";
export default function middleware(req) {
   if(req.nextUrl.pathname =="/api/welcome"){
      if(req.method != 'POST'){
       return new NextResponse("Cannot access this endpoint with " + req.method, { status: 400})
      }
   return NextResponse.next();
   }
}
*/