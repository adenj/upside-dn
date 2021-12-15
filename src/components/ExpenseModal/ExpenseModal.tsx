import React, { useState } from "react";
import {
  Button,
  Box,
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
  Icon,
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
import { IoStorefrontSharp } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { formatNormaliseAmount } from "../../utils/formatMoney";
import { TransactionResource } from "../../types/transaction";
import { supabase } from "../../supabaseClient";
import { expenseTypes } from "../../constants/expenseTypes";
import { AiFillDollarCircle } from "react-icons/ai";

interface ExpenseModalProps {
  isOpen: ModalProps["isOpen"];
  onClose: ModalProps["onClose"];
  transaction: TransactionResource;
}

export const ExpenseModal = ({
  isOpen,
  onClose,
  transaction,
}: ExpenseModalProps) => {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [vendor, setVendor] = useState(transaction.attributes.description);
  const [description, setDescription] = useState(
    transaction.attributes.rawText || ""
  );
  const [amount, setAmount] = useState(
    formatNormaliseAmount(transaction.attributes.amount.valueInBaseUnits)
  );
  const [date, setDate] = useState(new Date(transaction.attributes.createdAt));
  const [type, setType] = useState("");
  const [fullyClaimable, setFullyClaimable] = useState(true);
  const [claimableAmount, setClaimableAmount] = useState({
    percent: 100,
    amount,
  });

  const updateClaimableAmount = (value: number) => {
    const newAmount = +(amount * (value / 100)).toFixed(2);
    const percent = Number(value);
    setClaimableAmount({ amount: newAmount, percent });
  };

  const saveExpense = async () => {
    try {
      setSubmitting(true);
      const user = supabase.auth.user();
      const data = {
        user_id: user!.id,
        created_at: new Date(),
        total_amount: amount,
        vendor,
        type,
        description,
        fully_claimable: fullyClaimable,
        claimable_amount: fullyClaimable ? amount : claimableAmount.amount,
        claimable_percent: claimableAmount.percent,
        transaction_id: transaction.id,
        transaction_date: date,
      };

      const { error, statusText } = await supabase
        .from("expenses")
        .upsert(data, { returning: "minimal" });

      console.log(statusText);
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
      toast({
        title: "Expense created",
        status: "success",
        isClosable: true,
        duration: 5000,
        description: "You can view your expense claims in the Expenses tab",
      });
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
                  <SliderThumb children={claimableAmount.percent} boxSize={6} />
                </Slider>
              </Flex>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={saveExpense}>
            Save
          </Button>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
