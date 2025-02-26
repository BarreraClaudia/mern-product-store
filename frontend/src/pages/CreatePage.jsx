import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';
import { toaster } from '@/components/ui/toaster';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: 'Error',
        description: message,
        type: 'error',
        duration: 3000,
      });
    } else {
      toaster.create({
        title: 'Success',
        description: message,
        type: 'success',
        duration: 3000,
      });
    }
    // clears inputs
    setNewProduct({ name: '', price: '', image: '' });
  };

  return (
    <Container maxW={'xl'}>
      <VStack gap={8}>
        <Heading as={'h1'} fontSize={'4xl'} textAlign={'center'} mb={8} mt={8}>
          Create New Product
        </Heading>

        <Box
          w={'full'}
          bg={{ base: 'white', _dark: 'gray.700' }}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button onClick={handleAddProduct} bg={'blue.400'} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
