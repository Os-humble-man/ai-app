import { RegisterForm } from '@/components/register-form';

export default function RegisterPage() {
   return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
         <div className="w-full max-w-md">
            <RegisterForm />
         </div>
      </div>
   );
}
