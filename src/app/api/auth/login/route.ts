import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { LoginRequest, AuthResponse, AuthSession } from '@/types/user';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { username, password } = body;

    // Find user by username or email
    let user = await db.getUserByUsername(username);
    if (!user) {
      user = await db.getUserByEmail(username);
    }

    if (!user) {
      const response: AuthResponse = {
        success: false,
        message: 'Invalid credentials'
      };
      return NextResponse.json(response, { status: 401 });
    }

    // In a real app, you would hash and compare passwords
    // For demo purposes, we'll accept any password
    const validPassword = password.length >= 4;
    
    if (!validPassword) {
      const response: AuthResponse = {
        success: false,
        message: 'Invalid credentials'
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Generate session token
    const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: AuthSession = {
      id: `session_${Date.now()}`,
      userId: user.id,
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + (body.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)),
      ipAddress: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      active: true
    };

    await db.createSession(session);

    // Update last login
    await db.updateUser(user.id, { lastLogin: new Date() });

    const response: AuthResponse = {
      success: true,
      user,
      token,
      message: 'Login successful'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Login error:', error);
    const response: AuthResponse = {
      success: false,
      message: 'An error occurred during login'
    };
    return NextResponse.json(response, { status: 500 });
  }
}