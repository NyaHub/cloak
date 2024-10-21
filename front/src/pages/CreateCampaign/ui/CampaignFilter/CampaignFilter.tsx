import { Input } from '@/shared/ui/Input/Input'
import classes from  './CanpaignFilter.module.css'
import { Select } from '@/shared/ui/Select/Select'
import CheckboxCustom from '@/shared/ui/Checkbox/Checkbox'
import { useState } from 'react'
import { Textarea } from '@/shared/ui/TextArea/TextArea'

const CanpaignFilter = () => {
    const [numberOfClicks, setNumberOfClicks] = useState('');
    
    const handleInputChange = (value: string) => {
        setNumberOfClicks(value);
    };
    
    return (
        <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>Numbers of clicks from one IP</span>
               <Input
                 placeholder='0' 
                 value={numberOfClicks}
                 onChange={handleInputChange}
                 className={classes.placeholder}
               />

               <span className={classes.selectTitle}>Geo filter</span>
               <Select />
                <div className={classes.checkSpan}>
                    <CheckboxCustom checked={false} /> 
                    <span className={classes.spanCheck}>Allow Geo filter</span>
               </div>

                <span className={classes.selectTitle}>Device filter</span>
               <Select/>
               <div className={classes.checkSpan}>
                    <CheckboxCustom checked={false} /> 
                    <span className={classes.spanCheck}>Allow Device filter</span>
               </div>

                <span className={classes.selectTitle}>Referer filter</span>
                <Textarea 
                   placeholder='Enter referers separated by commas'
                   className={classes.placeholder}
                />
               <div className={classes.checkSpan}>
                    <CheckboxCustom checked={false} /> 
                    <span className={classes.spanCheck}>Allow Referer filter</span>
               </div>
        </div>
    )
}

export default CanpaignFilter;