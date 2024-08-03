import ThemeSwitch from '@/components/ThemeSwitch'
import CommonNavItem from '@/components/navigation/CommonNavItem'
import LogoLink from '../LogoLink'

export const DesktopNav = ({ navSections, defaultLanguage }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <LogoLink />
      <div className="flex items-center">
        {navSections.map((section, index) => {
          if (section.heading === 'Account') return null
          return (
            <DesktopNavItemsList
              key={index}
              items={section.items}
              defaultLanguage={defaultLanguage}
            />
          )
        })}
        <ThemeSwitch />
      </div>
      {navSections.map((section, index) => {
        if (section.heading !== 'Account') return null
        return (
          <DesktopNavItemsList
            key={index}
            items={section.items}
            defaultLanguage={defaultLanguage}
          />
        )
      })}
    </div>
  )
}

const DesktopNavItemsList = ({ items, defaultLanguage }) => {
  return (
    <div className="flex gap-6">
      {items.map((item, index) => (
        <CommonNavItem
          key={index}
          href={item.href}
          linkText={item.linkText}
          defaultLanguage={defaultLanguage}
        />
      ))}
    </div>
  )
}
