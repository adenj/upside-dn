import React, { useState } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalProps,
  FormControl,
  Stack,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
  Textarea,
  Select,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { formatNormaliseAmount } from "../../utils/formatMoney";
import { TransactionResource } from "../../types/transaction";
import { supabase } from "../../supabaseClient";
import { expenseTypes } from "../../constants/expenseTypes";
import { ExpenseObject } from "../../types/expense";

interface NewExpenseModalProps {
  editMode?: false;
  transaction: TransactionResource;
  onSubmitSuccess: never;
}

interface EditExpenseModalProps {
  editMode: true;
  transaction: ExpenseObject;
  onSubmitSuccess: () => void;
}

interface CommonProps {
  isOpen: ModalProps["isOpen"];
  onClose: ModalProps["onClose"];
}

type ExpenseModalProps =
  | CommonProps & (NewExpenseModalProps | EditExpenseModalProps);

export const ExpenseModal = ({
  isOpen,
  onClose,
  transaction,
  editMode,
  onSubmitSuccess,
}: ExpenseModalProps) => {
  const data = editMode
    ? {
        ...transaction,
        total_amount: transaction.total_amount * 100,
      }
    : {
        vendor: transaction?.attributes.description,
        description: transaction?.attributes.rawText,
        total_amount: transaction?.attributes.amount.valueInBaseUnits,
        transaction_date: transaction?.attributes.createdAt,
        transaction_id: transaction.attributes?.id,
      };
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [vendor, setVendor] = useState(data.vendor);
  const [description, setDescription] = useState(data.description || "");
  const [amount, setAmount] = useState(
    formatNormaliseAmount(data.total_amount)
  );
  const [date, setDate] = useState(new Date(data.transaction_date));
  const [type, setType] = useState(data.type ? data.type : "");
  const [fullyClaimable, setFullyClaimable] = useState(
    editMode ? data.fully_claimable : true
  );
  const [claimableAmount, setClaimableAmount] = useState(
    editMode
      ? { percent: data.claimable_percent, amount: data.claimable_amount }
      : {
          percent: 100,
          amount,
        }
  );

  const updateClaimableAmount = (value: number) => {
    const newAmount = +(amount * (value / 100)).toFixed(2);
    const percent = Number(value);
    setClaimableAmount({ amount: newAmount, percent });
  };

  const saveExpense = async () => {
    try {
      setSubmitting(true);
      const user = supabase.auth.user();
      const upsertData = {
        ...(editMode ? { id: data.id } : {}),
        user_id: user!.id,
        created_at: new Date(),
        total_amount: amount,
        vendor,
        type,
        description,
        fully_claimable: fullyClaimable,
        claimable_amount: fullyClaimable ? amount : claimableAmount.amount,
        claimable_percent: fullyClaimable ? 100 : claimableAmount.percent,
        transaction_id: data.transaction_id,
        transaction_date: date,
      };

      const { error } = await supabase
        .from("expenses")
        .upsert(upsertData, { returning: "minimal" });

      if (error) {
        toast({
          title: "Error",
          status: "error",
          isClosable: true,
          duration: 15000,
          description: `There was an error creating your expense: ${error}`,
        });
        throw error;
      }
      if (editMode) {
        toast({
          title: "Expense updated",
          status: "success",
          isClosable: true,
          duration: 5000,
          description: "Your expense has been successfully updated",
        });
        onSubmitSuccess();
      } else {
        toast({
          title: "Expense created",
          status: "success",
          isClosable: true,
          duration: 5000,
          description: "You can view your expense claims in the Expenses tab",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        isClosable: true,
        duration: 15000,
        description: `There was an error creating your expense: ${error.message}`,
      });
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel fontWeight="bolder">Vendor</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Vendor"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bolder">Total Amount</FormLabel>
              <InputGroup>
                <InputLeftElement children="$" />
                <Input
                  placeholder="Total Amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bolder">Transaction date</FormLabel>
              <InputGroup>
                <SingleDatepicker
                  date={date}
                  onDateChange={(e) => {
                    setDate(new Date(e));
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bolder">Expense type</FormLabel>
              <Select
                placeholder="Select expense type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {expenseTypes.map((type) => (
                  <option value={type.value}>{type.label}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bolder">Description</FormLabel>
              <InputGroup>
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel fontWeight="bolder" htmlFor="100%-claimable" mb="0">
                Is this expense 100% claimable?
              </FormLabel>
              <Switch
                id="100%-claimable"
                size="lg"
                isChecked={fullyClaimable}
                onChange={(e) => setFullyClaimable(e.target.checked)}
              />
            </FormControl>
            {!fullyClaimable && (
              <Flex>
                <NumberInput
                  maxWidth="100px"
                  mr="2rem"
                  value={claimableAmount.percent}
                  onChange={(value) => updateClaimableAmount(Number(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Slider
                  flex="1"
                  step={5}
                  min={0}
                  max={100}
                  focusThumbOnChange={false}
                  value={claimableAmount.percent}
                  onChange={updateClaimableAmount}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
              </Flex>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            disabled={submitting}
            onClick={saveExpense}
          >
            Save
          </Button>
          <Button
            variant="ghost"
            mr={3}
            disabled={submitting}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
