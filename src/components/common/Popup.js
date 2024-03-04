import {Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export const Popup = ({initialState, changeUserFormHandlers, title, open, setOpen, handleSave}) => {

    const getInputComponent = (key, value, index) => {

        if (typeof value === 'string') {
            return <TextField
                key={index}
                margin="dense"
                id={key}
                label={key}
                type="text"
                fullWidth
                value={value}
                onChange={changeUserFormHandlers.changeUserFormString}
            />
        } else if (typeof value === 'boolean') {
            return <Checkbox id={key} checked={value} onChange={changeUserFormHandlers.changeUserFormBoolean} />
        }
    }

    return <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {Object.keys(initialState).map((key, index) => {
                return getInputComponent(key, initialState[key], index)
            })}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSave}>save</Button>
            <Button onClick={() => setOpen(false)}>cancel</Button>
        </DialogActions>
    </Dialog>
}