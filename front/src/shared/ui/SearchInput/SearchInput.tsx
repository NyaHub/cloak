import { Search } from 'lucide-react';
import * as cls from './SearchInput.module.scss';
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
        <div className={`${cls.blockSearch} ${className}`}>
            <div className={cls.block}>
            <div className={cls.IconSearch}>
            <Search 
              className={cls.iconSearch}
              width={20} 
              height={20}
            />
            <input
                placeholder="Search campaigns"
                className={cls.Search}
                {...inputProps} // Передаем остальные пропсы, включая значение
            />
            </div>
            <button onClick={handleSearch} className={cls.searchBtn}>
                Search
            </button>
            </div>
        </div>
    );
});