'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { getUserDirectory } from '@/app/actions/user-management';
import { useAuthStore } from '@/stores/useAuthStore';

export default function UserDirectoryLoader() {
    const login = useAuthStore((state) => state.login);

    useEffect(() => {
        const fetchDirectory = async () => {
            try {
                const res = await getUserDirectory();
                console.log('User Directory:', res);

                if (res?.success) {
                    login(res.data);
                } else {
                    toast.error(res.message || 'Failed to load user directory');
                }
            } catch (err) {
                console.error('Error loading user directory:', err);
                toast.error('Something went wrong while loading directory');
            }
        };

        fetchDirectory();
    }, []);

    return null; // nothing to render
}
