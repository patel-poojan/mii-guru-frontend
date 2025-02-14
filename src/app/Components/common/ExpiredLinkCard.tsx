import { Card, CardContent } from '@/components/ui/card';
import { LucideBadgeAlert } from 'lucide-react';

const ExpiredLinkCard = ({
  onResend,
  email,
}: {
  onResend: (email: string) => void;
  email: string;
}) => (
  <Card className='w-full max-w-lg rounded-[36px] p-0 border-[#ACACAC]'>
    <CardContent className='p-6 sm:p-8'>
      <div className='flex flex-col items-center gap-6 w-full'>
        <div className='flex flex-col items-center gap-6 w-full'>
          <LucideBadgeAlert
            className='text-yellow text-6xl md:text-8xl'
            style={{ height: '112px', width: '112px' }}
          />
          <p className='text-3xl text-center text-black font-normal'>
            Your link has been expired
          </p>
          <p className='text-xl text-center text-black'>
            The link you clicked on has expired due to inactivity. To complete
            the action, please request a new link.
          </p>
          <span
            className='text-yellow ms-1 hover:text-yellow-500 hover:underline hover:cursor-pointer'
            onClick={() => onResend(email)}
          >
            Resend
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ExpiredLinkCard;
