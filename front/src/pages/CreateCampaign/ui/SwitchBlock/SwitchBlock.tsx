import { SwitchCustom } from '@/shared/ui/Switch/Switch'
import classes from  './SwitchBlock.module.css'
import { useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';

export const SwitchBlock: React.FC = () => {
    const [vpnProxy, setVpnProxy] = useState<boolean>(false);
    const [ipv6, setIpv6] = useState<boolean>(false);
    const [filterEmptyReferer, setFilterEmptyReferer] = useState<boolean>(false);
    const [maximumClicksByIp, setMaximumClicksByIp] = useState<number>(0);

    const [numberOfClicks, setNumberOfClicks] = useState('');
    
    const handleInputChange = (value: string) => {
        setNumberOfClicks(value);
    };

    // Обработчик для переключателей
    const toggleSwitch = (section: 'vpnProxy' | 'ipv6' | 'filterEmptyReferer' | 'maximumClicksByIp') => {
        switch (section) {
            case 'vpnProxy':
                setVpnProxy(prev => !prev);
                break;
            case 'ipv6':
                setIpv6(prev => !prev);
                break;
            case 'filterEmptyReferer':
                setFilterEmptyReferer(prev => !prev);
                break;
            case 'maximumClicksByIp':
                setMaximumClicksByIp(prev => prev ? 0 : 1);
                break;
            default:
                break;
        }
    };

    return (
    <>
        <div className={classes.switchBlock}>
            <div className={classes.switchItem}>
                <SwitchCustom
                    enabled={vpnProxy}
                    setEnabled={() => toggleSwitch('vpnProxy')}
                />
                <p className={classes.title}>VPN/Proxy</p>
            </div>
            <div className={classes.switchItem}>
                <SwitchCustom
                    enabled={ipv6}
                    setEnabled={() => toggleSwitch('ipv6')}
                />
                <p className={classes.title}>IPv6</p>
            </div>
            <div className={classes.switchItem}>
                <SwitchCustom
                    enabled={filterEmptyReferer}
                    setEnabled={() => toggleSwitch('filterEmptyReferer')}
                />
                <p className={classes.title}>Filter empty referer</p>
            </div>
            <div className={classes.switchItem}>
                <SwitchCustom
                    enabled={maximumClicksByIp > 0}
                    setEnabled={() => toggleSwitch('maximumClicksByIp')}
                />
                <p className={classes.title}>Maximum clicks from one IP</p>
            </div>
        </div>
       
       <div className={classes.inputSpan}>
        <span className={classes.titleSpan}>Numbers of clicks from one IP</span>
        <Input
            placeholder='0' 
            value={numberOfClicks}
            onChange={handleInputChange}
            className={classes.placeholder}
            disabled={maximumClicksByIp <= 0}
        />
       </div>
    </>
    );
};