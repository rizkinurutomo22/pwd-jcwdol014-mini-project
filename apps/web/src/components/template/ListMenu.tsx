import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function ListMenu() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const links = [
    { href: '/upcoming-event', text: 'Upcoming' },
    { href: '/premiere-event', text: 'Premiere' },
    {
      href: '/all-event',
      text: 'Category',
      dropdown: true,
      sublinks: [
        { href: '/music', text: 'Music' },
        { href: '/stand-up', text: 'Stand Up' },
        { href: '/festival', text: 'Festival' },
      ],
    },
  ];

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <>
      {links.map((link, index) => (
        <li
          className="relative align-middle"
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={link.href}
            className="flex items-center text-base font-semibold hover:text-purple-600"
          >
            {link.text}
            {link.dropdown && (
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`ml-2 transform transition-transform duration-300 ${
                  activeIndex === index
                    ? 'rotate-180 text-purple-600'
                    : 'rotate-0 text-black'
                }`}
              />
            )}
          </Link>
          {link.dropdown && activeIndex === index && (
            <div className="absolute left-1/2 top-full ml-1 w-32 -translate-x-1/2 transform content-center rounded-lg bg-white py-4 shadow-lg">
              <ul>
                {link.sublinks.map((sublink, subindex) => (
                  <li
                    key={subindex}
                    className="px-6 py-2 text-base font-semibold"
                  >
                    <Link href={sublink.href}>{sublink.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </>
  );
}

export default ListMenu;
