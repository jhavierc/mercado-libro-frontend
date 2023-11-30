import { Text, Table, Thead, Tr, Th, Tbody, Td, Image, TableContainer} from "@chakra-ui/react";
import { Item } from './index';

const TableDesktop = ({ items }: { items: Item[] }) => {

    return(
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th fontWeight='semibold' color='black' fontSize={{base: 'sm', '2xl': 'md'}} textTransform='capitalize'>Producto</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color='black' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Precio</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color='black' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Cantidad</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color='black' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map((item) => (
                         <Tr>
                         <Td display='flex'>
                             <Image objectFit='contain' boxSize={{ base: '50px', md: '50px', lg: '80px', xl: '100px', '2xl': '120px'}} src={item.book.image_links[0].url}/>
                             <Text ml='20px' fontSize={{base: 'sm', '2xl': 'md'}} whiteSpace="normal" wordBreak="break-word" fontWeight='semibold'>{item.book.title}, {item.book.authors[0].name}</Text>
                         </Td>
                         <Td fontSize={{base: 'sm', '2xl': 'md'}} verticalAlign='top' textAlign='center'>${item.book.price}</Td>
                         <Td fontSize={{base: 'sm', '2xl': 'md'}} verticalAlign='top' textAlign='center'>{item.invoice.quantity}</Td>
                         <Td fontSize={{base: 'sm', '2xl': 'md'}} verticalAlign='top' textAlign='center'>${item.invoice.total}</Td>
                     </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
};

export default TableDesktop;