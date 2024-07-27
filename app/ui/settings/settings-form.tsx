'use client';

import {
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import darkTheme from '@/app/lib/dark-theme';
import 'react-toastify/dist/ReactToastify.css';
import { useFormState } from 'react-dom';
import { updateTheme } from '@/app/lib/actions';
import { Button } from '../button';
import { User } from '@/app/lib/definitions';

export default function Form({ user } : { user: User }) {
  const theme = user.theme;
  
  return (
    <form action={updateTheme}>
      <input type='hidden' name='user-email' value={user.email} />
      <div className={`rounded-md bg-gray-50 ${darkTheme.container} p-4 md:p-6`}>
        <div className="mb-4">
          <label htmlFor="theme" className={`mb-2  block text-sm font-medium
            ${darkTheme.text}
          `}>
            Choose theme:
          </label>
          <div className="relative">
            <select
              id="theme"
              name="theme"
              className={`peer block w-full cursor-pointer rounded-md border 
                border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                ${darkTheme.border} ${darkTheme.bg} ${darkTheme.text}
              `}
              defaultValue={theme}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a theme
              </option>
              <option value="system">
                System Default
              </option>
              <option value="dark">
                Dark
              </option>
              <option value="light">
                Light
              </option>
            </select>
            {
              (!theme || theme == 'system' ) ? 
                <>
                  <SunIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                  -translate-y-1/2 text-gray-500 ${darkTheme.inputIcon}
                  `}/>
                  <MoonIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                  -translate-y-1/2 text-gray-500 ${darkTheme.inputIcon}
                  `}/>
                </> : 
                (theme == 'dark') ?
                  <>
                    <MoonIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                    -translate-y-1/2 text-gray-500 ${darkTheme.inputIcon}
                    `}/>
                  </> :
                  <>
                    <SunIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                    -translate-y-1/2 text-gray-500 ${darkTheme.inputIcon}
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