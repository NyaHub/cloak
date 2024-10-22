import { Input } from '@/shared/ui/Input/Input';
import classes from  './CampaignsPage.module.css'
import { useState } from 'react';
import CheckboxCustom from '@/shared/ui/Checkbox/Checkbox';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { Check, X } from 'lucide-react';

const statusOptions: SelectOption<string>[] = [
  {
    value: "Active",
    content: "Active"
  },
  {
    value: "Deactivated",
    content: "Deactivated"
  },
]

const CampaignsPage = () => {
    const [name, setName] = useState('');
    const [black, setBlack] = useState('');
    const [white, setWhite] = useState('');
    const [status, setStatus] = useState<string>('');

    const [isTrueSafeChecked, setIsTrueSafeChecked] = useState(false);
    const [isTrueSafeCheckedBlack, setIsTrueSafeCheckedBlack] = useState(false);

    const [isShowContentChecked, setShowContentChecked] = useState(false);
    const [isRedirectChecked, setRedirectChecked] = useState(false);
    const [isShowContentCheckedBlack, setShowContentCheckedBlack] = useState(false);
    const [isRedirectCheckedBlack, setRedirectCheckedBlack] = useState(false);

    const handleInputChange = (value: string) => {
        setName(value);
    };

    const handleInputBlackChange = (value: string) => {
        setBlack(value);
    };

     const handleInputWhiteChange = (value: string) => {
        setWhite(value);
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
    };

    const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prev => !prev);
    };

     // Функция для очистки всех форм
    const clearForms = () => {
        setName('');
        setBlack('');
        setWhite('');
        setStatus('');
        setIsTrueSafeChecked(false);
        setIsTrueSafeCheckedBlack(false);
        setShowContentChecked(false);
        setRedirectChecked(false);
        setShowContentCheckedBlack(false);
        setRedirectCheckedBlack(false);
    };

    return (
        <div className={classes.inputContainer}>

            <span className={classes.selectTitle}>Name</span>
            <Input
                placeholder='Enter Name' 
                value={name}
                onChange={handleInputChange}
                className={classes.placeholder}
            />

            <span className={classes.selectTitle}>Black Page</span>
            <Input
                placeholder='Enter Black Page' 
                value={black}
                onChange={handleInputBlackChange}
                className={classes.placeholder}
            />

            <div className={classes.ckeckBlock}>
                <div className={classes.gap}>
                    <CheckboxCustom 
                        checked={isShowContentChecked} 
                        onChange={() => handleCheckboxChange(setShowContentChecked)} 
                    />
                    <p style={{color: '#28AE60', fontSize: '14px'}}>Show content</p>
                </div>
                <div className={classes.gap}>
                    <CheckboxCustom 
                        checked={isRedirectChecked} 
                        onChange={() => handleCheckboxChange(setRedirectChecked)} 
                    />
                    <p style={{color: '#E85A48', fontSize: '14px'}}>Redirect</p>
                </div>
                <div className={classes.gap}>
                    <CheckboxCustom 
                        checked={isTrueSafeChecked}
                        onChange={() => handleCheckboxChange(setIsTrueSafeChecked)} 
                    />
                    <p style={{ color: isTrueSafeChecked ? '#2D9CDB' : '#D865E4', fontSize: '14px' }}>
                        True safe
                    </p>
                </div>
            </div>

            <span className={classes.selectTitle}>White Page</span>
            <Input
                placeholder='Enter White Page' 
                value={white}
                onChange={handleInputWhiteChange}
                className={classes.placeholder}
            />
            <div className={classes.ckeckBlock}>
                <div className={classes.gap}>
                    <CheckboxCustom 
                        checked={isShowContentCheckedBlack} 
                        onChange={() => handleCheckboxChange(setShowContentCheckedBlack)} 
                    />
                    <p style={{color: '#28AE60', fontSize: '14px'}}>Show content</p>
                </div>
                <div className={classes.gap}>
                    <CheckboxCustom 
                        checked={isRedirectCheckedBlack} 
                        onChange={() => handleCheckboxChange(setRedirectCheckedBlack)} 
                    />
                    <p style={{color: '#E85A48', fontSize: '14px'}}>Redirect</p>
                </div>
                <div className={classes.gap}>
                    <CheckboxCustom 
                        checked={isTrueSafeCheckedBlack}
                        onChange={() => handleCheckboxChange(setIsTrueSafeCheckedBlack)} 
                    />
                    <p style={{ color: isTrueSafeCheckedBlack ? '#2D9CDB' : '#D865E4', fontSize: '14px' }}>
                        True safe
                    </p>
                </div>
            </div>

            <p className={classes.title}>Campaign Status</p>
            <span className={classes.selectTitle}>Status</span>
            <Select
              value={status}
              onChange={handleStatusChange}
              options={statusOptions}
            />
            <div className={classes.btnContainer}>
                <button className={`${classes.btnSave} ${classes.btn}`}>
                    <Check />
                    Save Campaign
                </button>
                <button className={`${classes.btnDis} ${classes.btn}`} onClick={clearForms}>
                     <X />
                    Discard
                </button>
            </div>
        </div>
    )
}

export default CampaignsPage;