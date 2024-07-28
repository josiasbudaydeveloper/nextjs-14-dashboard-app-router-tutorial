'use client';

import {
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import 'react-toastify/dist/ReactToastify.css';
import { updateTheme } from '@/app/lib/actions';
import { Button } from '../button';
import { User } from '@/app/lib/definitions';
import { themeType } from '@/app/lib/theme';

export default function Form({ 
  user,
  theme 
} : 
{ 
  user: User;
  theme: themeType; 
}) {
  
  return (
    <form action={updateTheme}>
      <input type='hidden' name='user-email' value={user.email} />
      <div className={`rounded-md ${theme.container} p-4 md:p-6`}>
        <div className="mb-4">
          <label htmlFor="theme" className={`mb-2  block text-sm font-medium
            ${theme.text}
          `}>
            Choose theme:
          </label>
          <div className="relative">
            <select
              id="theme"
              name="theme"
              className={`peer block w-full cursor-pointer rounded-md border 
                py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                ${theme.border} ${theme.bg} ${theme.text}
              `}
              defaultValue={user.theme}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a theme
              </option>
              <option value="dark">
                Dark
              </option>
              <option value="light">
                Light
              </option>
            </select>
            {
              (!user.theme || user.theme == 'system' ) ? 
                <>
                  <SunIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                  -translate-y-1/2 text-gray-500 ${theme.inputIcon}
                  `}/>
                  <MoonIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                  -translate-y-1/2 text-gray-500 ${theme.inputIcon}
                  `}/>
                </> : 
                (user.theme == 'dark') ?
                  <>
                    <MoonIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                    -translate-y-1/2 text-gray-500 ${theme.inputIcon}
                    `}/>
                  </> :
                  <>
                    <SunIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                    -translate-y-1/2 text-gray-500 ${theme.inputIcon}
                    `}/>
                  </>
            }
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit">Update User</Button>
      </div>
    </form>
  );
}