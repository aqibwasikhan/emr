// 'use client';

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger
// } from '@/components/ui/popover';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator
// } from '@/components/ui/command';
// import { Button } from '@/components/ui/button';
// import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
// import { cn } from '@/lib/utils';
// import * as React from 'react';
// import { useQueryState } from 'nuqs';
// import { ChevronDown } from 'lucide-react';

// export type SimpleSelectOption = {
//   label: string;
//   value: string | undefined;
// };

// interface DataTableSimpleSelectProps {
//   title: string;
//   queryKey: string;
//   options: SimpleSelectOption[];
//   multiple?: boolean;
// }

// export function DataTableSimpleSelect({
//   title,
//   queryKey,
//   options,
//   multiple = false
// }: DataTableSimpleSelectProps) {
//   const [open, setOpen] = React.useState(false);

//   const [queryValue, setQueryValue] = useQueryState(queryKey);
//   const selectedValues = React.useMemo(() => {
//     if (!multiple) return new Set(queryValue ? [queryValue] : []);
//     return new Set(queryValue?.split(',') ?? []);
//   }, [queryValue, multiple]);

//   const toggleValue = (value?: string) => {
//     const newValues = new Set(selectedValues);

//     if (value === undefined) {
//       // "All" selected
//       setQueryValue(null);
//       return;
//     }

//     if (!multiple) {
//       setQueryValue(value);
//       setOpen(false);
//       return;
//     }

//     if (newValues.has(value)) {
//       newValues.delete(value);
//     } else {
//       newValues.add(value);
//     }

//     setQueryValue(newValues.size ? Array.from(newValues).join(',') : null);
//   };

//   const displayLabel = () => {
//     if (!selectedValues.size) return 'All';
//     if (!multiple) {
//       return options.find((opt) => opt.value === queryValue)?.label ?? 'All';
//     }
//     return `${selectedValues.size} selected`;
//   };

//   const clearAll = () => {
//     setQueryValue(null);
//     setOpen(false);
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline_default"
//           size="sm"
//           role="combobox"
//           className="h-8 rounded-xl border-none"
//         >
//          <span className='font-medium'>
//           {title}:{' '}
//           </span> 
//           <span className="ml-1">{displayLabel()}</span>
//           <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-44 p-0 rounded-xl">
//         <Command className='rounded-xl'>
//           <CommandInput placeholder={`Search ${title}...`} />
//           <CommandList >
//             <CommandEmpty>No options found.</CommandEmpty>
//             <CommandGroup>
//               {options.map((opt:any) => {
//                 const isSelected = selectedValues.has(opt.value);
//                 return (
//                   <CommandItem
//                     key={opt.label}
//                     onSelect={() => toggleValue(opt.value)}
//                     className='flex items-center justify-between'
//                   >
//                     {opt.label}
//                     <CheckIcon
//                       className={cn(
//                         'h-4 w-4',
//                         isSelected ? 'opacity-100' : 'opacity-0'
//                       )}
//                     />
                    
//                   </CommandItem>
//                 );
//               })}
//             </CommandGroup>
//             {selectedValues.size > 0 && (
//               <>
//                 <CommandSeparator />
//                 <CommandGroup>
//                   <CommandItem
//                     onSelect={clearAll}
//                     className="justify-center text-center"
//                   >
//                     Clear filters
//                   </CommandItem>
//                 </CommandGroup>
//               </>
//             )}
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export type SimpleSelectOption = {
  label: string;
  value: string | undefined;
};

interface DataTableSimpleSelectProps {
  title: string;
  queryKey: string;
  options: SimpleSelectOption[];
  multiple?: boolean;
}

export function DataTableSimpleSelect({
  title,
  queryKey,
  options,
  multiple = false
}: DataTableSimpleSelectProps) {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryValue = searchParams.get(queryKey);
  const selectedValues = React.useMemo(() => {
    if (!multiple) return new Set(queryValue ? [queryValue] : []);
    return new Set(queryValue?.split(',') ?? []);
  }, [queryValue, multiple]);

  const updateParam = (newValue: string | null) => {
    const params = new URLSearchParams(window.location.search);

    if (newValue) {
      params.set(queryKey, newValue);
    } else {
      params.delete(queryKey);
    }

    // Always reset pagination
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  const toggleValue = (value?: string) => {
    const newValues = new Set(selectedValues);

    if (value === undefined) {
      updateParam(null);
      return;
    }

    if (!multiple) {
      updateParam(value);
      setOpen(false);
      return;
    }

    if (newValues.has(value)) {
      newValues.delete(value);
    } else {
      newValues.add(value);
    }

    updateParam(newValues.size ? Array.from(newValues).join(',') : null);
  };

  const displayLabel = () => {
    if (!selectedValues.size) return 'All';
    if (!multiple) {
      return options.find((opt) => opt.value === queryValue)?.label ?? 'All';
    }
    return `${selectedValues.size} selected`;
  };

  const clearAll = () => {
    updateParam(null);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline_default"
          size="sm"
          role="combobox"
          className="h-8 rounded-xl border-none"
        >
          <span className="font-medium">{title}: </span>
          <span className="ml-1">{displayLabel()}</span>
          <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-0 rounded-xl">
        <Command className="rounded-xl">
          {/* <CommandInput placeholder={`Search ${title}...`} /> */}
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt:any,i) => {
                const isSelected = selectedValues.has(opt.value);
                return (
                  <CommandItem
                    key={opt.label+i}
                    onSelect={() => toggleValue(opt.value)}
                    className="flex items-center justify-between"
                  >
                    {opt.label}
                    <CheckIcon
                      className={cn(
                        'h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearAll}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
