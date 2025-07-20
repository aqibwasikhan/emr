import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Logged out' });
  res.cookies.delete('accessToken');
  res.cookies.delete('idToken');
  res.cookies.delete('refreshToken');
  return res;
}
