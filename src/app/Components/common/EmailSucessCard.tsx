import { Card, CardContent } from '@/components/ui/card';
import { FaRegCircleCheck } from 'react-icons/fa6';

const EmailSucessCard = ({
  email,
  onResend,
}: {
  email: string;
  onResend: (email: string) => void;
}) => (
  <Card className='w-full max-w-lg rounded-[36px] p-0 border-[#ACACAC]'>
    <CardContent className='p-6 sm:p-8'>
      <div className='flex flex-col items-center gap-6 w-full'>
        <div className='flex flex-col items-center gap-6 w-full'>
          <FaRegCircleCheck className='text-yellow text-6xl md:text-8xl' />
          <p className='text-2xl text-center text-dark-blue font-normal'>
            A verification link has been sent to your registered mail {email}
          </p>
          <p className='text-lg text-center text-black'>
            {`Didn't received link?`}
            <span
              className='text-yellow ms-1 hover:text-yellow-500 hover:underline hover:cursor-pointer'
              onClick={() => onResend(email)}
            >
              Resend
            </span>
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default EmailSucessCard;
