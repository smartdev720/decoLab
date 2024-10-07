import React, { useState, useEffect, useRef } from 'react';
import { TagBadge } from './TagBadge';

interface MultiSelectProps {
  options: string[];
  onChange: (selected: string[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) => {
      const newSelected = prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option];

      onChange(newSelected);
      return newSelected;
    });
  };

  const handleInputClick = () => {
    toggleDropdown();
  };

  const handleOptionClick = (option: string) => {
    handleOptionToggle(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div 
        onClick={handleInputClick} 
        className="p-2 rounded-md outline-none border border-dashboard text-sm cursor-pointer font-poppins font-light text-gray-400"
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <TagBadge key={option} name={option} />
            ))}
          </div>
        ) : (
          'Select Tags'
        )}
      </div>
      {isOpen && (
        <div 
          className="absolute top-full left-0 border border-gray-300 bg-white z-10 w-full rounded-md shadow-lg"
        >
          {options.map((option) => (
            <div 
              key={option} 
              onClick={() => handleOptionClick(option)} 
              className={`p-2 cursor-pointer ${selectedOptions.includes(option) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};