import { SwitchCustom } from '@/shared/ui/Switch/Switch'
import classes from  './SwitchBlock.module.css'
import { useState } from 'react';

// export const SwitchBlock = () => {

//    return (
//     <div className={classes.switchBlock}>
//         <div className={classes.switchItem}>
//             <SwitchCustom />
//             <p className={classes.title}>VPN/Proxy</p>
//         </div>
//         <div className={classes.switchItem}>
//            <SwitchCustom />
//            <p className={classes.title}>IPv6</p>
//         </div>
//         <div className={classes.switchItem}>
//             <SwitchCustom />
//             <p className={classes.title}>Filter empty referer</p>
//         </div>
//        <div className={classes.switchItem}>
//            <SwitchCustom />
//            <p className={classes.title}>Maximum clicks from one IP</p>
//        </div>
//     </div>
//    )
// }

interface SwitchItem {
    title: string;
}

const switchItems: SwitchItem[] = [
    { title: 'VPN/Proxy' },
    { title: 'IPv6' },
    { title: 'Filter empty referer' },
    { title: 'Maximum clicks from one IP' },
];

export const SwitchBlock: React.FC = () => {
    const [switchStates, setSwitchStates] = useState<boolean[]>(switchItems.map(() => false));

    const toggleSwitch = (index: number) => {
        const newStates = [...switchStates];
        newStates[index] = !newStates[index];
        setSwitchStates(newStates);
    };

    return (
        <div className={classes.switchBlock}>
            {switchItems.map((item, index) => (
                <div className={classes.switchItem} key={index}>
                    <SwitchCustom
                        enabled={switchStates[index]}
                        setEnabled={() => toggleSwitch(index)}
                    />
                    <p className={classes.title}>{item.title}</p>
                </div>
            ))}
        </div>
    );
}