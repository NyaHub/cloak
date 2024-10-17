import CheckboxCustom from '@/shared/ui/Checkbox/Checkbox'
import  * as cls from  './CampaignsCard.module.scss'
import { useState } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';
import GoogleIcon from '@/shared/assets/icon/google.svg'
import  {SemiCircleProgressWithIndicator } from 'react-progressbars-with-indicator';

interface CampaignCardProps {
    title: string;
    status: string;
    lastUpdated: string;
    progress: number;
}

export const CampaignsCard = () => {
    const [isReduced, setIsReduced] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
      setIsReduced(checked);
    };
    
    return (
    <div className={cls.CampaignsContent}>
    <CheckboxCustom onChange={handleCheckboxChange}/>
    <div className={cls.CampaignsCard} 
        style={{ width: isReduced ? '70%' : '100%' }}
    >
        <p className={cls.title}>Campaign’s name</p>
        <div className={cls.cardBlock}>
            <Icon Svg={GoogleIcon}/>
            <button className={cls.status}>
                Active
            </button>
            <div className={cls.data}>
            <span className={cls.text}>12.02.2012 13:30</span>

        <div className={cls.circle}>
            <SemiCircleProgressWithIndicator
              percentage={30}
              indicatorPercentage={50}
              strokeWidth={10}
              strokeColor="#f00"
              indicatorColor="#f00"
           />
           {/* <span className={cls.text}>passed</span> */}
        </div>
            </div>
        </div>
    </div>
    </div>
    )
}

// // Определение интерфейса для структуры данных
// interface AppTableCampaignsData {
//     id: number;
//     name: string;
//     page: string;
//     status: string;
//     last_updated: string;
//     passed: number;
//     total: number;
//     link: string;
// }

// // Моковые данные
// const mockData: AppTableCampaignsData[] = [
//     {
//         id: 1,
//         name: 'Campaign’s name',
//         page: 'google',
//         status: 'active',
//         last_updated: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
//         passed: 654,
//         total: 1000,
//         link: 'ghtht'
//     },
//     {
//         id: 2,
//         name: 'Campaign’s name',
//         page: 'facebook',
//         status: 'deactivated',
//         last_updated: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
//         passed: 100,
//         total: 1000,
//         link: 'ghtht'
//     }
// ];


// export const CampaignsCard = () => {
//     const [checkboxStates, setCheckboxStates] = useState<{ [key: number]: boolean }>({});

//     const handleCheckboxChange = (id: number, checked: boolean) => {
//         setCheckboxStates((prevStates) => ({
//             ...prevStates,
//             [id]: checked,
//         }));
//     };

//     return (
//         <div className={cls.CampaignsContent}>
//             {mockData.map(campaign => (
//                 <div className={cls.CampaignsCard} key={campaign.id} style={{ width: checkboxStates[campaign.id] ? '30%' : '100%' }}>
//                     <p className={cls.title}>{campaign.name}</p>
//                     <div className={cls.cardBlock}>
//                         <Icon Svg={GoogleIcon} />
//                     </div>
//                     <p>{campaign.status}</p>
//                     <p>{campaign.last_updated}</p>
//                     <p>{campaign.passed} / {campaign.total}</p>
//                 </div>
//             ))}
//             <div>
//                 {mockData.map(campaign => (
//                     <div key={campaign.id}>
//                         <CheckboxCustom
//                             checked={checkboxStates[campaign.id] || false}
//                             onChange={(checked) => handleCheckboxChange(campaign.id, checked)}
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };