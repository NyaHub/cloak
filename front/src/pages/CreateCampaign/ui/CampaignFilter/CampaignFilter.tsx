import classes from  './CanpaignFilter.module.css'
import { Select, SelectOption } from '@/shared/ui/Select/Select'
import CheckboxCustom from '@/shared/ui/Checkbox/Checkbox'
import { Textarea } from '@/shared/ui/TextArea/TextArea'
import { useState } from 'react'

const countryOptions = [
    { value: 'AF', content: 'Afghanistan' },
    { value: 'AX', content: '\u00c5land Islands' },
    { value: 'AL', content: 'Albania' },
    { value: 'AS', content: 'American Samoa' },
    { value: 'AD', content: 'Andorra' },
    { value: 'AO', content: 'Angola' },
    { value: 'AI', content: 'Anguilla' },
    { value: 'AQ', content: 'Antarctica' },
    { value: 'AG', content: 'Antigua & Barbuda' },
    { value: 'AR', content: 'Argentina' },
    { value: 'AM', content: 'Armenia' },
    { value: 'AW', content: 'Aruba' },
    { value: 'AU', content: 'Australia' },
    { value: 'AT', content: 'Austria' },
    { value: 'AZ', content: 'Azerbaijan' },
];

const devicesOptions: SelectOption<string>[] = [
  {
    value: "desktop",
    content: "Desktop"
  },
  {
    value: "mobile",
    content: "Mobile"
  },
  {
    value: "tablet",
    content: "Tablet"
  },
  {
    value: "tv",
    content: "TV"
  }
];


const CanpaignFilter = () => {
    const [geoFilterEnabled, setGeoFilterEnabled] = useState<boolean>(false);
    const [deviceFilterEnabled, setDeviceFilterEnabled] = useState<boolean>(false);
    const [refererFilterEnabled, setRefererFilterEnabled] = useState<boolean>(false);
    
    const [geoFilterValue, setGeoFilterValue] = useState<string>('');
    const [deviceFilterValue, setDeviceFilterValue] = useState<string>('');
    const [refererFilterValue, setRefererFilterValue] = useState<string>('');

    return (
        <div className={classes.inputContainer}>

               <span className={classes.selectTitle}>Geo filter</span>
               <Select
                 value={geoFilterValue}
                 onChange={setGeoFilterValue}
                 options={countryOptions}
                 disabled={!geoFilterEnabled} // Отключение, если фильтр выключен
               />
                <div className={classes.checkSpan}>
                    <CheckboxCustom 
                      checked={geoFilterEnabled}
                       onChange={() => setGeoFilterEnabled(prev => !prev)} // Переключение состояния   
                    /> 
                    <span className={classes.spanCheck}>Allow Geo filter</span>
               </div>

                <span className={classes.selectTitle}>Device filter</span>
               <Select
                 value={deviceFilterValue}
                 onChange={setDeviceFilterValue}
                 options={devicesOptions}
                 disabled={!deviceFilterEnabled} // Отключение, если фильтр выключен
               />
               <div className={classes.checkSpan}>
                    <CheckboxCustom 
                      checked={deviceFilterEnabled}
                      onChange={() => setDeviceFilterEnabled(prev => !prev)} // Переключение состояния 
                    /> 
                    <span className={classes.spanCheck}>Allow Device filter</span>
               </div>

                <span className={classes.selectTitle}>Referer filter</span>
                <Textarea
                   value={refererFilterValue}
                   onChange={e => setRefererFilterValue(e.target.value)} 
                   placeholder='Enter referers separated by commas'
                   className={classes.placeholder}
                   disabled={!refererFilterEnabled} // Отключение, если фильтр выключен
                />
               <div className={classes.checkSpan}>
                    <CheckboxCustom 
                      checked={refererFilterEnabled}
                      onChange={() => setRefererFilterEnabled(prev => !prev)} // Переключение состояния 
                     /> 
                    <span className={classes.spanCheck}>Allow Referer filter</span>
               </div>
        </div>
    )
}

export default CanpaignFilter;