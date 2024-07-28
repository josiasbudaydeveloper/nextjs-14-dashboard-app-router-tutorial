export type themeType = {
  bg: string;
  container: string;
  title: string;
  text: string;
  border: string;
  notActiveText: string;
  divide: string;
  activeLink: string;
  hoverBg: string;
  hoverText: string;
  hoverBorder: string;
  inputIcon: string;
}

export const systemDefault : themeType = {
  bg: 'bg-white dark:bg-[#181818]',
  container: 'bg-gray-100 dark:bg-[#212121]',
  title: 'text-black dark:text-white',
  text: 'text-gray-700 dark:text-[#ebebeb]',
  border: 'border-gray-100 dark:border-gray-500',
  notActiveText: 'dark:text-gray-500',
  divide: 'dark:divide-gray-500',

  // Actions
  activeLink: 'dark:bg-[#1c2932] dark:hover:bg-[#1c2932]',
  hoverBg: 'dark:hover:bg-[#1c2932]',
  hoverText: 'dark:hover:text-blue-600',
  hoverBorder: 'dark:hover:border-blue-600',
  inputIcon: 'dark:peer-focus:text-gray-500'
}

export const darkTheme : themeType = {
  bg: 'bg-[#181818]',
  container: 'bg-[#212121]',
  title: 'text-white',
  text: 'text-[#ebebeb]',
  border: 'border-gray-500',
  notActiveText: 'text-gray-500',
  divide: 'divide-gray-500',

  // Actions
  activeLink: 'bg-[#1c2932] hover:bg-[#1c2932]',
  hoverBg: 'hover:bg-[#1c2932]',
  hoverText: 'hover:text-blue-600',
  hoverBorder: 'hover:border-blue-600',
  inputIcon: 'peer-focus:text-gray-500'
}

export const lightTheme : themeType = {
  bg: 'bg-white',
  container: 'bg-gray-50',
  title: 'text-black',
  text: 'text-gray-900',
  border: 'border-gray-200',
  notActiveText: '',
  divide: 'divide-gray-200',

  // Actions
  activeLink: 'bg-sky-100',
  hoverBg: 'hover:bg-sky-100',
  hoverText: 'hover:text-blue-600',
  hoverBorder: 'hover:border-blue-600',
  inputIcon: 'peer-focus:text-gray-900'
}