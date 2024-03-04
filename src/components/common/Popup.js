import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField
} from "@mui/material";

export const Popup = ({
                          initialState,
                          changeUserFormHandlers,
                          title,
                          open,
                          setOpen,
                          handleSave,
                          additionalComponents
                      }) => {

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
            return <Box
                key={index}>
                <FormControlLabel
                    control={
                        <Checkbox
                            id={key}
                            checked={value}
                            onChange={changeUserFormHandlers.changeUserFormBoolean}
                        />}
                    label={key}
                />
            </Box>
        }
    }

    return <Dialog
        open={open}
        onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {Object.keys(initialState).map((key, index) => {
                return getInputComponent(key, initialState[key], index)
            })}
            {additionalComponents && Array.isArray(additionalComponents) && additionalComponents.map((c, i) => {
                return <Box
                    key={i}
                    marginTop={2}
                >
                    {c}
                </Box>;
            })}
        </DialogContent>

        <DialogActions>
            <Button onClick={handleSave}>save</Button>
            <Button onClick={() => setOpen(false)}>cancel</Button>
        </DialogActions>
    </Dialog>
}