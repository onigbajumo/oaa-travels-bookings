"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  Checkbox,
  useToast,
  Select,
  Text,
  Alert,
  AlertIcon,
  Stack,
  IconButton,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { FiX } from "react-icons/fi";


const steps = ["Personal Info", "About Me", "Pageant", "Achievements", "Uploads"];

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const SOCIAL_MEDIA_OPTIONS = ["Facebook", "Instagram", "X", "TikTok", "Snapchat"];

const COLORS = ["Red", "Blue", "Black", "White", "Pink", "Purple", "Green", "Yellow", "Orange"];
const ACHIVEMENT = ["JSCE", "WASCE/SSCE", "ND", "HND", "COLLEGE", "NCE", "B.Sc", "M.Sc", "Others"];
const DRESS_SIZES = ["XS", "S", "M", "L", "XL", "Size 6", "Size 8","Size 10", "Size 12", "Size 14"];
const WAIST_SIZES = ["24", "26", "28", "30", "32", "34", "36", "38", "40+"];
const SHOE_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

export default function ContestantForm() {
  const [step, setStep] = useState(0);
  const initialFormState = {
    name: "",
    address: "",
    email: "",
    phone: "",
    socialMediaHandles: [{ platform: "", url: "" }],
    age: "",
    height: "",
    stateOfOrigin: "",
    dateOfBirth: "",
    placeOfBirth: "",
    cherishedProfession: "",
    bestThingAboutAge: "",
    descriptiveWords: [""],
    embarrassingMoment: "",
    favoriteColor: "",
    dressSize: "",
    waistSize: "",
    shoeSize: "",
    bestAttribute: "",
    favoriteQuote: "",
    lifeAmbition: "",
    reasonForJoining: "",
    promotionPlan: "",
    schoolAchievements: "",
    activityInvolvements: "",
    leadershipRoles: "",
    workExperience: "",
    images: [],
    attestation: false,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();



  const handleSocialChange = (index, field, value) => {
    const updated = [...formData.socialMediaHandles];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, socialMediaHandles: updated }));
  };

  const addSocialField = () => {
    setFormData((prev) => ({
      ...prev,
      socialMediaHandles: [...prev.socialMediaHandles, { platform: "", url: "" }],
    }));
  };

  const removeSocialField = (index) => {
    setFormData((prev) => ({
      ...prev,
      socialMediaHandles: prev.socialMediaHandles.filter((_, i) => i !== index),
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...acceptedFiles] }));
  }, []);

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitted(false);
  
    try {
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "mbgmod"); 
          data.append("folder", "mbgmod/contestants");
  
          const res = await fetch("https://api.cloudinary.com/v1_1/digipeng-com/image/upload", {
            method: "POST",
            body: data,
          });
  
          const result = await res.json();
          if (result.secure_url) {
            return result.secure_url;
          } else {
            throw new Error("Image upload failed");
          }
        })
      );
      const payload = {
        ...formData,
        images: imageUrls,
      };
  
      const res = await fetch("/api/contestant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Submission failed");
      }
  
      toast({
        title: "Success",
        description: "Form submitted successfully",
        status: "success",
      });
      setFormData(initialFormState);
      setStep(0);
      setSubmitted(true);
    } catch (err) {
      toast({ title: "Error", description: err.message, status: "error" });
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <Box maxW="3xl" mx="auto" mt={10} p={5} borderWidth="1px">
      <Heading mb={6}>{steps[step]}</Heading>
      {submitted && (
        <Alert status="success" mb={6}><AlertIcon />Registration submitted successfully!</Alert>
      )}

      {step === 0 && (
        <VStack spacing={4}>
          <FormControl><FormLabel>Name</FormLabel><Input name="name" value={formData.name} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Email</FormLabel><Input name="email" value={formData.email} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Phone</FormLabel><Input name="phone" value={formData.phone} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Address</FormLabel><Input name="address" value={formData.address} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Social Media Profiles</FormLabel>
          {formData.socialMediaHandles.map((entry, index) => (
            <HStack key={index} spacing={3} mb={2}>
                <Select
                placeholder="Platform"
                value={entry.platform}
                onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                >
                {SOCIAL_MEDIA_OPTIONS.map((platform) => (
                    <option key={platform} value={platform}>
                    {platform}
                    </option>
                ))}
                </Select>
                <Input
                placeholder="https://..."
                value={entry.url}
                onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                />
                {index > 0 && (
                <IconButton
                    icon={<FiX />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeSocialField(index)}
                    aria-label="Remove Social Entry"
                />
                )}
            </HStack>
            ))}

            <Button onClick={addSocialField} size="sm" mt={2} colorScheme="blue">+ Add Social Media</Button>
          </FormControl>
          <FormControl>
        <FormLabel>Age</FormLabel>
        <Select
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Select age"
        >
            {Array.from({ length: 30 - 18 + 1 }, (_, i) => 18 + i).map((age) => (
            <option key={age} value={age}>{age}</option>
            ))}
        </Select>
        </FormControl>
          <FormControl><FormLabel>Height (in ft)</FormLabel><Input name="height" type="number" value={formData.height} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>State of Origin</FormLabel>
            <Select name="stateOfOrigin" value={formData.stateOfOrigin} onChange={handleChange}>
              <option value="">Select a state</option>
              {NIGERIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl><FormLabel>Date of Birth</FormLabel><Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Place of Birth</FormLabel><Input name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} /></FormControl>
        </VStack>
      )}

      {step === 1 && (
        <VStack spacing={4}>
          <FormControl><FormLabel>Cherished Profession</FormLabel><Input name="cherishedProfession" placeholder="e.g. Fashion Designer" value={formData.cherishedProfession} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Best Thing About Your Age</FormLabel><Input name="bestThingAboutAge" placeholder="e.g. Freedom to express myself" value={formData.bestThingAboutAge} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Descriptive Words (add 3)</FormLabel>
            {formData.descriptiveWords.map((word, index) => (
              <Input key={index} value={word} placeholder={`e.g. Bold`} onChange={(e) => handleArrayChange(index, "descriptiveWords", e.target.value)} />
            ))}
          </FormControl>
          <FormControl><FormLabel>Embarrassing Moment</FormLabel><Textarea name="embarrassingMoment" placeholder="e.g. I tripped on stage during an event" value={formData.embarrassingMoment} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Favorite Color</FormLabel>
            <Select name="favoriteColor" value={formData.favoriteColor} onChange={handleChange}>
              <option value="">Select a color</option>
              {COLORS.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl><FormLabel>Dress Size</FormLabel>
            <Select name="dressSize" value={formData.dressSize} onChange={handleChange}>
              <option value="">Select</option>
              {DRESS_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FormControl>
          <FormControl><FormLabel>Waist Size</FormLabel>
            <Select name="waistSize" value={formData.waistSize} onChange={handleChange}>
              <option value="">Select</option>
              {WAIST_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FormControl>
          <FormControl><FormLabel>Shoe Size</FormLabel>
            <Select name="shoeSize" value={formData.shoeSize} onChange={handleChange}>
              <option value="">Select</option>
              {SHOE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FormControl>
          <FormControl><FormLabel>Best Attribute</FormLabel><Input name="bestAttribute" value={formData.bestAttribute} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Favorite Quote</FormLabel><Textarea name="favoriteQuote" placeholder="e.g. 'Be yourself; everyone else is taken.'" value={formData.favoriteQuote} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Life Ambition</FormLabel><Textarea name="lifeAmbition" value={formData.lifeAmbition} onChange={handleChange} /></FormControl>
        </VStack>
      )}

      {step === 2 && (
        <VStack spacing={4}>
          <FormControl><FormLabel>Why do you want to be Miss MBGMOD?</FormLabel>
            <Textarea name="reasonForJoining" value={formData.reasonForJoining} onChange={handleChange} placeholder="e.g. I want to inspire others and represent my values on a national stage." />
          </FormControl>
          <FormControl><FormLabel>How will you promote the title?</FormLabel>
            <Textarea name="promotionPlan" value={formData.promotionPlan} onChange={handleChange} placeholder="e.g. I plan to use social media and community engagement to raise awareness." />
          </FormControl>
        </VStack>
      )}

      {step === 3 && (
        <VStack spacing={4}>
          

          <FormControl><FormLabel>School Achievements</FormLabel>

            <Select name="schoolAchievements" value={formData.schoolAchievements} onChange={handleChange}>
              <option value="">Select</option>
              {ACHIVEMENT.map((achiveement) => (
                <option key={achiveement} value={achiveement}>{achiveement}</option>
              ))}
            </Select>
          </FormControl>


          <FormControl><FormLabel>Activity Involvements</FormLabel><Textarea name="activityInvolvements" value={formData.activityInvolvements} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Leadership Roles</FormLabel><Textarea name="leadershipRoles" value={formData.leadershipRoles} onChange={handleChange} /></FormControl>
          <FormControl><FormLabel>Work Experience</FormLabel><Textarea name="workExperience" value={formData.workExperience} onChange={handleChange} /></FormControl>
        </VStack>
      )}

      {step === 4 && (
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Upload Image(s)</FormLabel>
            <Box {...getRootProps()} p={6} border="2px dashed gray" borderRadius="lg" textAlign="center" cursor="pointer">
              <input {...getInputProps()} />
              {isDragActive ? (
                <Text>Drop the files here...</Text>
              ) : (
                <Text>Drag & drop images here, or click to browse</Text>
              )}
            </Box>
            <Stack direction="row" mt={3} flexWrap="wrap" spacing={3}>
              {formData.images.map((file, idx) => (
                <Box key={idx} position="relative">
                  <ChakraImage src={URL.createObjectURL(file)} alt={`upload-${idx}`} boxSize="100px" objectFit="cover" borderRadius="md" />
                  <IconButton icon={<FiX />} size="xs" colorScheme="red" position="absolute" top="0" right="0" onClick={() => removeImage(idx)} aria-label="Remove Image" />
                </Box>
              ))}
            </Stack>
          </FormControl>
          <Checkbox name="attestation" isChecked={formData.attestation} onChange={(e) => setFormData((prev) => ({ ...prev, attestation: e.target.checked }))}>
            I agree to the terms and attest that all information provided is accurate.
          </Checkbox>
        </VStack>
      )}

      <HStack mt={8} justify="space-between">
        <Button onClick={handleBack} isDisabled={step === 0}>Back</Button>
        {step < steps.length - 1 ? (
          <Button colorScheme="blue" onClick={handleNext}>Next</Button>
        ) : (
          <Button colorScheme="green" onClick={handleSubmit} isLoading={isSubmitting} loadingText="Submitting...">Submit</Button>
        )}
      </HStack>
    </Box>
  );

 
}