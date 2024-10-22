import { Select, SelectOption } from '@/shared/ui/Select/Select'
import classes from './StatisticSelect.module.css'
import { useMemo, useState } from 'react';

export const StatisticSelect = () => {
    const [selectedOS, setSelectedOS] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('');
    const [selectedBrowser, setSelectedBrowser] = useState('');

    const osOptions: SelectOption<string>[] = useMemo(() => ([
        {value: 'select all', content: 'Select all'}, 
        { value: 'windows', content: 'Windows' },
        { value: 'macos', content: 'macOS' },
        { value: 'linux', content: 'Linux' },
        { value: 'ios', content: 'iOS' },
        { value: 'android', content: 'Android' },
    ]), []);

    const deviceOptions: SelectOption<string>[] = useMemo(() => ([
        {value: 'select all', content: 'Select all'}, 
        { value: 'desktop', content: 'Desktop' },
        { value: 'mobile', content: 'Mobile' },
        { value: 'tablet', content: 'Tablet' },
        { value: 'tv', content: 'TV' },
    ]), []);

    const browserOptions: SelectOption<string>[] = useMemo(() => ([
        {value: 'select all', content: 'Select all'}, 
        { value: 'chrome', content: 'Chrome' },
        { value: 'firefox', content: 'Firefox' },
        { value: 'safari', content: 'Safari' },
        { value: 'edge', content: 'Edge' },
        { value: 'opera', content: 'Opera' },
    ]), []);

    return (
        <div className={classes.StatisticSelect}>
            <Select
                options={osOptions}
                value={selectedOS}
                onChange={setSelectedOS}
                className={classes.select}
            />
            <Select
                options={deviceOptions}
                value={selectedDevice}
                onChange={setSelectedDevice}
                className={classes.select}
            />
            <Select
                options={browserOptions}
                value={selectedBrowser}
                onChange={setSelectedBrowser}
                className={classes.select}
            />
        </div>
    );
};