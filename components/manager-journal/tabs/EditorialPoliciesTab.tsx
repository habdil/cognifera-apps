import { Settings, User, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalJournalConfig } from "../hooks/useJournalConfig";

interface EditorialPoliciesTabProps {
  config: LocalJournalConfig;
  setConfig: (updater: (prev: LocalJournalConfig) => LocalJournalConfig) => void;
}

export function EditorialPoliciesTab({ config, setConfig }: EditorialPoliciesTabProps) {
  return (
    <div className="space-y-6">
      {/* Focus and Scope */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Focus and Scope
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
            <input
              type="text"
              value={config.editorialPolicies?.focusScope?.title || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  focusScope: {
                    ...prev.editorialPolicies?.focusScope,
                    title: e.target.value,
                    icon: prev.editorialPolicies?.focusScope?.icon || "BookOpen",
                    description: prev.editorialPolicies?.focusScope?.description || "",
                    researchAreas: prev.editorialPolicies?.focusScope?.researchAreas || { title: "", items: [] },
                    contributionTypes: prev.editorialPolicies?.focusScope?.contributionTypes || { title: "", items: [] }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Description</label>
            <textarea
              value={config.editorialPolicies?.focusScope?.description || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  focusScope: {
                    ...prev.editorialPolicies?.focusScope,
                    title: prev.editorialPolicies?.focusScope?.title || "",
                    icon: prev.editorialPolicies?.focusScope?.icon || "BookOpen",
                    description: e.target.value,
                    researchAreas: prev.editorialPolicies?.focusScope?.researchAreas || { title: "", items: [] },
                    contributionTypes: prev.editorialPolicies?.focusScope?.contributionTypes || { title: "", items: [] }
                  }
                }
              }))}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Research Areas Title</label>
            <input
              type="text"
              value={config.editorialPolicies?.focusScope?.researchAreas?.title || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  focusScope: {
                    ...prev.editorialPolicies?.focusScope,
                    title: prev.editorialPolicies?.focusScope?.title || "",
                    icon: prev.editorialPolicies?.focusScope?.icon || "BookOpen",
                    description: prev.editorialPolicies?.focusScope?.description || "",
                    researchAreas: {
                      title: e.target.value,
                      items: prev.editorialPolicies?.focusScope?.researchAreas?.items || []
                    },
                    contributionTypes: prev.editorialPolicies?.focusScope?.contributionTypes || { title: "", items: [] }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Contribution Types Title</label>
            <input
              type="text"
              value={config.editorialPolicies?.focusScope?.contributionTypes?.title || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  focusScope: {
                    ...prev.editorialPolicies?.focusScope,
                    title: prev.editorialPolicies?.focusScope?.title || "",
                    icon: prev.editorialPolicies?.focusScope?.icon || "BookOpen",
                    description: prev.editorialPolicies?.focusScope?.description || "",
                    researchAreas: prev.editorialPolicies?.focusScope?.researchAreas || { title: "", items: [] },
                    contributionTypes: {
                      title: e.target.value,
                      items: prev.editorialPolicies?.focusScope?.contributionTypes?.items || []
                    }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Research Areas Items */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Research Areas</label>
            {(config.editorialPolicies?.focusScope?.researchAreas?.items || []).map((item, index) => (
              <div key={index} className="grid grid-cols-1 gap-3 mb-3 p-3 border border-[var(--color-border)] rounded-md">
                <div>
                  <label className="block text-xs font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => {
                      const newItems = [...(config.editorialPolicies?.focusScope?.researchAreas?.items || [])];
                      newItems[index] = { ...newItems[index], title: e.target.value };
                      setConfig(prev => ({
                        ...prev,
                        editorialPolicies: {
                          ...prev.editorialPolicies,
                          focusScope: {
                            ...prev.editorialPolicies?.focusScope,
                            title: prev.editorialPolicies?.focusScope?.title || "",
                            icon: prev.editorialPolicies?.focusScope?.icon || "BookOpen",
                            description: prev.editorialPolicies?.focusScope?.description || "",
                            researchAreas: {
                              title: prev.editorialPolicies?.focusScope?.researchAreas?.title || "",
                              items: newItems
                            },
                            contributionTypes: prev.editorialPolicies?.focusScope?.contributionTypes || { title: "", items: [] }
                          }
                        }
                      }));
                    }}
                    className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) => {
                        const newItems = [...(config.editorialPolicies?.focusScope?.researchAreas?.items || [])];
                        newItems[index] = { ...newItems[index], description: e.target.value };
                        setConfig(prev => ({
                          ...prev,
                          editorialPolicies: {
                            ...prev.editorialPolicies,
                            focusScope: {
                              ...prev.editorialPolicies?.focusScope,
                              title: prev.editorialPolicies?.focusScope?.title || "",
                              icon: prev.editorialPolicies?.focusScope?.icon || "BookOpen",
                              description: prev.editorialPolicies?.focusScope?.description || "",
                              researchAreas: {
                                title: prev.editorialPolicies?.focusScope?.researchAreas?.title || "",
                                items: newItems
                              },
                              contributionTypes: prev.editorialPolicies?.focusScope?.contributionTypes || { title: "", items: [] }
                            }
                          }
                        }));
                      }}
                      className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newItems = (config.editorialPolicies?.focusScope?.researchAreas?.items || []).filter((_, i) => i !== index);
                        setConfig(prev => ({
                          ...prev,
                          editorialPolicies: {
                            ...prev.editorialPolicies,
                            focusScope: {
                              ...prev.editorialPolicies?.focusScope,
                              title: prev.editorialPolicies?.focusScope?.title || "",
                              icon: prev.editorialPolicies?.focusScope?.icon || "BookOpen",
                              description: prev.editorialPolicies?.focusScope?.description || "",
                              researchAreas: {
                                title: prev.editorialPolicies?.focusScope?.researchAreas?.title || "",
                                items: newItems
                              },
                              contributionTypes: prev.editorialPolicies?.focusScope?.contributionTypes || { title: "", items: [] }
                            }
                          }
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() => {
                const newItems = [...(config.editorialPolicies?.focusScope?.researchAreas?.items || []), { title: "", description: "" }];
                setConfig(prev => ({
                  ...prev,
                  editorialPolicies: {
                    ...prev.editorialPolicies,
                    focusScope: {
                      ...prev.editorialPolicies?.focusScope,
                      title: prev.editorialPolicies?.focusScope?.title || "",
                      icon: prev.editorialPolicies?.focusScope?.icon || "BookOpen",
                      description: prev.editorialPolicies?.focusScope?.description || "",
                      researchAreas: {
                        title: prev.editorialPolicies?.focusScope?.researchAreas?.title || "",
                        items: newItems
                      },
                      contributionTypes: prev.editorialPolicies?.focusScope?.contributionTypes || { title: "", items: [] }
                    }
                  }
                }));
              }}
            >
              Add Research Area
            </Button>
          </div>
        </div>
      </div>

      {/* Peer Review Process */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <User className="h-5 w-5" />
          Peer Review Process
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Description</label>
            <textarea
              value={config.editorialPolicies?.peerReview?.description || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  peerReview: {
                    ...prev.editorialPolicies?.peerReview,
                    title: prev.editorialPolicies?.peerReview?.title || "Peer Review Process",
                    icon: prev.editorialPolicies?.peerReview?.icon || "Users",
                    description: e.target.value,
                    process: prev.editorialPolicies?.peerReview?.process || [],
                    timeline: prev.editorialPolicies?.peerReview?.timeline || { title: "", description: "" }
                  }
                }
              }))}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Review Timeline</label>
            <input
              type="text"
              value={config.editorialPolicies?.peerReview?.timeline?.title || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  peerReview: {
                    ...prev.editorialPolicies?.peerReview,
                    title: prev.editorialPolicies?.peerReview?.title || "Peer Review Process",
                    icon: prev.editorialPolicies?.peerReview?.icon || "Users",
                    description: prev.editorialPolicies?.peerReview?.description || "",
                    process: prev.editorialPolicies?.peerReview?.process || [],
                    timeline: {
                      title: e.target.value,
                      description: prev.editorialPolicies?.peerReview?.timeline?.description || ""
                    }
                  }
                }
              }))}
              placeholder="Review Timeline"
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Timeline Description</label>
            <textarea
              value={config.editorialPolicies?.peerReview?.timeline?.description || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  peerReview: {
                    ...prev.editorialPolicies?.peerReview,
                    title: prev.editorialPolicies?.peerReview?.title || "Peer Review Process",
                    icon: prev.editorialPolicies?.peerReview?.icon || "Users",
                    description: prev.editorialPolicies?.peerReview?.description || "",
                    process: prev.editorialPolicies?.peerReview?.process || [],
                    timeline: {
                      title: prev.editorialPolicies?.peerReview?.timeline?.title || "",
                      description: e.target.value
                    }
                  }
                }
              }))}
              rows={2}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>

      {/* Open Access Policy */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Open Access Policy
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Description</label>
            <textarea
              value={config.editorialPolicies?.openAccess?.description || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  openAccess: {
                    ...prev.editorialPolicies?.openAccess,
                    title: prev.editorialPolicies?.openAccess?.title || "Open Access Policy",
                    icon: prev.editorialPolicies?.openAccess?.icon || "Eye",
                    description: e.target.value,
                    benefits: prev.editorialPolicies?.openAccess?.benefits || { title: "", items: [] },
                    copyright: prev.editorialPolicies?.openAccess?.copyright || { title: "", items: [] }
                  }
                }
              }))}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Benefits Title</label>
            <input
              type="text"
              value={config.editorialPolicies?.openAccess?.benefits?.title || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  openAccess: {
                    ...prev.editorialPolicies?.openAccess,
                    title: prev.editorialPolicies?.openAccess?.title || "Open Access Policy",
                    icon: prev.editorialPolicies?.openAccess?.icon || "Eye",
                    description: prev.editorialPolicies?.openAccess?.description || "",
                    benefits: {
                      title: e.target.value,
                      items: prev.editorialPolicies?.openAccess?.benefits?.items || []
                    },
                    copyright: prev.editorialPolicies?.openAccess?.copyright || { title: "", items: [] }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Copyright Title</label>
            <input
              type="text"
              value={config.editorialPolicies?.openAccess?.copyright?.title || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  openAccess: {
                    ...prev.editorialPolicies?.openAccess,
                    title: prev.editorialPolicies?.openAccess?.title || "Open Access Policy",
                    icon: prev.editorialPolicies?.openAccess?.icon || "Eye",
                    description: prev.editorialPolicies?.openAccess?.description || "",
                    benefits: prev.editorialPolicies?.openAccess?.benefits || { title: "", items: [] },
                    copyright: {
                      title: e.target.value,
                      items: prev.editorialPolicies?.openAccess?.copyright?.items || []
                    }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>

      {/* Simplified Section for Other Policies */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Other Policies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Archiving Title</label>
            <input
              type="text"
              value={config.editorialPolicies?.archiving?.title || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  archiving: {
                    title: e.target.value,
                    icon: prev.editorialPolicies?.archiving?.icon || "Archive",
                    description: prev.editorialPolicies?.archiving?.description || ""
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Plagiarism Policy Title</label>
            <input
              type="text"
              value={config.editorialPolicies?.plagiarism?.title || ""}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                editorialPolicies: {
                  ...prev.editorialPolicies,
                  plagiarism: {
                    title: e.target.value,
                    icon: prev.editorialPolicies?.plagiarism?.icon || "AlertCircle",
                    description: prev.editorialPolicies?.plagiarism?.description || "",
                    tolerancePolicy: prev.editorialPolicies?.plagiarism?.tolerancePolicy || { title: "", description: "" }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}