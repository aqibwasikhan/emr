import { createEmrAxios } from '@/lib/api/axios';
import { AuthUser } from '@/types/user';
import { NextResponse } from 'next/server';

type LoginApiResponse = {
  success: boolean;
  message: string;
  errors: Record<string, any>;
  data?: AuthUser;
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const client = await createEmrAxios(false); // no auth required for login
    const res = await client.post<LoginApiResponse>('/auth/login/', { email, password });

    const emrRes = res.data;

    if (!emrRes.success || !emrRes.data?.accessToken) {
      return NextResponse.json({
        success: false,
        message: emrRes.message || 'Invalid login',
        errors: emrRes.errors || {}
      }, { status: 401 });
    }

    const { accessToken, idToken, refreshToken, expiresIn } = emrRes.data;

    const response = NextResponse.json({
      success: true,
      message: emrRes.message,
      data: emrRes.data
    });

    response.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: expiresIn
    });

    response.cookies.set({
      name: 'idToken',
      value: idToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: expiresIn
    });

    response.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;

  } catch (err: any) {
    console.error('Login error:', err);

    const errorData = err.response?.data || {};
    const message = errorData.message || err.message || 'Login failed';
    const errors = errorData.errors || {};

    return NextResponse.json({
      success: false,
      message,
      errors
    }, { status: err.response?.status || 500 });
  }
}
