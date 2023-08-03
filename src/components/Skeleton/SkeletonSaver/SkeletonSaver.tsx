import React from 'react';
import { Box, LinkOverlay, Text, Skeleton } from '@chakra-ui/react';

export const SkeletonSaver = () => {
	return (
		<Box
			as="div"
			borderWidth="1px"
			borderRadius="lg"
			paddingX={8}
			paddingY={6}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
		>
			<LinkOverlay>
				<Skeleton height="27px" width="100px" />
			</LinkOverlay>
			<Skeleton height="27px" width="44px" />
		</Box>
	)
}