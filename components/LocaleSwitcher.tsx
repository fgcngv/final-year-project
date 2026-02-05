


'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'am', label: 'AM' },
  { code: 'om', label: 'OM' },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-green-600 p-1 shadow-sm">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition
            ${
              locale === code
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}





// 'use client';

// import { usePathname, useRouter } from '@/i18n/navigation';
// import { useLocale } from 'next-intl';

// const locales = [
//   { code: 'en', label: 'English', flag: '🇺🇸' },
//   { code: 'am', label: 'Amharic', flag: '🇪🇹' },
//   { code: 'om', label: 'Oromoo', flag: '🇪🇹' },
// ];

// export default function LocaleSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   return (
//     <select
//       value={locale}
//       onChange={(e) =>
//         router.replace(pathname, { locale: e.target.value })
//       }
//       className="rounded-lg border border-gray-300 bg-green-700 px-3 py-2 text-sm font-medium shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
//     >
//       {locales.map(({ code, label, flag }) => (
//         <option key={code} value={code}>
//           {flag} {label}
//         </option>
//       ))}
//     </select>
//   );
// }
