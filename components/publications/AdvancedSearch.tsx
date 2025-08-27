"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { SearchTermsSection } from "./SearchTermsSection";
import { DateFilterSection } from "./DateFilterSection";

interface SearchTerm {
  id: string;
  term: string;
  field: string;
  operator: string;
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: AdvancedSearchFilters) => void;
}

export interface AdvancedSearchFilters {
  searchTerms: SearchTerm[];
  publicationDateFrom: string;
  publicationDateTo: string;
  publicationYearFrom: string;
  publicationYearTo: string;
  dateType: 'added' | 'publication';
}

export const AdvancedSearch = ({ isOpen, onClose, onSearch }: AdvancedSearchProps) => {
  const [searchTerms, setSearchTerms] = useState<SearchTerm[]>([
    { id: '1', term: '', field: 'all', operator: 'AND' }
  ]);
  const [publicationDateFrom, setPublicationDateFrom] = useState('');
  const [publicationDateTo, setPublicationDateTo] = useState('');
  const [publicationYearFrom, setPublicationYearFrom] = useState('');
  const [publicationYearTo, setPublicationYearTo] = useState('');
  const [dateType, setDateType] = useState<'added' | 'publication'>('publication');


  const addSearchTerm = () => {
    const newId = (searchTerms.length + 1).toString();
    setSearchTerms([...searchTerms, { id: newId, term: '', field: 'all', operator: 'AND' }]);
  };

  const removeSearchTerm = (id: string) => {
    if (searchTerms.length > 1) {
      setSearchTerms(searchTerms.filter(term => term.id !== id));
    }
  };

  const updateSearchTerm = (id: string, updates: Partial<SearchTerm>) => {
    setSearchTerms(searchTerms.map(term => 
      term.id === id ? { ...term, ...updates } : term
    ));
  };

  const resetForm = () => {
    setSearchTerms([{ id: '1', term: '', field: 'all', operator: 'AND' }]);
    setPublicationDateFrom('');
    setPublicationDateTo('');
    setPublicationYearFrom('');
    setPublicationYearTo('');
    setDateType('publication');
  };

  const handleSearch = () => {
    const filters: AdvancedSearchFilters = {
      searchTerms: searchTerms.filter(term => term.term.trim() !== ''),
      publicationDateFrom,
      publicationDateTo,
      publicationYearFrom,
      publicationYearTo,
      dateType
    };
    onSearch(filters);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Advanced Search"
      description="Enter keywords and select fields for more precise search results"
      size="xl"
    >
      <ModalContent>
        <div className="p-6 space-y-8">
          <SearchTermsSection
            searchTerms={searchTerms}
            onAddTerm={addSearchTerm}
            onRemoveTerm={removeSearchTerm}
            onUpdateTerm={updateSearchTerm}
          />
          
          <DateFilterSection
            dateType={dateType}
            publicationDateFrom={publicationDateFrom}
            publicationDateTo={publicationDateTo}
            publicationYearFrom={publicationYearFrom}
            publicationYearTo={publicationYearTo}
            onDateTypeChange={setDateType}
            onPublicationDateFromChange={setPublicationDateFrom}
            onPublicationDateToChange={setPublicationDateTo}
            onPublicationYearFromChange={setPublicationYearFrom}
            onPublicationYearToChange={setPublicationYearTo}
          />
        </div>
      </ModalContent>

      <ModalFooter>
        <div className="flex items-center justify-between">
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-[var(--color-border)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-muted)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Search
            </button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};