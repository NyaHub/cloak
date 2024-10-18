import { Icon } from '@/shared/ui/Icon/Icon';
import classes from  './CampaignItem.module.css'
import { SemiCircleProgressWithIndicator } from 'react-progressbars-with-indicator';
import GoogleIcon from '@/shared/assets/icon/google.svg'
import FacebookIcon from '@/shared/assets/icon/faceebook.svg'

type PageType = 'google' | 'facebook';

const pageIcons: Record<PageType, React.FunctionComponent<React.SVGAttributes<SVGElement>>> = {
    google: GoogleIcon,
    facebook: FacebookIcon,
};

export interface CampaignData {
    id: number;
    name: string;
    page: string;
    status: string;
    last_updated: string;
    passed: number;
    total: number;
}

interface CampaignItemProps {
    campaign: CampaignData;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ campaign }) => {

    return (
        <div>
            <div className={classes.deskBlock}>
                <p className={classes.title}>{campaign.name}</p>
                <div className={classes.cardBlock}>
                    <div className={classes.IconBtn}>
                        <Icon Svg={pageIcons[campaign.page.toLowerCase() as PageType] || GoogleIcon} />
                        <button className={`${classes.status} ${campaign.status === 'Active' ? classes.active : classes.deactivated}`}>
                            {campaign.status}
                        </button>
                    </div>
                    <div className={classes.data}>
                        <span className={classes.text}>{campaign.last_updated}</span>
                        <div className={classes.circle}>
                            <SemiCircleProgressWithIndicator
                                percentage={(campaign.passed / campaign.total) * 100}
                                indicatorPercentage={50}
                                strokeWidth={5}
                                strokeColor="#f00"
                                indicatorColor="#f00"
                            />
                            <span className={classes.textPass}>passed</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.mobileBlock}>
                 <div>
                    <span className={classes.span}>Name</span>
                    <p className={classes.title}>{campaign.name}</p>
                </div>

                <div className={classes.cardBlock}>
                    
                    <div className={classes.IconBtn}>
                        <div className={classes.column}>
                            <span className={classes.span}>Page</span>
                            <Icon Svg={pageIcons[campaign.page.toLowerCase() as PageType] || GoogleIcon} />
                        </div>

                        <div className={classes.column}>
                        <span className={classes.span}>Status</span>
                        <button className={`${classes.status} ${campaign.status === 'Active' ? classes.active : classes.deactivated}`}>
                            {campaign.status}
                        </button>
                        </div>
                    </div>

                    <div className={classes.data}>
                        <div className={classes.column}>
                          <span className={classes.span}>Last updated</span>
                          <span className={classes.text}>{campaign.last_updated}</span>
                        </div>
                        <div className={classes.circle}>
                            <div className={classes.column}>
                            <span className={classes.span}>Pass</span>
                            <SemiCircleProgressWithIndicator
                                percentage={(campaign.passed / campaign.total) * 100}
                                indicatorPercentage={50}
                                strokeWidth={5}
                                strokeColor="#f00"
                                indicatorColor="#f00"
                            />
                            <p className={classes.textPass}>passed</p>
                            </div>
                        </div>
                    </div>
                     </div>
                </div>
            </div>
    );
};

export default CampaignItem;