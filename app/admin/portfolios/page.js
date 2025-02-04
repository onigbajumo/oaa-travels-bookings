"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
} from "@chakra-ui/react";
import { BsPlus, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper to convert file to base64
async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Initial state for a new portfolio
const initialPortfolioState = {
  title: "",
  industry: "",
  year: "",
  location: "",
  description: "",
  coverImage: null,
  coverImagePreview: "",
  logo: null,
  logoPreview: "",
  type: "",
  client: "",
  projectLink: "",
  features: [],
  newFeature: "",
  challenges: {
    heading: "",
    data: [] // Each item: { problem: { title, description }, solution: [] }
  },
  technology: [],
  newTechnology: "",
  team: [],
  newTeamMember: { title: "", role: "" },
  gallery: [],
  // We use the file input directly for gallery images.
  conclusion: "",
  teamNumber: ""
};

export default function PortfolioPage() {
  // Main list state
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal controls for add/edit portfolio
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newPortfolio, setNewPortfolio] = useState(initialPortfolioState);

  // AlertDialog for deletion
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const [portfolioToDeleteIndex, setPortfolioToDeleteIndex] = useState(null);

  // Modal controls for adding/editing a challenge item
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState({
    problemTitle: "",
    problemDescription: "",
    solutions: [],
    newSolution: "",
  });

  useEffect(() => {
    fetchAllPortfolios();
  }, []);

  // Fetch portfolios from the API
  const fetchAllPortfolios = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolios");
      if (!res.ok) throw new Error("Failed to fetch portfolios");
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      toast.error("Error fetching portfolios");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Open the modal for a new portfolio
  const handleOpenNewPortfolioModal = () => {
    setIsEditing(false);
    setCurrentPortfolioIndex(null);
    setNewPortfolio(initialPortfolioState);
    onOpen();
  };

  // Open the modal for editing a portfolio
  const handleOpenEditPortfolioModal = (index) => {
    try {
      setIsEditing(true);
      setCurrentPortfolioIndex(index);
      const existing = portfolios[index];
      setNewPortfolio({
        ...existing,
        coverImage: null,
        coverImagePreview: existing.coverImage,
        logo: null,
        logoPreview: existing.logo,
        features: existing.features || [],
        newFeature: "",
        challenges: existing.challenges || { heading: "", data: [] },
        technology: existing.technology || [],
        newTechnology: "",
        team: existing.team || [],
        newTeamMember: { title: "", role: "" },
        gallery: existing.gallery || [],
        conclusion: existing.conclusion || "",
        teamNumber: existing.teamNumber || "",
      });
      onOpen();
    } catch (err) {
      console.error(err);
    }
  };

  // Get the final cover image (either new file or existing preview)
  const getFinalCoverImage = async () => {
    if (newPortfolio.coverImage) {
      const base64Str = await toBase64(newPortfolio.coverImage);
      return base64Str;
    }
    return newPortfolio.coverImagePreview;
  };

  // Get the final logo image
  const getFinalLogo = async () => {
    if (newPortfolio.logo) {
      const base64Str = await toBase64(newPortfolio.logo);
      return base64Str;
    }
    return newPortfolio.logoPreview;
  };

  // Handle submission for adding or editing a portfolio
  const handleAddOrEditPortfolio = async () => {
    // Basic validation – adjust as needed
    if (
      !newPortfolio.title ||
      !newPortfolio.industry ||
      !newPortfolio.year ||
      !newPortfolio.location ||
      !newPortfolio.description ||
      (!newPortfolio.coverImage && !newPortfolio.coverImagePreview) ||
      (!newPortfolio.logo && !newPortfolio.logoPreview) ||
      !newPortfolio.type ||
      !newPortfolio.client ||
      !newPortfolio.projectLink ||
      newPortfolio.features.length === 0 ||
      newPortfolio.challenges.heading === "" ||
      newPortfolio.challenges.data.length === 0 ||
      newPortfolio.technology.length === 0 ||
      newPortfolio.team.length === 0 ||
      newPortfolio.gallery.length === 0 ||
      !newPortfolio.conclusion
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const finalCoverImage = await getFinalCoverImage();
      const finalLogo = await getFinalLogo();

      const finalPortfolioData = {
        title: newPortfolio.title,
        industry: newPortfolio.industry,
        year: newPortfolio.year,
        location: newPortfolio.location,
        description: newPortfolio.description,
        coverImage: finalCoverImage,
        logo: finalLogo,
        type: newPortfolio.type,
        client: newPortfolio.client,
        projectLink: newPortfolio.projectLink,
        features: newPortfolio.features,
        challenges: newPortfolio.challenges,
        technology: newPortfolio.technology,
        team: newPortfolio.team,
        gallery: newPortfolio.gallery,
        conclusion: newPortfolio.conclusion,
        // teamNumber: newPortfolio.teamNumber,
      };

      console.log("Final Portfolio Data:", finalPortfolioData);

      if (!isEditing) {
        const res = await fetch("/api/portfolios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPortfolioData),
        });
        if (!res.ok) throw new Error("Failed to create portfolio");
        toast.success("Portfolio added successfully");
        onClose();
        fetchAllPortfolios();
      } else {
        const existingPortfolio = portfolios[currentPortfolioIndex];
        if (!existingPortfolio._id) {
          toast.error("Cannot edit. Missing portfolio ID");
          return;
        }
        finalPortfolioData.id = existingPortfolio._id;
        const res = await fetch("/api/portfolios", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPortfolioData),
        });
        if (!res.ok) throw new Error("Failed to update portfolio");
        toast.success("Portfolio updated successfully");
        onClose();
        fetchAllPortfolios();
      }
    } catch (err) {
      toast.error("Error saving portfolio");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete portfolio handlers
  const handleDeletePortfolio = (index) => {
    setPortfolioToDeleteIndex(index);
    onDeleteOpen();
  };
  const confirmDeletePortfolio = async () => {
    if (portfolioToDeleteIndex == null) return;
    const portfolio = portfolios[portfolioToDeleteIndex];
    if (!portfolio._id) {
      toast.error("Cannot delete. Missing ID");
      onDeleteClose();
      return;
    }
    try {
      const res = await fetch(`/api/portfolios?id=${portfolio._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete portfolio");
      toast.success("Portfolio deleted successfully");
      onDeleteClose();
      fetchAllPortfolios();
    } catch (err) {
      toast.error("Error deleting portfolio");
      console.error(err);
    }
  };

  // --- FEATURES (Similar to highlights) ---
  const handleAddFeature = () => {
    if (newPortfolio.newFeature) {
      setNewPortfolio({
        ...newPortfolio,
        features: [...newPortfolio.features, newPortfolio.newFeature],
        newFeature: "",
      });
    }
  };
  const handleRemoveFeature = (idx) => {
    const updated = [...newPortfolio.features];
    updated.splice(idx, 1);
    setNewPortfolio({ ...newPortfolio, features: updated });
  };

  // --- TECHNOLOGY ---
  const handleAddTechnology = () => {
    if (newPortfolio.newTechnology) {
      setNewPortfolio({
        ...newPortfolio,
        technology: [...newPortfolio.technology, newPortfolio.newTechnology],
        newTechnology: "",
      });
    }
  };
  const handleRemoveTechnology = (idx) => {
    const updated = [...newPortfolio.technology];
    updated.splice(idx, 1);
    setNewPortfolio({ ...newPortfolio, technology: updated });
  };

  // --- TEAM ---
  const handleAddTeamMember = () => {
    const { title, role } = newPortfolio.newTeamMember;
    if (title && role) {
      setNewPortfolio({
        ...newPortfolio,
        team: [...newPortfolio.team, { title, role }],
        newTeamMember: { title: "", role: "" },
      });
    }
  };
  const handleRemoveTeamMember = (idx) => {
    const updated = [...newPortfolio.team];
    updated.splice(idx, 1);
    setNewPortfolio({ ...newPortfolio, team: updated });
  };

  // --- GALLERY --- (Adding one image at a time)
  const handleAddGalleryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64Str = await toBase64(file);
    setNewPortfolio((prev) => ({
      ...prev,
      gallery: [...prev.gallery, base64Str],
    }));
  };
  const handleRemoveGalleryImage = (idx) => {
    const updated = [...newPortfolio.gallery];
    updated.splice(idx, 1);
    setNewPortfolio({ ...newPortfolio, gallery: updated });
  };

  // --- CHALLENGES ---
  // Open modal for a new challenge item
  const handleOpenChallengeModal = () => {
    setCurrentChallengeIndex(null);
    setCurrentChallenge({
      problemTitle: "",
      problemDescription: "",
      solutions: [],
      newSolution: "",
    });
    setIsChallengeModalOpen(true);
  };
  // Edit an existing challenge item
  const handleEditChallenge = (index) => {
    const challengeItem = newPortfolio.challenges.data[index];
    setCurrentChallengeIndex(index);
    setCurrentChallenge({
      problemTitle: challengeItem.problem.title,
      problemDescription: challengeItem.problem.description,
      solutions: [...challengeItem.solution],
      newSolution: "",
    });
    setIsChallengeModalOpen(true);
  };
  const handleRemoveChallenge = (index) => {
    const updated = [...newPortfolio.challenges.data];
    updated.splice(index, 1);
    setNewPortfolio({
      ...newPortfolio,
      challenges: {
        ...newPortfolio.challenges,
        data: updated,
      },
    });
  };
  const handleAddSolution = () => {
    if (currentChallenge.newSolution) {
      setCurrentChallenge({
        ...currentChallenge,
        solutions: [...currentChallenge.solutions, currentChallenge.newSolution],
        newSolution: "",
      });
    }
  };
  const handleRemoveSolution = (idx) => {
    const updated = [...currentChallenge.solutions];
    updated.splice(idx, 1);
    setCurrentChallenge({ ...currentChallenge, solutions: updated });
  };
  const handleSaveChallenge = () => {
    if (
      currentChallenge.problemTitle &&
      currentChallenge.problemDescription &&
      currentChallenge.solutions.length > 0
    ) {
      const newChallengeItem = {
        problem: {
          title: currentChallenge.problemTitle,
          description: currentChallenge.problemDescription,
        },
        solution: currentChallenge.solutions,
      };
      if (currentChallengeIndex === null) {
        setNewPortfolio({
          ...newPortfolio,
          challenges: {
            ...newPortfolio.challenges,
            data: [...newPortfolio.challenges.data, newChallengeItem],
          },
        });
      } else {
        const updatedChallenges = [...newPortfolio.challenges.data];
        updatedChallenges[currentChallengeIndex] = newChallengeItem;
        setNewPortfolio({
          ...newPortfolio,
          challenges: {
            ...newPortfolio.challenges,
            data: updatedChallenges,
          },
        });
      }
      setIsChallengeModalOpen(false);
      setCurrentChallenge({
        problemTitle: "",
        problemDescription: "",
        solutions: [],
        newSolution: "",
      });
      setCurrentChallengeIndex(null);
    }
  };

  return (
    <div className="space-y-5 p-4">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Portfolios Management</h3>
      </div>

      <div className="flex justify-between items-center flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-gray-500" />
            <input
              type="text"
              placeholder="Search Portfolios"
              className="border-none p-0 w-full rounded-none"
            />
          </div>
        </div>
        <Button colorScheme="blue" leftIcon={<BsPlus />} onClick={handleOpenNewPortfolioModal}>
          Add Portfolio
        </Button>
      </div>

      {loading ? (
        <p>Loading portfolios...</p>
      ) : (
        <div className="flex flex-col gap-3 mt-5">
          {portfolios.map((portfolio, index) => (
            <div key={portfolio._id || index} className="border-2 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Image src={portfolio.coverImage} boxSize="100px" objectFit="cover" />
                  <div>
                    <h4 className="text-lg font-semibold">{portfolio.title}</h4>
                    <p className="text-sm text-gray-500">{portfolio.industry}</p>
                  </div>
                </div>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BsThreeDotsVertical />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem onClick={() => handleOpenEditPortfolioModal(index)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeletePortfolio(index)}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete AlertDialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Portfolio
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this portfolio? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDeletePortfolio} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Portfolio Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? "Edit Portfolio" : "Add New Portfolio"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            {/* Title, Industry, Year, Location */}
            <FormControl isRequired>
              <FormLabel>Portfolio Title</FormLabel>
              <Input
                value={newPortfolio.title}
                onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Industry</FormLabel>
              <Input
                placeholder="e.g., E-commerce"
                value={newPortfolio.industry}
                onChange={(e) => setNewPortfolio({ ...newPortfolio, industry: e.target.value })}
              />
            </FormControl>
            <div className="grid grid-cols-2 gap-4">
              <FormControl isRequired>
                <FormLabel>Year</FormLabel>
                <Input
                  placeholder="2021"
                  value={newPortfolio.year}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, year: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  placeholder="City, Country"
                  value={newPortfolio.location}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, location: e.target.value })}
                />
              </FormControl>
            </div>

            {/* Description */}
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newPortfolio.description}
                onChange={(e) =>
                  setNewPortfolio({ ...newPortfolio, description: e.target.value })
                }
              />
            </FormControl>

            {/* Cover Image and Logo */}
            <div className="grid grid-cols-2 gap-4">
              <FormControl isRequired>
                <FormLabel>Cover Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setNewPortfolio({
                      ...newPortfolio,
                      coverImage: file,
                      coverImagePreview: URL.createObjectURL(file),
                    });
                  }}
                />
                {newPortfolio.coverImagePreview && (
                  <Image src={newPortfolio.coverImagePreview} boxSize="100px" mt={2} />
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Logo</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setNewPortfolio({
                      ...newPortfolio,
                      logo: file,
                      logoPreview: URL.createObjectURL(file),
                    });
                  }}
                />
                {newPortfolio.logoPreview && (
                  <Image src={newPortfolio.logoPreview} boxSize="100px" mt={2} />
                )}
              </FormControl>
            </div>

            {/* Type, Client, Project Link */}
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Input
                placeholder="e.g., Web Development"
                value={newPortfolio.type}
                onChange={(e) => setNewPortfolio({ ...newPortfolio, type: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Client</FormLabel>
              <Input
                placeholder="Client name"
                value={newPortfolio.client}
                onChange={(e) => setNewPortfolio({ ...newPortfolio, client: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Project Link</FormLabel>
              <Input
                placeholder="https://..."
                value={newPortfolio.projectLink}
                onChange={(e) => setNewPortfolio({ ...newPortfolio, projectLink: e.target.value })}
              />
            </FormControl>

            {/* Features */}
            <FormControl isRequired>
              <FormLabel>Features</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newPortfolio.newFeature}
                  onChange={(e) =>
                    setNewPortfolio({ ...newPortfolio, newFeature: e.target.value })
                  }
                />
                <Button onClick={handleAddFeature}>Add</Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {newPortfolio.features.map((feat, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-2 py-1 rounded inline-flex items-center"
                  >
                    {feat}
                    <IconButton
                      icon={<AiOutlineClose />}
                      size="xs"
                      variant="ghost"
                      onClick={() => handleRemoveFeature(i)}
                      ml={1}
                      aria-label="Remove feature"
                    />
                  </span>
                ))}
              </div>
            </FormControl>

            {/* Challenges */}
            <FormControl isRequired>
              <FormLabel>Challenges Heading</FormLabel>
              <Input
                placeholder="Enter challenges heading"
                value={newPortfolio.challenges.heading}
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    challenges: { ...newPortfolio.challenges, heading: e.target.value },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Challenges Details</FormLabel>
              <Button onClick={handleOpenChallengeModal}>Add Challenge</Button>
              <Table mt={2}>
                <Thead>
                  <Tr>
                    <Th width={10}>SN</Th>
                    <Th>Problem</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {newPortfolio.challenges.data.map((chall, i) => (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{chall.problem.title}</Td>
                      <Td>
                        <IconButton
                          icon={<AiOutlineEdit />}
                          size="sm"
                          mr={2}
                          onClick={() => handleEditChallenge(i)}
                          aria-label="Edit challenge"
                        />
                        <IconButton
                          icon={<AiOutlineDelete />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleRemoveChallenge(i)}
                          aria-label="Delete challenge"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </FormControl>

            {/* Technology */}
            <FormControl isRequired>
              <FormLabel>Technology</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newPortfolio.newTechnology}
                  onChange={(e) =>
                    setNewPortfolio({ ...newPortfolio, newTechnology: e.target.value })
                  }
                />
                <Button onClick={handleAddTechnology}>Add</Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {newPortfolio.technology.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 px-2 py-1 rounded inline-flex items-center"
                  >
                    {tech}
                    <IconButton
                      icon={<AiOutlineClose />}
                      size="xs"
                      variant="ghost"
                      onClick={() => handleRemoveTechnology(i)}
                      ml={1}
                      aria-label="Remove technology"
                    />
                  </span>
                ))}
              </div>
            </FormControl>

            {/* Team */}
            <FormControl isRequired>
              <FormLabel>Team</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Role Title"
                  value={newPortfolio.newTeamMember.title}
                  onChange={(e) =>
                    setNewPortfolio({
                      ...newPortfolio,
                      newTeamMember: { ...newPortfolio.newTeamMember, title: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Role Description"
                  value={newPortfolio.newTeamMember.role}
                  onChange={(e) =>
                    setNewPortfolio({
                      ...newPortfolio,
                      newTeamMember: { ...newPortfolio.newTeamMember, role: e.target.value },
                    })
                  }
                />
                <Button onClick={handleAddTeamMember}>Add</Button>
              </div>
              <div className="mt-2">
                {newPortfolio.team.map((member, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-100 p-2 rounded mb-1">
                    <span>
                      {member.title} - {member.role}
                    </span>
                    <IconButton
                      icon={<AiOutlineClose />}
                      size="xs"
                      variant="ghost"
                      onClick={() => handleRemoveTeamMember(i)}
                      aria-label="Remove team member"
                    />
                  </div>
                ))}
              </div>
            </FormControl>

            {/* Gallery */}
            <FormControl isRequired>
              <FormLabel>Gallery Images</FormLabel>
              <Input type="file" accept="image/*" onChange={handleAddGalleryImage} />
              <div className="mt-2 flex flex-wrap gap-2">
                {newPortfolio.gallery.map((img, i) => (
                  <div key={i} className="relative">
                    <Image src={img} boxSize="100px" objectFit="cover" />
                    <IconButton
                      icon={<AiOutlineClose />}
                      size="xs"
                      variant="ghost"
                      position="absolute"
                      top={0}
                      right={0}
                      onClick={() => handleRemoveGalleryImage(i)}
                      aria-label="Remove gallery image"
                    />
                  </div>
                ))}
              </div>
            </FormControl>

            {/* Conclusion and Team Number */}
            <FormControl isRequired>
              <FormLabel>Conclusion</FormLabel>
              <Textarea
                value={newPortfolio.conclusion}
                onChange={(e) => setNewPortfolio({ ...newPortfolio, conclusion: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Team Number</FormLabel>
              <Input
                type="number"
                placeholder="e.g., 4"
                value={newPortfolio.teamNumber}
                onChange={(e) =>
                  setNewPortfolio({ ...newPortfolio, teamNumber: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddOrEditPortfolio} disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? "Saving"
                  : "Creating"
                : isEditing
                ? "Save Changes"
                : "Create Portfolio"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Challenge Modal */}
      <Modal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentChallengeIndex === null ? "Add New Challenge" : "Edit Challenge"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            <FormControl isRequired>
              <FormLabel>Problem Title</FormLabel>
              <Input
                value={currentChallenge.problemTitle}
                onChange={(e) =>
                  setCurrentChallenge({ ...currentChallenge, problemTitle: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Problem Description</FormLabel>
              <Textarea
                value={currentChallenge.problemDescription}
                onChange={(e) =>
                  setCurrentChallenge({ ...currentChallenge, problemDescription: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Solutions</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={currentChallenge.newSolution}
                  onChange={(e) =>
                    setCurrentChallenge({ ...currentChallenge, newSolution: e.target.value })
                  }
                />
                <Button onClick={handleAddSolution}>Add</Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentChallenge.solutions.map((sol, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-2 py-1 rounded inline-flex items-center"
                  >
                    {sol}
                    <IconButton
                      icon={<AiOutlineClose />}
                      size="xs"
                      variant="ghost"
                      onClick={() => handleRemoveSolution(i)}
                      ml={1}
                      aria-label="Remove solution"
                    />
                  </span>
                ))}
              </div>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsChallengeModalOpen(false)}>Cancel</Button>
            <Button colorScheme="blue" ml={3} onClick={handleSaveChallenge}>
              {currentChallengeIndex === null ? "Add Challenge" : "Save Challenge"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
