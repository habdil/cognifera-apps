import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalJournalConfig } from "../hooks/useJournalConfig";

interface AboutPageTabProps {
  config: LocalJournalConfig;
  setConfig: (updater: (prev: LocalJournalConfig) => LocalJournalConfig) => void;
}

export function AboutPageTab({ config, setConfig }: AboutPageTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          About Page Content
        </h3>
        <div className="space-y-6">
          {/* Journal Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Journal Description</label>
            {config.aboutPage.journalDescription.paragraphs.map((paragraph, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  rows={3}
                  value={paragraph}
                  onChange={(e) => {
                    const newParagraphs = [...config.aboutPage.journalDescription.paragraphs];
                    newParagraphs[index] = e.target.value;
                    setConfig(prev => ({
                      ...prev,
                      aboutPage: {
                        ...prev.aboutPage,
                        journalDescription: {
                          ...prev.aboutPage.journalDescription,
                          paragraphs: newParagraphs
                        }
                      }
                    }));
                  }}
                  className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newParagraphs = config.aboutPage.journalDescription.paragraphs.filter((_, i) => i !== index);
                    setConfig(prev => ({
                      ...prev,
                      aboutPage: {
                        ...prev.aboutPage,
                        journalDescription: {
                          ...prev.aboutPage.journalDescription,
                          paragraphs: newParagraphs
                        }
                      }
                    }));
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() => {
                const newParagraphs = [...config.aboutPage.journalDescription.paragraphs, ""];
                setConfig(prev => ({
                  ...prev,
                  aboutPage: {
                    ...prev.aboutPage,
                    journalDescription: {
                      ...prev.aboutPage.journalDescription,
                      paragraphs: newParagraphs
                    }
                  }
                }));
              }}
            >
              Add Paragraph
            </Button>
          </div>

          {/* Focus Scope */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Focus Scope Title</label>
            <input
              type="text"
              value={config.aboutPage.journalDescription.focusScope.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                aboutPage: {
                  ...prev.aboutPage,
                  journalDescription: {
                    ...prev.aboutPage.journalDescription,
                    focusScope: { ...prev.aboutPage.journalDescription.focusScope, title: e.target.value }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] mb-3"
            />
            
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Focus Scope Items</label>
            {config.aboutPage.journalDescription.focusScope.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...config.aboutPage.journalDescription.focusScope.items];
                    newItems[index] = e.target.value;
                    setConfig(prev => ({
                      ...prev,
                      aboutPage: {
                        ...prev.aboutPage,
                        journalDescription: {
                          ...prev.aboutPage.journalDescription,
                          focusScope: {
                            ...prev.aboutPage.journalDescription.focusScope,
                            items: newItems
                          }
                        }
                      }
                    }));
                  }}
                  className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newItems = config.aboutPage.journalDescription.focusScope.items.filter((_, i) => i !== index);
                    setConfig(prev => ({
                      ...prev,
                      aboutPage: {
                        ...prev.aboutPage,
                        journalDescription: {
                          ...prev.aboutPage.journalDescription,
                          focusScope: {
                            ...prev.aboutPage.journalDescription.focusScope,
                            items: newItems
                          }
                        }
                      }
                    }));
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() => {
                const newItems = [...config.aboutPage.journalDescription.focusScope.items, ""];
                setConfig(prev => ({
                  ...prev,
                  aboutPage: {
                    ...prev.aboutPage,
                    journalDescription: {
                      ...prev.aboutPage.journalDescription,
                      focusScope: {
                        ...prev.aboutPage.journalDescription.focusScope,
                        items: newItems
                      }
                    }
                  }
                }));
              }}
            >
              Add Focus Area
            </Button>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-[var(--color-foreground)] mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Email</label>
                <input
                  type="email"
                  value={config.aboutPage.contact.email}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    aboutPage: {
                      ...prev.aboutPage,
                      contact: { ...prev.aboutPage.contact, email: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Phone</label>
                <input
                  type="tel"
                  value={config.aboutPage.contact.phone}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    aboutPage: {
                      ...prev.aboutPage,
                      contact: { ...prev.aboutPage.contact, phone: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Website</label>
                <input
                  type="url"
                  value={config.aboutPage.contact.website}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    aboutPage: {
                      ...prev.aboutPage,
                      contact: { ...prev.aboutPage.contact, website: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Editorial Office Name</label>
                <input
                  type="text"
                  value={config.aboutPage.contact.editorialOffice.name}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    aboutPage: {
                      ...prev.aboutPage,
                      contact: {
                        ...prev.aboutPage.contact,
                        editorialOffice: { ...prev.aboutPage.contact.editorialOffice, name: e.target.value }
                      }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            </div>

            {/* Editorial Office Address */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Editorial Office Address</label>
              {config.aboutPage.contact.editorialOffice.address.map((line, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => {
                      const newAddress = [...config.aboutPage.contact.editorialOffice.address];
                      newAddress[index] = e.target.value;
                      setConfig(prev => ({
                        ...prev,
                        aboutPage: {
                          ...prev.aboutPage,
                          contact: {
                            ...prev.aboutPage.contact,
                            editorialOffice: { ...prev.aboutPage.contact.editorialOffice, address: newAddress }
                          }
                        }
                      }));
                    }}
                    className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder={`Address line ${index + 1}`}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newAddress = config.aboutPage.contact.editorialOffice.address.filter((_, i) => i !== index);
                      setConfig(prev => ({
                        ...prev,
                        aboutPage: {
                          ...prev.aboutPage,
                          contact: {
                            ...prev.aboutPage.contact,
                            editorialOffice: { ...prev.aboutPage.contact.editorialOffice, address: newAddress }
                          }
                        }
                      }));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                onClick={() => {
                  const newAddress = [...config.aboutPage.contact.editorialOffice.address, ""];
                  setConfig(prev => ({
                    ...prev,
                    aboutPage: {
                      ...prev.aboutPage,
                      contact: {
                        ...prev.aboutPage.contact,
                        editorialOffice: { ...prev.aboutPage.contact.editorialOffice, address: newAddress }
                      }
                    }
                  }));
                }}
              >
                Add Address Line
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}