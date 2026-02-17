'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const locales = [
  { code: 'en', label: 'Eng 🇺🇸' },
  { code: 'am', label: 'Amh 🇪🇹' },
  { code: 'om', label: 'Oro 🇪🇹' },
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
    <Select value={locale} onValueChange={switchLocale}>
      <SelectTrigger className="w-auto h-9  bg-green-700 text-white border-none text-sm">
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent>
        {locales.map(({ code, label }) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}



// 'use client';

// import { usePathname, useRouter } from '@/i18n/navigation';
// import { useLocale } from 'next-intl';

// const locales = [
//   { code: 'en', label: 'EN' },
//   { code: 'am', label: 'AM' },
//   { code: 'om', label: 'OM' },
// ];

// export default function LocaleSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   const switchLocale = (newLocale: string) => {
//     if (newLocale !== locale) {
//       router.replace(pathname, { locale: newLocale });
//     }
//   };

//   return (
//     <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-green-600 p-1 shadow-sm">
//       {locales.map(({ code, label }) => (
//         <button
//           key={code}
//           onClick={() => switchLocale(code)}
//           className={`rounded-full px-3 py-1 text-sm font-medium transition
//             ${
//               locale === code
//                 ? 'bg-black text-white'
//                 : 'text-gray-600 hover:bg-gray-100'
//             }`}
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   );
// }




