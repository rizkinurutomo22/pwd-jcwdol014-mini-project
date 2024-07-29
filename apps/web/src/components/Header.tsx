'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ListMenu from './template/ListMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getCookie, deleteCookie } from '@/actions/cookies'; // Sesuaikan dengan path yang benar untuk fungsi cookies

function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchModalRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/events/search?name=${searchQuery}`,
      );
      setSuggestions(response.data.events);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      searchModalRef.current &&
      !searchModalRef.current.contains(e.target as Node)
    ) {
      closeSearch();
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('purchaseId');
    setIsLoggedIn(false);
    // Optional: Redirect to home page after logout
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 h-20 place-content-center bg-white px-10 py-0 shadow-sm md:px-20">
      <div>
        <nav className="mb-1 flex items-center justify-between">
          <Link
            href={'/'}
            className="flex items-center gap-4 text-black hover:text-black"
          >
            <h1 className="mx-0 my-0 text-3xl font-bold md:text-4xl">
              <span className="hidden text-purple-600 md:block">eventme</span>
              <span className="block text-purple-600 md:hidden">em</span>
            </h1>
          </Link>
          <ul className="hidden xl:flex xl:gap-16">
            <ListMenu />
          </ul>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSearch}
              className="flex items-center bg-slate-100 px-4 text-purple-600 hover:bg-white md:px-8 lg:px-8"
            >
              <FontAwesomeIcon
                icon={faSearch}
                size="sm"
                className="px-2 py-1 md:mr-2 md:p-0"
              />
              <span className="hidden md:inline">Search</span>
            </button>
            <button
              onClick={toggleNavbar}
              className="block w-16 bg-slate-100 text-sm text-purple-600 hover:bg-white xl:hidden"
            >
              {isNavbarOpen ? (
                <FontAwesomeIcon icon={faXmark} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faBars} size="lg" />
              )}
            </button>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-purple-600 px-6 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-500"
              >
                Logout
              </button>
            ) : (
              <Link href={'/login'}>
                <button className="bg-purple-600 px-6 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-500">
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          id="search-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
          <div
            ref={searchModalRef}
            className="fixed top-6 w-full max-w-lg rounded-lg bg-white shadow-lg"
          >
            <div className="p-4">
              <form
                onSubmit={handleSearchSubmit}
                className="group flex items-center"
              >
                <input
                  id="input-search-event"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search Event"
                  autoFocus
                  className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="submit"
                  className="rounded-l-none rounded-r-lg bg-purple-600 px-4 py-2 text-white ring-2 ring-purple-600 hover:bg-purple-700"
                >
                  Search
                </button>
              </form>
              {loading && (
                <div className="mt-2 text-center text-purple-600">
                  Loading...
                </div>
              )}
              {suggestions.length > 0 && (
                <ul className="mt-2 rounded-lg border border-gray-300 bg-white shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <Link key={index} href={`/event/${suggestion.id}`}>
                      <li className="px-4 py-2 hover:bg-gray-200">
                        {suggestion.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
              {suggestions.length === 0 && !loading && (
                <div className="mt-2 text-center text-gray-600">
                  No events found
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navbar Dropdown */}
      <div
        className={`absolute left-0 right-0 top-20 bg-gray-100 opacity-90 transition-transform duration-300 xl:hidden ${
          isNavbarOpen ? 'block' : 'hidden'
        }`}
      >
        <nav>
          <ul className="grid w-full gap-3 bg-gray-100 p-4">
            <ListMenu />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
