"use client";

import { useState } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Journal {
  id: string;
  title: string;
  author: string;
  status: "draft" | "review" | "published";
  category: string;
  createdAt: string;
  views: number;
}

const mockJournals: Journal[] = [
  {
    id: "1",
    title: "Advanced Machine Learning Techniques in Data Science",
    author: "Dr. John Smith",
    status: "published",
    category: "Computer Science",
    createdAt: "2024-01-15",
    views: 1250
  },
  {
    id: "2", 
    title: "Climate Change Impact on Indonesian Agriculture",
    author: "Prof. Sarah Johnson",
    status: "review",
    category: "Environmental Science",
    createdAt: "2024-01-20",
    views: 850
  },
  {
    id: "3",
    title: "Digital Transformation in Small Medium Enterprises",
    author: "Dr. Ahmad Rahman",
    status: "draft",
    category: "Business",
    createdAt: "2024-01-25",
    views: 0
  }
];

export function JournalList() {
  const [journals] = useState<Journal[]>(mockJournals);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusColor = (status: Journal["status"]) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJournals = journals.filter(journal => {
    const matchesSearch = journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || journal.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Journal Management</h1>
          <p className="text-[var(--color-muted-foreground)]">Manage and monitor all research journals</p>
        </div>
        <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Journal
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
          <input
            type="text"
            placeholder="Search journals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="review">Under Review</option>
            <option value="draft">Draft</option>
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-[var(--color-foreground)]">{journals.length}</div>
          <div className="text-sm text-[var(--color-muted-foreground)]">Total Journals</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-green-600">
            {journals.filter(j => j.status === "published").length}
          </div>
          <div className="text-sm text-[var(--color-muted-foreground)]">Published</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-yellow-600">
            {journals.filter(j => j.status === "review").length}
          </div>
          <div className="text-sm text-[var(--color-muted-foreground)]">Under Review</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-gray-600">
            {journals.filter(j => j.status === "draft").length}
          </div>
          <div className="text-sm text-[var(--color-muted-foreground)]">Draft</div>
        </div>
      </div>

      {/* Journal Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-muted)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
                  Title & Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredJournals.map((journal) => (
                <tr key={journal.id} className="hover:bg-[var(--color-muted)]/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-[var(--color-foreground)]">
                        {journal.title}
                      </div>
                      <div className="text-sm text-[var(--color-muted-foreground)]">
                        by {journal.author}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-foreground)]">
                    {journal.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(journal.status)}`}>
                      {journal.status.charAt(0).toUpperCase() + journal.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-muted-foreground)]">
                    {new Date(journal.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-foreground)]">
                    {journal.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}