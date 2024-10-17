import { Label } from '@/shared/ui/Label/Label'
import { Navbar } from '@/widgetes/Navbar'
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput'
import { useState } from 'react'
import { CampaignsIcon } from '../CampaignsIcon/CampaignsIcon'
import { CampaignsCard } from '../CampaignsCard/CampaignsCard'

const CampaignsPage = () => {
   const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
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
      <CampaignsCard />
    </div>
  )
}

export default CampaignsPage