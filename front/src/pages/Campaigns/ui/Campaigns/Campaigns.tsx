import { Label } from '@/shared/ui/Label/Label'
import { Navbar } from '@/widgetes/Navbar'
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput'
import { useMemo, useState } from 'react'
import { CampaignsIcon } from '../CampaignsIcon/CampaignsIcon'
import CampaignsCard  from '../CampaignsCard/CampaignsCard'
import { format } from 'date-fns';
import Pagination from '@/components/controls/pagination'


const CampaignsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockData = [
  {
    id: 1,
    name: 'Campaign’s name',
    page: 'google',
    status: 'Active',
    last_updated: format(new Date(), 'dd.MM.yyyy HH:mm'),
    passed: 654,
    total: 1000,
    link: 'ghtht'
  },
  {
    id: 2,
    name: 'Campaign’s name',
    page: 'facebook',
    status: 'Deactivated',
    last_updated: format(new Date(), 'dd.MM.yyyy HH:mm'),
    passed: 100,
    total: 1000,
    link: 'ghtht'
  }
];

   const handleSearch = (value: string) => {
      setSearchQuery(value);
    };

  const filteredData = mockData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

    // Определяем текущие элементы для отображения
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

   
  return (
    <div>
        <Navbar />
        <Label title="Campaigns" />
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          placeholder='Search stats'
        />
      <CampaignsIcon />
      <CampaignsCard data={currentData} />
      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default CampaignsPage