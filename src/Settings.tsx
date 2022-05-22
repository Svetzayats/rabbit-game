import { Dispatch, SetStateAction, SyntheticEvent } from "react";

import { FormControl, FormLabel, ToggleButtonGroup, ToggleButton, Select, MenuItem, Button } from '@mui/material';

import {IRole} from './Game';
import "./Settings.css";

export interface ISettings {
    holes: number;
    role: IRole;
}

type ISettingsProps = {
    settings: ISettings;
    setSettings: Dispatch<SetStateAction<ISettings>>;
    submitCallback: Dispatch<SetStateAction<boolean>>;
}

const possibleNumberOfHoles = new Array(8).fill(null).map((elem, index) => index + 3)

const Settings = ({settings, setSettings, submitCallback}: ISettingsProps) => {
    
    function roleHandleChanges(role: IRole) {
        setSettings({
            ...settings,
            role
        });
    }

    function holesHandleChanges(holes: number) {
        setSettings({
            ...settings,
            holes
        });
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        submitCallback(true);
    }

    return (
        <div className="game_settings">
                <div className="game_settings_description">
                    <div>
                        You can choose role - rabbit or hunter.
                        <ul>
                            <li>
                                If you are rabbit you choose hole, what you want
                                occupy on your turn. Your aim is avoiding to be
                                catched.
                            </li>
                            <li>
                                If you are hunter you choose hole for checking.
                                You aim is catching a rabbit.
                            </li>
                        </ul>
                    </div>
                </div>
                    <form className="game_settings_form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="game_settings_inputs">
                            <FormControl>
                        <FormLabel>Your role is</FormLabel>
                            <ToggleButtonGroup 
                            value={settings.role}
                            onChange={(event, newRole) => roleHandleChanges(newRole)}
                            exclusive
                            aria-label="Role toggle button"
                            >
                                <ToggleButton value="rabbit"
                                aria-label="rabbit"
                                size="small">
                                Rabbit
                                </ToggleButton>
                                <ToggleButton value="hunter"
                                aria-label="hunter"
                                size="small">
                                Hunter
                                </ToggleButton>
                            </ToggleButtonGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Number of holes</FormLabel>
                        <Select
                            value={settings.holes}
                            name="holes"
                            defaultValue={settings.holes}
                            onChange={(event) => holesHandleChanges(Number(event.target.value))}
                            aria-label="number of holes"
                            size="small"
                            >
                               {possibleNumberOfHoles.map(item => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                        </Select>
                    </FormControl>
                        </div>
                    
                    <Button className="game_settings_button" variant="contained" color="primary" type="submit">Play</Button>
                    </form>
                
            </div>
    );
}

export default Settings;