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

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [currentId, setCurrentId] = useState(null);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [faqToDelete, setFaqToDelete] = useState(null);
  const cancelRef = useRef();

  const [isAddSubmitting, setIsAddSubmitting] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/faqs");
        if (!res.ok) {
          throw new Error(`Error fetching FAQs: ${res.statusText}`);
        }
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleAddFAQ = async () => {
    if (newTitle.trim() === "" || newContent.trim() === "") {
      toast.error("Both title and content are required.");
      return;
    }

    setIsAddSubmitting(true);

    try {
      const response = await fetch("/api/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error adding FAQ: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Create FAQ response:", result);

      await refetchFaqs();

      toast.success("FAQ created successfully!");
      onClose();
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAddSubmitting(false);
    }
  };

  const refetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/faqs");
      if (!res.ok) {
        throw new Error(`Error fetching FAQs: ${res.statusText}`);
      }
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditFAQ = async () => {
    if (currentTitle.trim() === "" || currentContent.trim() === "") {
      toast.error("Both title and content are required.");
      return;
    }

    if (
      faqs.some(
        (faq) =>
          faq.title.toLowerCase() === currentTitle.trim().toLowerCase() &&
          faq._id !== currentId
      )
    ) {
      toast.error("This FAQ already exists.");
      return;
    }

    setIsEditSubmitting(true);

    try {
      const response = await fetch("/api/faqs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentId,
          title: currentTitle.trim(),
          content: currentContent.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error updating FAQ: ${response.statusText}`);
      }

      const updatedFaq = await response.json();

      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) => (faq._id === currentId ? updatedFaq : faq))
      );

      toast.success(`FAQ "${updatedFaq.title}" has been updated successfully.`);
      handleCloseEditModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const handleDeleteFAQ = async () => {
    if (!faqToDelete) return;

    try {
      const response = await fetch(`/api/faqs?id=${faqToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting FAQ: ${response.statusText}`);
      }

      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== faqToDelete));
      toast.info("FAQ has been deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      onDeleteClose();
    }
  };

  const handleOpenEditModal = (faq) => {
    setCurrentTitle(faq.title);
    setCurrentContent(faq.content);
    setCurrentId(faq._id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentTitle("");
    setCurrentContent("");
    setCurrentId(null);
  };

  const confirmDeleteFAQ = (id) => {
    setFaqToDelete(id);
    onDeleteOpen();
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (!faq.title || !faq.content) return false;

    const q = searchQuery.toLowerCase();
    return (
      faq.title.toLowerCase().includes(q) ||
      faq.content.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Frequently Asked Questions</h3>
      </div>

      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-[#A3A3A3]" />
            <input
              type="text"
              placeholder="Search FAQs"
              className="border-none bg-white p-0 w-full rounded-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button colorScheme="blue" leftIcon={<BsPlus />} onClick={onOpen}>
            Add FAQ
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        {loading ? (
          <p>Loading FAQs...</p>
        ) : filteredFaqs.length === 0 ? (
          <p>No FAQs match your search.</p>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq._id}
              className="flex justify-between items-start p-4 md:p-7 rounded-xl border-2"
            >
              <div className="flex-1">
                <h4 className="text-gray-800 text-lg font-semibold">
                  {faq.title}
                </h4>
                <p className="text-gray-600 mt-2">{faq.content}</p>
              </div>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BsThreeDotsVertical />}
                  variant="ghost"
                  aria-label="Options"
                />
                <MenuList>
                  <MenuItem onClick={() => handleOpenEditModal(faq)}>
                    Edit Details
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-red-600 hover:text-white"
                    onClick={() => confirmDeleteFAQ(faq._id)}
                  >
                    Delete FAQ
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNewTitle("");
          setNewContent("");
          setIsAddSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New FAQ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="faq-title"
              isRequired
              isInvalid={isAddSubmitting && newTitle.trim() === ""}
            >
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter FAQ title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              {isAddSubmitting && newTitle.trim() === "" && (
                <FormErrorMessage>Title is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="faq-content"
              isRequired
              mt={4}
              isInvalid={isAddSubmitting && newContent.trim() === ""}
            >
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Enter FAQ content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              {isAddSubmitting && newContent.trim() === "" && (
                <FormErrorMessage>Content is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                onClose();
                setNewTitle("");
                setNewContent("");
                setIsAddSubmitting(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleAddFAQ}
              isLoading={isAddSubmitting}
            >
              Add FAQ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          handleCloseEditModal();
          setIsEditSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit FAQ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="edit-faq-title"
              isRequired
              isInvalid={isEditSubmitting && currentTitle.trim() === ""}
            >
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter new title"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />
              {isEditSubmitting && currentTitle.trim() === "" && (
                <FormErrorMessage>Title is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="edit-faq-content"
              isRequired
              mt={4}
              isInvalid={isEditSubmitting && currentContent.trim() === ""}
            >
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Enter new content"
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
              />
              {isEditSubmitting && currentContent.trim() === "" && (
                <FormErrorMessage>Content is required.</FormErrorMessage>
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
              onClick={handleEditFAQ}
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
              Delete FAQ
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this FAQ? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteFAQ} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default FAQPage;
