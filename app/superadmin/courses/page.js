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
  Checkbox,
  CheckboxGroup,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { BsPlus, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const instructorMap = {
  development: {
    name: "Development Instructors",
    image: "https://placehold.co/500.png",
    bio: "Our development instructors are experienced full-stack developers with 10+ years of industry experience, specializing in frontend, backend, and DevOps.",
    experience: "Senior Fullstack Developers | 10+ Years of Experience",
  },
  design: {
    name: "Design Instructors",
    image: "https://placehold.co/500.png",
    bio: "Our design instructors are seasoned UI/UX professionals with 8+ years of experience, focusing on user-centered design, accessibility, and interaction design.",
    experience: "Lead UI/UX Designers | 8+ Years of Experience",
  },
  marketing: {
    name: "Marketing Instructors",
    image: "https://placehold.co/500.png",
    bio: "Our marketing instructors are experts in digital marketing, SEO, and growth strategies, helping businesses scale effectively with 6+ years of experience.",
    experience: "Growth Marketing Specialists | 6+ Years of Experience",
  },
  management: {
    name: "Management Instructors",
    image: "https://placehold.co/500.png",
    bio: "Our management instructors have led product and project teams for over a decade, focusing on leadership, agile methodologies, and strategic planning.",
    experience: "Product Managers & Agile Coaches | 10+ Years of Experience",
  },
};


const ratingOptions = [
  "0.5",
  "1.0",
  "1.5",
  "2.0",
  "2.5",
  "3.0",
  "3.5",
  "4.0",
  "4.5",
  "5.0",
];

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: "",
    rating: "4.5",
    category: "",
    description: "",
    duration: "1",
    tag: "Beginner",
    mode: [],
    image: null,
    imagePreview: "",
    highlights: [],
    skills: [],
    curriculum: [],
    payments: [],
    newHighlight: "",
    newSkill: "",
  });

  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);
  const [currentModule, setCurrentModule] = useState({
    title: "",
    topics: [],
    newTopic: "",
  });

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const [courseToDeleteIndex, setCourseToDeleteIndex] = useState(null);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      toast.error("Error fetching courses");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNewCourseModal = () => {
    setIsEditing(false);
    setCurrentCourseIndex(null);
    setNewCourse({
      title: "",
      rating: "4.5",
      category: "",
      description: "",
      duration: "1",
      tag: "Beginner",
      mode: [],
      image: null,
      imagePreview: "",
      highlights: [],
      skills: [],
      curriculum: [],
      payments: [],
      newHighlight: "",
      newSkill: "",
    });
    onOpen();
  };

  const handleOpenEditCourseModal = async (index) => {
    try {
      setIsEditing(true);
      setCurrentCourseIndex(index);
      const existing = courses[index];
      let durationNum = "1";
      if (existing.duration) {
        const parsed = parseInt(existing.duration, 10);
        if (!isNaN(parsed)) durationNum = parsed.toString();
      }
      setNewCourse({
        ...existing,
        rating: existing.rating || "4.5",
        duration: durationNum,
        image: null,
        imagePreview: existing.image,
        newHighlight: "",
        newSkill: "",
      });
      onOpen();
    } catch (err) {
      console.error(err);
    }
  };

  const getFinalImage = async () => {
    if (newCourse.image) {
      const base64Str = await toBase64(newCourse.image);
      return base64Str;
    }
    return newCourse.imagePreview;
  };

  const handleAddOrEditCourse = async () => {
    if (
      !newCourse.title ||
      !newCourse.category ||
      newCourse.mode.length === 0 ||
      (!newCourse.image && !newCourse.imagePreview) ||
      newCourse.highlights.length === 0 ||
      newCourse.skills.length === 0 ||
      newCourse.curriculum.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const durationString = `${newCourse.duration} months`;

      const matchedInstructor = instructorMap[newCourse.category] || {
        name: "Unknown Instructor",
        image: "https://placehold.co/500.png",
        bio: "No data available",
        experience: "N/A",
      };

      const finalImage = await getFinalImage();

      const finalCourseData = {
        title: newCourse.title,
        rating: newCourse.rating,
        category: newCourse.category,
        description: newCourse.description,
        duration: durationString,
        tag: newCourse.tag,
        mode: newCourse.mode,
        image: finalImage,
        highlights: newCourse.highlights,
        skills: newCourse.skills,
        instructor: matchedInstructor,
        curriculum: newCourse.curriculum,
        payments: newCourse.payments,
      };

      if (!isEditing) {
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalCourseData),
        });
        if (!res.ok) throw new Error("Failed to create course");
        toast.success("Course added successfully");
        onClose();
        fetchAllCourses();
      } else {
        const existingCourse = courses[currentCourseIndex];
        if (!existingCourse._id) {
          toast.error("Cannot edit. Missing course ID");
          return;
        }
        finalCourseData.id = existingCourse._id;
        const res = await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalCourseData),
        });
        if (!res.ok) throw new Error("Failed to update course");
        toast.success("Course updated successfully");
        onClose();
        fetchAllCourses();
      }
    } catch (err) {
      toast.error("Error saving course");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCourse = (index) => {
    setCourseToDeleteIndex(index);
    onDeleteOpen();
  };
  const confirmDeleteCourse = async () => {
    if (courseToDeleteIndex == null) return;
    const course = courses[courseToDeleteIndex];
    if (!course._id) {
      toast.error("Cannot delete. Missing ID");
      onDeleteClose();
      return;
    }
    try {
      const res = await fetch(`/api/courses?id=${course._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete course");
      toast.success("Course deleted successfully");
      onDeleteClose();
      fetchAllCourses();
    } catch (err) {
      toast.error("Error deleting course");
      console.error(err);
    }
  };

  const handleAddHighlight = () => {
    if (newCourse.newHighlight) {
      setNewCourse({
        ...newCourse,
        highlights: [...newCourse.highlights, newCourse.newHighlight],
        newHighlight: "",
      });
    }
  };
  const handleRemoveHighlight = (idx) => {
    const updated = [...newCourse.highlights];
    updated.splice(idx, 1);
    setNewCourse({ ...newCourse, highlights: updated });
  };

  const handleAddSkill = () => {
    if (newCourse.newSkill) {
      setNewCourse({
        ...newCourse,
        skills: [...newCourse.skills, newCourse.newSkill],
        newSkill: "",
      });
    }
  };
  const handleRemoveSkill = (idx) => {
    const updated = [...newCourse.skills];
    updated.splice(idx, 1);
    setNewCourse({ ...newCourse, skills: updated });
  };

  const handleOpenModuleModal = () => {
    setCurrentModuleIndex(null);
    setCurrentModule({ title: "", topics: [], newTopic: "" });
    setIsCurriculumOpen(true);
  };
  const handleAddTopic = () => {
    if (currentModule.newTopic) {
      setCurrentModule({
        ...currentModule,
        topics: [...currentModule.topics, currentModule.newTopic],
        newTopic: "",
      });
    }
  };
  const handleSaveModule = () => {
    if (currentModule.title && currentModule.topics.length > 0) {
      if (currentModuleIndex === null) {
        const newMod = {
          module: `Module ${newCourse.curriculum.length + 1}: ${
            currentModule.title
          }`,
          topics: currentModule.topics,
        };
        setNewCourse({
          ...newCourse,
          curriculum: [...newCourse.curriculum, newMod],
        });
      } else {
        const updatedCurr = [...newCourse.curriculum];
        updatedCurr[currentModuleIndex] = {
          ...updatedCurr[currentModuleIndex],
          module: `Module ${currentModuleIndex + 1}: ${currentModule.title}`,
          topics: currentModule.topics,
        };
        setNewCourse({ ...newCourse, curriculum: updatedCurr });
      }
      setIsCurriculumOpen(false);
      setCurrentModule({ title: "", topics: [], newTopic: "" });
      setCurrentModuleIndex(null);
    }
  };
  const handleEditModule = (index) => {
    const mod = newCourse.curriculum[index];
    const [_, ...rest] = mod.module.split(": ");
    const title = rest.join(": ").trim();
    setCurrentModuleIndex(index);
    setCurrentModule({ title, topics: [...mod.topics], newTopic: "" });
    setIsCurriculumOpen(true);
  };
  const handleDeleteModule = (index) => {
    const updated = [...newCourse.curriculum];
    updated.splice(index, 1);
    const reNumbered = updated.map((m, i) => {
      const [_, ...rest] = m.module.split(": ");
      const t = rest.join(": ").trim();
      return { ...m, module: `Module ${i + 1}: ${t}` };
    });
    setNewCourse({ ...newCourse, curriculum: reNumbered });
  };

  const handlePriceChange = (value, planType, mode) => {
    const updatedPayments = [...newCourse.payments];
    const idx = updatedPayments.findIndex(
      (p) => p.mode === mode && p.plan === planType
    );
    if (idx > -1) {
      updatedPayments[idx].price = value;
    } else {
      updatedPayments.push({ mode, plan: planType, price: value });
    }
    setNewCourse({ ...newCourse, payments: updatedPayments });
  };

  const handleCategoryChange = (cat) => {
    setNewCourse((prev) => ({
      ...prev,
      category: cat,
    }));
  };

  return (
    <div className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Courses Management</h3>
      </div>

      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-[#A3A3A3]" />
            <input
              type="text"
              placeholder="Search Courses"
              className="border-none bg-white p-0 w-full rounded-none"
            />
          </div>
        </div>
        <Button
          colorScheme="blue"
          leftIcon={<BsPlus />}
          onClick={handleOpenNewCourseModal}
        >
          Add Course
        </Button>
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="flex flex-col gap-3 mt-5">
          {courses.map((course, index) => (
            <div key={course._id || index} className="border-2 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <Image src={course.image} boxSize="100px" objectFit="cover" />
                  <div>
                    <h4 className="text-lg font-semibold capitalize">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.category}</p>
                    <div className="flex gap-2 mt-2">
                      {course.mode.map((m) => (
                        <span
                          key={m}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
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
                    <MenuItem onClick={() => handleOpenEditCourseModal(index)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteCourse(index)}>
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
              Delete Course
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this course? You can't undo this
              action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDeleteCourse} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Edit Course" : "Add New Course"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            <FormControl isRequired>
              <FormLabel>Course Title</FormLabel>
              <Input
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Rating</FormLabel>
              <Select
                value={newCourse.rating}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, rating: e.target.value })
                }
              >
                {ratingOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                value={newCourse.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="management">Management</option>
                <option value="marketing">Marketing</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
              />
            </FormControl>

            <div className="grid grid-cols-2 gap-4">
              <FormControl isRequired>
                <FormLabel>Duration (months)</FormLabel>
                <Select
                  value={newCourse.duration}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, duration: e.target.value })
                  }
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n.toString()}>
                      {n} Month{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Difficulty Level</FormLabel>
                <Select
                  value={newCourse.tag}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, tag: e.target.value })
                  }
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Select>
              </FormControl>
            </div>

            <FormControl isRequired>
              <FormLabel>Learning Modes</FormLabel>
              <CheckboxGroup
                value={newCourse.mode}
                onChange={(values) =>
                  setNewCourse({ ...newCourse, mode: values })
                }
              >
                <Stack spacing={2} direction="row">
                  <Checkbox value="Onsite">Onsite</Checkbox>
                  <Checkbox value="Virtual">Virtual</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Course Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setNewCourse({
                    ...newCourse,
                    image: file,
                    imagePreview: URL.createObjectURL(file),
                  });
                }}
              />
              {newCourse.imagePreview && (
                <Image src={newCourse.imagePreview} boxSize="100px" mt={2} />
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Highlights</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newCourse.newHighlight}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, newHighlight: e.target.value })
                  }
                />
                <Button onClick={handleAddHighlight}>Add</Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {newCourse.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-2 py-1 rounded inline-flex items-center"
                  >
                    {h}
                    <IconButton
                      icon={<AiOutlineClose />}
                      size="xs"
                      variant="ghost"
                      onClick={() => handleRemoveHighlight(i)}
                      ml={1}
                      aria-label="Remove highlight"
                    />
                  </span>
                ))}
              </div>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Skills</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newCourse.newSkill}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, newSkill: e.target.value })
                  }
                />
                <Button onClick={handleAddSkill}>Add</Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {newCourse.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 px-2 py-1 rounded inline-flex items-center"
                  >
                    {s}
                    <IconButton
                      icon={<AiOutlineClose />}
                      size="xs"
                      variant="ghost"
                      onClick={() => handleRemoveSkill(i)}
                      ml={1}
                      aria-label="Remove skill"
                    />
                  </span>
                ))}
              </div>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Curriculum</FormLabel>
              <Button onClick={handleOpenModuleModal}>Add Module</Button>
              <Table mt={2}>
                <Thead>
                  <Tr>
                    <Th width={10}>SN</Th>
                    <Th>Module Title</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {newCourse.curriculum.map((mod, i) => (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{mod.module}</Td>
                      <Td>
                        <IconButton
                          icon={<AiOutlineEdit />}
                          size="sm"
                          mr={2}
                          onClick={() => handleEditModule(i)}
                          aria-label="Edit module"
                        />
                        <IconButton
                          icon={<AiOutlineDelete />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteModule(i)}
                          aria-label="Delete module"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Payment Plans</FormLabel>
              <div className="space-y-4">
                {newCourse.mode.map((mode) => {
                  const oneTime = newCourse.payments.find(
                    (p) => p.mode === mode && p.plan === "One-time"
                  ) || { mode, plan: "One-time", price: "" };
                  const monthly = newCourse.payments.find(
                    (p) => p.mode === mode && p.plan === "Monthly"
                  ) || { mode, plan: "Monthly", price: "" };

                  return (
                    <div key={mode} className="border p-4 rounded">
                      <h4 className="font-semibold mb-2">{mode} Plans</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <FormLabel>One-time Payment</FormLabel>
                          <Input
                            placeholder="Enter price"
                            type="text"
                            value={oneTime.price}
                            onChange={(e) =>
                              handlePriceChange(
                                e.target.value,
                                "One-time",
                                mode
                              )
                            }
                          />
                        </div>
                        <div>
                          <FormLabel>Monthly Payment</FormLabel>
                          <Input
                            placeholder="Enter price"
                            type="text"
                            value={monthly.price}
                            onChange={(e) =>
                              handlePriceChange(e.target.value, "Monthly", mode)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleAddOrEditCourse}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? "Saving"
                  : "Creating"
                : isEditing
                ? "Save Changes"
                : "Create Course"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentModuleIndex === null ? "Add New Module" : "Edit Module"}
          </ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Module Title</FormLabel>
              <Input
                value={currentModule.title}
                onChange={(e) =>
                  setCurrentModule({ ...currentModule, title: e.target.value })
                }
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Topics</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={currentModule.newTopic}
                  onChange={(e) =>
                    setCurrentModule({
                      ...currentModule,
                      newTopic: e.target.value,
                    })
                  }
                />
                <Button onClick={handleAddTopic}>Add</Button>
              </div>
              <div className="mt-2">
                {currentModule.topics.map((t, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-2 mb-2 rounded flex justify-between items-center"
                  >
                    <span>{t}</span>
                    <IconButton
                      icon={<AiOutlineClose />}
                      size="xs"
                      variant="ghost"
                      onClick={() => {
                        const updatedTopics = [...currentModule.topics];
                        updatedTopics.splice(i, 1);
                        setCurrentModule({
                          ...currentModule,
                          topics: updatedTopics,
                        });
                      }}
                      aria-label="Remove topic"
                    />
                  </div>
                ))}
              </div>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsCurriculumOpen(false)}>Cancel</Button>
            <Button colorScheme="blue" ml={3} onClick={handleSaveModule}>
              {currentModuleIndex === null ? "Add Module" : "Save Module"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
