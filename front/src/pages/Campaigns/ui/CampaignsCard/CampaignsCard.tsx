import CheckboxCustom from '@/shared/ui/Checkbox/Checkbox'
import classes from  './CampaignsCard.module.css'
import { useEffect, useMemo, useState } from 'react';
import { ChartColumnDecreasing, CircleX, Download, Pen } from 'lucide-react';
import { ActionButton } from '@/shared/ui/ActionButton/ActionButton';
import CampaignItem, { CampaignData } from '../CampaignItem/CampaignItem';
import {  useNavigate } from 'react-router-dom';

const actionButtonsData = [
  { icon: <Download style={{ width: '18px' }} />, label: 'Code' },
  { icon: <ChartColumnDecreasing style={{ width: '18px' }} />, label: 'Stats' },
  { icon: <Pen style={{ width: '18px' }} />, label: 'Edit' },
  { icon: <CircleX style={{ width: '18px' }} />, label: 'Delete' },
];

const ActionButtonGroup: React.FC<{ className: string }> = ({ className }) => {
  const navigate = useNavigate();

  const handleButtonClick = (label: string) => {
    if (label === 'Stats') {
      navigate('/statistics');
    }
  };

  return (
    <>
      {actionButtonsData.map(({ icon, label }, index) => (
        <ActionButton
          key={index}
          icon={icon}
          label={label}
          className={className}
          onClick={() => handleButtonClick(label)}
        />
      ))}
    </>
  );
};

interface CampaignsCardProps {
  data: CampaignData[];
}
 
const CampaignsCard: React.FC<CampaignsCardProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
      setShowButtons(activeIndex !== null);
    }, [activeIndex]);

    const handleCheckboxChange = (index: number) => {
        // активный индекс или сбрасываем, если уже выбранный
        setActiveIndex(activeIndex === index ? null : index);
    };

    const renderedCampaigns = useMemo(() => {
      return data.map((campaign, index) => (
        <div key={campaign.id} className={classes.cardContainer}>
            <CheckboxCustom
              checked={activeIndex === index}
              onChange={() => handleCheckboxChange(index)}
              className={classes.remobeCheckbox}
            />

            <div className={`${classes.CampaignsCard} 
                ${activeIndex === null || activeIndex !== index ? classes.fullWidth : classes.partialWidth}`}
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
        ));
    }, [data, activeIndex, showButtons]);

    return (
      <div className={classes.CampaignsContent}>
        {renderedCampaigns}
      </div>
    );
};

export default CampaignsCard;