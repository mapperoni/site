"use client";

import {
  type AutocompleteApi,
  type AutocompleteCollection,
  type AutocompleteState,
  createAutocomplete,
} from "@algolia/autocomplete-core";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, forwardRef, useId, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import clsx from "@/lib/clsx";
import { navigation } from "@/lib/navigation";
import type { Result } from "@/markdoc/search";

type EmptyObject = Record<string, never>;
type Autocomplete = AutocompleteApi<
  Result,
  React.SyntheticEvent,
  React.MouseEvent,
  React.KeyboardEvent
>;

function HighlightQuery({ text, query }: { text: string; query: string }) {
  return (
    <Highlighter
      highlightClassName="group-aria-selected:underline bg-transparent text-sky-600 dark:text-sky-400"
      searchWords={[query]}
      autoEscape={true}
      textToHighlight={text}
    />
  );
}

function SearchResult({
  result,
  autocomplete,
  collection,
  isActive,
  onClose,
  query,
}: {
  result: Result;
  autocomplete: Autocomplete;
  collection: AutocompleteCollection<Result>;
  isActive: boolean;
  onClose: () => void;
  query: string;
}) {
  const id = useId();
  const sectionTitle = navigation.find((section) =>
    section.links.find((link) => link.href === result.url.split("#")[0]),
  )?.title;
  const hierarchy = [sectionTitle, result.pageTitle].filter(
    (item): item is string => typeof item === "string",
  );
  const itemProps = {
    ...autocomplete.getItemProps({
      item: result,
      source: collection.source,
    }),
    "aria-selected": isActive,
  };

  return (
    <li
      className="group block rounded-lg aria-selected:bg-slate-100 dark:aria-selected:bg-slate-700/30"
      aria-labelledby={`${id}-hierarchy ${id}-title`}
      {...itemProps}
    >
      <Link href={result.url} onClick={onClose} className="block px-3 py-2">
        <div
          id={`${id}-title`}
          aria-hidden="true"
          className="text-sm text-slate-700 group-aria-selected:text-sky-600 dark:text-slate-300 dark:group-aria-selected:text-sky-400"
        >
          <HighlightQuery text={result.title} query={query} />
        </div>
        {hierarchy.length > 0 && (
          <div
            id={`${id}-hierarchy`}
            aria-hidden="true"
            className="mt-0.5 truncate text-xs whitespace-nowrap text-slate-500 dark:text-slate-400"
          >
            {hierarchy.map((item, itemIndex, items) => (
              <Fragment key={itemIndex}>
                <HighlightQuery text={item} query={query} />
                <span
                  className={
                    itemIndex === items.length - 1
                      ? "sr-only"
                      : "mx-2 text-slate-300 dark:text-slate-700"
                  }
                >
                  /
                </span>
              </Fragment>
            ))}
          </div>
        )}
      </Link>
    </li>
  );
}

function SearchResults({
  autocomplete,
  activeItemId,
  onClose,
  query,
  collection,
}: {
  autocomplete: Autocomplete;
  activeItemId: number | null;
  onClose: () => void;
  query: string;
  collection?: AutocompleteCollection<Result>;
}) {
  if (!collection || collection.items.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-slate-700 dark:text-slate-400">
        No results for &ldquo;
        <span className="wrap-break-word text-slate-900 dark:text-white">
          {query}
        </span>
        &rdquo;
      </p>
    );
  }

  return (
    <ul {...autocomplete.getListProps()}>
      {collection.items.map((result, index) => (
        <SearchResult
          key={result.url}
          result={result}
          autocomplete={autocomplete}
          collection={collection}
          isActive={activeItemId === index}
          onClose={onClose}
          query={query}
        />
      ))}
    </ul>
  );
}

const SearchInput = forwardRef<
  React.ComponentRef<"input">,
  {
    autocomplete: Autocomplete;
    autocompleteState: AutocompleteState<Result> | EmptyObject;
    onClose: () => void;
  }
>(function SearchInput({ autocomplete, autocompleteState, onClose }, inputRef) {
  const localInputRef = inputRef as React.RefObject<HTMLInputElement>;
  const inputProps = autocomplete.getInputProps({
    inputElement: localInputRef.current,
  });

  return (
    <div className="group relative flex h-12">
      <MagnifyingGlassIcon className="pointer-events-none absolute top-0 left-4 h-full w-5 stroke-slate-400 dark:stroke-slate-500" />
      <input
        ref={inputRef}
        data-autofocus
        className={clsx(
          "flex-auto appearance-none bg-transparent pl-12 text-slate-900 outline-hidden placeholder:text-slate-400 focus:w-full focus:flex-none sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden",
          autocompleteState.status === "stalled" ? "pr-11" : "pr-4",
        )}
        {...inputProps}
        onKeyDown={(event) => {
          if (event.key === "Escape" && autocompleteState.query === "") {
            onClose();
            return;
          }
          inputProps.onKeyDown(event);
        }}
      />
    </div>
  );
});

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const id = useId();
  const router = useRouter();
  const inputRef = useRef<React.ComponentRef<typeof SearchInput>>(null);
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<Result> | EmptyObject
  >({});
  const [autocomplete] = useState<Autocomplete>(() =>
    createAutocomplete({
      id,
      placeholder: "Find something...",
      defaultActiveItemId: 0,
      onStateChange({ state }) {
        setAutocompleteState(state);
      },
      shouldPanelOpen({ state }) {
        return state.query !== "";
      },
      navigator: {
        navigate({ itemUrl }) {
          if (!itemUrl) return;
          router.push(itemUrl);
          onClose();
        },
      },
      getSources({ query }) {
        return import("@/markdoc/search").then(({ search }) => [
          {
            sourceId: "documentation",
            getItems() {
              return search(query, { limit: 5 });
            },
            getItemUrl({ item }) {
              return item.url;
            },
          },
        ]);
      },
    }),
  );

  function close() {
    autocomplete.setQuery("");
    onClose();
  }

  return (
    <Dialog open onClose={close} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
        <DialogPanel className="mx-auto transform-gpu overflow-hidden rounded-xl bg-white shadow-xl sm:max-w-xl dark:bg-slate-800 dark:ring-1 dark:ring-slate-700">
          <div {...autocomplete.getRootProps({})}>
            <form
              {...autocomplete.getFormProps({
                inputElement: inputRef.current,
              })}
            >
              <SearchInput
                ref={inputRef}
                autocomplete={autocomplete}
                autocompleteState={autocompleteState}
                onClose={close}
              />
              <div
                className="border-t border-slate-200 bg-white px-2 py-3 empty:hidden dark:border-slate-400/10 dark:bg-slate-800"
                {...autocomplete.getPanelProps({})}
              >
                {autocompleteState.isOpen && (
                  <SearchResults
                    autocomplete={autocomplete}
                    activeItemId={autocompleteState.activeItemId}
                    onClose={close}
                    query={autocompleteState.query}
                    collection={autocompleteState.collections[0]}
                  />
                )}
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
