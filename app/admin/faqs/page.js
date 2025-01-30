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
  // Dummy data for FAQs
  const initialFaqs = [
    {
      _id: "1",
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      _id: "2",
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
  ];

  const [faqs, setFaqs] = useState(initialFaqs);
  const [loading, setLoading] = useState(false); // No loading needed for dummy data
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
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

  // Simulate fetching FAQs (no API call needed)
  useEffect(() => {
    setLoading(false); // Set loading to false immediately
  }, []);

  const handleAddFAQ = () => {
    if (newQuestion.trim() === "" || newAnswer.trim() === "") {
      toast.error("Both question and answer are required.");
      return;
    }

    if (
      faqs.some(
        (faq) => faq.question.toLowerCase() === newQuestion.trim().toLowerCase()
      )
    ) {
      toast.error("This question already exists.");
      return;
    }

    setIsAddSubmitting(true);

    // Simulate adding a new FAQ
    const newFaq = {
      _id: String(faqs.length + 1), // Generate a simple ID
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
    };

    setFaqs([newFaq, ...faqs]);
    toast.success(`FAQ "${newFaq.question}" has been added successfully.`);
    onClose();
    setNewQuestion("");
    setNewAnswer("");
    setIsAddSubmitting(false);
  };

  const handleEditFAQ = () => {
    if (currentQuestion.trim() === "" || currentAnswer.trim() === "") {
      toast.error("Both question and answer are required.");
      return;
    }

    if (
      faqs.some(
        (faq) =>
          faq.question.toLowerCase() === currentQuestion.trim().toLowerCase() &&
          faq._id !== currentId
      )
    ) {
      toast.error("This question already exists.");
      return;
    }

    setIsEditSubmitting(true);

    // Simulate updating an FAQ
    const updatedFaqs = faqs.map((faq) =>
      faq._id === currentId
        ? { ...faq, question: currentQuestion.trim(), answer: currentAnswer.trim() }
        : faq
    );

    setFaqs(updatedFaqs);
    toast.success(`FAQ "${currentQuestion}" has been updated successfully.`);
    handleCloseEditModal();
    setIsEditSubmitting(false);
  };

  const handleDeleteFAQ = () => {
    if (faqToDelete) {
      // Simulate deleting an FAQ
      const updatedFaqs = faqs.filter((faq) => faq._id !== faqToDelete);
      setFaqs(updatedFaqs);
      toast.info("FAQ has been deleted successfully.");
      onDeleteClose();
    }
  };

  const handleOpenEditModal = (faq) => {
    setCurrentQuestion(faq.question);
    setCurrentAnswer(faq.answer);
    setCurrentId(faq._id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentQuestion("");
    setCurrentAnswer("");
    setCurrentId(null);
  };

  const confirmDeleteFAQ = (id) => {
    setFaqToDelete(id);
    onDeleteOpen();
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              className="flex justify-between items-start p-4 md:p-7 rounded-xl border-2 "
            >
              <div className="flex-1">
                <h4 className="text-gray-800 text-lg font-semibold">
                  {faq.question}
                </h4>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
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

      {/* Add FAQ Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNewQuestion("");
          setNewAnswer("");
          setIsAddSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New FAQ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="faq-question"
              isRequired
              isInvalid={isAddSubmitting && newQuestion.trim() === ""}
            >
              <FormLabel>Question</FormLabel>
              <Input
                placeholder="Enter question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              {isAddSubmitting && newQuestion.trim() === "" && (
                <FormErrorMessage>Question is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="faq-answer"
              isRequired
              mt={4}
              isInvalid={isAddSubmitting && newAnswer.trim() === ""}
            >
              <FormLabel>Answer</FormLabel>
              <Textarea
                placeholder="Enter answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              {isAddSubmitting && newAnswer.trim() === "" && (
                <FormErrorMessage>Answer is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                onClose();
                setNewQuestion("");
                setNewAnswer("");
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

      {/* Edit FAQ Modal */}
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
              id="edit-faq-question"
              isRequired
              isInvalid={isEditSubmitting && currentQuestion.trim() === ""}
            >
              <FormLabel>Question</FormLabel>
              <Input
                placeholder="Enter new question"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
              />
              {isEditSubmitting && currentQuestion.trim() === "" && (
                <FormErrorMessage>Question is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="edit-faq-answer"
              isRequired
              mt={4}
              isInvalid={isEditSubmitting && currentAnswer.trim() === ""}
            >
              <FormLabel>Answer</FormLabel>
              <Textarea
                placeholder="Enter new answer"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />
              {isEditSubmitting && currentAnswer.trim() === "" && (
                <FormErrorMessage>Answer is required.</FormErrorMessage>
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

      {/* Delete FAQ Alert Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete FAQ
              <ModalCloseButton />
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