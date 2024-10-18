import { Label } from '@/shared/ui/Label/Label'
import { Navbar } from '@/widgetes/Navbar'
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput'
import { useState } from 'react'
import { CampaignsIcon } from '../CampaignsIcon/CampaignsIcon'
import CampaignsCard  from '../CampaignsCard/CampaignsCard'
import { format } from 'date-fns';


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


const CampaignsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

   
  return (
    <div>
        <Navbar />
        <Label title="Campaigns" />
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
      />
      <CampaignsIcon />
      <CampaignsCard data={mockData}/>
      {/* <PaginationElement
        onClickNext={onClickNextPage}
        onClickPrevious={onClickPreviousPage}
        onClick={onClickPage}
        data={pages}
        currentPage={page} 
      /> */}
    </div>
  )
}

export default CampaignsPage