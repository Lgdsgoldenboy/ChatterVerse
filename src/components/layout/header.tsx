
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookOpen, Sparkles, BarChart2, ShieldCheck, LogOut, Settings, User as UserIcon, LogIn, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '/home', label: 'Feed', icon: <Sparkles className="h-4 w-4" /> },
  { href: '/explore', label: 'Explore', icon: <BookOpen className="h-4 w-4" /> },
  { href: '/dashboard', label: 'Dashboard', icon: <BarChart2 className="h-4 w-4" /> },
  { href: '/moderate', label: 'Moderate', icon: <ShieldCheck className="h-4 w-4" /> },
];

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // In a real app, you would check the user's auth status here
    // For this demo, we'll toggle it for demonstration purposes
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
  }, []);

  const handleLoginToggle = () => {
    const newStatus = !isLoggedIn;
    setIsLoggedIn(newStatus);
    localStorage.setItem('isLoggedIn', String(newStatus));
  };

  const UserNav = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary/50">
            <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLoginToggle}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  
  const AuthButtons = () => (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline">
        <Link href="/auth/login"><LogIn className="mr-2 h-4 w-4" /> Log In</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/signup"><UserPlus className="mr-2 h-4 w-4" /> Sign Up</Link>
      </Button>
    </div>
  );

  if (!isMounted) {
    return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"><div className="container flex h-16 items-center"></div></header>;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary-foreground fill-primary" />
            <span className="font-headline text-2xl font-bold text-foreground">ChatterVerse</span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? <UserNav /> : <AuthButtons />}
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                 <Link href="/" className="flex items-center gap-2 mb-8">
                    <BookOpen className="h-7 w-7 text-primary-foreground fill-primary" />
                    <span className="font-headline text-2xl font-bold text-foreground">ChatterVerse</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground">
                       {link.icon} {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 border-t pt-8">
                  {isLoggedIn ? <UserNav /> : <AuthButtons />}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
