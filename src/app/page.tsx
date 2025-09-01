'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState('servers');

  const features = [
    {
      id: 'servers',
      title: 'Server Management',
      description: 'Create, configure, and manage multiple Minecraft servers with ease',
      image: 'https://placehold.co/600x400?text=Server+Management+Dashboard+Interface',
      benefits: ['16GB RAM Support', 'Multiple Server Types', 'Real-time Monitoring', 'Auto-restart']
    },
    {
      id: 'plugins',
      title: 'Plugin Management',
      description: 'Install plugins via URL, upload, or browse our extensive plugin library',
      image: 'https://placehold.co/600x400?text=Plugin+Installation+Interface',
      benefits: ['One-Click Install', 'URL Installation', 'Compatibility Check', 'Auto-Updates']
    },
    {
      id: 'files',
      title: 'File Manager',
      description: 'Comprehensive file management with FTP access and world management',
      image: 'https://placehold.co/600x400?text=File+Manager+Web+Interface',
      benefits: ['Web File Browser', 'FTP Access', 'World Upload/Download', 'Backup System']
    },
    {
      id: 'console',
      title: 'Live Console',
      description: 'Real-time server console with command execution and log monitoring',
      image: 'https://placehold.co/600x400?text=Live+Console+Terminal+Interface',
      benefits: ['Real-time Logs', 'Command History', 'Log Filtering', 'Performance Metrics']
    }
  ];

  const versions = [
    '1.21.4', '1.21.3', '1.21.1', '1.21', '1.20.6', '1.20.4', '1.20.1', '1.19.4', '1.18.2', '1.17.1', '1.16.5', '1.12.2', '1.8.9'
  ];

  const software = [
    { name: 'Paper', desc: 'High Performance' },
    { name: 'Spigot', desc: 'Plugin Support' },
    { name: 'Fabric', desc: 'Mod Support' },
    { name: 'Forge', desc: 'Extensive Mods' },
    { name: 'Vanilla', desc: 'Official' },
    { name: 'Quilt', desc: 'Modern' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MinecraftHost
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-purple-200 hover:text-white hover:bg-purple-600/20">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Professional{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Minecraft
            </span>
            {' '}Server Hosting
          </h1>
          <p className="text-xl text-purple-200 mb-12 max-w-3xl mx-auto">
            Advanced server management platform with 16GB RAM support, plugin management, 
            FTP access, and Lightning AI Studio integration. Create and manage multiple servers 
            with Playit.gg integration for global access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Start Your Server
              </Button>
            </Link>
            <Link href="/servers">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-purple-400 text-purple-200 hover:bg-purple-600/20">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-purple-200">
            Complete server management solution like Aternos, but better
          </p>
        </div>

        <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-purple-900/20 border border-purple-500/20">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                {feature.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-purple-200 mb-6">
                    {feature.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-purple-200">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="rounded-lg shadow-2xl border border-purple-500/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg"></div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Specifications */}
      <div className="bg-black/40 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Server Specifications
            </h2>
            <p className="text-xl text-purple-200">
              Lightning AI Studio powered infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-purple-200">Memory</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-white mb-2">16GB</div>
                <p className="text-purple-300">DDR4 RAM</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-purple-200">Storage</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-white mb-2">500GB</div>
                <p className="text-purple-300">NVMe SSD</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-purple-200">Network</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-white mb-2">1Gbps</div>
                <p className="text-purple-300">Uplink Speed</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-purple-200">Uptime</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <p className="text-purple-300">Guaranteed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Supported Versions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            All Versions Supported
          </h2>
          <p className="text-xl text-purple-200">
            From latest releases to classic versions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-purple-900/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200">Minecraft Versions</CardTitle>
              <CardDescription className="text-purple-300">
                One-click installation of any version
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {versions.map((version) => (
                  <Badge key={version} variant="secondary" className="bg-purple-600/20 text-purple-200 hover:bg-purple-600/30">
                    {version}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200">Server Software</CardTitle>
              <CardDescription className="text-purple-300">
                Support for all major server types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {software.map((soft) => (
                  <div key={soft.name} className="flex justify-between items-center p-3 bg-purple-800/20 rounded-lg">
                    <span className="font-medium text-white">{soft.name}</span>
                    <Badge variant="outline" className="border-purple-400 text-purple-200">
                      {soft.desc}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Server?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of server owners using our platform
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-purple-50">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">MinecraftHost</h3>
              <p className="text-purple-300">
                Professional Minecraft server hosting with Lightning AI Studio integration.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-200 mb-4">Features</h4>
              <ul className="space-y-2 text-purple-400">
                <li>Server Management</li>
                <li>Plugin Installation</li>
                <li>File Management</li>
                <li>Live Console</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-200 mb-4">Support</h4>
              <ul className="space-y-2 text-purple-400">
                <li>Documentation</li>
                <li>Community Discord</li>
                <li>24/7 Support</li>
                <li>Video Tutorials</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-200 mb-4">Integration</h4>
              <ul className="space-y-2 text-purple-400">
                <li>Lightning AI Studio</li>
                <li>Playit.gg Tunnels</li>
                <li>FTP Access</li>
                <li>API Access</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-500/20">
            <p className="text-center text-purple-400">
              © 2024 MinecraftHost. Built with Lightning AI Studio.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}