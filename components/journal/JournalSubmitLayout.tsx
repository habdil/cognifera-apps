"use client";

import React, { useState } from "react";
import Link from "next/link";
import JournalHeader from "./JournalHeader";
import JournalFooter from "./JournalFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Send,
  FileText,
  CheckCircle,
  AlertCircle,
  Upload,
  User,
  Mail,
  BookOpen,
  Calendar,
  Clock,
  Award,
  Shield,
  Download,
  ExternalLink,
  Info
} from "lucide-react";

export default function JournalSubmitLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Author Information
    firstName: "",
    lastName: "",
    email: "",
    affiliation: "",
    orcid: "",
    phone: "",
    
    // Article Information
    title: "",
    abstract: "",
    keywords: "",
    category: "",
    articleType: "",
    
    // Co-authors
    coAuthors: [{ name: "", email: "", affiliation: "" }],
    
    // Files
    manuscriptFile: null,
    supplementaryFiles: [],
    
    // Agreement
    agreementChecked: false,
    copyrightChecked: false
  });

  const steps = [
    { id: 1, title: "Guidelines", icon: Info },
    { id: 2, title: "Author Info", icon: User },
    { id: 3, title: "Article Info", icon: FileText },
    { id: 4, title: "Upload Files", icon: Upload },
    { id: 5, title: "Review & Submit", icon: Send }
  ];

  const articleTypes = [
    { value: "research", label: "Research Article", description: "Original research with novel findings" },
    { value: "review", label: "Review Article", description: "Comprehensive review of existing literature" },
    { value: "case-study", label: "Case Study", description: "Detailed analysis of specific cases" },
    { value: "short-communication", label: "Short Communication", description: "Brief reports of preliminary findings" },
    { value: "technical-note", label: "Technical Note", description: "Description of new techniques or tools" }
  ];

  const categories = [
    { value: "educational-technology", label: "Educational Technology" },
    { value: "computer-science", label: "Computer Science" },
    { value: "applied-mathematics", label: "Applied Mathematics" },
    { value: "data-science", label: "Data Science" },
    { value: "information-systems", label: "Information Systems" },
    { value: "interdisciplinary", label: "Interdisciplinary Research" }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCoAuthor = () => {
    setFormData(prev => ({
      ...prev,
      coAuthors: [...prev.coAuthors, { name: "", email: "", affiliation: "" }]
    }));
  };

  const removeCoAuthor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coAuthors: prev.coAuthors.filter((_, i) => i !== index)
    }));
  };

  const updateCoAuthor = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      coAuthors: prev.coAuthors.map((author, i) => 
        i === index ? { ...author, [field]: value } : author
      )
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">Submission Guidelines</h2>
              <p className="text-[var(--color-muted-foreground)]">
                Please read and understand our submission guidelines before proceeding
              </p>
            </div>

            <div className="grid gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
                    <FileText className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                    Article Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                    <li>• Original research not published elsewhere</li>
                    <li>• Written in Indonesian or English</li>
                    <li>• Follow APA citation style</li>
                    <li>• Include abstract (150-250 words)</li>
                    <li>• Provide 3-5 keywords</li>
                    <li>• Minimum 3000 words, maximum 8000 words</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
                    <Upload className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                    File Format Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                    <li>• Manuscript: .docx or .pdf format (max 10MB)</li>
                    <li>• Images: .jpg, .png, .tiff (high resolution)</li>
                    <li>• Tables: Include in manuscript or separate .xlsx</li>
                    <li>• Supplementary materials: .pdf, .docx, .xlsx</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
                    <Clock className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                    Review Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                      <div className="text-2xl font-bold text-[var(--color-primary)]">1-2</div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">weeks</div>
                      <div className="text-sm font-medium text-[var(--color-foreground)]">Initial Review</div>
                    </div>
                    <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                      <div className="text-2xl font-bold text-[var(--color-primary)]">4-6</div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">weeks</div>
                      <div className="text-sm font-medium text-[var(--color-foreground)]">Peer Review</div>
                    </div>
                    <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                      <div className="text-2xl font-bold text-[var(--color-primary)]">2-3</div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">weeks</div>
                      <div className="text-sm font-medium text-[var(--color-foreground)]">Final Decision</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                <Button variant="outline" className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  APA Style Guide
                </Button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">Author Information</h2>
              <p className="text-[var(--color-muted-foreground)]">
                Please provide your contact and affiliation details
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="your.email@institution.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="+62 812 3456 7890"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Institutional Affiliation *
                </label>
                <input
                  type="text"
                  value={formData.affiliation}
                  onChange={(e) => handleInputChange("affiliation", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="University/Institution, Department, City, Country"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  ORCID (Optional)
                </label>
                <input
                  type="text"
                  value={formData.orcid}
                  onChange={(e) => handleInputChange("orcid", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="0000-0000-0000-0000"
                />
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                  ORCID helps distinguish you from other researchers. Get yours at <a href="https://orcid.org" target="_blank" className="text-[var(--color-primary)] hover:underline">orcid.org</a>
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">Article Information</h2>
              <p className="text-[var(--color-muted-foreground)]">
                Provide details about your research article
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="Enter your article title"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                    Article Type *
                  </label>
                  <select
                    value={formData.articleType}
                    onChange={(e) => handleInputChange("articleType", e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  >
                    <option value="">Select article type</option>
                    {articleTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Abstract * <span className="text-xs text-[var(--color-muted-foreground)]">(150-250 words)</span>
                </label>
                <textarea
                  value={formData.abstract}
                  onChange={(e) => handleInputChange("abstract", e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="Provide a concise summary of your research including objectives, methods, results, and conclusions..."
                />
                <div className="text-xs text-[var(--color-muted-foreground)] mt-1">
                  {formData.abstract.split(' ').filter(word => word.length > 0).length} words
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Keywords * <span className="text-xs text-[var(--color-muted-foreground)]">(3-5 keywords, separated by commas)</span>
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange("keywords", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="machine learning, education, artificial intelligence, assessment"
                />
              </div>

              {/* Co-Authors Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-[var(--color-foreground)]">
                    Co-Authors (Optional)
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCoAuthor}
                  >
                    Add Co-Author
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {formData.coAuthors.map((coAuthor, index) => (
                    <div key={index} className="p-4 border border-[var(--color-border)] rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-[var(--color-foreground)]">Co-Author {index + 1}</h4>
                        {formData.coAuthors.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCoAuthor(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          value={coAuthor.name}
                          onChange={(e) => updateCoAuthor(index, "name", e.target.value)}
                          placeholder="Full name"
                          className="px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                        />
                        <input
                          type="email"
                          value={coAuthor.email}
                          onChange={(e) => updateCoAuthor(index, "email", e.target.value)}
                          placeholder="Email address"
                          className="px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={coAuthor.affiliation}
                          onChange={(e) => updateCoAuthor(index, "affiliation", e.target.value)}
                          placeholder="Affiliation"
                          className="px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">Upload Files</h2>
              <p className="text-[var(--color-muted-foreground)]">
                Upload your manuscript and any supplementary materials
              </p>
            </div>

            <div className="space-y-6">
              {/* Main Manuscript */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
                    <FileText className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                    Main Manuscript *
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-[var(--color-muted-foreground)] mb-4" />
                    <p className="text-[var(--color-muted-foreground)] mb-2">
                      Drop your manuscript file here or click to browse
                    </p>
                    <p className="text-xs text-[var(--color-muted-foreground)] mb-4">
                      Supported formats: .docx, .pdf (max 10MB)
                    </p>
                    <Button variant="outline">
                      Select File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Supplementary Files */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
                    <BookOpen className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                    Supplementary Materials (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-[var(--color-muted-foreground)] mb-4" />
                    <p className="text-[var(--color-muted-foreground)] mb-2">
                      Upload additional files (datasets, figures, tables, etc.)
                    </p>
                    <p className="text-xs text-[var(--color-muted-foreground)] mb-4">
                      Supported formats: .pdf, .docx, .xlsx, .jpg, .png (max 5MB each)
                    </p>
                    <Button variant="outline">
                      Add Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">Review & Submit</h2>
              <p className="text-[var(--color-muted-foreground)]">
                Please review your submission details before final submission
              </p>
            </div>

            <div className="space-y-6">
              {/* Author Summary */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Author Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-[var(--color-foreground)]">Name:</span>
                      <span className="ml-2 text-[var(--color-muted-foreground)]">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--color-foreground)]">Email:</span>
                      <span className="ml-2 text-[var(--color-muted-foreground)]">{formData.email}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-[var(--color-foreground)]">Affiliation:</span>
                      <span className="ml-2 text-[var(--color-muted-foreground)]">{formData.affiliation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Article Summary */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Article Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-[var(--color-foreground)]">Title:</span>
                    <p className="text-[var(--color-muted-foreground)] mt-1">{formData.title}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-[var(--color-foreground)]">Type:</span>
                      <span className="ml-2 text-[var(--color-muted-foreground)]">
                        {articleTypes.find(t => t.value === formData.articleType)?.label}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--color-foreground)]">Category:</span>
                      <span className="ml-2 text-[var(--color-muted-foreground)]">
                        {categories.find(c => c.value === formData.category)?.label}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-[var(--color-foreground)]">Keywords:</span>
                    <span className="ml-2 text-[var(--color-muted-foreground)]">{formData.keywords}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Agreements */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Agreements & Copyright</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreementChecked}
                        onChange={(e) => handleInputChange("agreementChecked", e.target.checked)}
                        className="mt-1 h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-border)] rounded"
                      />
                      <span className="text-sm text-[var(--color-muted-foreground)]">
                        I confirm that this work is original, has not been published elsewhere, and complies with the journal's ethical guidelines. I have read and agree to the <Link href="/journal/editorial" className="text-[var(--color-primary)] hover:underline">submission guidelines</Link>.
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.copyrightChecked}
                        onChange={(e) => handleInputChange("copyrightChecked", e.target.checked)}
                        className="mt-1 h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-border)] rounded"
                      />
                      <span className="text-sm text-[var(--color-muted-foreground)]">
                        I agree to publish this article under <strong>Creative Commons Attribution 4.0 International License</strong> if accepted, allowing free access and reuse with proper attribution.
                      </span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <JournalHeader activeItem="submit" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-[var(--color-muted-foreground)]">
            <Link href="/journal" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/journal" className="hover:text-[var(--color-primary)] transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-[var(--color-foreground)] font-medium">Submit Article</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Progress Steps */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Submission Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {steps.map((step) => {
                      const Icon = step.icon;
                      const isCompleted = currentStep > step.id;
                      const isCurrent = currentStep === step.id;
                      
                      return (
                        <div
                          key={step.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            isCurrent 
                              ? 'bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)]' 
                              : isCompleted
                              ? 'bg-green-50 border-l-4 border-green-500'
                              : 'hover:bg-[var(--color-muted)]'
                          }`}
                          onClick={() => setCurrentStep(step.id)}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isCurrent
                              ? 'bg-[var(--color-primary)] text-white'
                              : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Icon className="w-4 h-4" />
                            )}
                          </div>
                          <span className={`text-sm font-medium ${
                            isCurrent 
                              ? 'text-[var(--color-primary)]' 
                              : isCompleted
                              ? 'text-green-700'
                              : 'text-[var(--color-muted-foreground)]'
                          }`}>
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Help Section */}
              <Card className="border-0 shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
                    <Shield className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-[var(--color-muted-foreground)]">
                    <p className="mb-3">If you encounter any issues during submission:</p>
                    <div className="space-y-2">
                      <div>
                        <strong className="text-[var(--color-foreground)]">Email:</strong>
                        <br />cognifera.edu@gmail.com
                      </div>
                      <div>
                        <strong className="text-[var(--color-foreground)]">Response Time:</strong>
                        <br />Within 24 hours
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--color-border)]">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  <div className="text-sm text-[var(--color-muted-foreground)]">
                    Step {currentStep} of {steps.length}
                  </div>

                  {currentStep < steps.length ? (
                    <Button
                      onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                      className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
                      disabled={!formData.agreementChecked || !formData.copyrightChecked}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Article
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <JournalFooter />
    </div>
  );
}