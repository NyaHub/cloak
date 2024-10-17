import CheckboxCustom from '@/shared/ui/Checkbox/Checkbox'
import  * as cls from  './CampaignsCard.module.scss'
import { useState } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';
import GoogleIcon from '@/shared/assets/icon/google.svg'
import  {SemiCircleProgressWithIndicator } from 'react-progressbars-with-indicator';

interface CampaignData {
    id: number;
    name: string;
    page: string;
    status: string;
    last_updated: string;
    passed: number;
    total: number;
    link: string;
}

interface CampaignsCardProps {
    data: CampaignData[];
}

export const CampaignsCard: React.FC<CampaignsCardProps> = ({ data }) => {
    //  массив состояний для отслеживания, уменьшена ли карточка
    const [reducedCards, setReducedCards] = useState<boolean[]>(new Array(data.length).fill(false));

    const [isReduced, setIsReduced] = useState(false);

    const handleCheckboxChange = (index: number) => {
        const newReducedCards = [...reducedCards];
        newReducedCards[index] = !newReducedCards[index]; // Переключаем состояние по индексу
        setReducedCards(newReducedCards);
    };

    return (
         <div className={cls.CampaignsContent}>
            {data.map((campaign, index) => (
                <div key={campaign.id} className={cls.cardContainer}>
                    <CheckboxCustom
                        checked={reducedCards[index]}
                        onChange={() => handleCheckboxChange(index)} 
                    />
                    <div className={cls.CampaignsCard} style={{ width: reducedCards[index] ? '70%' : '100%' }}>
                        <p className={cls.title}>{campaign.name}</p>
                        <div className={cls.cardBlock}>

                            <div className={cls.IconBtn}>
                                <Icon Svg={GoogleIcon} />
                                <button className={cls.status}>{campaign.status}</button>
                            </div>

                            <div className={cls.data}>
                                <span className={cls.text}>{campaign.last_updated}</span>
                                <div className={cls.circle}>
                                    <SemiCircleProgressWithIndicator
                                        percentage={(campaign.passed / campaign.total) * 100}
                                        indicatorPercentage={50}
                                        strokeWidth={5}
                                        strokeColor="#f00"
                                        indicatorColor="#f00"
                                    />
                                    <span className={cls.textPass}>passed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
