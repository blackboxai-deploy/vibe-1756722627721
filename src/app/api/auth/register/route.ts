import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { RegisterRequest, AuthResponse, User, AuthSession } from '@/types/user';

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();
    const { username, email, displayName, password } = body;

    // Validation
    if (!username || !email || !displayName || !password) {
      const response: AuthResponse = {
        success: false,
        message: 'All fields are required'
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (password.length < 6) {
      const response: AuthResponse = {
        success: false,
        message: 'Password must be at least 6 characters'
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
      const response: AuthResponse = {
        success: false,
        message: 'Username is already taken'
      };
      return NextResponse.json(response, { status: 409 });
    }

    const existingEmail = await db.getUserByEmail(email);
    if (existingEmail) {
      const response: AuthResponse = {
        success: false,
        message: 'Email is already registered'
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create user
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user: User = {
      id: userId,
      username,
      email,
      displayName,
      createdAt: new Date(),
      role: 'user',
      preferences: {
        theme: 'dark',
        language: 'en',
        timezone: 'UTC',
        notifications: {
          serverStart: true,
          serverStop: true,
          serverCrash: true,
          playerJoin: false,
          playerLeave: false,
          backupComplete: true,
          lowDiskSpace: true,
          highCpuUsage: true,
          email: true,
          browser: true
        },
        consoleSettings: {
          autoScroll: true,
          maxLines: 1000,
          fontSize: 14,
          theme: 'dark',
          timestampFormat: 'HH:mm:ss',
          logLevels: ['INFO', 'WARN', 'ERROR']
        }
      },
      stats: {
        serversCreated: 0,
        totalUptime: 0,
        commandsExecuted: 0,
        filesUploaded: 0,
        pluginsInstalled: 0,
        backupsCreated: 0
      }
    };

    await db.createUser(user);

    // Generate session token
    const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: AuthSession = {
      id: `session_${Date.now()}`,
      userId: user.id,
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      ipAddress: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      active: true
    };

    await db.createSession(session);

    const response: AuthResponse = {
      success: true,
      user,
      token,
      message: 'Registration successful'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Registration error:', error);
    const response: AuthResponse = {
      success: false,
      message: 'An error occurred during registration'
    };
    return NextResponse.json(response, { status: 500 });
  }
}