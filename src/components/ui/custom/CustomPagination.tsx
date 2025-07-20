'use client';
import { useRouter } from 'next/navigation';
import { serialize } from '@/lib/searchparams';

export default function Pagination({ total, page, limit, scrollToTop }: { total: number; page: number; limit: number; scrollToTop?: boolean }) {
  const router = useRouter();
  const totalPages = Math.ceil(total / limit);

  const goToPage = (newPage: number) => {
    const query = serialize({ page: newPage, limit });
    router.push(`?${query}`);
    if (scrollToTop) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button onClick={() => goToPage(page - 1)} disabled={page <= 1}>
        Prev
      </button>
      <span>{page} / {totalPages}</span>
      <button onClick={() => goToPage(page + 1)} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
}
