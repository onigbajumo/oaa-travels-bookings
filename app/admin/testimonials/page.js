"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsPlus, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
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
  Avatar,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestimonialsPage = () => {
  // Dummy data for testimonials
  const initialTestimonials = [
    {
      _id: "1",
      name: "John Doe",
      work: "Software Engineer",
      rating: 5,
      testimonial: "Great service! Highly recommended.",
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "Jane Smith",
      work: "Product Manager",
      rating: 4,
      testimonial: "Very professional and efficient.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [loading, setLoading] = useState(false); // No loading needed for dummy data
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    work: "",
    rating: 0,
    testimonial: "",
    image: null,
    imagePreview: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [currentTestimonial, setCurrentTestimonial] = useState({
    name: "",
    work: "",
    rating: 0,
    testimonial: "",
    image: null,
    imagePreview: "",
  });
  const [currentId, setCurrentId] = useState(null);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const cancelRef = useRef();

  const [isAddSubmitting, setIsAddSubmitting] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Simulate fetching testimonials (no API call needed)
  useEffect(() => {
    setLoading(false); // Set loading to false immediately
  }, []);

  const handleAddTestimonial = () => {
    const { name, work, rating, testimonial, image } = newTestimonial;

    if (
      name.trim() === "" ||
      work.trim() === "" ||
      rating === 0 ||
      testimonial.trim() === "" ||
      !image
    ) {
      toast.error("All fields are required.");
      setIsAddSubmitting(false);
      return;
    }

    setIsAddSubmitting(true);

    // Simulate adding a new testimonial
    const newTestimonialData = {
      _id: String(testimonials.length + 1), // Generate a simple ID
      name: name.trim(),
      work: work.trim(),
      rating,
      testimonial: testimonial.trim(),
      image: URL.createObjectURL(image), // Use the image preview URL
    };

    setTestimonials([newTestimonialData, ...testimonials]);
    toast.success(
      `Testimonial from "${newTestimonialData.name}" has been added successfully.`
    );
    onClose();
    setNewTestimonial({
      name: "",
      work: "",
      rating: 0,
      testimonial: "",
      image: null,
      imagePreview: "",
    });
    setIsAddSubmitting(false);
  };

  const handleEditTestimonial = () => {
    const { name, work, rating, testimonial, image, imagePreview } =
      currentTestimonial;

    if (
      name.trim() === "" ||
      work.trim() === "" ||
      rating === 0 ||
      testimonial.trim() === "" ||
      (!image && !imagePreview)
    ) {
      toast.error("All fields are required.");
      setIsEditSubmitting(false);
      return;
    }

    setIsEditSubmitting(true);

    // Simulate updating a testimonial
    const updatedTestimonial = {
      _id: currentId,
      name: name.trim(),
      work: work.trim(),
      rating,
      testimonial: testimonial.trim(),
      image: image ? URL.createObjectURL(image) : imagePreview,
    };

    const updatedTestimonials = testimonials.map((t) =>
      t._id === currentId ? updatedTestimonial : t
    );

    setTestimonials(updatedTestimonials);
    toast.success(
      `Testimonial from "${updatedTestimonial.name}" has been updated successfully.`
    );
    handleCloseEditModal();
    setIsEditSubmitting(false);
  };

  const handleDeleteTestimonial = () => {
    if (testimonialToDelete) {
      // Simulate deleting a testimonial
      const updatedTestimonials = testimonials.filter(
        (t) => t._id !== testimonialToDelete
      );
      setTestimonials(updatedTestimonials);
      toast.info("Testimonial has been deleted successfully.");
      onDeleteClose();
    }
  };

  const handleOpenEditModal = (testimonial, id) => {
    setCurrentTestimonial({
      name: testimonial.name,
      work: testimonial.work,
      rating: testimonial.rating,
      testimonial: testimonial.testimonial,
      image: null,
      imagePreview: testimonial.image,
    });
    setCurrentId(id);
    onEditOpen();
  };

  const handleCloseEditModal = () => {
    setCurrentTestimonial({
      name: "",
      work: "",
      rating: 0,
      testimonial: "",
      image: null,
      imagePreview: "",
    });
    setCurrentId(null);
    onEditClose();
  };

  const confirmDeleteTestimonial = (id) => {
    setTestimonialToDelete(id);
    onDeleteOpen();
  };

  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTestimonial({
        ...newTestimonial,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentTestimonial({
        ...currentTestimonial,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddRating = (star) => {
    setNewTestimonial({ ...newTestimonial, rating: star });
  };

  const handleEditRating = (star) => {
    setCurrentTestimonial({ ...currentTestimonial, rating: star });
  };

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.work.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.testimonial.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Testimonials</h3>
      </div>

      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-[#A3A3A3]" />
            <input
              type="text"
              placeholder="Search Testimonials"
              className="border-none bg-white p-0 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button
            leftIcon={<BsPlus />}
            colorScheme="blue"
            onClick={onOpen}
            className="flex items-center gap-2"
          >
            Add Testimonial
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        {loading ? (
          <p>Loading testimonials...</p>
        ) : filteredTestimonials.length === 0 ? (
          <p>No testimonials match your search.</p>
        ) : (
          filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="flex justify-between md:items-center p-4 md:p-7 rounded-xl border-2"
            >
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Avatar
                  size="lg"
                  src={testimonial.image}
                  name={testimonial.name}
                  className="rounded-full"
                />
                <div>
                  <div className="text-gray-800 text-lg font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className="mr-1"
                        color={
                          star <= testimonial.rating ? "#FFC107" : "#E4E5E9"
                        }
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-gray-600">
                    &quot;{testimonial.testimonial}&quot;
                  </div>
                </div>
              </div>

              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BsThreeDotsVertical />}
                  variant="ghost"
                  aria-label="Options"
                />
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      handleOpenEditModal(testimonial, testimonial._id)
                    }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-red-600 hover:text-white"
                    onClick={() => confirmDeleteTestimonial(testimonial._id)}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ))
        )}
      </div>

      {/* Add Testimonial Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNewTestimonial({
            name: "",
            work: "",
            rating: 0,
            testimonial: "",
            image: null,
            imagePreview: "",
          });
          setIsAddSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Testimonial</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="testimonial-name"
              isRequired
              isInvalid={isAddSubmitting && newTestimonial.name.trim() === ""}
              mb={4}
            >
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter name"
                value={newTestimonial.name}
                onChange={(e) =>
                  setNewTestimonial({ ...newTestimonial, name: e.target.value })
                }
              />
              {isAddSubmitting && newTestimonial.name.trim() === "" && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="testimonial-work"
              isRequired
              isInvalid={isAddSubmitting && newTestimonial.work.trim() === ""}
              mb={4}
            >
              <FormLabel>Work</FormLabel>
              <Input
                placeholder="Enter work"
                value={newTestimonial.work}
                onChange={(e) =>
                  setNewTestimonial({ ...newTestimonial, work: e.target.value })
                }
              />
              {isAddSubmitting && newTestimonial.work.trim() === "" && (
                <FormErrorMessage>Work is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="testimonial-rating"
              isRequired
              isInvalid={isAddSubmitting && newTestimonial.rating === 0}
              mb={4}
            >
              <FormLabel>Rating</FormLabel>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconButton
                    key={star}
                    icon={<FaStar />}
                    variant="ghost"
                    aria-label={`${star} Star`}
                    className="mr-1"
                    color={
                      star <= newTestimonial.rating ? "#FFC107" : "#E4E5E9"
                    }
                    onClick={() => handleAddRating(star)}
                  />
                ))}
              </div>
              {isAddSubmitting && newTestimonial.rating === 0 && (
                <FormErrorMessage>Rating is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="testimonial-text"
              isRequired
              isInvalid={
                isAddSubmitting && newTestimonial.testimonial.trim() === ""
              }
              mb={4}
            >
              <FormLabel>Testimonial</FormLabel>
              <Textarea
                placeholder="Enter testimonial"
                value={newTestimonial.testimonial}
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    testimonial: e.target.value,
                  })
                }
              />
              {isAddSubmitting && newTestimonial.testimonial.trim() === "" && (
                <FormErrorMessage>Testimonial is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="testimonial-image"
              isRequired
              isInvalid={isAddSubmitting && !newTestimonial.image}
            >
              <FormLabel>Author Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleAddImageChange}
              />
              {newTestimonial.imagePreview && (
                <Image
                  src={newTestimonial.imagePreview}
                  alt="Author Preview"
                  boxSize="100px"
                  mt={2}
                  objectFit="cover"
                />
              )}
              {isAddSubmitting && !newTestimonial.image && (
                <FormErrorMessage>Image is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                onClose();
                setNewTestimonial({
                  name: "",
                  work: "",
                  rating: 0,
                  testimonial: "",
                  image: null,
                  imagePreview: "",
                });
                setIsAddSubmitting(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleAddTestimonial}
              isLoading={isAddSubmitting}
            >
              Add Testimonial
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Testimonial Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          handleCloseEditModal();
          setIsEditSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Testimonial</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="edit-testimonial-name"
              isRequired
              isInvalid={
                isEditSubmitting && currentTestimonial.name.trim() === ""
              }
              mb={4}
            >
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter name"
                value={currentTestimonial.name}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    name: e.target.value,
                  })
                }
              />
              {isEditSubmitting && currentTestimonial.name.trim() === "" && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="edit-testimonial-work"
              isRequired
              isInvalid={
                isEditSubmitting && currentTestimonial.work.trim() === ""
              }
              mb={4}
            >
              <FormLabel>Work</FormLabel>
              <Input
                placeholder="Enter work"
                value={currentTestimonial.work}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    work: e.target.value,
                  })
                }
              />
              {isEditSubmitting && currentTestimonial.work.trim() === "" && (
                <FormErrorMessage>Work is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="edit-testimonial-rating"
              isRequired
              isInvalid={isEditSubmitting && currentTestimonial.rating === 0}
              mb={4}
            >
              <FormLabel>Rating</FormLabel>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconButton
                    key={star}
                    icon={<FaStar />}
                    variant="ghost"
                    aria-label={`${star} Star`}
                    className="mr-1"
                    color={
                      star <= currentTestimonial.rating ? "#FFC107" : "#E4E5E9"
                    }
                    onClick={() => handleEditRating(star)}
                  />
                ))}
              </div>
              {isEditSubmitting && currentTestimonial.rating === 0 && (
                <FormErrorMessage>Rating is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="edit-testimonial-text"
              isRequired
              isInvalid={
                isEditSubmitting && currentTestimonial.testimonial.trim() === ""
              }
              mb={4}
            >
              <FormLabel>Testimonial</FormLabel>
              <Textarea
                placeholder="Enter testimonial"
                value={currentTestimonial.testimonial}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    testimonial: e.target.value,
                  })
                }
              />
              {isEditSubmitting &&
                currentTestimonial.testimonial.trim() === "" && (
                  <FormErrorMessage>Testimonial is required.</FormErrorMessage>
                )}
            </FormControl>

            <FormControl
              id="edit-testimonial-image"
              isRequired
              isInvalid={
                isEditSubmitting &&
                !currentTestimonial.image &&
                !currentTestimonial.imagePreview
              }
            >
              <FormLabel>Author Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleEditImageChange}
              />
              {currentTestimonial.imagePreview && (
                <Image
                  src={currentTestimonial.imagePreview}
                  alt="Author Preview"
                  boxSize="100px"
                  mt={2}
                  objectFit="cover"
                />
              )}
              {isEditSubmitting &&
                !currentTestimonial.image &&
                !currentTestimonial.imagePreview && (
                  <FormErrorMessage>Image is required.</FormErrorMessage>
                )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                handleCloseEditModal();
                setIsEditSubmitting(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleEditTestimonial}
              isLoading={isEditSubmitting}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Testimonial
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteTestimonial}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default TestimonialsPage;