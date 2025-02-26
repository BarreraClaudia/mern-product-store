import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '@/store/product';
import { toaster } from '@/components/ui/toaster';
import {
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogActionTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const [open, setOpen] = useState(false);

  const { deleteProduct, updateProduct } = useProductStore();

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
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
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setOpen(false);
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
        description: 'Product updated successfully',
        type: 'success',
        duration: 3000,
      });
    }
  };

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />

      <Box p={4}>
        <Heading as={'h3'} fontSize={'xl'} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack gap={2}>
          <IconButton
            onClick={setOpen}
            colorPalette={'blue'}
            variant={'surface'}
          >
            <FaEdit />
          </IconButton>

          <IconButton
            onClick={() => handleDeleteProduct(product._id)}
            colorPalette={'red'}
            variant={'surface'}
          >
            <FaRegTrashAlt />
          </IconButton>
        </HStack>
      </Box>

      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }
            />
          </VStack>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              colorPalette={'blue'}
            >
              Update
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductCard;
