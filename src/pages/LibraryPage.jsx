import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { AiOutlineLoading } from "react-icons/ai";
import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { client } from "../api";
import Search from "../components/Search";

const LibraryPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSongs = async () => {
	setLoading(true);
	setError(false);
	try {
	  const response = await client.get("/songs", {
		params: { searchTerm },
	  });
  
	  // Filter the songs based on the search term on the client-side
	  const filteredSongs = response.data.filter((song) => {
		// Check if either the title or any artist matches the search term
		return (
		  song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		  song.artistes.some((artist) =>
			artist.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		);
	  });
  
	  setSongs(filteredSongs);
	  setLoading(false);
	} catch (error) {
	  setError(true);
	  setLoading(false);
	}
  };
  
  

  useEffect(() => {
    fetchSongs();
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Box
      p={6}
      pb={32}
      pt={{ base: 20, md: 6 }}
      pl={{ base: 4, md: 14, xl: 0 }}
      minH="100vh"
    >
      <Box mb={6}>
        <Heading
          fontSize={{ base: "lg", md: "2xl" }}
          fontWeight="semibold"
          mb={{ base: 1, md: 3 }}
        >
          Library
        </Heading>
        <Container p={4}>
          <Search onSearch={handleSearch} />
        </Container>
      </Box>
      {loading && songs.length < 1 && (
        <Flex align="center" justify="center" color="accent.main" minH="20rem">
          <AiOutlineLoading className="spin" size={36} />
        </Flex>
      )}
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={{ base: 3, md: 6 }}
      >
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </Grid>
      {error && (
        <Box>
          <Text>Sorry, an error occurred</Text>
        </Box>
      )}
    </Box>
  );
};

export default LibraryPage;
