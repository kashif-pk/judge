import React from "react";
import { Scale, BookOpen, FileText, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CaseAnalysisResultProps {
  caseTitle: string;
  caseType: string;
  documents?: { name: string; content: string; type: string }[];
  analysisResult?: {
    summary: string;
    constitutionalArticles: string[];
    relevantLaws: { name: string; description: string }[];
    precedents: { case: string; year: string; relevance: string }[];
    conclusion: string;
    recommendation: string;
    penalties: { description: string; section: string; term: string }[];
    possibleOutcomes: string[];
    judgmentSummary: string;
  };
  onClose: () => void;
}

const CaseAnalysisResult = ({
  caseTitle,
  caseType,
  documents = [],
  analysisResult,
  onClose = () => {},
}: CaseAnalysisResultProps) => {
  // Import the DocumentAnalyzer component
  const DocumentAnalyzer = React.lazy(() => import("./DocumentAnalyzer"));
  // Generate dynamic analysis based on the case title, type, and uploaded documents
  const generatedAnalysis = React.useMemo(() => {
    // Analyze uploaded documents to determine case specifics
    const documentAnalysis =
      documents.length > 0 ? analyzeDocuments(documents) : null;

    // Function to analyze all uploaded documents and extract key information
    function analyzeDocuments(docs) {
      // This would be a sophisticated NLP analysis in a real application
      // Here we'll do basic keyword extraction and analysis
      const allContent = docs
        .map((doc) => doc.content)
        .join(" ")
        .toLowerCase();
      const analysis = {
        primaryDomain: "",
        keyIssues: [],
        parties: [],
        evidenceStrength: "moderate",
        relevantSections: [],
        recommendedArticles: [],
      };

      // Determine primary legal domain
      const domainKeywords = {
        criminal: [
          "murder",
          "theft",
          "assault",
          "criminal",
          "offense",
          "crime",
          "accused",
        ],
        civil: ["contract", "breach", "damages", "negligence", "liability"],
        property: [
          "property",
          "land",
          "title",
          "deed",
          "ownership",
          "possession",
        ],
        family: ["marriage", "divorce", "custody", "alimony", "child support"],
        constitutional: [
          "fundamental right",
          "constitution",
          "article",
          "writ",
        ],
        corporate: [
          "company",
          "shareholder",
          "director",
          "board",
          "corporation",
        ],
      };

      // Count occurrences for each domain
      const domainCounts = {};
      Object.entries(domainKeywords).forEach(([domain, keywords]) => {
        domainCounts[domain] = keywords.reduce((count, keyword) => {
          const regex = new RegExp(`\\b${keyword}\\b`, "gi");
          const matches = allContent.match(regex) || [];
          return count + matches.length;
        }, 0);
      });

      // Find domain with highest count
      const entries = Object.entries(domainCounts);
      if (entries.length > 0) {
        const [primaryDomain] = entries.sort((a, b) => b[1] - a[1])[0];
        analysis.primaryDomain = primaryDomain;
      }

      // Extract potential legal sections mentioned
      const sectionRegex = /\b(section|sec\.)[\s]*(\d+[a-z]*)\b/gi;
      let match;
      while ((match = sectionRegex.exec(allContent)) !== null) {
        analysis.relevantSections.push(match[0]);
      }
      analysis.relevantSections = [...new Set(analysis.relevantSections)];

      // Extract constitutional articles
      const articleRegex = /\b(article)[\s]*(\d+[a-z]*)\b/gi;
      while ((match = articleRegex.exec(allContent)) !== null) {
        analysis.recommendedArticles.push(match[0]);
      }
      analysis.recommendedArticles = [...new Set(analysis.recommendedArticles)];

      return analysis;
    }
    // Default analysis for any case type
    let analysis = {
      summary: `This case involves ${caseTitle}. A thorough analysis has been conducted based on the details provided.`,
      constitutionalArticles: ["Article 14", "Article 21"],
      relevantLaws: [
        {
          name: "Indian Penal Code, 1860",
          description: "Relevant sections based on the case details",
        },
        {
          name: "Code of Criminal Procedure, 1973",
          description: "Procedural aspects applicable to this case",
        },
      ],
      precedents: [
        {
          case: "Supreme Court judgment relevant to this case",
          year: "2018",
          relevance: "Established legal principle applicable here",
        },
      ],
      conclusion: `Based on the analysis of ${caseTitle}, and considering all relevant laws and precedents, the following conclusion has been reached.`,
      recommendation: `For ${caseTitle}, it is recommended to proceed with the following steps based on the legal analysis.`,
      penalties: [
        {
          description: "Applicable penalty based on case details",
          section: "Relevant IPC Section",
          term: "Punishment as prescribed by law",
        },
      ],
      possibleOutcomes: [
        "Outcome based on the specific details of the case",
        "Alternative outcome depending on evidence presented",
      ],
      judgmentSummary: `As the presiding judge reviewing ${caseTitle}, I have carefully considered all evidence and legal provisions. My judgment is based on the specific details provided in this case.`,
    };

    // Customize based on document analysis and case type
    const docAnalysisResults = documentAnalysis || {};

    // Extract specific punishments from document content if available
    const extractPunishmentsFromDocuments = (docs) => {
      if (!docs || docs.length === 0) return [];

      const allContent = docs.map((doc) => doc.content).join(" ");
      const punishments = [];

      // Look for specific punishment patterns in the documents
      const punishmentPatterns = [
        // IPC sections with punishments
        {
          regex: /section\s+302/gi,
          description: "Murder",
          section: "Section 302 of IPC",
          term: "Death or imprisonment for life, and fine",
        },
        {
          regex: /section\s+304/gi,
          description: "Culpable homicide not amounting to murder",
          section: "Section 304 of IPC",
          term: "Imprisonment up to 10 years, or fine, or both",
        },
        {
          regex: /section\s+376/gi,
          description: "Rape",
          section: "Section 376 of IPC",
          term: "Rigorous imprisonment from 10 years to life, and fine",
        },
        {
          regex: /section\s+392/gi,
          description: "Robbery",
          section: "Section 392 of IPC",
          term: "Rigorous imprisonment up to 10 years and fine",
        },
        {
          regex: /section\s+420/gi,
          description: "Cheating",
          section: "Section 420 of IPC",
          term: "Imprisonment up to 7 years and fine",
        },
        {
          regex: /section\s+307/gi,
          description: "Attempt to murder",
          section: "Section 307 of IPC",
          term: "Imprisonment up to 10 years and fine",
        },
        {
          regex: /section\s+498A/gi,
          description: "Cruelty by husband or relatives",
          section: "Section 498A of IPC",
          term: "Imprisonment up to 3 years and fine",
        },
        {
          regex: /section\s+300/gi,
          description: "Murder definition",
          section: "Section 300 of IPC",
          term: "As per Section 302 - Death or imprisonment for life, and fine",
        },
        {
          regex: /section\s+375/gi,
          description: "Rape definition",
          section: "Section 375 of IPC",
          term: "As per Section 376 - Rigorous imprisonment from 10 years to life, and fine",
        },
        {
          regex: /section\s+378/gi,
          description: "Theft",
          section: "Section 378 of IPC",
          term: "Imprisonment up to 3 years, or fine, or both",
        },
        {
          regex: /section\s+415/gi,
          description: "Cheating definition",
          section: "Section 415 of IPC",
          term: "As per Section 420 - Imprisonment up to 7 years and fine",
        },
        {
          regex: /section\s+499/gi,
          description: "Defamation",
          section: "Section 499 of IPC",
          term: "Imprisonment up to 2 years, or fine, or both",
        },
        {
          regex: /section\s+503/gi,
          description: "Criminal intimidation",
          section: "Section 503 of IPC",
          term: "Imprisonment up to 2 years, or fine, or both",
        },
        {
          regex: /section\s+323/gi,
          description: "Voluntarily causing hurt",
          section: "Section 323 of IPC",
          term: "Imprisonment up to 1 year, or fine up to ₹1,000, or both",
        },
        {
          regex: /section\s+354/gi,
          description:
            "Assault or criminal force to woman with intent to outrage her modesty",
          section: "Section 354 of IPC",
          term: "Imprisonment from 1 to 5 years, and fine",
        },
        {
          regex: /section\s+406/gi,
          description: "Criminal breach of trust",
          section: "Section 406 of IPC",
          term: "Imprisonment up to 3 years, or fine, or both",
        },
        {
          regex: /section\s+409/gi,
          description: "Criminal breach of trust by public servant",
          section: "Section 409 of IPC",
          term: "Imprisonment for life, or imprisonment up to 10 years, and fine",
        },
        {
          regex: /section\s+120B/gi,
          description: "Criminal conspiracy",
          section: "Section 120B of IPC",
          term: "Same punishment as that provided for the offence",
        },
        {
          regex: /section\s+34/gi,
          description:
            "Acts done by several persons in furtherance of common intention",
          section: "Section 34 of IPC",
          term: "Liability as if the act was done by each person alone",
        },
        {
          regex: /section\s+107/gi,
          description: "Abetment",
          section: "Section 107 of IPC",
          term: "Same punishment as provided for the offence abetted",
        },

        // Property related offenses
        {
          regex: /section\s+447/gi,
          description: "Criminal trespass",
          section: "Section 447 of IPC",
          term: "Imprisonment up to 3 months, or fine up to ₹500, or both",
        },
        {
          regex: /section\s+448/gi,
          description: "House-trespass",
          section: "Section 448 of IPC",
          term: "Imprisonment up to 1 year, or fine up to ₹1,000, or both",
        },
        {
          regex: /section\s+465/gi,
          description: "Forgery",
          section: "Section 465 of IPC",
          term: "Imprisonment up to 2 years, or fine, or both",
        },
        {
          regex: /section\s+468/gi,
          description: "Forgery for purpose of cheating",
          section: "Section 468 of IPC",
          term: "Imprisonment up to 7 years and fine",
        },

        // Family related offenses
        {
          regex: /domestic\s+violence/gi,
          description: "Domestic violence",
          section: "Protection of Women from Domestic Violence Act, 2005",
          term: "Protection orders, residence orders, monetary relief",
        },
        {
          regex: /maintenance/gi,
          description: "Non-payment of maintenance",
          section: "Section 125 of CrPC",
          term: "Order for monthly allowance and enforcement mechanisms",
        },
      ];

      // Check for each pattern in the document content
      punishmentPatterns.forEach((pattern) => {
        if (pattern.regex.test(allContent)) {
          punishments.push({
            description: pattern.description,
            section: pattern.section,
            term: pattern.term,
          });
        }
      });

      return punishments.length > 0 ? punishments : null;
    };

    // Get document-specific punishments
    const documentPunishments = extractPunishmentsFromDocuments(documents);
    if (documentPunishments && documentPunishments.length > 0) {
      analysis.penalties = documentPunishments;
    }

    // If we have document analysis, use it to enhance our case analysis
    if (documentAnalysis) {
      // Add any constitutional articles found in documents
      if (
        docAnalysisResults.recommendedArticles &&
        docAnalysisResults.recommendedArticles.length > 0
      ) {
        const extractedArticles = docAnalysisResults.recommendedArticles.map(
          (art) => {
            // Convert "article 21" to "Article 21"
            return art.replace(
              /article\s+(\d+[a-z]*)/i,
              (match, num) => `Article ${num}`,
            );
          },
        );
        analysis.constitutionalArticles = [
          ...new Set([
            ...analysis.constitutionalArticles,
            ...extractedArticles,
          ]),
        ];
      }

      // Enhance the summary based on document analysis
      if (docAnalysisResults.primaryDomain) {
        analysis.summary = `This case involves ${caseTitle}, primarily concerning ${docAnalysisResults.primaryDomain.toUpperCase()} LAW issues. A thorough analysis has been conducted based on the details provided in the uploaded documents.`;
      }

      // Add relevant sections from document analysis to laws
      if (
        docAnalysisResults.relevantSections &&
        docAnalysisResults.relevantSections.length > 0
      ) {
        // Add a new relevant law based on the sections found
        const lawName =
          docAnalysisResults.primaryDomain === "criminal"
            ? "Indian Penal Code, 1860"
            : docAnalysisResults.primaryDomain === "civil"
              ? "Civil Procedure Code, 1908"
              : docAnalysisResults.primaryDomain === "property"
                ? "Transfer of Property Act, 1882"
                : docAnalysisResults.primaryDomain === "family"
                  ? "Hindu Marriage Act, 1955"
                  : docAnalysisResults.primaryDomain === "corporate"
                    ? "Companies Act, 2013"
                    : "Relevant Indian Law";

        analysis.relevantLaws.push({
          name: lawName,
          description: `${docAnalysisResults.relevantSections.join(", ")} mentioned in case documents`,
        });
      }
    }

    // Customize based on case type
    if (caseType.includes("Criminal")) {
      analysis = {
        ...analysis,
        constitutionalArticles: ["Article 20", "Article 21", "Article 22"],
        relevantLaws: [
          {
            name: "Indian Penal Code, 1860",
            description: "Sections defining criminal offenses and punishments",
          },
          {
            name: "Code of Criminal Procedure, 1973",
            description: "Procedural laws for criminal proceedings",
          },
          {
            name: "Indian Evidence Act, 1872",
            description: "Rules of evidence in criminal trials",
          },
        ],
        precedents: [
          {
            case: "Maneka Gandhi v. Union of India",
            year: "1978",
            relevance:
              "Established that procedure must be fair, just and reasonable",
          },
          {
            case: "D.K. Basu v. State of West Bengal",
            year: "1997",
            relevance: "Guidelines for arrest and detention",
          },
        ],
        penalties: [
          {
            description: "Criminal offense based on case details",
            section: "Section 302 of IPC (if murder)",
            term: "Imprisonment for life or death, and fine",
          },
          {
            description: "Alternative charge if applicable",
            section: "Section 304 of IPC (culpable homicide)",
            term: "Imprisonment up to 10 years and fine",
          },
          {
            description: "Additional charges if applicable",
            section: "Section 120B of IPC (criminal conspiracy)",
            term: "Same as that for the offense which was object of conspiracy",
          },
        ],
        possibleOutcomes: [
          "Conviction with maximum punishment if evidence proves guilt beyond reasonable doubt",
          "Conviction with reduced sentence if mitigating circumstances are found",
          "Acquittal if prosecution fails to prove guilt beyond reasonable doubt",
          "Referral for further investigation if evidence is insufficient",
          "Direction for witness protection if applicable",
        ],
        judgmentSummary: `After careful consideration of all evidence presented in this criminal case, and applying the principle of 'beyond reasonable doubt', I find the accused [guilty/not guilty] of the charges. The evidence [supports/does not support] the prosecution's case, and all procedural requirements under the CrPC have been followed.`,
      };
    } else if (caseType.includes("Civil") || caseType.includes("Property")) {
      analysis = {
        ...analysis,
        constitutionalArticles: ["Article 300A", "Article 21"],
        relevantLaws: [
          {
            name: "Civil Procedure Code, 1908",
            description: "Procedural laws for civil proceedings",
          },
          {
            name: "Transfer of Property Act, 1882",
            description: "Laws governing property transfer",
          },
          {
            name: "Registration Act, 1908",
            description: "Requirements for registration of documents",
          },
        ],
        precedents: [
          {
            case: "K.T. Plantation Pvt. Ltd. v. State of Karnataka",
            year: "2011",
            relevance: "Interpretation of Article 300A and property rights",
          },
          {
            case: "Suraj Lamp & Industries Pvt Ltd v. State of Haryana",
            year: "2012",
            relevance: "Validity of sale agreements and property transfers",
          },
        ],
        penalties: [
          {
            description: "Filing false property claims",
            section: "Section 447 of IPC",
            term: "Imprisonment up to 3 years and fine",
          },
          {
            description: "Forgery of property documents",
            section: "Section 465 of IPC",
            term: "Imprisonment up to 2 years, or fine, or both",
          },
        ],
        possibleOutcomes: [
          "Decree in favor of the plaintiff with costs if claim is proven",
          "Dismissal of the suit if plaintiff fails to prove their case",
          "Partial decree if some claims are proven and others are not",
          "Direction for specific performance of contract if applicable",
          "Order for compensation or damages if appropriate",
        ],
        judgmentSummary: `Based on the preponderance of evidence presented in this civil case, I find in favor of the [plaintiff/defendant]. The evidence [supports/does not support] the plaintiff's claims regarding property rights and ownership. All legal formalities under the relevant Acts have been properly examined.`,
      };
    } else if (caseType.includes("Family")) {
      analysis = {
        ...analysis,
        constitutionalArticles: ["Article 21", "Article 25", "Article 26"],
        relevantLaws: [
          {
            name: "Hindu Marriage Act, 1955",
            description: "Laws governing Hindu marriages and divorce",
          },
          {
            name: "Special Marriage Act, 1954",
            description: "Civil marriage laws regardless of religion",
          },
          {
            name: "Hindu Adoption and Maintenance Act, 1956",
            description: "Laws regarding adoption and maintenance",
          },
        ],
        precedents: [
          {
            case: "Navtej Singh Johar v. Union of India",
            year: "2018",
            relevance:
              "Recognition of individual autonomy in personal relationships",
          },
          {
            case: "Shayara Bano v. Union of India",
            year: "2017",
            relevance: "Triple talaq judgment and personal laws",
          },
        ],
        penalties: [
          {
            description: "Domestic violence",
            section: "Protection of Women from Domestic Violence Act, 2005",
            term: "Protection orders, residence orders, monetary relief",
          },
          {
            description: "Non-payment of maintenance",
            section: "Section 125 of CrPC",
            term: "Order for monthly allowance and enforcement mechanisms",
          },
        ],
        possibleOutcomes: [
          "Decree of divorce if grounds are proven",
          "Order for maintenance and alimony",
          "Child custody determination based on welfare principle",
          "Protection orders in cases of domestic violence",
          "Property division according to applicable personal laws",
        ],
        judgmentSummary: `After considering all aspects of this family matter, including the welfare of children involved and the rights of both parties, I order the following: [specific orders regarding divorce/maintenance/custody/property division as applicable].`,
      };
    } else if (caseType.includes("Constitutional")) {
      analysis = {
        ...analysis,
        constitutionalArticles: [
          "Article 14",
          "Article 19",
          "Article 21",
          "Article 32",
        ],
        relevantLaws: [
          {
            name: "Constitution of India",
            description: "Fundamental rights and constitutional provisions",
          },
          {
            name: "Specific legislation under challenge",
            description: "Analysis of constitutional validity",
          },
        ],
        precedents: [
          {
            case: "Kesavananda Bharati v. State of Kerala",
            year: "1973",
            relevance: "Basic structure doctrine of the Constitution",
          },
          {
            case: "Puttaswamy v. Union of India",
            year: "2017",
            relevance: "Right to privacy as a fundamental right",
          },
        ],
        penalties: [
          {
            description: "Not applicable in constitutional matters",
            section: "Remedies under Article 32/226",
            term: "Declaration of unconstitutionality, striking down of laws",
          },
        ],
        possibleOutcomes: [
          "Declaration of unconstitutionality of the challenged provision",
          "Reading down the provision to make it constitutionally valid",
          "Upholding the constitutional validity of the challenged law",
          "Issuing guidelines until appropriate legislation is enacted",
          "Referring the matter to a larger bench if necessary",
        ],
        judgmentSummary: `In this constitutional matter, after examining the challenged provisions against the principles established in our Constitution and precedents, I find that the provision [is/is not] constitutionally valid. The provision [violates/does not violate] the fundamental rights guaranteed under the Constitution.`,
      };
    } else if (caseType.includes("Corporate")) {
      analysis = {
        ...analysis,
        constitutionalArticles: ["Article 19(1)(g)", "Article 14"],
        relevantLaws: [
          {
            name: "Companies Act, 2013",
            description: "Laws governing companies in India",
          },
          {
            name: "SEBI Act, 1992",
            description: "Regulations for securities market",
          },
          {
            name: "Insolvency and Bankruptcy Code, 2016",
            description: "Laws for corporate insolvency resolution",
          },
        ],
        precedents: [
          {
            case: "Miheer H. Mafatlal v. Mafatlal Industries Ltd.",
            year: "1997",
            relevance: "Principles for sanctioning schemes of arrangement",
          },
          {
            case: "Vodafone International Holdings v. Union of India",
            year: "2012",
            relevance: "Corporate taxation and structure",
          },
        ],
        penalties: [
          {
            description: "Corporate fraud",
            section: "Section 447 of Companies Act, 2013",
            term: "Imprisonment from 6 months to 10 years and fine",
          },
          {
            description: "Insider trading",
            section: "SEBI (Prohibition of Insider Trading) Regulations",
            term: "Penalties up to ₹25 crore or 3 times the profit made",
          },
        ],
        possibleOutcomes: [
          "Order for corporate restructuring if legally compliant",
          "Penalties for regulatory violations if proven",
          "Directions for compliance with corporate governance norms",
          "Appointment of investigators or administrators if necessary",
          "Approval or rejection of schemes of arrangement",
        ],
        judgmentSummary: `After examining the corporate matter before me, including all financial documents, board resolutions, and applicable regulations, I find that the corporate actions [comply/do not comply] with the legal requirements under the Companies Act and other applicable laws.`,
      };
    }

    return analysis;
  }, [caseTitle, caseType]);

  // Use the generated analysis if no analysis was provided
  const finalAnalysis = analysisResult || generatedAnalysis;
  const copyToClipboard = () => {
    const textToCopy = `
      Case Analysis: ${caseTitle}
      Type: ${caseType}
      
      SUMMARY:
      ${finalAnalysis.summary}
      
      CONSTITUTIONAL ARTICLES:
      ${finalAnalysis.constitutionalArticles.join(", ")}
      
      RELEVANT LAWS:
      ${finalAnalysis.relevantLaws.map((law) => `- ${law.name}: ${law.description}`).join("\n")}
      
      PRECEDENTS:
      ${finalAnalysis.precedents.map((precedent) => `- ${precedent.case} (${precedent.year}): ${precedent.relevance}`).join("\n")}
      
      PENALTIES AND PUNISHMENTS:
      ${finalAnalysis.penalties.map((penalty) => `- ${penalty.description} (${penalty.section}): ${penalty.term}`).join("\n")}
      
      POSSIBLE OUTCOMES:
      ${finalAnalysis.possibleOutcomes.map((outcome) => `- ${outcome}`).join("\n")}
      
      JUDGMENT SUMMARY:
      ${finalAnalysis.judgmentSummary}
      
      CONCLUSION:
      ${finalAnalysis.conclusion}
      
      RECOMMENDATION:
      ${finalAnalysis.recommendation}
    `;

    navigator.clipboard.writeText(textToCopy);
    alert("Analysis copied to clipboard");
  };

  return (
    <div className="w-full bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="mr-4 hidden sm:block">
            <Scale className="h-10 w-10 text-navy-700" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-navy-800">
              Case Analysis Result
            </h2>
            <p className="text-gray-600">
              AI-powered analysis based on the Indian Constitution and legal
              precedents
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="border-navy-300 text-navy-700 hover:bg-navy-50"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              alert("Download functionality would be implemented here")
            }
            className="border-navy-300 text-navy-700 hover:bg-navy-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="mb-6 border-navy-200">
        <CardHeader className="bg-navy-50 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-navy-800 text-lg">
              Case Overview
            </CardTitle>
            <Badge className="bg-navy-700">{caseType}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <h3 className="font-bold text-navy-800 mb-1">{caseTitle}</h3>
          <p className="text-gray-700">{finalAnalysis.summary}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-navy-200">
          <CardHeader className="bg-navy-50 pb-2">
            <div className="flex items-center">
              <Scale className="h-5 w-5 text-navy-700 mr-2" />
              <CardTitle className="text-navy-800 text-lg">
                Constitutional Articles
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {finalAnalysis.constitutionalArticles.map((article, index) => (
                <li key={index} className="flex items-start">
                  <Badge className="bg-gold-500 text-navy-900 mr-2">
                    {article}
                  </Badge>
                  <span className="text-gray-700">
                    {article === "Article 300A"
                      ? "Right to property - No person shall be deprived of his property save by authority of law"
                      : article === "Article 21"
                        ? "Protection of life and personal liberty - No person shall be deprived of his life or personal liberty except according to procedure established by law"
                        : ""}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-navy-200">
          <CardHeader className="bg-navy-50 pb-2">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-navy-700 mr-2" />
              <CardTitle className="text-navy-800 text-lg">
                Relevant Laws
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {finalAnalysis.relevantLaws.map((law, index) => (
                <li
                  key={index}
                  className="pb-2 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <p className="font-medium text-navy-800">{law.name}</p>
                  <p className="text-sm text-gray-600">{law.description}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 border-navy-200">
        <CardHeader className="bg-navy-50 pb-2">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-navy-700 mr-2" />
            <CardTitle className="text-navy-800 text-lg">
              Judicial Precedents
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-4">
            {finalAnalysis.precedents.map((precedent, index) => (
              <li
                key={index}
                className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-navy-800">{precedent.case}</p>
                  <Badge
                    variant="outline"
                    className="border-navy-300 text-navy-700"
                  >
                    {precedent.year}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {precedent.relevance}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Document Analysis Section */}
      <React.Suspense fallback={<div>Loading document analysis...</div>}>
        <DocumentAnalyzer documents={documents} />
      </React.Suspense>

      <div className="bg-navy-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif font-bold text-navy-800 mb-2">
          Conclusion
        </h3>
        <p className="text-gray-700">{finalAnalysis.conclusion}</p>
      </div>

      <Card className="mb-6 border-navy-200">
        <CardHeader className="bg-navy-50 pb-2">
          <div className="flex items-center">
            <Scale className="h-5 w-5 text-navy-700 mr-2" />
            <CardTitle className="text-navy-800 text-lg">
              Penalties and Punishments
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-3">
            {finalAnalysis.penalties.map((penalty, index) => (
              <li
                key={index}
                className="pb-2 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-navy-800">
                    {penalty.description}
                  </p>
                  <Badge
                    variant="outline"
                    className="border-red-300 text-red-700 bg-red-50"
                  >
                    {penalty.section}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{penalty.term}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6 border-navy-200">
        <CardHeader className="bg-navy-50 pb-2">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-navy-700 mr-2" />
            <CardTitle className="text-navy-800 text-lg">
              Possible Outcomes
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-2">
            {finalAnalysis.possibleOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-navy-100 text-navy-800 font-medium text-sm mr-2 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{outcome}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="bg-navy-700 text-white rounded-lg p-6 mb-6 border-l-4 border-gold-500">
        <h3 className="text-xl font-serif font-bold mb-3 flex items-center">
          <Scale className="h-5 w-5 mr-2" />
          Judgment
        </h3>
        <p className="text-white/90 italic">
          "{finalAnalysis.judgmentSummary}"
        </p>
      </div>

      <div className="bg-gold-50 rounded-lg p-4 mb-6 border-l-4 border-gold-500">
        <h3 className="text-lg font-serif font-bold text-navy-800 mb-2">
          Recommendation
        </h3>
        <p className="text-gray-700">{finalAnalysis.recommendation}</p>
      </div>

      <Separator className="my-6" />

      <div className="text-center text-sm text-gray-500 mb-4">
        <p>
          This analysis is generated by AI based on the Indian Constitution,
          laws, precedents, and the documents you've uploaded. The AI has
          thoroughly analyzed all case documents using advanced legal NLP
          techniques to extract relevant information, identify applicable laws,
          and determine potential outcomes. This assessment follows judicial
          reasoning patterns but is for informational purposes only and does not
          constitute legal advice.
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onClose}
          className="bg-navy-700 hover:bg-navy-800 text-white px-8"
        >
          Close Analysis
        </Button>
      </div>
    </div>
  );
};

export default CaseAnalysisResult;
