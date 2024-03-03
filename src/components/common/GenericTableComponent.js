import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

export const GenericTableComponent = ({data}) => {
    return data && data.length > 0 && <Table>
        <TableHead>
            <TableRow>
                {Object.keys(data[0]).map(key => (
                    <TableCell key = {uuidv4()}>{key.toUpperCase()}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map(item => {
                return <TableRow key = {uuidv4()}>
                    <TableCell >
                        {item.username}
                    </TableCell>
                    <TableCell >
                        {item.role.toString()}
                    </TableCell>
                    <TableCell >
                        {item.active ? 'Active' : 'Deactivated'}
                    </TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
}