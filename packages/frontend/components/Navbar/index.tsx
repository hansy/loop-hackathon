import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { PlusSmIcon } from "@heroicons/react/solid";
import Link from "next/link";

type NavItem = {
  name: string;
  href: string;
};

const navigation: Array<NavItem> = [];

const truncatedAddress = (address: string, length: number = 10) => {
  if (address.length <= length) {
    return address;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return address.slice(0, length) + "...";
};

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useMoralis();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {() => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href={isAuthenticated ? "/dashboard" : "/"}>
                    <a className="text-gray-50 text-2xl font-bold">LOOP</a>
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        item.href === router.pathname
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                      aria-current={
                        item.href === router.pathname ? "page" : undefined
                      }
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {isAuthenticated && (
                  <div className="flex-shrink-0">
                    <Link href="/upload">
                      <a className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                        <PlusSmIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        <span>Add video</span>
                      </a>
                    </Link>
                  </div>
                )}
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {isAuthenticated && (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                          <span className="sr-only">Open user menu</span>
                          <div className="bg-gray-50 px-3 py-2 rounded">
                            <span className="text-gray-800">
                              {truncatedAddress(user?.get("ethAddress"))}
                            </span>
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href={`/${user?.get("ethAddress")}`}>
                                <a className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-800 hover:text-gray-50">
                                  My Page
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-800 hover:text-gray-50"
                                onClick={logout}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                  {/* <div className="bg-gray-50 px-3 py-2 rounded">
                    <span className="text-gray-800">
                      {truncatedAddress(user?.get("ethAddress"))}
                    </span>
                  </div>
                  <button type="button" className="ml-2 text-gray-50">
                    Logout
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
