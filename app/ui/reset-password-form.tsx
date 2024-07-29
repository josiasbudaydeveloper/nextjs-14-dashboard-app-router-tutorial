'use client';

import {
	KeyIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { resetPassword } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { systemDefault } from '@/app/lib/theme';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

export default function Form({token} : 
	{ token: string}
) {
	
	const resetPasswordWithToken = resetPassword.bind(null, token);
  const [errorMessage, dispatch] = useFormState(resetPasswordWithToken, undefined);

	return (
		<form action={dispatch}>
			<div className={`rounded-md ${systemDefault.container} p-4 md:p-6`}>
				<div className="mb-4">
					<label htmlFor="password" className={`block text-sm font-medium
						${systemDefault.text}
					`}>
						Password: 
					</label>
					<p className={`mb-2 block text-xs font-medium
						${systemDefault.text}
					`}>
						The password must have at least 8 characters, 
						one special character, one upper case letter and one lower case letter.
					</p>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="password"
								name="password"
								type="password"
								placeholder="Enter the new user password"
								className={`peer block w-full rounded-md border border-gray-200 
									py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
									${systemDefault.border} ${systemDefault.bg} ${systemDefault.text}
								`}
								aria-describedby="password-error"
							/>
							<KeyIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
								-translate-y-1/2 text-gray-500 peer-focus:text-gray-900
								${systemDefault.inputIcon}
							`}/>
						</div>
					</div>
				</div>

				<div>
					<label htmlFor="confirm-password" className={`mb-2 block text-sm font-medium
						${systemDefault.text}
					`}>
						Confirm password: 
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="confirm-password"
								name="confirm-password"
								type="password"
								placeholder="Confirm password"
								className={`peer block w-full rounded-md border border-gray-200 
									py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
									${systemDefault.border} ${systemDefault.bg} ${systemDefault.text}
								`}
								aria-describedby="confirm-password-error"
							/>
							<KeyIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${systemDefault.inputIcon}
              `}/>
						</div>
					</div>
				</div>

				{errorMessage && (
					<p className="mt-2 text-sm text-red-500"  key={errorMessage}>
						{errorMessage}
					</p>
				)}

				<Button className="mt-4 w-full" type="submit">Set new password</Button>
				<GoBack />
			</div>
		</form>
	);
}

function GoBack() {
  const { pending } = useFormStatus();
  
  const { replace } = useRouter();
 
  return (
    <Button className="mt-2 w-full" aria-disabled={pending} onClick={() => {
      replace('/forgot');
    }}>
      Go back to password reset page <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}