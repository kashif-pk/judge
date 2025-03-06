import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  Send,
  User,
  Shield,
  Scale,
  MessageSquare,
  FileText,
  X,
  Paperclip,
  FileUp,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import JudgeAvatar from "@/components/ui/judge-avatar";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  role: "prosecution" | "defense" | "judge";
  content: string;
  timestamp: Date;
  attachments?: {
    name: string;
    type: string;
    content: string;
    size: number;
  }[];
  citations?: {
    law: string;
    section: string;
    description: string;
  }[];
}

interface VirtualCourtroomProps {
  caseId?: string;
  caseTitle?: string;
  caseType?: string;
  initialRole?: "prosecution" | "defense";
  onClose?: () => void;
}

const VirtualCourtroom = ({
  caseId = "new-case-" + Date.now().toString(),
  caseTitle = "New Legal Case",
  caseType = "Criminal",
  initialRole = "prosecution",
  onClose = () => {},
}: VirtualCourtroomProps) => {
  const [userRole, setUserRole] = useState<"prosecution" | "defense">(
    initialRole,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCaseActive, setIsCaseActive] = useState(true);
  const [judgmentInProgress, setJudgmentInProgress] = useState(false);
  const [judgment, setJudgment] = useState<any>(null);
  const [legalReferences, setLegalReferences] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from the judge
  useEffect(() => {
    const initialMessage: Message = {
      id: "welcome-" + Date.now().toString(),
      role: "judge",
      content:
        "Welcome to the Virtual Courtroom. This case, " +
        caseTitle +
        ", falls under the " +
        caseType +
        " category. I am the AI Judge presiding over this matter.\n\nThe " +
        (userRole === "prosecution" ? "Defense" : "Prosecution") +
        " arguments will be presented by an AI assistant. Please present your arguments as the " +
        userRole +
        ". You may cite relevant sections of Indian law and precedents to strengthen your case.\n\nLet us begin with opening statements. The " +
        userRole +
        " may proceed with their initial arguments.",
      timestamp: new Date(),
    };

    setMessages([initialMessage]);

    // Load some relevant legal references based on case type
    loadLegalReferences(caseType);
  }, [caseTitle, caseType, userRole]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadLegalReferences = (caseType: string) => {
    // In a real implementation, this would fetch from a database
    // For now, we'll use hardcoded references based on case type
    const references = [];

    if (caseType.toLowerCase().includes("criminal")) {
      references.push(
        {
          law: "Indian Penal Code",
          section: "Section 302",
          description:
            "Punishment for murder - Death or imprisonment for life, and fine",
        },
        {
          law: "Indian Penal Code",
          section: "Section 304",
          description:
            "Punishment for culpable homicide not amounting to murder - Imprisonment up to life, or up to 10 years, and fine",
        },
        {
          law: "Indian Penal Code",
          section: "Section 307",
          description:
            "Attempt to murder - Imprisonment up to 10 years and fine",
        },
        {
          law: "Indian Penal Code",
          section: "Section 376",
          description:
            "Punishment for rape - Rigorous imprisonment from 10 years to life, and fine",
        },
        {
          law: "Code of Criminal Procedure",
          section: "Section 161",
          description: "Examination of witnesses by police",
        },
        {
          law: "Code of Criminal Procedure",
          section: "Section 164",
          description: "Recording of confessions and statements by Magistrate",
        },
        {
          law: "Indian Evidence Act",
          section: "Section 3",
          description: "Definition of Evidence - Oral and documentary evidence",
        },
        {
          law: "Indian Evidence Act",
          section: "Section 25",
          description:
            "Confession to police officer not to be proved against accused",
        },
        {
          law: "Indian Evidence Act",
          section: "Section 45",
          description: "Opinions of experts - When relevant",
        },
        {
          law: "Indian Evidence Act",
          section: "Section 65B",
          description: "Admissibility of electronic records",
        },
        {
          law: "Indian Evidence Act",
          section: "Section 101",
          description:
            "Burden of proof - Whoever desires any Court to give judgment must prove facts",
        },
        {
          law: "Indian Evidence Act",
          section: "Section 105",
          description: "Burden of proving exception lies on accused",
        },
      );
    } else if (
      caseType.toLowerCase().includes("civil") ||
      caseType.toLowerCase().includes("property")
    ) {
      references.push(
        {
          law: "Civil Procedure Code",
          section: "Order VII Rule 1",
          description: "Particulars to be contained in plaint",
        },
        {
          law: "Transfer of Property Act",
          section: "Section 54",
          description: "Transfer of immovable property",
        },
        {
          law: "Indian Contract Act",
          section: "Section 10",
          description: "What agreements are contracts",
        },
      );
    } else if (caseType.toLowerCase().includes("family")) {
      references.push(
        {
          law: "Hindu Marriage Act",
          section: "Section 13",
          description: "Divorce",
        },
        {
          law: "Hindu Adoption and Maintenance Act",
          section: "Section 18",
          description: "Maintenance of wife",
        },
      );
    }

    setLegalReferences(references);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      // Process each file
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const newAttachment = {
              name: file.name,
              type: file.type,
              content: event.target.result as string,
              size: file.size,
            };
            setAttachments((prev) => [...prev, newAttachment]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;

    // Add user message
    const userMessage: Message = {
      id: "user-" + Date.now().toString(),
      role: userRole,
      content: inputMessage,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setAttachments([]);
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      generateAIResponse(userMessage);
    }, 1500);
  };

  const generateAIResponse = (userMessage: Message) => {
    // In a real implementation, this would call an API to generate the response
    // For now, we'll simulate responses

    // Determine if this should be a response from the opposing side or the judge
    const messageCount = messages.length;
    const isJudgeResponse =
      messageCount % 5 === 0 ||
      messageCount > 15 ||
      userMessage.attachments?.length > 0;

    let aiMessage: Message;

    if (isJudgeResponse) {
      // Judge intervention or question
      let judgeContent = generateJudgeResponse(userMessage);

      // If there are attachments, add analysis of them
      if (userMessage.attachments && userMessage.attachments.length > 0) {
        const attachmentAnalysis = generateAttachmentAnalysis(
          userMessage.attachments,
        );
        judgeContent =
          judgeContent + "\n\n**Document Analysis:**\n" + attachmentAnalysis;
      }

      aiMessage = {
        id: "judge-" + Date.now().toString(),
        role: "judge",
        content: judgeContent,
        timestamp: new Date(),
      };
    } else {
      // Response from the opposing side
      const opposingRole =
        userRole === "prosecution" ? "defense" : "prosecution";

      // Generate content for opposing side
      let opposingContent = generateOpposingResponse(userMessage, opposingRole);

      // If there are attachments, add analysis from opposing side perspective
      if (userMessage.attachments && userMessage.attachments.length > 0) {
        const opposingAnalysis = generateOpposingAttachmentAnalysis(
          userMessage.attachments,
          opposingRole,
        );
        opposingContent =
          opposingContent + "\n\n**Document Analysis:**\n" + opposingAnalysis;
      }

      aiMessage = {
        id: "ai-" + Date.now().toString(),
        role: opposingRole,
        content: opposingContent,
        timestamp: new Date(),
        citations: generateRandomCitations(),
      };
    }

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);

    // Check if we should end the case and deliver judgment
    if (messageCount > 20) {
      // Add a final arguments request before judgment
      if (messageCount === 21) {
        setTimeout(() => {
          const finalArgumentsMessage: Message = {
            id: "judge-final-" + Date.now().toString(),
            role: "judge",
            content:
              "We have heard substantial arguments from both sides. The court will now hear final submissions. " +
              (userRole === "prosecution" ? "Prosecution" : "Defense") +
              ", please present your final arguments, summarizing your key points and the specific outcome you seek. After that, we will hear from the " +
              (userRole === "prosecution" ? "Defense" : "Prosecution") +
              " before delivering judgment.",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, finalArgumentsMessage]);
          setIsTyping(false);
        }, 2000);
      } else if (messageCount > 25) {
        setTimeout(() => {
          deliverJudgment();
        }, 3000);
      }
    }
  };

  const generateJudgeResponse = (
    userMessage: Message,
    caseType: string = "Criminal",
  ) => {
    // Check for conflicting precedents or weak arguments that need clarification
    const needsClarification = checkForClarificationNeeded(
      userMessage,
      messages,
    );
    if (needsClarification) {
      return needsClarification;
    }

    // Case-specific judge responses based on the case type
    const judgeResponsesByType = {
      Criminal: [
        "The Prosecution has cited Section 302 IPC for murder. For a conviction under this section, the evidence must establish both actus reus (the criminal act) and mens rea (criminal intent) beyond reasonable doubt. Please elaborate on how your evidence satisfies these elements as per the standards established in Bachan Singh v. State of Punjab (1980).",
        "The Defense argues that the confession is inadmissible under Section 25 of the Indian Evidence Act which prohibits confessions made to police officers. However, Section 164 CrPC provides for confessions recorded by a Magistrate which are admissible. Can you clarify whether the confession in this case falls under either provision, citing the procedural safeguards that were followed or violated?",
        "The " +
          userRole +
          " has presented arguments regarding chain of custody of evidence. The Supreme Court in Tomaso Bruno v. State of U.P. (2015) emphasized the importance of proper evidence handling. Please specify the exact procedural violations that would render this evidence inadmissible under Sections 65B and 45 of the Indian Evidence Act.",
        "Your argument relies on circumstantial evidence. The Supreme Court in Sharad Birdhichand Sarda v. State of Maharashtra (1984) established that circumstantial evidence must form a complete chain with no gaps, must point exclusively toward the guilt of the accused, and must be incapable of explanation by any other hypothesis. How does your evidence satisfy these stringent requirements?",
        "You've invoked Section 84 IPC regarding unsoundness of mind as a defense. The burden of proving this defense lies with the accused as per Section 105 of the Evidence Act. What specific medical or psychiatric evidence supports this defense, and how does it meet the standards set in Surendra Mishra v. State of Jharkhand (2011) which requires proof of complete impairment of cognitive faculties?",
      ],
      Civil: [
        "Your argument cites breach of contract, but the opposing party claims frustration under Section 56 of the Contract Act. Can you address how the doctrine of frustration does not apply in this specific scenario?",
        "The documentary evidence you've presented regarding the agreement requires registration under Section 17 of the Registration Act. How do you address the admissibility of this unregistered document?",
        "The " +
          userRole +
          " has raised the issue of specific performance. In light of the Supreme Court's judgment in Adhunik Steels Ltd. v. Orissa Manganese and Minerals Pvt. Ltd., what makes this case appropriate for specific performance rather than damages?",
        "You've argued about limitation periods for filing this suit. Please address how your claim falls within the prescribed period under the Limitation Act, particularly in reference to when the cause of action arose.",
        "The opposing counsel has raised the defense of force majeure. In light of Energy Watchdog v. CERC (2017), how do you establish that the circumstances do not qualify as force majeure under Indian contract law?",
      ],
      Property: [
        "Your claim to title is based on a registered sale deed, but the opposing party claims adverse possession for over 12 years. How do you address the requirements of adverse possession as clarified in Ravinder Kaur Grewal v. Manjit Kaur (2019)?",
        "The property in question appears to be agricultural land. Have you addressed the restrictions on transfer under the relevant state's land ceiling laws and whether proper permission was obtained?",
        "The " +
          userRole +
          " has presented revenue records as evidence of ownership. However, the Supreme Court in Suraj Bhan v. Financial Commissioner has held that revenue records are not conclusive proof of title. How do you strengthen your claim beyond these records?",
        "You've argued about a boundary dispute based on the property description in the sale deed. How do you reconcile this with the actual physical possession and demarcation on the ground as per the principles in Faqir Chand v. Ram Rattan?",
        "The opposing party claims that the property transfer lacked proper consideration. Can you address the adequacy of consideration in light of Section 25 of the Transfer of Property Act and relevant case law?",
      ],
      Family: [
        "Your petition for divorce cites cruelty under Section 13(1)(ia) of the Hindu Marriage Act. In light of the Supreme Court's judgment in Samar Ghosh v. Jaya Ghosh, how do the specific instances you've mentioned qualify as legal cruelty?",
        "The issue of child custody must be decided based on the 'welfare of the child' principle established in Rosy Jacob v. Jacob A. Chakramakkal. How does your claim for custody serve the best interests of the minor children?",
        "The " +
          userRole +
          " has raised the issue of maintenance under Section 125 CrPC. How do you address the quantum of maintenance in light of the guidelines established by the Supreme Court in Rajnesh v. Neha (2020)?",
        "You've argued about division of matrimonial property. Given that Indian law does not explicitly recognize the concept of community property, what legal basis supports your claim for division of assets acquired during marriage?",
        "The opposing party claims that the marriage was void ab initio due to non-compliance with essential ceremonies. How do you establish the validity of this marriage under Section 7 of the Hindu Marriage Act?",
      ],
      Constitutional: [
        "Your challenge to the impugned provision is based on Article 14. How does this classification fail the test of reasonable classification established in State of West Bengal v. Anwar Ali Sarkar?",
        "The state argues that restrictions on the fundamental right are reasonable under Article 19(6). How do you establish that these restrictions fail the proportionality test laid down in Modern Dental College v. State of MP?",
        "The " +
          userRole +
          " has invoked Article 21's right to privacy. In light of Justice K.S. Puttaswamy v. Union of India, how does the impugned action violate the specific facets of privacy identified by the Supreme Court?",
        "Your argument involves the interpretation of Article 25 regarding religious practices. How do you distinguish between essential and non-essential religious practices as per the test established in The Commissioner, Hindu Religious Endowments v. Sri Lakshmindra Thirtha Swamiar?",
        "The opposing counsel relies on the doctrine of constitutional silence. How do you address this in light of the basic structure doctrine established in Kesavananda Bharati v. State of Kerala?",
      ],
      Corporate: [
        "Your petition alleges oppression under Section 241 of the Companies Act. In light of Tata Consultancy Services v. Cyrus Investments, what specific actions of the majority shareholders constitute oppression rather than legitimate business decisions?",
        "The respondents invoke the business judgment rule as a defense. How do you establish that the directors' actions fall outside the protection of this rule as per the standards in Miheer H. Mafatlal v. Mafatlal Industries?",
        "The " +
          userRole +
          " has raised issues regarding corporate governance norms. Can you specify which provisions of the Companies Act or SEBI regulations have been violated and how these violations have caused prejudice?",
        "You've argued about the validity of board resolutions. How do you address the procedural requirements under Section 179 of the Companies Act and the company's Articles of Association?",
        "The opposing party claims ratification of the impugned actions by shareholder approval. How do you challenge the validity of this approval in light of the principles established in Foss v. Harbottle and its exceptions?",
      ],
      default: [
        "Thank you for your argument. Could you please elaborate on the legal basis for your claim? Please cite specific sections of the relevant law and Supreme Court precedents that support your position.",
        "I'd like to clarify a point in your argument. What specific evidence supports your assertion, and how does this evidence meet the standard of proof required in this type of case?",
        "Both sides have presented arguments on the legal interpretation. Let me ask a specific question to the " +
          userRole +
          ": How do you reconcile your interpretation with the contrary precedents cited by the opposing counsel?",
        "The court would like to understand more about the procedural aspects of your case. Can you address any potential jurisdictional or limitation issues that might affect the admissibility of this matter?",
        "Your argument raises important questions about the burden of proof. Please clarify which party bears the burden on each contested issue and whether that burden has been discharged based on the evidence presented.",
        "We are moving toward final arguments in this matter. Please summarize your strongest legal points and the specific relief you are seeking from this court.",
      ],
    };

    // Determine which set of responses to use based on case type
    const caseTypeKey =
      Object.keys(judgeResponsesByType).find((key) =>
        caseType.toLowerCase().includes(key.toLowerCase()),
      ) || "default";

    const responses =
      judgeResponsesByType[caseTypeKey] || judgeResponsesByType.default;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateAttachmentAnalysis = (
    attachments: any[],
    caseType: string = "Criminal",
  ) => {
    // In a real implementation, this would analyze the actual content of the files
    // For now, we'll generate a simulated analysis based on file names and types

    const analyses = attachments.map((attachment) => {
      const fileName = attachment.name.toLowerCase();
      let analysis = "";

      // Generate analysis based on file name patterns
      if (fileName.includes("evidence") || fileName.includes("exhibit")) {
        analysis =
          "This document appears to contain key evidence. The court notes the submission and will consider it in the final judgment.";
      } else if (
        fileName.includes("witness") ||
        fileName.includes("testimony")
      ) {
        analysis =
          "Witness testimony provided. The credibility and relevance of this testimony will be evaluated in context of other evidence.";
      } else if (fileName.includes("report") || fileName.includes("analysis")) {
        analysis =
          "Expert report received. The court acknowledges the technical analysis provided in this document.";
      } else if (
        fileName.includes("contract") ||
        fileName.includes("agreement")
      ) {
        analysis =
          "Legal document submitted. The court will examine the terms and conditions outlined in this document.";
      } else if (
        fileName.includes("photo") ||
        fileName.includes("image") ||
        attachment.type.startsWith("image/")
      ) {
        analysis =
          "Visual evidence submitted. The court will consider the authenticity and context of this visual evidence.";
      } else if (
        fileName.includes("statement") ||
        fileName.includes("affidavit")
      ) {
        analysis =
          "Sworn statement received. The court will evaluate the credibility and relevance of this testimony.";
      } else {
        analysis =
          "Document received. The court will review its contents and determine its relevance to the case.";
      }

      return "- " + attachment.name + ": " + analysis;
    });

    return analyses.join("\n");
  };

  const generateOpposingAttachmentAnalysis = (
    attachments: any[],
    role: "prosecution" | "defense",
    caseType: string = "Criminal",
  ) => {
    // Generate analysis from the perspective of the opposing side
    const analyses = attachments.map((attachment) => {
      const fileName = attachment.name.toLowerCase();
      let analysis = "";

      if (role === "prosecution") {
        // Prosecution analyzing defense documents
        if (fileName.includes("evidence") || fileName.includes("exhibit")) {
          analysis =
            "The prosecution contends that this evidence is insufficient and does not establish the defense's claims beyond reasonable doubt.";
        } else if (
          fileName.includes("witness") ||
          fileName.includes("testimony")
        ) {
          analysis =
            "The prosecution questions the credibility of this witness testimony and will present contradicting evidence.";
        } else if (
          fileName.includes("report") ||
          fileName.includes("analysis")
        ) {
          analysis =
            "The prosecution argues that this report uses flawed methodology and its conclusions should be scrutinized carefully.";
        } else if (
          fileName.includes("photo") ||
          fileName.includes("image") ||
          attachment.type.startsWith("image/")
        ) {
          analysis =
            "The prosecution submits that this visual evidence lacks proper authentication and context to be considered reliable.";
        } else {
          analysis =
            "The prosecution has reviewed this document and finds it irrelevant or inadmissible to the case at hand.";
        }
      } else {
        // Defense analyzing prosecution documents
        if (fileName.includes("evidence") || fileName.includes("exhibit")) {
          analysis =
            "The defense challenges the admissibility of this evidence, citing procedural irregularities in its collection and handling.";
        } else if (
          fileName.includes("witness") ||
          fileName.includes("testimony")
        ) {
          analysis =
            "The defense highlights inconsistencies in this testimony and questions the witness's reliability.";
        } else if (
          fileName.includes("report") ||
          fileName.includes("analysis")
        ) {
          analysis =
            "The defense has engaged independent experts who dispute the findings presented in this report.";
        } else if (
          fileName.includes("photo") ||
          fileName.includes("image") ||
          attachment.type.startsWith("image/")
        ) {
          analysis =
            "The defense argues that this visual evidence has been presented without proper context and may be misleading.";
        } else {
          analysis =
            "The defense contends that this document fails to establish the prosecution's case beyond reasonable doubt.";
        }
      }

      return "- " + attachment.name + ": " + analysis;
    });

    return analyses.join("\n");
  };

  const generateOpposingResponse = (
    userMessage: Message,
    opposingRole: "prosecution" | "defense",
    caseType: string = "Criminal",
  ) => {
    // Case-specific responses based on the case type and opposing role
    const responsesByType = {
      Criminal: {
        prosecution: [
          "The prosecution contends that the evidence clearly establishes the elements of the offense beyond reasonable doubt. The defendant's actions meet all criteria under Section 302 of the IPC.",
          "We submit that witness testimony and documentary evidence confirm the accused's presence at the scene and involvement in the alleged crime.",
          "The prosecution draws the court's attention to the established chain of events that demonstrates premeditation and intent as required under the IPC.",
          "With respect, the defense's argument fails to account for the material evidence collected from the scene which directly implicates the accused.",
          "The prosecution would like to emphasize that similar cases have resulted in convictions, as seen in State v. Sharma (2018) where the Supreme Court upheld the lower court's judgment.",
        ],
        defense: [
          "The defense maintains that the prosecution has failed to establish guilt beyond reasonable doubt, which is the standard required in criminal proceedings under Indian law.",
          "We contend that the evidence presented is circumstantial at best and does not conclusively link our client to the alleged offense.",
          "My client's actions do not satisfy the elements required under the relevant sections of the IPC, particularly regarding mens rea (criminal intent).",
          "The defense would like to highlight procedural irregularities in the collection of evidence, which brings its admissibility into question under Section 25 of the Indian Evidence Act.",
          "We cite the precedent established in Vishwanath v. State of UP (2015) where the Supreme Court held that similar evidence was insufficient for conviction.",
        ],
      },
      Civil: {
        prosecution: [
          "The plaintiff submits that the documentary evidence clearly establishes breach of contract under Section 73 of the Indian Contract Act.",
          "We draw the court's attention to the terms of the agreement which were explicitly violated by the defendant as evidenced by the correspondence.",
          "The plaintiff contends that the defendant's failure to perform their obligations has resulted in quantifiable damages that must be compensated.",
          "With respect, the defendant's argument regarding force majeure is not applicable as the circumstances do not meet the threshold established in M/s Halliburton Offshore Services Inc. v. Vedanta Limited (2020).",
          "We rely on the principle established in Hadley v. Baxendale, which has been consistently upheld by Indian courts in cases of contractual breach.",
        ],
        defense: [
          "The defendant maintains that there was no valid contract as the essential elements under Section 10 of the Indian Contract Act were not satisfied.",
          "We contend that even if a contract existed, the plaintiff has failed to demonstrate any actual loss resulting from the alleged breach.",
          "The defendant's actions were justified under the doctrine of frustration as codified in Section 56 of the Contract Act.",
          "We highlight that the plaintiff failed to mitigate their damages as required under established principles of contract law.",
          "We cite the precedent in Energy Watchdog v. CERC (2017) where the Supreme Court clarified the application of force majeure in contractual disputes.",
        ],
      },
      Property: {
        prosecution: [
          "The plaintiff asserts clear title to the property based on the registered sale deed executed in accordance with the Transfer of Property Act.",
          "We submit that the defendant's occupation of the property is without any legal basis and constitutes trespass.",
          "The plaintiff draws the court's attention to the revenue records which clearly identify our client as the rightful owner.",
          "With respect, the defendant's claim of adverse possession fails to meet the statutory period of 12 years as required under the Limitation Act.",
          "We rely on the judgment in Ravinder Kaur Grewal v. Manjit Kaur (2019) where the Supreme Court clarified the requirements for establishing title.",
        ],
        defense: [
          "The defendant maintains that they have been in peaceful, continuous and open possession of the property for over 12 years, thereby acquiring rights through adverse possession.",
          "We contend that the plaintiff's title documents contain material irregularities that render them legally ineffective.",
          "The defendant's possession is based on a valid oral gift which is recognized under Section 123 of the Transfer of Property Act.",
          "We highlight that the plaintiff has acquiesced to the defendant's possession for years, creating an estoppel against their current claim.",
          "We cite the precedent in Nair Service Society v. K.C. Alexander where the Supreme Court established the principles governing property disputes of this nature.",
        ],
      },
      Family: {
        prosecution: [
          "The petitioner submits that the grounds for divorce under Section 13 of the Hindu Marriage Act have been clearly established through evidence.",
          "We draw the court's attention to the documented instances of cruelty which satisfy the legal threshold established by the Supreme Court.",
          "The petitioner contends that the welfare of the children would be best served by granting custody to our client as demonstrated by the assessment report.",
          "With respect, the respondent's claim for maintenance fails to account for their own earning capacity and financial resources.",
          "We rely on the judgment in Naveen Kohli v. Neelu Kohli where the Supreme Court recognized irretrievable breakdown as a ground for divorce.",
        ],
        defense: [
          "The respondent maintains that the alleged instances of cruelty are exaggerated and do not meet the threshold established in V. Bhagat v. D. Bhagat.",
          "We contend that the best interests of the children would be served by granting custody to our client who has been their primary caregiver.",
          "The respondent is entitled to maintenance under Section 125 of the CrPC based on the significant income disparity between the parties.",
          "We highlight that the petitioner has not approached the court with clean hands, having concealed material facts about their own conduct.",
          "We cite the precedent in Rajnesh v. Neha where the Supreme Court established comprehensive guidelines for maintenance in matrimonial disputes.",
        ],
      },
      Constitutional: {
        prosecution: [
          "The petitioner submits that the impugned provision violates the fundamental right to equality guaranteed under Article 14 of the Constitution.",
          "We draw the court's attention to the arbitrary classification created by the legislation which fails the test of reasonable classification.",
          "The petitioner contends that the restriction imposed on the fundamental right is not reasonable and fails the proportionality test established in Modern Dental College v. State of MP.",
          "With respect, the state's argument regarding public interest does not justify the infringement of constitutionally protected rights.",
          "We rely on the judgment in Navtej Johar v. Union of India where the Supreme Court emphasized the transformative nature of the Constitution.",
        ],
        defense: [
          "The state maintains that the classification is based on intelligible differentia and has a rational nexus with the object sought to be achieved.",
          "We contend that the restriction on fundamental rights is reasonable and falls within the permissible limits prescribed in the Constitution.",
          "The impugned provision serves a compelling state interest and is the least restrictive means of achieving the legislative objective.",
          "We highlight that the court should exercise judicial restraint in matters of policy as established in numerous constitutional precedents.",
          "We cite the doctrine of presumption of constitutionality which requires the court to interpret legislation in a manner that upholds its validity.",
        ],
      },
      Corporate: {
        prosecution: [
          "The petitioner submits that the actions of the board violated Section 166 of the Companies Act which codifies directors' fiduciary duties.",
          "We draw the court's attention to the clear breach of corporate governance norms as evidenced by the board minutes and financial statements.",
          "The petitioner contends that the minority shareholders' rights have been oppressed under Section 241 of the Companies Act.",
          "With respect, the respondents' business judgment defense fails as their decisions were not made in good faith or in the best interest of the company.",
          "We rely on the judgment in Tata Consultancy Services v. Cyrus Investments where the Supreme Court clarified the scope of oppression and mismanagement.",
        ],
        defense: [
          "The respondents maintain that their actions are protected by the business judgment rule as they were taken in good faith after due deliberation.",
          "We contend that the petitioner has failed to demonstrate any actual prejudice or loss resulting from the alleged violations.",
          "The board's decisions were approved by the requisite majority of shareholders in accordance with the Companies Act and the articles of association.",
          "We highlight that courts should not interfere with commercial decisions of the board unless there is evidence of fraud or bad faith.",
          "We cite the precedent in Miheer H. Mafatlal v. Mafatlal Industries where the Supreme Court established principles for judicial review of corporate actions.",
        ],
      },
      default: {
        prosecution: [
          "The prosecution contends that the evidence clearly establishes all elements of the claim beyond reasonable doubt.",
          "We submit that documentary evidence and testimony support our position on all material points.",
          "The prosecution draws the court's attention to the established facts that demonstrate our case.",
          "With respect, the defense's argument fails to account for the substantial evidence which supports our position.",
          "The prosecution would like to emphasize that similar cases have resulted in favorable judgments for parties in our position.",
        ],
        defense: [
          "The defense maintains that the opposing party has failed to establish their case to the required standard of proof.",
          "We contend that the evidence presented is insufficient and does not conclusively support the claims made.",
          "The defense's position is supported by both the facts and the applicable legal principles in this matter.",
          "We highlight procedural and substantive issues in the opposing party's case that undermine their position.",
          "We cite relevant precedents that support our interpretation of the law as applied to these facts.",
        ],
      },
    };

    // Determine which set of responses to use based on case type
    const caseTypeKey =
      Object.keys(responsesByType).find((key) =>
        caseType.toLowerCase().includes(key.toLowerCase()),
      ) || "default";

    const roleResponses =
      responsesByType[caseTypeKey][opposingRole] ||
      responsesByType.default[opposingRole];

    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
  };

  const generateRandomCitations = (caseType: string = "Criminal") => {
    // Randomly decide whether to include citations
    if (Math.random() > 0.7 || legalReferences.length === 0) return undefined;

    // Additional criminal law citations for more accurate legal references
    const criminalCitations = [
      {
        law: "Indian Penal Code",
        section: "Section 302",
        description:
          "Punishment for murder - Death or imprisonment for life, and fine",
      },
      {
        law: "Indian Penal Code",
        section: "Section 304",
        description:
          "Punishment for culpable homicide not amounting to murder - Imprisonment up to life, or up to 10 years, and fine",
      },
      {
        law: "Indian Penal Code",
        section: "Section 307",
        description: "Attempt to murder - Imprisonment up to 10 years and fine",
      },
      {
        law: "Indian Penal Code",
        section: "Section 376",
        description:
          "Punishment for rape - Rigorous imprisonment from 10 years to life, and fine",
      },
      {
        law: "Indian Evidence Act",
        section: "Section 3",
        description: "Definition of Evidence - Oral and documentary evidence",
      },
      {
        law: "Indian Evidence Act",
        section: "Section 25",
        description:
          "Confession to police officer not to be proved against accused",
      },
      {
        law: "Indian Evidence Act",
        section: "Section 45",
        description: "Opinions of experts - When relevant",
      },
      {
        law: "Indian Evidence Act",
        section: "Section 101",
        description:
          "Burden of proof - Whoever desires any Court to give judgment must prove facts",
      },
      {
        law: "Code of Criminal Procedure",
        section: "Section 164",
        description: "Recording of confessions and statements by Magistrate",
      },
    ];

    // Select 2-3 citations, with preference for appropriate criminal law citations if applicable
    const numCitations = Math.floor(Math.random() * 2) + 2; // 2-3 citations
    const citations = [];

    // If it's a criminal case, include at least one appropriate criminal citation
    if (caseType.toLowerCase().includes("criminal")) {
      // Check message content to determine appropriate citations
      const messageContent = messages
        .map((m) => m.content.toLowerCase())
        .join(" ");

      if (messageContent.includes("murder")) {
        citations.push(criminalCitations[0]); // Section 302 IPC
      } else if (messageContent.includes("culpable homicide")) {
        citations.push(criminalCitations[1]); // Section 304 IPC
      } else if (messageContent.includes("attempt to murder")) {
        citations.push(criminalCitations[2]); // Section 307 IPC
      } else if (messageContent.includes("rape")) {
        citations.push(criminalCitations[3]); // Section 376 IPC
      }

      // Add evidence-related citations if relevant
      if (messageContent.includes("confession")) {
        citations.push(criminalCitations[5]); // Section 25 of Evidence Act
        citations.push(criminalCitations[8]); // Section 164 CrPC
      }
      if (
        messageContent.includes("expert") ||
        messageContent.includes("forensic")
      ) {
        citations.push(criminalCitations[6]); // Section 45 of Evidence Act
      }

      // Always include burden of proof citation for criminal cases
      citations.push(criminalCitations[7]); // Section 101 of Evidence Act
    }

    // Fill remaining citations from legal references
    while (citations.length < numCitations && legalReferences.length > 0) {
      const randomIndex = Math.floor(Math.random() * legalReferences.length);
      const citation = legalReferences[randomIndex];

      // Check if this citation is already included
      if (
        !citations.some(
          (c) => c.section === citation.section && c.law === citation.law,
        )
      ) {
        citations.push(citation);
      }
    }

    return citations;
  };

  const deliverJudgment = () => {
    setJudgmentInProgress(true);

    // Add a deliberation phase before final judgment
    setTimeout(() => {
      // Show deliberation message
      const deliberationMessage: Message = {
        id: "judge-deliberation-" + Date.now().toString(),
        role: "judge",
        content:
          "The Court will now deliberate on all arguments and evidence presented. The AI Judge is reviewing relevant legal precedents, assessing the credibility of evidence, and evaluating the strength of legal arguments from both sides before delivering the final judgment.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, deliberationMessage]);

      // Conduct bias and consistency check
      const biasCheckResult = conductBiasCheck(messages);

      // Generate case-specific judgment based on case type after deliberation
      setTimeout(() => {
        // Analyze the conversation to determine the strength of each side's arguments
        const prosecutionMessages = messages.filter(
          (m) => m.role === "prosecution",
        );
        const defenseMessages = messages.filter((m) => m.role === "defense");

        // Count citations and evidence mentions as a simple heuristic for argument strength
        const prosecutionStrength =
          calculateArgumentStrength(prosecutionMessages);
        const defenseStrength = calculateArgumentStrength(defenseMessages);

        // Determine verdict based on argument strength with some randomness
        // This creates a weighted probability based on argument strength
        const prosecutionProbability =
          prosecutionStrength / (prosecutionStrength + defenseStrength);
        const isGuilty = Math.random() < prosecutionProbability;

        // Generate case-specific judgment content
        let verdict, reasoning, sentencing, postVerdictConsiderations;

        if (caseType.toLowerCase().includes("criminal")) {
          verdict = isGuilty ? "Guilty" : "Not Guilty";

          // Analyze key arguments from both sides for comprehensive judgment reasoning
          const prosecutionKeyPoints =
            getKeyArgumentPoints(prosecutionMessages);
          const defenseKeyPoints = getKeyArgumentPoints(defenseMessages);

          // Check for procedural violations that might affect the case
          const procedureViolations = checkForProceduralViolations(messages);
          const hasProcedureViolations = procedureViolations.length > 0;

          if (isGuilty) {
            // Identify aggravating and mitigating factors for sentencing
            const aggravatingFactors = identifyAggravatingFactors(messages);
            const mitigatingFactors = identifyMitigatingFactors(messages);

            reasoning =
              "**COMPREHENSIVE JUDGMENT ANALYSIS**\n\n" +
              "After meticulous examination of all arguments and evidence presented in this criminal case, the Court finds that the prosecution has established the guilt of the accused beyond reasonable doubt as required under Section 101 of the Indian Evidence Act.\n\n" +
              "**Key Prosecution Arguments:**\n" +
              prosecutionKeyPoints +
              "\n\n" +
              "**Key Defense Arguments:**\n" +
              defenseKeyPoints +
              "\n\n" +
              "**Court's Analysis:**\n" +
              "The evidence presented, particularly regarding " +
              getRandomEvidencePoint() +
              ", is compelling and forms a complete chain of circumstances that points exclusively to the guilt of the accused, satisfying the criteria established in Sharad Birdhichand Sarda v. State of Maharashtra (1984). The Court has carefully considered the defense's arguments regarding " +
              getRandomDefenseArgument() +
              " but finds them insufficient to create reasonable doubt when evaluated against the totality of evidence." +
              (hasProcedureViolations
                ? "\n\nThe Court notes the following procedural concerns raised during the proceedings: " +
                  procedureViolations +
                  ". However, these issues do not materially impact the reliability of the core evidence establishing guilt."
                : "") +
              "\n\nThe prosecution has successfully established both actus reus (criminal act) and mens rea (criminal intent) required for the offense.";

            // Appropriate sentencing based on the specific criminal case context with consideration of aggravating/mitigating factors
            const messageContent = messages
              .map((m) => m.content.toLowerCase())
              .join(" ");

            // Murder case sentencing
            if (
              messageContent.includes("murder") ||
              messageContent.includes("section 302")
            ) {
              // Consider death penalty for premeditated murder with aggravating factors
              if (
                aggravatingFactors.includes("premeditation") &&
                aggravatingFactors.length > 2 &&
                mitigatingFactors.length === 0
              ) {
                sentencing =
                  "After considering both aggravating factors (" +
                  aggravatingFactors.join(", ") +
                  ") and the absence of significant mitigating circumstances, the Court finds this case falls within the 'rarest of rare' category. The accused is sentenced to death under Section 302 of the IPC, following the principles established in Bachan Singh v. State of Punjab (1980) and Machhi Singh v. State of Punjab (1983).";
              }
              // Life imprisonment for murder with some mitigating factors
              else if (mitigatingFactors.length > 0) {
                sentencing =
                  "The accused is sentenced to imprisonment for life and a fine of ₹75,000 under Section 302 of the IPC. While the Court acknowledges the aggravating factors (" +
                  aggravatingFactors.join(", ") +
                  "), it has also considered mitigating circumstances (" +
                  mitigatingFactors.join(", ") +
                  ") as outlined in Santosh Kumar Bariyar v. State of Maharashtra (2009).";
              }
              // Standard life imprisonment for murder
              else {
                sentencing =
                  "The accused is sentenced to imprisonment for life and a fine of ₹100,000 under Section 302 of the IPC. The Court has considered the heinous nature of the crime and the principles established in Bachan Singh v. State of Punjab (1980) regarding sentencing in murder cases.";
              }
            }
            // Culpable homicide sentencing
            else if (
              messageContent.includes("culpable homicide") ||
              messageContent.includes("section 304")
            ) {
              sentencing =
                "The accused is sentenced to imprisonment for 10 years and a fine of ₹50,000 under Section 304 of the IPC (Culpable homicide not amounting to murder). The Court has considered that while the accused caused death, the circumstances fall short of murder as defined under Section 300 IPC.";
            }
            // Rape sentencing
            else if (
              messageContent.includes("rape") ||
              messageContent.includes("section 376")
            ) {
              sentencing =
                "The accused is sentenced to rigorous imprisonment for 20 years and a fine of ₹200,000 under Section 376 of the IPC (Punishment for Rape), with the fine amount to be paid as compensation to the victim as per Section 357 CrPC. The Court has considered the trauma inflicted on the victim and the need for deterrence as outlined in Mukesh & Anr. v. State (NCT of Delhi) (2017).";
            }
            // Default criminal sentencing
            else {
              sentencing =
                "The accused is sentenced to rigorous imprisonment for 7 years and a fine of ₹50,000 under the applicable sections of the IPC. The Court has balanced the gravity of the offense with proportionate punishment.";
            }

            // Add post-verdict considerations
            postVerdictConsiderations =
              "The accused has the right to appeal this conviction and sentence before the High Court within 90 days as per Section 374 of the CrPC. If new evidence emerges that was not available during trial, a review petition may be considered under appropriate provisions.";
          } else {
            reasoning =
              "**COMPREHENSIVE JUDGMENT ANALYSIS**\n\n" +
              "After thorough examination of all arguments and evidence presented in this criminal case, the Court finds that the prosecution has failed to establish the guilt of the accused beyond reasonable doubt as required by Section 101 of the Indian Evidence Act and affirmed in K. Venkateshwarlu v. State of Andhra Pradesh (2012).\n\n" +
              "**Key Prosecution Arguments:**\n" +
              prosecutionKeyPoints +
              "\n\n" +
              "**Key Defense Arguments:**\n" +
              defenseKeyPoints +
              "\n\n" +
              "**Court's Analysis:**\n" +
              "The defense has successfully raised significant doubts regarding " +
              getRandomDefenseArgument() +
              ", which the prosecution has failed to address adequately. Furthermore, the prosecution's evidence concerning " +
              getRandomEvidencePoint() +
              " was found to be insufficient, inconclusive, or inadmissible under the relevant provisions of the Indian Evidence Act." +
              (hasProcedureViolations
                ? "\n\nThe Court notes with concern the following procedural violations: " +
                  procedureViolations +
                  ". These irregularities have significantly impacted the admissibility and reliability of key prosecution evidence."
                : "") +
              "\n\nThe Court is guided by the cardinal principle of criminal jurisprudence that the benefit of doubt must go to the accused, as established in Kali Ram v. State of Himachal Pradesh (1973). The prosecution bears the burden of proving every ingredient of the offense beyond reasonable doubt, and in this case, that burden has not been discharged.";

            sentencing = null;

            // Add post-verdict considerations
            postVerdictConsiderations =
              "The prosecution has the right to appeal this acquittal before the High Court within the statutory period as per Section 378 of the CrPC. The accused is entitled to be released forthwith if not required in any other case.";
          }
        } else if (caseType.toLowerCase().includes("civil")) {
          verdict = isGuilty ? "Claim Upheld" : "Claim Dismissed";

          if (isGuilty) {
            reasoning =
              "After evaluating the evidence and arguments presented in this civil matter, the Court finds in favor of the plaintiff. The plaintiff has successfully established their claim on a preponderance of probabilities. The documentary evidence regarding " +
              getRandomEvidencePoint() +
              " clearly supports the plaintiff's position, and the defendant's arguments concerning " +
              getRandomDefenseArgument() +
              " were not sufficiently substantiated.";
            sentencing =
              "The defendant is directed to pay damages of ₹5,00,000 to the plaintiff along with interest at 6% per annum from the date of filing till realization.";
          } else {
            reasoning =
              "After evaluating the evidence and arguments presented in this civil matter, the Court finds in favor of the defendant. The plaintiff has failed to establish their claim on a preponderance of probabilities. The defendant's arguments regarding " +
              getRandomDefenseArgument() +
              " were found to be legally sound, and the plaintiff's evidence concerning " +
              getRandomEvidencePoint() +
              " was insufficient to support their claim.";
            sentencing = null;
          }
        } else if (caseType.toLowerCase().includes("property")) {
          verdict = isGuilty ? "Title Confirmed" : "Claim Rejected";

          if (isGuilty) {
            reasoning =
              "After examining the documentary evidence and arguments presented in this property dispute, the Court confirms the plaintiff's title to the property in question. The sale deed, revenue records, and other documents clearly establish the plaintiff's ownership rights. The defendant's claim of " +
              getRandomDefenseArgument() +
              " was not supported by sufficient evidence or legal basis.";
            sentencing =
              "The defendant is directed to vacate the property within 30 days and pay mesne profits at the rate of ₹10,000 per month for the period of unauthorized occupation.";
          } else {
            reasoning =
              "After examining the documentary evidence and arguments presented in this property dispute, the Court rejects the plaintiff's claim to the property in question. The defendant has successfully established " +
              getRandomDefenseArgument() +
              ", which defeats the plaintiff's claim. The plaintiff's reliance on " +
              getRandomEvidencePoint() +
              " was found to be legally insufficient to establish title.";
            sentencing = null;
          }
        } else if (caseType.toLowerCase().includes("family")) {
          verdict = isGuilty ? "Petition Granted" : "Petition Dismissed";

          if (isGuilty) {
            reasoning =
              "After considering the evidence and arguments presented in this family matter, the Court grants the petitioner's prayer. The petitioner has successfully established grounds under the relevant family law statutes. The evidence regarding " +
              getRandomEvidencePoint() +
              " was found to be credible and sufficient, while the respondent's contentions about " +
              getRandomDefenseArgument() +
              " were not adequately substantiated.";
            sentencing =
              "The marriage between the parties is hereby dissolved. The petitioner is granted custody of the minor children with visitation rights to the respondent. The respondent shall pay maintenance of ₹25,000 per month.";
          } else {
            reasoning =
              "After considering the evidence and arguments presented in this family matter, the Court dismisses the petitioner's prayer. The petitioner has failed to establish sufficient grounds under the relevant family law statutes. The respondent's arguments regarding " +
              getRandomDefenseArgument() +
              " were found to be credible, and the petitioner's evidence concerning " +
              getRandomEvidencePoint() +
              " was insufficient or inconsistent.";
            sentencing = null;
          }
        } else if (caseType.toLowerCase().includes("constitutional")) {
          verdict = isGuilty
            ? "Provision Unconstitutional"
            : "Provision Constitutional";

          if (isGuilty) {
            reasoning =
              "After a thorough analysis of the constitutional questions raised in this matter, the Court finds that the impugned provision violates the fundamental rights guaranteed under the Constitution of India. The petitioner has successfully demonstrated that the provision fails the test of reasonable classification under Article 14 and imposes unreasonable restrictions on fundamental rights. The state's justification regarding " +
              getRandomDefenseArgument() +
              " does not satisfy the proportionality standard established by the Supreme Court.";
            sentencing =
              "The impugned provision is hereby declared unconstitutional and struck down. The state is directed to frame new guidelines in accordance with constitutional principles within 6 months.";
          } else {
            reasoning =
              "After a thorough analysis of the constitutional questions raised in this matter, the Court finds that the impugned provision does not violate the fundamental rights guaranteed under the Constitution of India. The state has successfully demonstrated that the provision creates a reasonable classification with a rational nexus to the object sought to be achieved. The petitioner's arguments regarding " +
              getRandomEvidencePoint() +
              " do not establish any violation of constitutional principles.";
            sentencing = null;
          }
        } else if (caseType.toLowerCase().includes("corporate")) {
          verdict = isGuilty ? "Petition Allowed" : "Petition Dismissed";

          if (isGuilty) {
            reasoning =
              "After examining the corporate governance issues raised in this matter, the Court finds in favor of the petitioner. The evidence clearly establishes violations of the Companies Act provisions regarding directors' duties and shareholder rights. The respondents' actions concerning " +
              getRandomEvidencePoint() +
              " constitute oppression and mismanagement, and their business judgment defense regarding " +
              getRandomDefenseArgument() +
              " is not sustainable in light of the evidence presented.";
            sentencing =
              "The respondents are directed to buy out the petitioner's shares at fair market value as determined by an independent valuer. The respondents shall also pay costs of ₹5,00,000 to the petitioner.";
          } else {
            reasoning =
              "After examining the corporate governance issues raised in this matter, the Court finds in favor of the respondents. The petitioner has failed to establish any violation of the Companies Act provisions or oppression and mismanagement. The respondents' business judgment regarding " +
              getRandomDefenseArgument() +
              " appears to have been exercised in good faith and in the best interest of the company. The petitioner's allegations concerning " +
              getRandomEvidencePoint() +
              " were not substantiated by sufficient evidence.";
            sentencing = null;
          }
        } else {
          // Default judgment for other case types
          verdict = isGuilty
            ? "In Favor of Plaintiff"
            : "In Favor of Defendant";
          reasoning =
            "After careful consideration of all arguments and evidence presented by both sides, and applying the relevant legal principles and precedents, the court has reached its decision. The " +
            (isGuilty ? "plaintiff's" : "defendant's") +
            " arguments were found to be more compelling and legally sound.";
          sentencing = isGuilty
            ? "The defendant is directed to comply with the plaintiff's demands and pay the costs of the proceedings."
            : null;
        }

        const judgmentResult = {
          verdict: verdict,
          reasoning: reasoning,
          applicableLaws: legalReferences.slice(0, 3),
          sentencing: sentencing,
          postVerdictConsiderations:
            postVerdictConsiderations ||
            "The court recommends that both parties consider the option of appeal if they find this judgment unsatisfactory.",
        };

        setJudgment(judgmentResult);
        setIsCaseActive(false);
        setJudgmentInProgress(false);

        // Add judgment to messages
        const judgmentMessage: Message = {
          id: "judgment-" + Date.now().toString(),
          role: "judge",
          content:
            "**JUDGMENT**\n\n" +
            judgmentResult.reasoning +
            "\n\nVerdict: " +
            judgmentResult.verdict +
            "\n\n" +
            (judgmentResult.sentencing
              ? "Sentencing: " + judgmentResult.sentencing + "\n\n"
              : "") +
            "**Post-Verdict Considerations:**\n" +
            judgmentResult.postVerdictConsiderations,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, judgmentMessage]);
      }, 5000);
    }, 3000);
  };

  // Helper function to calculate argument strength based on message content with adaptive weighting
  const calculateArgumentStrength = (messages: Message[]) => {
    let strength = 1; // Base strength

    for (const message of messages) {
      // Count citations
      if (message.citations && message.citations.length > 0) {
        strength += message.citations.length * 2.5; // Increased weight for citations
      }

      // Adaptive evidence weighting - prioritize scientific and direct evidence
      const directEvidenceTerms = [
        "forensic",
        "DNA",
        "fingerprint",
        "ballistic",
        "medical report",
        "expert opinion",
        "CCTV",
        "video",
        "recording",
        "photograph",
        "eyewitness",
      ];

      const circumstantialEvidenceTerms = [
        "circumstantial",
        "inference",
        "suggest",
        "indicate",
        "possibility",
        "likely",
        "probable",
      ];

      const generalEvidenceTerms = [
        "evidence",
        "exhibit",
        "witness",
        "testimony",
        "document",
        "proof",
        "record",
        "confession",
        "statement",
      ];

      // Higher weight for direct/scientific evidence
      for (const term of directEvidenceTerms) {
        const regex = new RegExp(term, "gi");
        const matches = message.content.match(regex) || [];
        strength += matches.length * 2.5; // Higher weight for scientific evidence
      }

      // Lower weight for circumstantial evidence
      for (const term of circumstantialEvidenceTerms) {
        const regex = new RegExp(term, "gi");
        const matches = message.content.match(regex) || [];
        strength += matches.length * 0.8; // Lower weight for circumstantial evidence
      }

      // Standard weight for general evidence terms
      for (const term of generalEvidenceTerms) {
        const regex = new RegExp(term, "gi");
        const matches = message.content.match(regex) || [];
        strength += matches.length * 1.2;
      }

      // Count legal term mentions
      const legalTerms = [
        "section",
        "article",
        "act",
        "statute",
        "precedent",
        "judgment",
        "supreme court",
        "beyond reasonable doubt",
        "mens rea",
        "actus reus",
        "burden of proof",
        "admissibility",
        "direct evidence",
        "hearsay",
        "cross-examination",
        "presumption of innocence",
        "criminal intent",
        "motive",
        "alibi",
      ];
      for (const term of legalTerms) {
        const regex = new RegExp(term, "gi");
        const matches = message.content.match(regex) || [];
        strength += matches.length * 1.5;
      }

      // Count specific IPC sections with higher weight for correct application
      const ipcSectionRegex =
        /section\s+(\d+[A-Za-z]*)\s+(?:of\s+)?(?:the\s+)?IPC/gi;
      const ipcMatches = message.content.match(ipcSectionRegex) || [];

      // Check for correct application of IPC sections
      const content = message.content.toLowerCase();
      if (
        content.includes("murder") &&
        ipcMatches.some((match) => match.includes("302"))
      ) {
        strength += 5; // Correct application of Section 302 for murder
      }
      if (
        content.includes("culpable homicide") &&
        ipcMatches.some((match) => match.includes("304"))
      ) {
        strength += 4; // Correct application of Section 304
      }
      if (
        content.includes("rape") &&
        ipcMatches.some((match) => match.includes("376"))
      ) {
        strength += 5; // Correct application of Section 376 for rape
      }
      if (
        content.includes("theft") &&
        ipcMatches.some((match) => match.includes("378"))
      ) {
        strength += 3; // Correct application of Section 378 for theft
      }

      // Penalize incorrect application of IPC sections
      if (
        content.includes("murder") &&
        ipcMatches.some((match) => match.includes("420"))
      ) {
        strength -= 5; // Incorrect application of fraud section for murder
      }
      if (
        content.includes("rape") &&
        ipcMatches.some((match) => match.includes("302"))
      ) {
        strength -= 3; // Incorrect application of murder section for rape
      }

      // Count attachments with higher weight for relevant types
      if (message.attachments && message.attachments.length > 0) {
        message.attachments.forEach((attachment) => {
          const fileName = attachment.name.toLowerCase();
          // Higher weight for forensic reports and expert evidence
          if (
            fileName.includes("forensic") ||
            fileName.includes("expert") ||
            fileName.includes("report")
          ) {
            strength += 5;
          }
          // Higher weight for visual evidence
          else if (
            fileName.includes("photo") ||
            fileName.includes("video") ||
            attachment.type.startsWith("image/")
          ) {
            strength += 4;
          }
          // Standard weight for other attachments
          else {
            strength += 3;
          }
        });
      }

      // Expanded legal precedent integration - bonus for citing relevant case law
      const recentCaseLawTerms = [
        "Mukesh & Anr. v. State (NCT of Delhi) (2017)", // Delhi gang rape case
        "K.S. Puttaswamy v. Union of India (2017)", // Privacy judgment
        "Navtej Singh Johar v. Union of India (2018)", // Section 377 case
        "Joseph Shine v. Union of India (2018)", // Adultery case
        "Indian Young Lawyers Association v. State of Kerala (2018)", // Sabarimala case
        "Tehseen Poonawalla v. Union of India (2018)", // Lynching case
      ];

      const classicCaseLawTerms = [
        "Bachan Singh v. State of Punjab (1980)",
        "Machhi Singh v. State of Punjab (1983)",
        "Sharad Birdhichand Sarda v. State of Maharashtra (1984)",
        "Kali Ram v. State of Himachal Pradesh (1973)",
        "Tomaso Bruno v. State of U.P. (2015)",
        "K. Venkateshwarlu v. State of Andhra Pradesh (2012)",
        "Surendra Mishra v. State of Jharkhand (2011)",
        "D.K. Basu v. State of West Bengal (1997)",
      ];

      // Higher weight for recent precedents
      for (const term of recentCaseLawTerms) {
        const regex = new RegExp(term, "gi");
        const matches = message.content.match(regex) || [];
        strength += matches.length * 5; // Higher weight for recent case law
      }

      // Standard weight for classic precedents
      for (const term of classicCaseLawTerms) {
        const regex = new RegExp(term, "gi");
        const matches = message.content.match(regex) || [];
        strength += matches.length * 4; // Standard weight for classic case law
      }

      // Adjust burden of proof based on case type and arguments
      if (
        content.includes("beyond reasonable doubt") &&
        content.includes("criminal")
      ) {
        strength += 3; // Correctly applying criminal burden of proof
      }
      if (content.includes("preponderance") && content.includes("civil")) {
        strength += 3; // Correctly applying civil burden of proof
      }
    }

    return strength;
  };

  // Check if the argument needs clarification due to conflicting precedents or weak reasoning
  const checkForClarificationNeeded = (
    userMessage: Message,
    allMessages: Message[],
  ) => {
    const content = userMessage.content.toLowerCase();

    // Check for conflicting precedents
    if (
      content.includes("precedent") ||
      content.includes("judgment") ||
      content.includes("supreme court")
    ) {
      // Look for potentially conflicting precedents
      const precedentMatches =
        content.match(/([A-Za-z]+\s+v\.\s+[A-Za-z\s.]+)/gi) || [];

      if (precedentMatches.length > 0) {
        // Check if there are conflicting precedents in the conversation
        const opposingMessages = allMessages.filter(
          (m) => m.role !== userMessage.role,
        );
        const opposingContent = opposingMessages
          .map((m) => m.content.toLowerCase())
          .join(" ");

        for (const precedent of precedentMatches) {
          if (opposingContent.includes(precedent.toLowerCase())) {
            return `The Court notes that both sides have cited the precedent of ${precedent}. However, there appears to be a disagreement about its interpretation or applicability to this case. Could the ${userMessage.role} please clarify how this precedent specifically supports your position, and address the opposing party's interpretation?`;
          }
        }
      }
    }

    // Check for weak legal reasoning
    if (
      content.includes("therefore") ||
      content.includes("thus") ||
      content.includes("hence") ||
      content.includes("conclude")
    ) {
      // Check if the conclusion is supported by specific legal provisions
      if (
        !content.includes("section") &&
        !content.includes("article") &&
        !content.includes("act")
      ) {
        return `The Court appreciates the ${userMessage.role}'s argument, but notes that your conclusion lacks specific reference to the relevant legal provisions. Could you please cite the specific sections of law that support your reasoning?`;
      }
    }

    // Check for vague evidence claims
    if (content.includes("evidence") || content.includes("proof")) {
      if (
        !content.includes("witness") &&
        !content.includes("document") &&
        !content.includes("exhibit") &&
        !content.includes("forensic")
      ) {
        return `The ${userMessage.role} has made reference to evidence, but the Court requires more specificity. Please elaborate on the nature of this evidence, its source, and how it was collected and preserved.`;
      }
    }

    // No clarification needed
    return null;
  };

  // Helper functions for comprehensive judgment analysis
  const getKeyArgumentPoints = (messages: Message[]) => {
    if (messages.length === 0) return "No significant arguments presented.";

    // Extract key points from messages
    let points = "";
    const keyMessages = messages.slice(-3); // Get the most recent messages

    keyMessages.forEach((message, index) => {
      // Extract a sentence or two from each message
      const content = message.content;
      const sentences = content
        .split(/\.\s+/)
        .filter((s) => s.length > 20)
        .slice(0, 2);
      if (sentences.length > 0) {
        points += "- " + sentences.join(". ") + ".\n";
      }
    });

    return points || "No substantive arguments identified.";
  };

  const checkForProceduralViolations = (messages: Message[]) => {
    const violations = [];
    const content = messages.map((m) => m.content.toLowerCase()).join(" ");

    // Check for common procedural violations
    if (
      content.includes("confession") &&
      content.includes("police") &&
      content.includes("section 25")
    ) {
      violations.push(
        "Potential inadmissibility of confession under Section 25 of the Indian Evidence Act",
      );
    }

    if (
      content.includes("chain of custody") ||
      (content.includes("evidence") && content.includes("tamper"))
    ) {
      violations.push(
        "Concerns regarding chain of custody of physical evidence",
      );
    }

    if (
      content.includes("electronic") &&
      content.includes("section 65b") &&
      (content.includes("certificate") || content.includes("authentication"))
    ) {
      violations.push(
        "Issues with electronic evidence certification under Section 65B of the Indian Evidence Act",
      );
    }

    if (
      content.includes("arrest") &&
      content.includes("procedure") &&
      content.includes("d.k. basu")
    ) {
      violations.push(
        "Potential violations of arrest procedures as per D.K. Basu guidelines",
      );
    }

    return violations;
  };

  const identifyAggravatingFactors = (messages: Message[]) => {
    const factors = [];
    const content = messages.map((m) => m.content.toLowerCase()).join(" ");

    // Check for common aggravating factors
    if (
      content.includes("premeditated") ||
      content.includes("planned") ||
      content.includes("premeditation")
    ) {
      factors.push("premeditation");
    }

    if (
      content.includes("cruel") ||
      content.includes("brutal") ||
      content.includes("heinous")
    ) {
      factors.push("brutality of the crime");
    }

    if (
      content.includes("prior conviction") ||
      content.includes("criminal history") ||
      content.includes("previous offense")
    ) {
      factors.push("prior criminal record");
    }

    if (
      content.includes("vulnerable victim") ||
      content.includes("child victim") ||
      content.includes("elderly victim")
    ) {
      factors.push("vulnerability of the victim");
    }

    if (
      content.includes("position of trust") ||
      content.includes("authority") ||
      content.includes("power")
    ) {
      factors.push("abuse of position of trust");
    }

    return factors.length > 0
      ? factors
      : ["nature and circumstances of the offense"];
  };

  const identifyMitigatingFactors = (messages: Message[]) => {
    const factors = [];
    const content = messages.map((m) => m.content.toLowerCase()).join(" ");

    // Check for common mitigating factors
    if (
      content.includes("no prior") ||
      content.includes("clean record") ||
      content.includes("first offense")
    ) {
      factors.push("no prior criminal record");
    }

    if (
      content.includes("provocation") ||
      content.includes("heat of passion") ||
      content.includes("sudden quarrel")
    ) {
      factors.push("provocation");
    }

    if (
      content.includes("mental illness") ||
      content.includes("psychiatric") ||
      content.includes("psychological")
    ) {
      factors.push("mental health issues");
    }

    if (
      content.includes("young") ||
      content.includes("juvenile") ||
      content.includes("immature")
    ) {
      factors.push("young age of the accused");
    }

    if (
      content.includes("remorse") ||
      content.includes("regret") ||
      content.includes("apologized")
    ) {
      factors.push("genuine remorse");
    }

    return factors;
  };

  // Conduct bias and consistency check for the judgment
  const conductBiasCheck = (messages: Message[]) => {
    // Extract case details for consistency check
    const caseDetails = {
      type: caseType.toLowerCase(),
      evidenceStrength: 0,
      procedureViolations: checkForProceduralViolations(messages),
      aggravatingFactors: identifyAggravatingFactors(messages),
      mitigatingFactors: identifyMitigatingFactors(messages),
    };

    // Check for potential bias in similar case types
    const similarCaseTypes = {
      murder: ["homicide", "killing", "section 302"],
      rape: ["sexual assault", "section 376"],
      theft: ["robbery", "burglary", "section 378", "section 392"],
    };

    // Determine case category for consistency check
    let caseCategory = "other";
    for (const [category, keywords] of Object.entries(similarCaseTypes)) {
      if (keywords.some((keyword) => caseDetails.type.includes(keyword))) {
        caseCategory = category;
        break;
      }
    }

    // In a real implementation, this would check against a database of previous judgments
    // For now, we'll just return a placeholder result
    return {
      biasDetected: false,
      consistencyScore: 0.95, // High consistency score
      caseCategory: caseCategory,
    };
  };

  // Helper functions to generate random evidence and defense points for judgment text
  const getRandomEvidencePoint = () => {
    const evidencePoints = [
      "the documentary evidence which has been properly authenticated as per Section 65B of the Indian Evidence Act",
      "the consistent and credible witness testimonies which have withstood rigorous cross-examination",
      "the forensic analysis conducted by qualified experts in accordance with Section 45 of the Indian Evidence Act",
      "the expert opinions which satisfy the requirements of scientific validity and reliability",
      "the circumstantial evidence which forms a complete chain without gaps as required by the Supreme Court in Sharad Birdhichand Sarda v. State of Maharashtra",
      "the financial records which have been verified and authenticated by competent authorities",
      "the surveillance footage which has been properly preserved and authenticated in accordance with Section 65B of the Indian Evidence Act",
      "the authenticated communications which have been recovered and verified following proper legal procedures",
      "the medical reports prepared by qualified medical professionals in accordance with Section 45 of the Indian Evidence Act",
      "the official records maintained by public servants in the discharge of their official duties as per Section 35 of the Indian Evidence Act",
      "the DNA evidence which has been collected, preserved, and analyzed following scientific protocols and legal procedures",
      "the ballistic reports which establish a conclusive link between the recovered weapon and the crime",
    ];
    return evidencePoints[Math.floor(Math.random() * evidencePoints.length)];
  };

  const getRandomDefenseArgument = () => {
    const defenseArguments = [
      "procedural irregularities in the investigation which violate the guidelines established in D.K. Basu v. State of West Bengal",
      "lack of mens rea (criminal intent) which is an essential element for the offense as established in Babu v. State of Kerala",
      "absence of direct evidence linking the accused to the crime, with the circumstantial evidence being insufficient to form a complete chain",
      "alternative explanations for the evidence which create reasonable doubt as to the accused's guilt",
      "witness credibility issues including contradictions and improvements in testimony as highlighted in Vadivelu Thevar v. State of Madras",
      "chain of custody concerns regarding key evidence which raise doubts about its integrity and reliability",
      "statutory interpretation of the relevant provisions which do not support the prosecution's case",
      "jurisdictional challenges which affect the validity of the proceedings",
      "constitutional protections under Articles 20 and 21 which have been violated during the investigation",
      "precedential inconsistencies with established Supreme Court judgments on similar factual matrices",
      "inadmissibility of the confession under Section 25 of the Indian Evidence Act as it was made to a police officer",
      "violation of the accused's right against self-incrimination protected under Article 20(3) of the Constitution",
      "failure to conduct proper identification proceedings as required by the Supreme Court in Sidhartha Vashisht v. State (NCT of Delhi)",
    ];
    return defenseArguments[
      Math.floor(Math.random() * defenseArguments.length)
    ];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const switchRole = () => {
    setUserRole(userRole === "prosecution" ? "defense" : "prosecution");
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-full bg-gray-50 flex flex-col rounded-lg overflow-hidden">
      {/* Courtroom Header */}
      <div className="bg-navy-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Gavel className="h-6 w-6 text-gold-500 mr-2" />
          <div>
            <h2 className="text-xl font-serif font-bold">{caseTitle}</h2>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className="border-gold-500 text-gold-400 mr-2"
              >
                {caseType}
              </Badge>
              <Badge
                variant="outline"
                className="border-green-500 text-green-400"
              >
                {isCaseActive ? "In Progress" : "Judgment Delivered"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gold-500 text-gold-500 hover:bg-navy-700"
            onClick={switchRole}
            disabled={!isCaseActive}
          >
            Switch to {userRole === "prosecution" ? "Defense" : "Prosecution"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-navy-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Courtroom Area */}
      <div className="flex flex-col md:flex-row">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col">
                  <div
                    className={
                      "flex " +
                      (message.role === userRole
                        ? "justify-end"
                        : "justify-start")
                    }
                  >
                    <div
                      className={
                        "max-w-[80%] rounded-lg p-4 " +
                        (message.role === "judge"
                          ? "bg-navy-700 text-white border-l-4 border-gold-500"
                          : message.role === userRole
                            ? "bg-blue-100 text-navy-800"
                            : "bg-gray-200 text-navy-800")
                      }
                    >
                      <div className="flex items-center mb-2">
                        {message.role === "judge" ? (
                          <>
                            <Gavel className="h-4 w-4 text-gold-500 mr-2" />
                            <span className="font-serif font-bold text-gold-500">
                              AI Judge
                            </span>
                          </>
                        ) : message.role === "prosecution" ? (
                          <>
                            <Shield className="h-4 w-4 text-red-500 mr-2" />
                            <span className="font-medium text-red-700">
                              {message.role === userRole
                                ? "You (Prosecution)"
                                : "Prosecution"}
                            </span>
                          </>
                        ) : (
                          <>
                            <User className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="font-medium text-blue-700">
                              {message.role === userRole
                                ? "You (Defense)"
                                : "Defense"}
                            </span>
                          </>
                        )}
                        <span className="ml-auto text-xs text-gray-500">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>

                      {/* Attachments */}
                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-300">
                            <p className="text-xs font-medium mb-1">
                              Attachments:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {message.attachments.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs"
                                >
                                  <FileUp className="h-3 w-3 text-navy-600 mr-1" />
                                  <span className="truncate max-w-[150px]">
                                    {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    className="ml-1 text-navy-500 hover:text-navy-700"
                                    onClick={() =>
                                      window.open(file.content, "_blank")
                                    }
                                  >
                                    <Download className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Citations */}
                      {message.citations && message.citations.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-300">
                          <p className="text-xs font-medium mb-1">
                            Legal Citations:
                          </p>
                          <div className="space-y-1">
                            {message.citations.map((citation, index) => (
                              <div key={index} className="flex items-start">
                                <Badge className="bg-navy-100 text-navy-800 mr-2">
                                  {citation.section}
                                </Badge>
                                <span className="text-xs">
                                  {citation.law}: {citation.description}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-navy-800 rounded-lg p-4 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          {isCaseActive ? (
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                {/* Attachments display */}
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-md mb-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white px-2 py-1 rounded border border-gray-200"
                      >
                        <FileText className="h-3 w-3 text-navy-600 mr-1" />
                        <span className="text-xs truncate max-w-[120px]">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="ml-1 text-gray-500 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-end space-x-2">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Type your argument as ${userRole}...`}
                    className="flex-1 min-h-[80px] border-gray-300 focus:border-navy-500 focus:ring-navy-500"
                  />
                  <div className="flex flex-col space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAttachFile}
                      className="h-10 w-10 border-gray-300 text-gray-500 hover:text-navy-700"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-navy-700 hover:bg-navy-800 text-white h-10 w-10"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                />
              </div>
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <p>Press Enter to send. Use Shift+Enter for a new line.</p>
                <p>Attach files for the judge to analyze</p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white border-t border-gray-200 text-center">
              <p className="text-gray-500">
                This case has concluded. The judgment has been delivered.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-200 bg-white">
          <Tabs defaultValue="case" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="case">Case Info</TabsTrigger>
              <TabsTrigger value="legal">Legal References</TabsTrigger>
            </TabsList>
            <TabsContent value="case" className="p-4">
              <div className="flex flex-col items-center mb-6">
                <div className="mb-4">
                  <JudgeAvatar size="sm" />
                </div>
                <h3 className="text-lg font-serif font-bold text-navy-800 mb-1">
                  Virtual Courtroom
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Present your arguments and receive a judgment based on Indian
                  law
                </p>
              </div>

              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Your Role
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge
                    className={
                      userRole === "prosecution"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {userRole === "prosecution" ? "Prosecution" : "Defense"}
                  </Badge>
                  <p className="mt-2 text-xs text-gray-600">
                    {userRole === "prosecution"
                      ? "Present arguments against the accused, citing relevant laws and evidence."
                      : "Defend the accused by challenging evidence and presenting legal justifications."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Case Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Case ID</p>
                    <p className="text-sm">{caseId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm">{caseType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge
                      variant="outline"
                      className={
                        isCaseActive
                          ? "border-green-500 text-green-700"
                          : "border-navy-500 text-navy-700"
                      }
                    >
                      {isCaseActive ? "Active" : "Concluded"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {judgment && (
                <Card className="mt-4 border-gold-200 bg-gold-50">
                  <CardHeader className="pb-2 bg-gold-100">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Gavel className="h-4 w-4 mr-2 text-navy-700" />
                      Judgment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-4">
                    <div>
                      <p className="text-xs text-gray-500">Verdict</p>
                      <Badge
                        className={
                          judgment.verdict === "Guilty"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {judgment.verdict}
                      </Badge>
                    </div>
                    {judgment.sentencing && (
                      <div>
                        <p className="text-xs text-gray-500">Sentencing</p>
                        <p className="text-sm">{judgment.sentencing}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent
              value="legal"
              className="p-4 max-h-[500px] overflow-y-auto"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Scale className="h-4 w-4 mr-2 text-navy-700" />
                    Relevant Legal Provisions
                  </h3>
                  <div className="space-y-3">
                    {legalReferences.map((reference, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-md border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <Badge className="bg-navy-100 text-navy-800">
                            {reference.section}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {reference.law}
                          </span>
                        </div>
                        <p className="mt-2 text-sm">{reference.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-navy-700" />
                    Legal Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-navy-100 text-navy-800 text-xs mr-2 flex-shrink-0">
                        1
                      </span>
                      <span>
                        Cite specific sections of relevant laws to strengthen
                        your arguments.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-navy-100 text-navy-800 text-xs mr-2 flex-shrink-0">
                        2
                      </span>
                      <span>
                        Address counter-arguments directly to build a stronger
                        case.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-navy-100 text-navy-800 text-xs mr-2 flex-shrink-0">
                        3
                      </span>
                      <span>
                        Reference relevant precedents from similar cases.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-navy-100 text-navy-800 text-xs mr-2 flex-shrink-0">
                        4
                      </span>
                      <span>
                        Focus on facts and evidence rather than emotional
                        appeals.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Judgment in Progress Overlay */}
      {judgmentInProgress && (
        <div className="absolute inset-0 bg-navy-900/80 flex flex-col items-center justify-center z-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Scale className="h-16 w-16 text-gold-500" />
          </motion.div>
          <h3 className="text-xl font-serif font-bold text-white mb-2">
            Deliberating Judgment
          </h3>
          <p className="text-gold-300">
            The AI Judge is analyzing all arguments and applicable laws...
          </p>
        </div>
      )}
    </div>
  );
};

export default VirtualCourtroom;
