import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthUser } from '@/types/user';


interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: AuthUser | null;
}

export function UserAvatarProfile({
  className,
  showInfo = true,
  user
}: UserAvatarProfileProps) {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage src={user?.imageUrl || ''} alt={user?.firstName+' '+user?.lastName || ''} />
        <AvatarFallback className='rounded-lg text-base'>
          {(user?.firstName+' '+user?.lastName)?.slice(0, 2)?.toUpperCase() || 'CN'}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>{user?.firstName+' '+user?.lastName || ''}</span>
          <span className='truncate text-xs'>
            {user?.email || ''}
          </span>
        </div>
      )}
    </div>
  );
}
