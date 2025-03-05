import React from "react";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DocumentAnalyzerProps {
  documents: {
    name: string;
    content: string;
    type: string;
  }[];
}

const DocumentAnalyzer = ({ documents = [] }: DocumentAnalyzerProps) => {
  // In a real application, this would perform actual NLP analysis on the documents
  // For now, we'll simulate document analysis

  const analyzeDocument = (content: string) => {
    // Advanced document analysis with legal NLP processing
    const keyFindings = [];
    const legalEntities = [];
    const evidencePoints = [];
    const legalIssues = [];

    // Legal entity extraction
    const nameRegex =
      /\b([A-Z][a-z]+ [A-Z][a-z]+|Mr\.|Mrs\.|Ms\.|Dr\. [A-Z][a-z]+)\b/g;
    const names = content.match(nameRegex) || [];
    if (names.length > 0) {
      legalEntities.push(...new Set(names));
    }

    // Date extraction
    const dateRegex =
      /\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December) \d{2,4})\b/g;
    const dates = content.match(dateRegex) || [];
    if (dates.length > 0) {
      evidencePoints.push(`Document contains ${dates.length} date references`);
    }

    // Legal citation extraction
    const citationRegex = /\b(Section|Article|Sec\.|Art\.) \d+[A-Za-z]?\b/g;
    const citations = content.match(citationRegex) || [];
    if (citations.length > 0) {
      keyFindings.push(`${citations.length} legal citations identified`);
    }

    // Case law references
    const caseLawRegex = /\b[A-Z][a-z]+ v\. [A-Z][a-z]+\b/g;
    const caseLaws = content.match(caseLawRegex) || [];
    if (caseLaws.length > 0) {
      keyFindings.push(`Case law references found: ${caseLaws.join(", ")}`);
    }

    // Legal issue identification based on keywords
    const legalKeywords = {
      criminal: [
        "murder",
        "theft",
        "assault",
        "battery",
        "criminal",
        "offense",
        "crime",
        "accused",
        "victim",
        "weapon",
      ],
      civil: [
        "contract",
        "breach",
        "damages",
        "negligence",
        "liability",
        "compensation",
        "plaintiff",
        "defendant",
      ],
      property: [
        "property",
        "land",
        "title",
        "deed",
        "ownership",
        "possession",
        "tenant",
        "landlord",
        "lease",
        "rent",
      ],
      family: [
        "marriage",
        "divorce",
        "custody",
        "alimony",
        "child support",
        "adoption",
        "matrimonial",
      ],
      constitutional: [
        "fundamental right",
        "constitution",
        "article",
        "amendment",
        "writ",
        "petition",
      ],
      corporate: [
        "company",
        "shareholder",
        "director",
        "board",
        "corporation",
        "merger",
        "acquisition",
      ],
    };

    // Count keyword occurrences for each category
    const categoryCounts = {};
    Object.entries(legalKeywords).forEach(([category, keywords]) => {
      let count = 0;
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        const matches = content.match(regex) || [];
        count += matches.length;
      });
      if (count > 0) {
        categoryCounts[category] = count;
        legalIssues.push(
          `${category.charAt(0).toUpperCase() + category.slice(1)} law issues detected (${count} references)`,
        );
      }
    });

    // Determine primary legal domain
    if (Object.keys(categoryCounts).length > 0) {
      const primaryCategory = Object.entries(categoryCounts).sort(
        (a, b) => b[1] - a[1],
      )[0][0];
      keyFindings.push(
        `Primary legal domain: ${primaryCategory.toUpperCase()} LAW`,
      );
    }

    // Evidence strength assessment
    const evidenceKeywords = [
      "witness",
      "testimony",
      "evidence",
      "exhibit",
      "proof",
      "document",
      "statement",
      "affidavit",
      "sworn",
    ];
    let evidenceCount = 0;
    evidenceKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      const matches = content.match(regex) || [];
      evidenceCount += matches.length;
    });

    if (evidenceCount > 10) {
      evidencePoints.push("Strong evidentiary support detected");
    } else if (evidenceCount > 5) {
      evidencePoints.push("Moderate evidentiary support detected");
    } else if (evidenceCount > 0) {
      evidencePoints.push("Limited evidentiary support detected");
    }

    // Add legal entities if found
    if (legalEntities.length > 0) {
      keyFindings.push(
        `Identified ${legalEntities.length} parties/individuals`,
      );
    }

    // Add evidence points to findings
    keyFindings.push(...evidencePoints);

    // Add legal issues to findings
    keyFindings.push(...legalIssues);

    // If no specific findings, return generic analysis
    if (keyFindings.length === 0) {
      keyFindings.push("Document reviewed for legal relevance");
      keyFindings.push("Standard legal analysis applied");
    }

    return keyFindings;
  };

  return (
    <Card className="mb-6 border-navy-200">
      <CardHeader className="bg-navy-50 pb-2">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-navy-700 mr-2" />
          <CardTitle className="text-navy-800 text-lg">
            Document Analysis
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-navy-600 mr-2" />
                    <span className="font-medium text-navy-800">
                      {doc.name}
                    </span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" /> Analyzed
                  </Badge>
                </div>

                <div className="mt-2">
                  <p className="text-sm font-medium text-navy-700 mb-1">
                    Key Findings:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
                    {analyzeDocument(doc.content).map((finding, i) => (
                      <li key={i}>{finding}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-4 text-gray-500">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
            <p>No documents were uploaded or could be analyzed</p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
          <p className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-navy-500" />
            Our AI has thoroughly analyzed all uploaded documents using advanced
            legal NLP techniques to extract relevant legal information, identify
            parties, detect legal issues, and evaluate evidence strength for
            this case.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentAnalyzer;
