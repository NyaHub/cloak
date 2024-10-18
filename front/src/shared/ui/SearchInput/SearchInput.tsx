import { Search } from 'lucide-react';
import classes from './SearchInput.module.css';
import { InputHTMLAttributes, memo } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch: (value: string) => void; // Функция поиска
    className?: string;
}

export const SearchInput = memo(({ onSearch, className, ...inputProps }: SearchInputProps) => {
    const handleSearch = () => {
        if (inputProps.value) {
            onSearch(inputProps.value as string);
        }
    };

    return (
        <div className={`${classes.blockSearch} ${className}`}>
            <div className={classes.block}>
            <div className={classes.IconSearch}>
            <Search 
              className={classes.iconSearch}
              width={20} 
              height={20}
            />
            <input
                placeholder="Search campaigns"
                className={classes.Search}
                {...inputProps} // Передаем остальные пропсы, включая значение
            />
            </div>
            <button onClick={handleSearch} className={classes.searchBtn}>
                Search
            </button>
            </div>
        </div>
    );
});