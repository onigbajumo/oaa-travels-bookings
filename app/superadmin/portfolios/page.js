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
  Select as ChakraSelect,
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
import ReactSelect from "react-select";

const industryOptions = [
  { value: "E-commerce", label: "E-commerce" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Education", label: "Education" },
  { value: "Technology", label: "Technology" },
];

const typeOptions = [
  { value: "Web Development", label: "Web Development" },
  { value: "Web Application", label: "Web Application" },
  { value: "Mobile App", label: "Mobile App" },
  { value: "Desktop Application", label: "Desktop Application" },
  { value: "Branding and Identity", label: "Branding and Identity" },
  { value: "Marketing", label: "Marketing" },
  { value: "Other", label: "Other" },
];

const teamOptions = [
  {
    value: "Project Manager",
    label: "Project Manager",
    role: "Oversaw the strategy, execution, and launch of the project.",
  },
  {
    value: "UI/UX Designer",
    label: "UI/UX Designer",
    role: "Created intuitive interfaces and seamless user experience.",
  },
  {
    value: "Frontend Developer",
    label: "Frontend Developer",
    role: "Developed the interactive elements of the platform.",
  },
  {
    value: "Backend Developer",
    label: "Backend Developer",
    role: "Built a robust and scalable system to handle transactions",
  },
  {
    value: "Data Analyst",
    label: "Data Analyst",
    role: "Implemented insights for pricing models and user behavior.",
  },
];

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

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
    data: [],
  },
  technology: [],
  newTechnology: "",
  team: [],
  gallery: [],
  conclusion: "",
  teamNumber: "",
};

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newPortfolio, setNewPortfolio] = useState(initialPortfolioState);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const [portfolioToDeleteIndex, setPortfolioToDeleteIndex] = useState(null);

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

  const fetchAllPortfolios = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolios");
      if (!res.ok) throw new Error("Failed to fetch portfolios");
      const data = await res.json();
      setPortfolios(data.reverse());
    } catch (error) {
      toast.error("Error fetching portfolios");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNewPortfolioModal = () => {
    setIsEditing(false);
    setCurrentPortfolioIndex(null);
    setNewPortfolio(initialPortfolioState);
    onOpen();
  };

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
        gallery: existing.gallery || [],
        conclusion: existing.conclusion || "",
        teamNumber: existing.teamNumber || "",
      });
      onOpen();
    } catch (err) {
      console.error(err);
    }
  };

  const getFinalCoverImage = async () => {
    if (newPortfolio.coverImage) {
      const base64Str = await toBase64(newPortfolio.coverImage);
      return base64Str;
    }
    return newPortfolio.coverImagePreview;
  };

  const getFinalLogo = async () => {
    if (newPortfolio.logo) {
      const base64Str = await toBase64(newPortfolio.logo);
      return base64Str;
    }
    return newPortfolio.logoPreview;
  };

  const handleAddOrEditPortfolio = async () => {
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
        teamNumber: newPortfolio.teamNumber,
      };

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

  const handleAddGalleryImages = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    try {
      const base64Images = await Promise.all(
        files.map((file) => toBase64(file))
      );
      setNewPortfolio((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...base64Images],
      }));
    } catch (error) {
      toast.error("Error uploading images");
    }
  };
  const handleRemoveGalleryImage = (idx) => {
    const updated = [...newPortfolio.gallery];
    updated.splice(idx, 1);
    setNewPortfolio({ ...newPortfolio, gallery: updated });
  };

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
        solutions: [
          ...currentChallenge.solutions,
          currentChallenge.newSolution,
        ],
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
      let challengeNumber;
      if (currentChallengeIndex === null) {
        challengeNumber = newPortfolio.challenges.data.length + 1;
      } else {
        challengeNumber = currentChallengeIndex + 1;
      }

      const newChallengeItem = {
        problem: {
          title: `Challenge ${challengeNumber}: ${currentChallenge.problemTitle}`,
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
        <Button
          colorScheme="blue"
          leftIcon={<BsPlus />}
          onClick={handleOpenNewPortfolioModal}
        >
          Add Portfolio
        </Button>
      </div>

      {loading ? (
        <p>Loading portfolios...</p>
      ) : (
        <div className="flex flex-col gap-3 mt-5">
          {portfolios.map((portfolio, index) => (
            <div
              key={portfolio._id || index}
              className="border-2 rounded-xl p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Image
                    src={portfolio.coverImage}
                    boxSize="100px"
                    objectFit="cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold capitalize">{portfolio.title}</h4>
                    <p className="text-sm text-gray-500">
                      {portfolio.industry}
                    </p>
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
                    <MenuItem
                      onClick={() => handleOpenEditPortfolioModal(index)}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeletePortfolio(index)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      )}

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
              Are you sure you want to delete this portfolio? This action cannot
              be undone.
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Edit Portfolio" : "Add New Portfolio"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            <FormControl isRequired>
              <FormLabel>Portfolio Title</FormLabel>
              <Input
                value={newPortfolio.title}
                onChange={(e) =>
                  setNewPortfolio({ ...newPortfolio, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Industry</FormLabel>
              <ChakraSelect
                placeholder="Select Industry"
                value={newPortfolio.industry}
                onChange={(e) =>
                  setNewPortfolio({ ...newPortfolio, industry: e.target.value })
                }
              >
                {industryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </ChakraSelect>
            </FormControl>
            <div className="grid grid-cols-2 gap-4">
              <FormControl isRequired>
                <FormLabel>Year</FormLabel>
                <Input
                  placeholder="2021"
                  value={newPortfolio.year}
                  onChange={(e) =>
                    setNewPortfolio({ ...newPortfolio, year: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  placeholder="City, Country"
                  value={newPortfolio.location}
                  onChange={(e) =>
                    setNewPortfolio({
                      ...newPortfolio,
                      location: e.target.value,
                    })
                  }
                />
              </FormControl>
            </div>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newPortfolio.description}
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
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
                  <Image
                    src={newPortfolio.coverImagePreview}
                    boxSize="100px"
                    mt={2}
                  />
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
                  <Image
                    src={newPortfolio.logoPreview}
                    boxSize="100px"
                    mt={2}
                  />
                )}
              </FormControl>
            </div>
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <ChakraSelect
                placeholder="Select Type"
                value={newPortfolio.type}
                onChange={(e) =>
                  setNewPortfolio({ ...newPortfolio, type: e.target.value })
                }
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </ChakraSelect>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Client</FormLabel>
              <Input
                placeholder="Client name"
                value={newPortfolio.client}
                onChange={(e) =>
                  setNewPortfolio({ ...newPortfolio, client: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Project Link</FormLabel>
              <Input
                placeholder="https://..."
                value={newPortfolio.projectLink}
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    projectLink: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Features</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newPortfolio.newFeature}
                  onChange={(e) =>
                    setNewPortfolio({
                      ...newPortfolio,
                      newFeature: e.target.value,
                    })
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
            <FormControl isRequired>
              <FormLabel>Challenges Heading</FormLabel>
              <Input
                placeholder="Enter challenges heading"
                value={newPortfolio.challenges.heading}
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    challenges: {
                      ...newPortfolio.challenges,
                      heading: e.target.value,
                    },
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
            <FormControl isRequired>
              <FormLabel>Technology</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newPortfolio.newTechnology}
                  onChange={(e) =>
                    setNewPortfolio({
                      ...newPortfolio,
                      newTechnology: e.target.value,
                    })
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
            <FormControl isRequired>
              <FormLabel>Team</FormLabel>
              <ReactSelect
                options={teamOptions}
                isMulti
                onChange={(selectedOptions) => {
                  setNewPortfolio({
                    ...newPortfolio,
                    team: selectedOptions.map((option) => ({
                      title: option.value,
                      role: option.role,
                    })),
                  });
                }}
                value={teamOptions.filter((option) =>
                  newPortfolio.team.some((team) => team.title === option.value)
                )}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Gallery Images</FormLabel>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddGalleryImages}
              />
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
            <FormControl isRequired>
              <FormLabel>Conclusion</FormLabel>
              <Textarea
                value={newPortfolio.conclusion}
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    conclusion: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Team Number</FormLabel>
              <Input
                type="number"
                placeholder="e.g., 4"
                value={newPortfolio.teamNumber}
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    teamNumber: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleAddOrEditPortfolio}
              disabled={isSubmitting}
            >
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

      <Modal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentChallengeIndex === null
              ? "Add New Challenge"
              : "Edit Challenge"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            <FormControl isRequired>
              <FormLabel>Problem Title</FormLabel>
              <Input
                value={currentChallenge.problemTitle}
                onChange={(e) =>
                  setCurrentChallenge({
                    ...currentChallenge,
                    problemTitle: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Problem Description</FormLabel>
              <Textarea
                value={currentChallenge.problemDescription}
                onChange={(e) =>
                  setCurrentChallenge({
                    ...currentChallenge,
                    problemDescription: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Solutions</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={currentChallenge.newSolution}
                  onChange={(e) =>
                    setCurrentChallenge({
                      ...currentChallenge,
                      newSolution: e.target.value,
                    })
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
            <Button onClick={() => setIsChallengeModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="blue" ml={3} onClick={handleSaveChallenge}>
              {currentChallengeIndex === null
                ? "Add Challenge"
                : "Save Challenge"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
