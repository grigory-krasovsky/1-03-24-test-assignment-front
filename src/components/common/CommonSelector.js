import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export const CommonSelector = ({sourceData, currentValues, handler, title}) => {

    return (
        <FormControl fullWidth>
            <InputLabel id="role-selector-label">{title}</InputLabel>
            <Select
                labelId="role-selector-label"
                id="role-selector"
                multiple
                value={currentValues.map(v => v.id)}
                onChange={handler}
                fullWidth
            >
                {sourceData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.displayName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}