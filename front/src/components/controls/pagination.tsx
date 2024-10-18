
import React, { useEffect, useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '../ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationElementProps {
    data: number[];
    currentPage: number;
    onClick: (page: number) => void;
    onClickPrevious: () => void;
    onClickNext: () => void;
}

const PaginationElement: React.FC<PaginationElementProps> = ({
    data,
    currentPage,
    onClick,
    onClickNext,
    onClickPrevious,
}) => {
    const [filterData, setFilterData] = useState<number[]>([]);

    useEffect(() => {
        // Обновляем элементы, которые необходимо отображать на странице
        const start = Math.max(currentPage - 4, 0); // Позволяем сдвиг максимум 4 страницы назад
        const end = Math.min(start + 8, data.length); // Ограничиваем конец с учетом длины массива
        setFilterData(data.slice(start, end)); // Обновляем filterData
    }, [currentPage, data]);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem onClick={currentPage > 0 ? onClickPrevious : undefined}>
                    <ChevronLeft />
                </PaginationItem>

                {currentPage > 0 && (
                    <PaginationItem onClick={() => onClick(0)}>
                        <PaginationLink isActive={currentPage === 0}>1</PaginationLink>
                    </PaginationItem>
                )}

                {filterData[0] !== 1 && <div>...</div>}

                {filterData.map((item) => (
                    <PaginationItem key={item} onClick={() => onClick(item - 1)}>
                        <PaginationLink isActive={item === currentPage + 1}>{item}</PaginationLink>
                    </PaginationItem>
                ))}

                {filterData[filterData.length - 1] < data.length && <div>...</div>}

                {currentPage < data.length - 1 && (
                    <PaginationItem onClick={() => onClick(data[data.length - 1] - 1)}>
                        <PaginationLink isActive={currentPage === data[data.length - 1] - 1}>
                            {data[data.length - 1]}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem onClick={currentPage < data.length - 1 ? onClickNext : undefined}>
                    <ChevronRight />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationElement;