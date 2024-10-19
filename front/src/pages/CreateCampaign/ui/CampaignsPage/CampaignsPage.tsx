import { Input } from '@/shared/ui/Input/Input';
import classes from  './CampaignsPage.module.css'
import { useState } from 'react';

const CampaignsPage = () => {
    const [name, setName] = useState('');
    
    const handleInputChange = (value: string) => {
        setName(value);
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
                value={name}
                onChange={handleInputChange}
                className={classes.placeholder}
            />
            <span className={classes.selectTitle}>White Page</span>
            <Input
                placeholder='Enter White Page' 
                value={name}
                onChange={handleInputChange}
                className={classes.placeholder}
            />

        </div>
    )
}

export default CampaignsPage;