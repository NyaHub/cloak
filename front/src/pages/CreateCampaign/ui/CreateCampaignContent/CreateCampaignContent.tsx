import CanpaignFilter from '../CampaignFilter/CampaignFilter';
import CampaignsPage from '../CampaignsPage/CampaignsPage';
import { SwitchBlock } from '../SwitchBlock/SwitchBlock';
import classes from  './CreateCampaignContent.module.css'


const CreateCampaignContent = () => {
    
   return (
    <div className={classes.CreateCampaignContent}>

        <div className={classes.filterBlock}>
           <p className={classes.title}>Campaign Filters</p>
           <SwitchBlock />
           <CanpaignFilter />
        </div>

        <div className={classes.pages}>
            <p className={classes.title}>Pages of campaign</p>
            <CampaignsPage />
        </div>

    </div>
   )
}

export default CreateCampaignContent;