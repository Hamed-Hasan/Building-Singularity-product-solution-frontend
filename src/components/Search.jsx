import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const Search = ({ onSearch }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <Box mb={6} pb={4} borderBottom="1px" borderBottomColor="zinc.600">
      <InputGroup>
        <Input
          border="1px"
          borderColor="zinc.700"
          placeholder="Search..."
          w="full"
          outline={0}
          bg="transparent"
          p={2}
          onChange={handleSearch}
        />
        <InputRightElement color="zinc.500">
          <BsSearch color="inherit" />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Search;
