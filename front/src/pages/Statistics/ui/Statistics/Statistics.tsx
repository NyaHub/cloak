import { Label } from '@/shared/ui/Label/Label';
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput';
import { Navbar } from '@/widgetes/Navbar';
import { useState } from 'react';
import StatisticsCard, { StatisticsData } from '../StatisticsCard/StatisticsCard';

const StatisticsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (value: string) => {
      setSearchQuery(value);
    };

    const dummyData: StatisticsData[] = [
        {
            ip: '194.1.235.227',
            country: 'RU',
            device: 'Desktop',
            os: 'Windows'
        },
        {
            ip: '192.168.0.1',
            country: 'US',
            device: 'Mobile',
            os: 'Android'
        },
        {
            ip: '172.16.254.1',
            country: 'FR',
            device: 'Tablet',
            os: 'iOS'
        }
    ];

    return (
     <div>
        <Navbar />
        <Label title='Statistics of Campaign *NAME*'/>
         <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          placeholder='Search stats'
      />
      {dummyData.map((data, index) => (
        <StatisticsCard key={index} data={data} />
      ))}
     </div>
    )
}

export default StatisticsPage;