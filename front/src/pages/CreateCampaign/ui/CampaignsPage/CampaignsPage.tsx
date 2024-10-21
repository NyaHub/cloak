import { Input } from '@/shared/ui/Input/Input';
import classes from  './CampaignsPage.module.css'
import { useState } from 'react';
import CheckboxCustom from '@/shared/ui/Checkbox/Checkbox';
import { Select } from '@/shared/ui/Select/Select';
import { Check, X } from 'lucide-react';

const CampaignsPage = () => {
    const [name, setName] = useState('');
    const [black, setBlack] = useState('');
    const [white, setWhite] = useState('');
    
    const handleInputChange = (value: string) => {
        setName(value);
    };

    const handleInputBlackChange = (value: string) => {
        setBlack(value);
    };

     const handleInputWhiteChange = (value: string) => {
        setWhite(value);
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
                    <CheckboxCustom checked={false} />
                    <p style={{color: '#28AE60', fontSize: '14px'}}>Show content</p>
                </div>
                <div className={classes.gap}>
                     <CheckboxCustom checked={false} />
                     <p style={{color: '#E85A48', fontSize: '14px'}}>Redirect</p>
                </div>
                <div className={classes.gap}>
                    <CheckboxCustom checked={false} />
                   <p style={{color: '#D865E4', fontSize: '14px'}}>True safe</p>
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
                    <CheckboxCustom checked={false} />
                    <p style={{color: '#28AE60', fontSize: '14px'}}>Show content</p>
                </div>
                <div className={classes.gap}>
                     <CheckboxCustom checked={false}/>
                     <p style={{color: '#E85A48', fontSize: '14px'}}>Redirect</p>
                </div>
                <div className={classes.gap}>
                    <CheckboxCustom checked={false}/>
                   <p style={{color: '#D865E4', fontSize: '14px'}}>True safe</p>
                </div>
            </div>

            <p className={classes.title}>Campaign Status</p>
            <span className={classes.selectTitle}>Status</span>
            <Select/>
            <div className={classes.btnContainer}>
            <button className={`${classes.btnSave} ${classes.btn}`}>
                <Check />
               Save Campaign
            </button>
            <button className={`${classes.btnDis} ${classes.btn}`}>
                 <X />
               Discard
            </button>
            </div>

        </div>
    )
}

export default CampaignsPage;