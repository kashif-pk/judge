import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Gavel, Scale } from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const caseFormSchema = z.object({
  caseTitle: z.string().min(5, {
    message: "Case title must be at least 5 characters",
  }),
  caseType: z.string({
    required_error: "Please select a case type",
  }),
  caseDescription: z.string().min(20, {
    message: "Case description must be at least 20 characters",
  }),
  userRole: z.enum(["prosecution", "defense"], {
    required_error: "Please select your role",
  }),
});

type CaseFormValues = z.infer<typeof caseFormSchema>;

interface CourtCaseFormProps {
  onSubmit: (values: CaseFormValues) => void;
  onCancel: () => void;
}

const CourtCaseForm = ({ onSubmit, onCancel }: CourtCaseFormProps) => {
  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      caseTitle: "",
      caseType: "",
      caseDescription: "",
      userRole: "prosecution",
    },
  });

  const handleSubmit = (values: CaseFormValues) => {
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center mr-3">
          <Gavel className="h-5 w-5 text-gold-500" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-navy-800">
            Start Virtual Court Case
          </h2>
          <p className="text-gray-600">
            Enter case details to begin a virtual courtroom session with the AI
            Judge
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="caseTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-800">Case Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., State vs. John Doe"
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormDescription>
                  Provide a descriptive title for your case
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <SelectItem value="criminal">Criminal Case</SelectItem>
                    <SelectItem value="civil">Civil Case</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="property">Property Dispute</SelectItem>
                    <SelectItem value="constitutional">
                      Constitutional Matter
                    </SelectItem>
                    <SelectItem value="corporate">Corporate Law</SelectItem>
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
            name="caseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-800">
                  Case Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe the facts and legal issues of your case"
                    className="min-h-[100px] border-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide key details to help the AI Judge understand your case
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userRole"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-navy-800">Your Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="prosecution" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Prosecution - Present arguments against the accused
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="defense" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Defense - Present arguments in favor of the accused
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Choose which side you want to represent in the virtual
                  courtroom
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-navy-300 text-navy-700 hover:bg-navy-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-navy-700 hover:bg-navy-800 text-white"
            >
              <Scale className="mr-2 h-4 w-4" />
              Enter Courtroom
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourtCaseForm;
