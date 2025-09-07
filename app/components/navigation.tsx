
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChefHat, BookOpen, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { LanguageSwitcher } from './language-switcher';

export function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navigation = [
    {
      name: t('generate'),
      href: '/',
      icon: ChefHat,
      current: pathname === '/'
    },
    {
      name: t('savedRecipes'),
      href: '/saved',
      icon: BookOpen,
      current: pathname === '/saved'
    }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">{t('appTitle')}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      item.current
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
