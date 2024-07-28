import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import CommonNavItem from '@/components/navigation/CommonNavItem'
import { getLanguageData } from '@/lib/languageUtils'

export const MobileNav = ({ defaultLanguage, navSections }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
          aria-label="Open menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle className="text-left font-sans">ETHglossary</SheetTitle>
          <SheetClose>
            <button
              className="absolute top-4 right-4 p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </SheetClose>
        </SheetHeader>
        <Separator className="mt-4 mb-20 " />
        {navSections.map((section, index) => (
          <MobileNavSection
            key={index}
            heading={section.heading}
            items={section.items}
            defaultLanguage={defaultLanguage}
          />
        ))}
      </SheetContent>
    </Sheet>
  )
}

const MobileNavSection = ({ heading, items, defaultLanguage }) => {
  return (
    <>
      <h3 className="text-xs text-[#71768A] uppercase tracking-[2px] mt-6">
        {heading}
      </h3>
      <MobileNavItemList items={items} defaultLanguage={defaultLanguage} />
    </>
  )
}

const MobileNavItemList = ({ items, defaultLanguage }) => {
  const localLanguageName = getLanguageData(defaultLanguage)?.localName

  return (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <CommonNavItem
          key={index}
          href={item.href}
          linkText={item.linkText}
          defaultLanguage={item.defaultLanguage ? defaultLanguage : undefined}
          localLanguageName={localLanguageName}
          translatingNow={item.translatingNow}
          isMobile={true}
        />
      ))}
    </div>
  )
}
