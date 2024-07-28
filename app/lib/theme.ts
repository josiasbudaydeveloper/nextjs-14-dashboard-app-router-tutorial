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

/* export const systemDefault : themeType = {
  bg: `${lightTheme.bg} dark:${darkTheme.bg}`,
  container: `${lightTheme.container} dark:${darkTheme.container}`,
  title: `${lightTheme.title} dark:${darkTheme.title}`,
  text: `${lightTheme.text} dark:${darkTheme.text}`,
  border: `${lightTheme.border} dark:${darkTheme.border}`,
  notActiveText: `${lightTheme.notActiveText} dark:${darkTheme.notActiveText}`,
  divide: `${lightTheme.divide} dark:${darkTheme.divide}`,

  // Actions
  activeLink: `${lightTheme.activeLink} dark:${darkTheme.activeLink}`,
  hoverBg: `${lightTheme.hoverBg} dark:${darkTheme.hoverBg}`,
  hoverText: `${lightTheme.hoverText} dark:${darkTheme.hoverText}`,
  hoverBorder: `${lightTheme.hoverBorder} dark:${darkTheme.hoverBorder}`,
  inputIcon: `${lightTheme.inputIcon} dark:${darkTheme.inputIcon}`
} */

export const systemDefault = {
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