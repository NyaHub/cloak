import { Icon } from '@/shared/ui/Icon/Icon';
import classes from  './StatisticsCard.module.css'
import DesktopIcon from '@/shared/assets/icon/desktop.svg'

export interface StatisticsData {
    ip: string;
    country: string;
    device: string;
    os: string;
}

const StatisticsCard: React.FC<{ data: StatisticsData }> = ({ data }) => {
     return (
        <div className={classes.StatisticsCard}>
            <div className={classes.column}>
              <p className={classes.title}>IP <p className={classes.span}>{data.ip}</p></p>
            </div>
            <div className={classes.column}>
               <p className={classes.title}>Country <p className={classes.span}>{data.country}</p></p>
            </div>
            <div className={classes.column}>
               <p className={classes.title}>Device 
                 <p className={classes.span}>{data.device} <Icon Svg={DesktopIcon}/></p>
               </p>
            </div>
            <div className={classes.column}>
              <p className={classes.title}>OS <p className={classes.span}>{data.os}</p></p>
            </div>
        </div>
    );
};

export default StatisticsCard;