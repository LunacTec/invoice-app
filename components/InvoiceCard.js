import totalPriceCalculator from "@/utils/totalPriceCalculator";
import { Badge, Flex, Heading, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useEffect } from "react";

import DeleteInvoiceButton from "./DeleteInvoiceButton";
import UpdateInvoiceButton from "./UpdateInvoiceButton";

const InvoiceCard = ({ clientData, data, invoiceId, callback }) => {
    let invoice = invoiceId
        ? data?.invoices.find((invoice) => invoice.id === invoiceId)
        : data?.invoices?.[0];

    useEffect(() => {
        invoice = invoiceId
            ? data?.invoices.find((invoice) => invoice.id === invoiceId)
            : data?.invoices?.[0];
    }, [invoiceId]);

    if (!invoice) return <Text>No invoice</Text>;

    return (
        <Flex
            borderColor="brand.100"
            borderWidth={2}
            rounded={16}
            direction={["column", "column", "column", "column", "row"]}
        >
            <Flex
                justifyContent="space-between"
                p={5}
                bg="brand.100"
                direction="column"
            >
                <Flex direction="column">
                    <Flex direction="row">
                        #
                        <Text pr={2} fontWeight="semibold">
                            {invoice?.id.substring(0, 5)}
                        </Text>
                        <Badge
                            p={1}
                            colorScheme={
                                invoice?.status === "pending"
                                    ? "purple"
                                    : invoice?.status === "paid"
                                    ? "green"
                                    : invoice?.status === "canceled" && "red"
                            }
                        >
                            {invoice?.status}
                        </Badge>
                    </Flex>
                    <Flex direction="row" alignItems="center">
                        <Text fontSize="xl" fontWeight="semibold">
                            {invoice?.clientObj.name}
                        </Text>
                    </Flex>
                    <Text>{invoice?.description}</Text>
                </Flex>
                <Flex
                    direction="row"
                    alignSelf={[
                        "flex-end",
                        "flex-end",
                        "flex-end",
                        "flex-end",
                        "flex-start",
                    ]}
                >
                    <DeleteInvoiceButton
                        callback={callback}
                        invoiceId={invoiceId || invoice?.id}
                    />
                    <UpdateInvoiceButton
                        invoiceObj={invoice}
                        clients={clientData}
                        callback={callback}
                    />
                </Flex>
            </Flex>
            <Flex minH="100%" justifyContent="space-between" direction="column">
                <Flex direction="column" overflow="auto" maxW="100%">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Qty</Th>
                                <Th>Price</Th>
                                <Th>Total price</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {invoice?.items?.map((item) => (
                                <Tr key={item?.name}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.qty}</Td>
                                    <Td>{item.price}</Td>
                                    <Td>{item.price * item.qty}$</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
                <Flex
                    direction="row"
                    justifyContent="space-between"
                    justifySelf="flex-end"
                    p={3}
                    bg="brand.400"
                    roundedBottomRight={12}
                    roundedBottomLeft={[12, 12, 0]}
                >
                    <Text color="white">Total amount</Text>&nbsp;
                    <Text color="white" fontWeight="semibold" fontSize="lg">
                        {totalPriceCalculator(invoice?.items)}$
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default InvoiceCard;
