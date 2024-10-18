import CheckboxCustom from '@/shared/ui/Checkbox/Checkbox'
import classes from  './CampaignsCard.module.css'
import { useEffect, useState } from 'react';
import { ChartColumnDecreasing, CircleX, Download, Pen } from 'lucide-react';
import { ActionButton } from '@/shared/ui/ActionButton/ActionButton';
import CampaignItem, { CampaignData } from '../CampaignItem/CampaignItem';

const actionButtonsData = [
  { icon: <Download style={{ width: '18px' }} />, label: 'Code' },
  { icon: <ChartColumnDecreasing style={{ width: '18px' }} />, label: 'Stats' },
  { icon: <Pen style={{ width: '18px' }} />, label: 'Edit' },
  { icon: <CircleX style={{ width: '18px' }} />, label: 'Delete' },
];

const ActionButtonGroup: React.FC<{ className: string }> = ({ className }) => (
  <>
    {actionButtonsData.map(({ icon, label }, index) => (
      <ActionButton key={index} icon={icon} label={label} className={className}/>
    ))}
  </>
);

interface CampaignsCardProps {
    data: CampaignData[];
}
 
const CampaignsCard: React.FC<CampaignsCardProps> = ({ data }) => {
     // Состояние для отслеживания активного индекса карточки
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
    if (activeIndex !== null) {
        setShowButtons(true);
    } else {
        setShowButtons(false);
    }
    }, [activeIndex]);

    const handleCheckboxChange = (index: number) => {
        // активный индекс или сбрасываем, если уже выбранный
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
    <div className={classes.CampaignsContent}>
    {data.map((campaign, index) => (
      <div key={campaign.id} className={classes.cardContainer}>
        <CheckboxCustom
          checked={activeIndex === index}
          onChange={() => handleCheckboxChange(index)}
          className={classes.remobeCheckbox}
        />
        <div
          className={`${classes.CampaignsCard} ${activeIndex === null || activeIndex !== index ? classes.fullWidth : classes.partialWidth}`}
        >
          <CampaignItem campaign={campaign} />
          
          <div className={classes.mobileBlock}>
            <span className={classes.title}>Actions</span>
            <div className={classes.grid}>
               <ActionButtonGroup className={classes.btnMobile} />
            </div>
          </div>
        </div>

        {activeIndex === index && (
          <div className={`${classes.buttonContainer} ${showButtons ? classes.show : ''}`}>
            <ActionButtonGroup className={classes.btnDesk} />
          </div>
        )}
      </div>
    ))}
  </div>
    );
};

export default CampaignsCard;