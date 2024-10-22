import classes from  './CampaignsIcon.module.css'
import { 
    ChartPie,
    Clock3, 
    FolderPen,
    LogIn, 
    NotepadText,
} from "lucide-react"

interface IconItem {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const icons: IconItem[] = [
  { Icon: NotepadText, text: 'Page' },
  { Icon: ChartPie, text: 'Status' },
  { Icon: Clock3, text: 'Last updated' },
  { Icon: LogIn, text: 'Pass' },
];

const IconWithText: React.FC<IconItem> = ({ Icon, text }) => (
  <div className={classes.AllIcon}>
    <Icon style={{ width: '18px', height: '18px' }} />
    {text}
  </div>
);

export const CampaignsIcon: React.FC = () => {
  
  return (
    <div className={classes.CampaignsIcon}>
      <div className={classes.Iconleft}>
        <FolderPen style={{ width: '18px', height: '18px' }} />
        Name
      </div>
      <div className={classes.IconBlock}>
        <div className={classes.PageStatus}>
          {icons.slice(0, 2).map((icon, index) => (
            <IconWithText key={index} Icon={icon.Icon} text={icon.text} />
          ))}
        </div>
        {icons.slice(2).map((icon, index) => (
          <IconWithText key={index} Icon={icon.Icon} text={icon.text}
          />
        ))}
      </div>
    </div>
  );
};