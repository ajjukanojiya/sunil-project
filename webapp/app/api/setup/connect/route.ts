import { NextResponse } from 'next/server';
import { connectPlatform } from '@/app/setup/actions';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { platform, extraData } = data;

    if (!platform) {
      return NextResponse.json({ error: 'Platform is required' }, { status: 400 });
    }

    await connectPlatform(platform, extraData);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
