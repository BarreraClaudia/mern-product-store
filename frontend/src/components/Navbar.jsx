import { IconButton, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';
import { ColorModeButton } from '@/components/ui/color-mode';

const Navbar = () => {
  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        h={20}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Text
          fontSize={'lg'}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'blue.500'}
          bgClip={'text'}
        >
          <Link to={'/'}>Product Store 🛒</Link>
        </Text>

        <HStack>
          <Link to={'/create'}>
            <IconButton variant={'surface'}>
              <FaRegPlusSquare />
            </IconButton>
          </Link>

          <ColorModeButton variant={'surface'} size={'md'} />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
