import React, { useEffect, useRef, useState } from "react";
import {
  Tag,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { supabase } from "../../supabaseClient";
import { ExpenseObject } from "../../types/expense";
import { ExpenseModal } from "../../components/ExpenseModal/ExpenseModal";

export const Expenses = () => {
  const [deleting, setDeleting] = useState(false);
  const [initiatedDelete, setInitiatedDelete] = useState<number>();
  const [expenses, setExpenses] = useState<ExpenseObject[] | []>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const deleteExpense = async () => {
    try {
      setDeleting(true);
      const { error } = await supabase
        .from("expenses")
        .delete()
        .match({ id: initiatedDelete });
      if (error) {
        console.error(error);
      }
    } catch (error) {
      throw error;
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      getData();
    }
  };

  const initiateDelete = (id: number) => {
    setDeleteDialogOpen(true);
    setInitiatedDelete(id);
  };

  const getData = async () => {
    try {
      const user = supabase.auth.user();

      const { data, error, status } = await supabase
        .from("expenses")
        .select()
        .eq("user_id", user!.id);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        const dataSortedByDate = data.sort(
          (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
        );
        setExpenses(dataSortedByDate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Heading pb="8">Expenses</Heading>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Vendor</Th>
            <Th>Date</Th>
            <Th isNumeric>Claiming</Th>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {expenses.map((expense) => (
            <ExpenseRow
              expense={expense}
              onDelete={initiateDelete}
              key={expense.id}
              refetch={getData}
            />
          ))}
        </Tbody>
      </Table>
      <AlertDialog
        isOpen={deleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Expense
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                disabled={deleting}
                ref={cancelRef}
                onClick={closeDeleteDialog}
              >
                Cancel
              </Button>
              <Button
                disabled={deleting}
                colorScheme="red"
                onClick={deleteExpense}
                ml={3}
              >
                {deleting ? "Deleting" : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const ExpenseRow = ({
  expense,
  onDelete,
  refetch,
}: {
  expense: ExpenseObject;
  onDelete: (arg: number) => void;
  refetch: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tr>
        <Td>
          <Text fontSize="xs" fontWeight={"bold"}>
            {expense.vendor}
          </Text>
        </Td>
        <Td>
          <Text fontSize={"sm"}>
            {format(new Date(expense.transaction_date), "dd/MM/yy")}
          </Text>
        </Td>
        <Td>
          <Stack spacing="1">
            <Text fontSize="xs">${expense.claimable_amount}</Text>
            <Text fontSize={"xs"}>({expense.claimable_percent}%)</Text>
          </Stack>
        </Td>
        <Td>
          <Text fontSize="xs">{expense.description}</Text>
        </Td>
        <Td>
          <Tag fontSize={"xs"} variant={"subtle"} colorScheme={"blue"}>
            {expense.type}
          </Tag>
        </Td>
        <Td>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem icon={<BiEdit />} onClick={onOpen}>
                Edit
              </MenuItem>
              <MenuItem
                color="red"
                icon={<BiEdit />}
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      <ExpenseModal
        isOpen={isOpen}
        onClose={onClose}
        editMode
        transaction={expense}
        onSubmitSuccess={refetch}
      />
    </>
  );
};
