import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X, FileText, AlertCircle, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const caseFormSchema = z.object({
  caseType: z.string({
    required_error: "Please select a case type",
  }),
  caseTitle: z.string().min(5, {
    message: "Case title must be at least 5 characters",
  }),
  caseDescription: z.string().min(50, {
    message: "Case description must be at least 50 characters",
  }),
  constitutionalArticles: z.string().optional(),
  documents: z
    .any()
    .refine((files) => files?.length > 0, "At least one document is required")
    .refine((files) => {
      if (files?.length === 0) return true;
      return Array.from(files).every(
        (file: File) => file.size <= MAX_FILE_SIZE,
      );
    }, `Max file size is 5MB`)
    .refine((files) => {
      if (files?.length === 0) return true;
      return Array.from(files).every((file: File) =>
        ACCEPTED_FILE_TYPES.includes(file.type),
      );
    }, "Only PDF, DOC, DOCX, JPG and PNG files are accepted"),
});

type CaseFormValues = z.infer<typeof caseFormSchema>;

interface CaseInputFormProps {
  onSubmit?: (
    values: CaseFormValues & {
      fileNames: string[];
      fileContents?: { name: string; content: string; type: string }[];
    },
  ) => void;
  onCancel?: () => void;
}

const CaseInputForm = ({
  onSubmit = () => {},
  onCancel = () => {},
}: CaseInputFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      caseType: "",
      caseTitle: "",
      caseDescription: "",
      constitutionalArticles: "",
      documents: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      form.setValue("documents", e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    // Create a new FileList-like object for the form
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    form.setValue(
      "documents",
      dataTransfer.files.length > 0 ? dataTransfer.files : undefined,
    );
  };

  const handleSubmit = async (values: CaseFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real implementation, you would upload files to a server here
      // For now, we'll just simulate a delay and process the files
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Process file contents (in a real app, this would be done server-side)
      const fileContents: { name: string; content: string; type: string }[] =
        [];

      for (const file of files) {
        try {
          // Read file contents
          const content = await readFileAsText(file);
          fileContents.push({
            name: file.name,
            content,
            type: file.type,
          });
        } catch (err) {
          console.error(`Error reading file ${file.name}:`, err);
        }
      }

      onSubmit({
        ...values,
        fileNames: files.map((file) => file.name),
        fileContents: fileContents,
      });
    } catch (error) {
      console.error("Error submitting case:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to read file contents
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject(new Error(`Error reading file ${file.name}`));
      reader.readAsText(file);
    });
  };

  return (
    <div className="w-full bg-white rounded-lg p-6">
      <div className="mb-6 flex items-start">
        <div className="mr-4 hidden sm:block">
          <Scale className="h-10 w-10 text-navy-700" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-navy-800 mb-2">
            Submit Your Case for Free Analysis
          </h2>
          <p className="text-gray-600">
            Our AI will analyze your case based on the Indian Constitution,
            relevant laws, and precedents. No registration required - this
            service is completely free.
          </p>
        </div>
      </div>

      <Alert className="mb-6 bg-navy-50 border-navy-200">
        <AlertCircle className="h-4 w-4 text-navy-700" />
        <AlertTitle className="text-navy-800">Important</AlertTitle>
        <AlertDescription className="text-navy-700">
          All analysis is based strictly on the Indian Constitution and legal
          precedents. Please provide as much detail as possible and upload
          relevant documents for comprehensive assessment. Our AI will analyze
          your case details and documents using advanced legal NLP techniques to
          provide a detailed judicial analysis.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="caseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-navy-800">Case Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="civil">Civil Case</SelectItem>
                      <SelectItem value="criminal">Criminal Case</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="property">Property Dispute</SelectItem>
                      <SelectItem value="constitutional">
                        Constitutional Matter
                      </SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the category that best describes your case
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caseTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-navy-800">Case Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a brief title for your case"
                      {...field}
                      className="border-gray-300"
                    />
                  </FormControl>
                  <FormDescription>
                    A concise title to identify your case
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="caseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-800">
                  Case Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a detailed description of your case including relevant facts, dates, and parties involved"
                    className="min-h-[150px] border-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include all relevant details for accurate analysis
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="constitutionalArticles"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-800">
                  Relevant Constitutional Articles (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Article 14, 21, 32"
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormDescription>
                  If you know specific articles of the Indian Constitution
                  relevant to your case, mention them here
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documents"
            render={() => (
              <FormItem>
                <FormLabel className="text-navy-800">
                  Upload Documents
                </FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="h-10 w-10 text-navy-500 mb-2" />
                    <span className="text-navy-800 font-medium mb-1">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-gray-500 text-sm">
                      PDF, DOC, DOCX, JPG, PNG (Max 5MB per file)
                    </span>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-navy-800">
                      Uploaded Files ({files.length}):
                    </p>
                    <div className="max-h-[200px] overflow-y-auto">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded-md mb-2"
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-navy-600 mr-2" />
                            <span className="text-sm truncate max-w-[200px]">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({(file.size / 1024).toFixed(0)} KB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {form.formState.errors.documents && (
                  <p className="text-sm font-medium text-red-500 mt-2">
                    {form.formState.errors.documents.message as string}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="border-navy-300 text-navy-700 hover:bg-navy-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || files.length === 0}
              className="bg-navy-700 hover:bg-navy-800 text-white"
            >
              {isSubmitting ? (
                <>
                  <Scale className="mr-2 h-4 w-4 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                "Submit for Analysis"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CaseInputForm;
