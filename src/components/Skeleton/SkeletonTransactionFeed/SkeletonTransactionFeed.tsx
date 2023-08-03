import React from 'react';
import { Stack, useColorModeValue, Box, Accordion, Text, AccordionItem, AccordionButton, Grid, GridItem, Flex, Avatar, AccordionPanel, Link, Badge, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react';

export const SkeletonTransactionList = () => {
	const transactionsDates = [1, 2, 3]

	return (
		<Stack spacing={12}>
			{transactionsDates.map((index) => {
				return (
					<SkeletonTransactionGroup
						key={`${index}`}
					/>
				);
			})}
		</Stack>
	);
};

const SkeletonTransactionGroupHeading = () => {
	const bg = useColorModeValue("gray.100", "gray.700");
	return (
		<Box px="8" py="2" bg={bg} roundedTop="lg" position="sticky" top="0">
			<Skeleton width="130px">
				<Text>
					placeholder
				</Text>
			</Skeleton>
		</Box>
	);
};

const SkeletonTransactionGroup = ({ transactions = [1, 2, 3] }) => {
	return (
		<Box roundedBottom="lg">
			<SkeletonTransactionGroupHeading />
			<Accordion allowMultiple>
				{transactions.map(() => {
					return <SkeletonTransaction />;
				})}
			</Accordion>
		</Box>
	);
};


const SkeletonTransaction = () => (
	<AccordionItem
		borderWidth="1px"
		borderTop="none"
		_last={{
			borderBottomLeftRadius: "0.5rem",
			borderBottomRightRadius: "0.5rem",
		}}
	>
		<AccordionButton _expanded={{ bg: 'cardBg' }} padding={0}>
			<Grid
				gridTemplateColumns="1fr 3fr 1fr"
				width="100%"
				paddingX={8}
				paddingY={6}
				alignItems="stretch"
			>
				<GridItem width="100%">
					<Flex alignItems="center" justifyContent="start">
						<SkeletonCircle width="48px" height="48px">

							<Avatar
								name={"AM"}
								position="initial"
							/>
						</SkeletonCircle>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex
						textAlign="left"
						direction="column"
						height="100%"
						justifyContent="space-between"
					>
						<Skeleton width="180px" height="24px">
							<Text>transaction description</Text>
						</Skeleton>
						<Skeleton height="18px" width="50px">
							<Text fontSize="xs" color="gray.500">
								createdAtTime
              </Text>
						</Skeleton>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex alignItems="center" justifyContent="end">
						<Skeleton height="24px" width="50px">

							<Text
								fontWeight="bold"
								paddingLeft="2"
								color={"default"}
							>
								$10
              </Text>
						</Skeleton>
					</Flex>
				</GridItem>
			</Grid>
		</AccordionButton>
	</AccordionItem>
)