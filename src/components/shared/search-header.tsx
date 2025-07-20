// components/ui/SearchHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { CustomInput } from '@/components/ui/custom/CustomInput';

interface SearchHeaderProps {
  paramKey?: string; // query param name, default = "search"
  placeholder?: string;
  isPage?: boolean; // if true, will reset pagination to 1
}

export function SearchHeader({
  paramKey = 'search',
  placeholder = 'Search...',
  isPage = false,
}: SearchHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get(paramKey) || '';
  const [searchInput, setSearchInput] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // ✅ preserves all params

    if (debouncedSearch) {
      params.set(paramKey, debouncedSearch);
    } else {
      params.delete(paramKey);
    }
    if (isPage) {
      // Always reset pagination
      params.set('page', '1');
    }

    // Use `push` to preserve scroll position and history

      router.push(`?${params.toString()}`);
  }, [debouncedSearch]);

  return (
    <CustomInput
      placeholder={placeholder}
      isSearch
      size="xs"
      value={searchInput}
      inputClassName="pt-2"
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}
// 'use client';

// import { useDebounce } from '@/hooks/use-debounce';
// import { useEffect, useState } from 'react';
// import { useQueryState, parseAsString, parseAsInteger } from 'nuqs';
// import { CustomInput } from '@/components/ui/custom/CustomInput';

// interface SearchHeaderProps {
//   paramKey?: string;        // Query param name, default = "search"
//   placeholder?: string;     // Placeholder for input
//   isPage?: boolean;         // If true, will reset pagination to page 1
// }

// export function SearchHeader({
//   paramKey = 'search',
//   placeholder = 'Search...',
//   isPage = false,
// }: SearchHeaderProps) {
//   const [searchValue, setSearchValue] = useQueryState(paramKey, parseAsString.withDefault(''));
//   const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

//   const [input, setInput] = useState(searchValue);
//   const debouncedInput = useDebounce(input, 500);

//   useEffect(() => {
//     setSearchValue(debouncedInput);
//     if (isPage) {
//       setPage(1);
//     }
//   }, [debouncedInput]);

//   return (
//     <CustomInput
//       placeholder={placeholder}
//       isSearch
//       size="xs"
//       value={input}
//       inputClassName="pt-2"
//       onChange={(e) => setInput(e.target.value)}
//     />
//   );
// }
