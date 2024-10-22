import { ChevronDown, MonitorDot, Smartphone, Tablet, Tv } from 'lucide-react';
import classes from  './StatisticsCard.module.css'
import { IStats } from '@/components/context/types/scemes';
import { Icon } from '@/shared/ui/Icon/Icon';
import WindowsIcon from '@/shared/assets/icon/Windiws.svg'
import AppleIcon from '@/shared/assets/icon/Apple.svg'
import AndroidIcon from '@/shared/assets/icon/Android.svg'
import { useMemo, useState } from 'react';

interface InfoColumnProps {
  title: string;
  children: React.ReactNode;
}

const devices_array = [
  {value: "desktop", label: <div className={classes.device}>Desktop<MonitorDot size={16} /></div>},
  {value: "mobile", label: <div className={classes.device}>Mobile<Smartphone size={16} /></div>},
  {value: "tablet", label: <div className={classes.device}>Tablet<Tablet size={16} /></div>},
  {value: "tv", label: <div className={classes.device}>TV<Tv size={16} /></div>}
]

const os_array = [
  {value: "windows", label: <div className={classes.device}>Windows<Icon Svg={WindowsIcon}/></div>},
  {value: "ios", label: <div className={classes.device}>iOS<Icon Svg={AppleIcon}/></div>},
  {value: "android", label: <div className={classes.device}>Android<Icon Svg={AndroidIcon}/></div>},
  {value: "macos", label: <div className={classes.device}>macOS<Icon Svg={AppleIcon}/></div>},
  {value: "linux", label: <div className={classes.device}>Tizen</div>}
]

const browser_array = [
  {value: "desktop", label: <div className={classes.device}>Desktop</div>},
  {value: "mobile", label: <div className={classes.device}>Mobile</div>},
  {value: "tablet", label: <div className={classes.device}>Tablet</div>},
  {value: "tv", label: <div className={classes.device}>TV</div>}
]

const getDeviceLabel = (device: string) => {
  const deviceObj = devices_array.find(item => item.value === device);
  return deviceObj ? deviceObj.label : device;
}

const getOSLabel = (os: string) => {
  const osObj = os_array.find(item => item.value === os);
  return osObj ? osObj.label : os;
}

const getBrowserLabel = (device: string) => {
  const deviceObj = browser_array.find(item => item.value === device);
  return deviceObj ? deviceObj.label : device;
}

const InfoColumn = ({ title, children }: InfoColumnProps) => (
  <div className={classes.column}>
    <p className={classes.title}>{title}</p>
    <span className={classes.span}>{children}</span>
  </div>
);

const StatisticsCard: React.FC<{ stat: IStats }> = ({ stat }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
    setIsActive(prev => !prev);
  };

  const deviceLabel = useMemo(() => getDeviceLabel(stat.device), [stat.device]);
  const osLabel = useMemo(() => getOSLabel(stat.os), [stat.os]);
  const browserLabel = useMemo(() => getBrowserLabel(stat.browser), [stat.browser]);
  // const formattedDate = format(new Date(stat.created_at), 'dd.MM.yyyy, EEE');

  // Логика для определения цвета
  const indicatorClass = stat.status === 'Active' ? classes.green : classes.red;

  return (
    <div className={`${classes.StatisticsCard} ${isActive ? classes.active : ''}`} key={stat.id}>

      <div className={`${classes.indicator} ${indicatorClass}`}></div> 

      <div className={`${classes.content} ${isActive ? classes.active : ''}`}>
        <InfoColumn title="IP">{stat.ip}</InfoColumn>
        <InfoColumn title="Country">{stat.country}</InfoColumn>
        <InfoColumn title="Device">{deviceLabel}</InfoColumn>
        <InfoColumn title="OS">{osLabel}</InfoColumn>
      </div>

      <div className={classes.btnBlock}>
        <button className={`${classes.btn} ${isActive ? classes.active : ''}`} onClick={handleToggle}>
          <ChevronDown width={15} height={15} 
            style={{ transform: isExpanded 
                     ? 'rotate(180deg)' : 'rotate(0deg)', 
                     transition: 'transform 0.3s' 
                  }} 
          />
        </button>
      </div>

      {isExpanded && (
        <div className={`${classes.arrowContent} ${isActive ? classes.active : ''}`}>
          <InfoColumn title="User Agent">{stat.page}</InfoColumn>
          <InfoColumn title="Page">{stat.page}</InfoColumn>
          <InfoColumn title="Browser">{browserLabel}</InfoColumn>
          <InfoColumn title="Created at">{stat.created_at}</InfoColumn>
          <InfoColumn title="Referer">{stat.referer}</InfoColumn>
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;