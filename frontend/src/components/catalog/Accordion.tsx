import React from "react";
import { Disclosure } from "@headlessui/react";
import { useGetCollectionsQuery } from "../../redux/collections/CollectionApi";
import { useGetCategoriesQuery } from "../../redux/categories/CategoryApi";

export default function Accordion() {
  const { data: collections = [], isLoading: isLoadingCollections } =
    useGetCollectionsQuery();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  return (
    <div className="flex flex-col">
      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full">
              <span className="font-brygada text-lg text-black font-bold">
                COLLECTIONS
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${open ? "transform rotate-180" : ""} w-4 h-4 text-black`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Disclosure.Button>
            <Disclosure.Panel>
              {isLoadingCollections ? (
                <p>Loading...</p>
              ) : (
                <div className="px-2">
                  {collections.map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center space-x-2"
                    >
                      <input type="checkbox" />
                      <p className="text-sm">{collection.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="mt-4">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full">
              <span className="font-brygada text-lg text-black font-bold">
                CATEGORY
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${open ? "transform rotate-180" : ""} w-4 h-4 text-black`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Disclosure.Button>
            <Disclosure.Panel>
              {isLoadingCategories ? (
                <p>Loading...</p>
              ) : (
                <div className="px-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <input type="checkbox" />
                      <p className="text-sm">{category.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
