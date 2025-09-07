"use client";

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center space-y-12">
          
          {/* 404 Number - Clean and Simple */}
          <div className="space-y-6">
            <h1 className="text-8xl font-light text-[var(--color-muted-foreground)] tracking-wider">
              404
            </h1>
            <div className="w-24 h-px bg-[var(--color-border)] mx-auto"></div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-[var(--color-foreground)]">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed max-w-sm mx-auto">
              Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/">
              <Button 
                size="default"
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-primary-foreground)] min-w-[140px]"
              >
                <Home className="w-4 h-4 mr-2" />
                Beranda
              </Button>
            </Link>
          
          </div>

          {/* Contact Info */}
          <div className="pt-8 text-sm text-[var(--color-muted-foreground)]">
            <p>
              Butuh bantuan?{' '}
              <a href="mailto:cognifera.edu@gmail.com" className="text-[var(--color-primary)] hover:underline">
                Hubungi support
              </a>
            </p>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}