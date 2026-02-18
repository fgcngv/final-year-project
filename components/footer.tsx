"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-50 z-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-wide">
              Ethio<span className="text-emerald-400">Green</span>
            </h2>
            <p className="text-sm text-emerald-200">
              Premium Ethiopian green coffee beans sourced directly from farmers
              and cooperatives across Ethiopia.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
              Shop
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/product" className="hover:text-emerald-400">
                  All Coffee
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400">
                  Origins
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400">
                  Quality Grades
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-emerald-200">
              <li className="flex items-center gap-2">
                <MapPin size={16} />Bahir Dar, Ethiopia
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +251 96 106 43 70
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> finalyear@ethiogreen.com
              </li>
            </ul>
            <div className="flex gap-4 pt-2">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/beeki.birhanu"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 hover:text-emerald-400" />
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/birhanugezahegn099?igsh=YzljYTk1ODg3Zg=="
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 hover:text-emerald-400" />
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="#"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 hover:text-emerald-400" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-emerald-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-emerald-300 md:flex-row">
          <p>
            © {new Date().getFullYear()} EthioGreen Coffee. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-emerald-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
