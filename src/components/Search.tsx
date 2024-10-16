import React, { useState, useEffect } from 'react';
import { TextField, FormControl, FormControlLabel, Radio, RadioGroup, Rating } from '@mui/material';

interface SearchComponentProps {
  onSearch: (searchTerm: string | number) => void; 
}

const SearchInput: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'text' | 'rating'>('text'); 
  const [rating, setRating] = useState<number | null>(null); 
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      if (searchType === 'text' && event.target.value.trim()) {
        onSearch(event.target.value.trim()); 
      }
    }, 300); 

    setDebounceTimeout(timeout); 
  };

  const handleSearch = () => {
    if (searchType === 'text' && searchTerm.trim()) {
      onSearch(searchTerm.trim()); 
      setSearchTerm(''); 
    } else if (searchType === 'rating' && rating !== null) {
      onSearch(rating); 
      setRating(null); 
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value as 'text' | 'rating');
    setSearchTerm(''); 
    setRating(null);
  };

  const handleRatingChange = (event: React.ChangeEvent<unknown>, newValue: number | null) => {
    setRating(newValue);
    if (newValue !== null) {
      onSearch(newValue); 
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      {searchType === 'text' ? (
        <>
          <TextField
            value={searchTerm}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
            label="Search"
            variant="outlined"
            style={{ marginRight: '8px', width: '300px' }}
          />
        </>
      ) : (
        <>
          <Rating
            name="rating"
            value={rating || 0}
            onChange={handleRatingChange} 
            style={{ marginRight: '8px' }}
          />
        </>
      )}

      <FormControl component="fieldset" style={{ marginLeft: '16px' }}>
        <RadioGroup row value={searchType} onChange={handleToggleChange}>
          <FormControlLabel value="text" control={<Radio />} label="Text" />
          <FormControlLabel value="rating" control={<Radio />} label="Rating" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SearchInput;
