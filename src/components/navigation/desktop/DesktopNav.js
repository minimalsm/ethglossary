import CommonNavItem from '@/components/navigation/CommonNavItem'

export const DesktopNav = ({ navSections, defaultLanguage }) => {
  return (
    <>
      {navSections.map((section, index) => (
        <DesktopNavItemsList
          key={index}
          items={section.items}
          defaultLanguage={defaultLanguage}
        />
      ))}
    </>
  )
}

const DesktopNavItemsList = ({ items, defaultLanguage }) => {
  console.log(items)
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
