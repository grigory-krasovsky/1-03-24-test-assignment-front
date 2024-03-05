import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export const GenericTableComponent = ({data, deleteButton, deleteButtonFunction}) => {

    return data && data.length > 0 && <Table>
        <TableHead>
            <TableRow>
                {Object.keys(data[0]).map(key => (
                    <TableCell key = {uuidv4()} align={'center'} style={{ fontWeight: 'bold' }}>
                        {key.toUpperCase()}
                    </TableCell>
                ))}
                {deleteButton && <TableCell align={'center'} width={'10%'}/>}
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map(item => {
                return <TableRow key = {uuidv4()}>
                    {Object.keys(item).map(key=> {
                        return <TableCell
                            key = {uuidv4()}
                            align={'center'}>
                            {item[key]?.toString()}
                        </TableCell>
                    })}
                    {deleteButton && <TableCell align={'center'} width={'10%'}>
                        <Button onClick={() => deleteButtonFunction(item.id)}><DeleteForeverIcon/></Button>
                    </TableCell>}
                </TableRow>
            })}
        </TableBody>
    </Table>
}