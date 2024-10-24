import { Label } from '@/shared/ui/Label/Label';
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput';
import { Navbar } from '@/widgetes/Navbar';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import StatisticsCard from '../StatisticsCard/StatisticsCard';
import { StatisticSelect } from '../StatisticSelect/StatisticSelect';
import classes from './Statistics.module.css'
import Pagination from '@/components/controls/pagination';

const StatisticsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const data = [
    {
      id: 1,
      token: 'grwegtehgterh',
      campaign_id: 2,
      ip: '127.0.0.1',
      country: 'Ru',
      user_agent: "Google",
      page: "Black",
      referer: "Yandex",
      device: "desktop",
      os: "android",
      browser: "Mozilla",
      created_at: format(new Date(), 'dd.MM.yyyy, EEE'),
      type_page: 'white',
      status: 'Active'
    },
    {
     id: 2,
     token: 'grwegtehgterh',
     campaign_id: 2,
     ip: '127.0.0.1',
     country: 'Ru',
     user_agent: "Google",
     page: "Black",
     referer: "Yandex",
     device: "mobile",
     os: "windows",
     browser: "Mozilla",
     created_at: format(new Date(), 'dd.MM.yyyy, EEE'),
     type_page: 'black',
     status: 'Deactivated',
    }
  ]

    const handleSearch = (value: string) => {
      setSearchQuery(value);
    };

  const filteredData = data.filter(item => 
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Определяем текущие элементы для отображения
    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);


    return (
     <div>
        <Navbar />
        <Label title='Statistics of Campaign *NAME*'/>
        <div className={classes.Statistics}>
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          placeholder='Search stats'
        />

      <StatisticSelect />
        </div>
      {currentData.map(item => (
        <StatisticsCard key={item.id} stat={item} />
      ))}
      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
     </div>
    )
}

export default StatisticsPage;