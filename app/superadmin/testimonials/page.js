"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsPlus, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
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

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    message: "",
    image: null,
    imagePreview: "",
  });
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const [currentTestimonial, setCurrentTestimonial] = useState({
    name: "",
    message: "",
    image: null,
    imagePreview: "",
  });
  const [currentId, setCurrentId] = useState(null);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();

  const [isAddSubmitting, setIsAddSubmitting] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/testimonial");
        if (!response.ok) {
          throw new Error(
            `Error fetching testimonials: ${response.statusText}`
          );
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleAddTestimonial = async () => {
    const { name, message, image } = newTestimonial;

    if (name.trim() === "" || message.trim() === "" || !image) {
      toast.error("All fields are required.");
      setIsAddSubmitting(false);
      return;
    }

    setIsAddSubmitting(true);

    try {
      const base64Image = await fileToBase64(image);

      const response = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error adding testimonial: ${response.statusText}`);
      }

      const created = await response.json();
      setTestimonials((prev) => [created, ...prev]);

      toast.success(
        `Testimonial from "${created.name}" has been added successfully.`
      );
      onAddClose();
      setNewTestimonial({
        name: "",
        message: "",
        image: null,
        imagePreview: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAddSubmitting(false);
    }
  };

  const handleEditTestimonial = async () => {
    const { name, message, image, imagePreview } = currentTestimonial;

    if (name.trim() === "" || message.trim() === "") {
      toast.error("All fields are required.");
      setIsEditSubmitting(false);
      return;
    }

    setIsEditSubmitting(true);

    try {
      let finalImage = imagePreview;
      if (image) {
        finalImage = await fileToBase64(image);
      }

      const response = await fetch("/api/testimonial", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentId,
          name: name.trim(),
          message: message.trim(),
          image: finalImage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error updating testimonial: ${response.statusText}`);
      }

      const updated = await response.json();

      setTestimonials((prev) =>
        prev.map((t) => (t._id === currentId ? updated : t))
      );

      toast.success(
        `Testimonial from "${updated.name}" has been updated successfully.`
      );
      handleCloseEditModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const handleDeleteTestimonial = async () => {
    if (!testimonialToDelete) return;
    try {
      const response = await fetch(
        `/api/testimonial?id=${testimonialToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error deleting testimonial: ${response.statusText}`);
      }

      setTestimonials((prev) =>
        prev.filter((t) => t._id !== testimonialToDelete)
      );
      toast.info("Testimonial has been deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      onDeleteClose();
    }
  };

  const handleOpenEditModal = (testimonialObj) => {
    setCurrentTestimonial({
      name: testimonialObj.name,
      message: testimonialObj.message,
      image: null,
      imagePreview: testimonialObj.image,
    });
    setCurrentId(testimonialObj._id);
    onEditOpen();
  };

  const handleCloseEditModal = () => {
    setCurrentTestimonial({
      name: "",
      message: "",
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

  const filteredTestimonials = testimonials.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) || t.message.toLowerCase().includes(q)
    );
  });

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
            onClick={onAddOpen}
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
                  <div className="mt-2 text-gray-600">
                    &quot;{testimonial.message}&quot;
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
                  <MenuItem onClick={() => handleOpenEditModal(testimonial)}>
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

      <Modal
        isOpen={isAddOpen}
        onClose={() => {
          onAddClose();
          setNewTestimonial({
            name: "",
            message: "",
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
              id="testimonial-text"
              isRequired
              isInvalid={
                isAddSubmitting && newTestimonial.message.trim() === ""
              }
              mb={4}
            >
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Enter testimonial message"
                value={newTestimonial.message}
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    message: e.target.value,
                  })
                }
              />
              {isAddSubmitting && newTestimonial.message.trim() === "" && (
                <FormErrorMessage>Message is required.</FormErrorMessage>
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
                onAddClose();
                setNewTestimonial({
                  name: "",
                  message: "",
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
              id="edit-testimonial-text"
              isRequired
              isInvalid={
                isEditSubmitting && currentTestimonial.message.trim() === ""
              }
              mb={4}
            >
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Enter testimonial"
                value={currentTestimonial.message}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    message: e.target.value,
                  })
                }
              />
              {isEditSubmitting && currentTestimonial.message.trim() === "" && (
                <FormErrorMessage>Message is required.</FormErrorMessage>
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
