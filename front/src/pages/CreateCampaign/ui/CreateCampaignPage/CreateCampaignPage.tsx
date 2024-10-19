import { Label } from '@/shared/ui/Label/Label';
import { Navbar } from '@/widgetes/Navbar';
import CreateCampaignContent from '../CreateCampaignContent/CreateCampaignContent';

const CreateCampaignPage = () => {
   return (
    <div>
      <Navbar />
      <Label title="Campaign controller" />
      <CreateCampaignContent />
    </div>
   )
}

export default CreateCampaignPage;