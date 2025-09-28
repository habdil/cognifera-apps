"use client";

import { useState } from 'react';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Upload, Plus, Edit3, Eye, Trash2, Calendar, FileText } from 'lucide-react';
import { toast } from 'sonner';

// Mock data untuk buku yang sudah disubmit
const mockSubmissions = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    author: 'John Doe',
    category: 'Technology',
    status: 'under_review',
    submittedAt: '2024-01-15',
    description: 'A comprehensive guide to machine learning fundamentals and applications.',
    pages: 250,
    language: 'English'
  },
  {
    id: '2',
    title: 'Sustainable Development Goals',
    author: 'Jane Smith',
    category: 'Environment',
    status: 'approved',
    submittedAt: '2024-01-10',
    description: 'Exploring sustainable practices for global development.',
    pages: 180,
    language: 'Indonesian'
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    author: 'Mike Johnson',
    category: 'Business',
    status: 'revision_needed',
    submittedAt: '2024-01-08',
    description: 'Modern approaches to digital marketing in the social media age.',
    pages: 320,
    language: 'English'
  }
];

const statusLabels = {
  'draft': { label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  'under_review': { label: 'Dalam Review', color: 'bg-yellow-100 text-yellow-800' },
  'revision_needed': { label: 'Perlu Revisi', color: 'bg-orange-100 text-orange-800' },
  'approved': { label: 'Disetujui', color: 'bg-green-100 text-green-800' },
  'rejected': { label: 'Ditolak', color: 'bg-red-100 text-red-800' },
  'published': { label: 'Diterbitkan', color: 'bg-blue-100 text-blue-800' }
};

export default function PublishBookPage() {
  const { user, loading, error } = useUnifiedAuth('READER');
  const [showForm, setShowForm] = useState(false);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    pages: '',
    language: 'Indonesian',
    manuscript: null as File | null
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      toast.error('Silakan lengkapi semua field yang wajib diisi');
      return;
    }

    // Simulate submission
    const newSubmission = {
      id: Date.now().toString(),
      title: formData.title,
      author: user.fullName,
      category: formData.category,
      status: 'draft' as const,
      submittedAt: new Date().toISOString().split('T')[0],
      description: formData.description,
      pages: parseInt(formData.pages) || 0,
      language: formData.language
    };

    setSubmissions([newSubmission, ...submissions]);
    setFormData({
      title: '',
      category: '',
      description: '',
      pages: '',
      language: 'Indonesian',
      manuscript: null
    });
    setShowForm(false);
    toast.success('Proposal buku berhasil disubmit!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Ukuran file maksimal 10MB');
        return;
      }
      setFormData({ ...formData, manuscript: file });
      toast.success('File berhasil dipilih');
    }
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(submissions.filter(sub => sub.id !== id));
    toast.success('Submission berhasil dihapus');
  };

  return (
    <DashboardLayout userRole="READER" userName={user.fullName}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Terbitkan Buku</h1>
            <p className="text-gray-600 mt-1">
              Submit proposal buku Anda untuk ditinjau tim editorial Cognifera
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Submit Proposal Baru</span>
          </Button>
        </div>

        {/* Submission Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Proposal Buku</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Buku *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Masukkan judul buku"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih kategori</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Science">Science</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Environment">Environment</option>
                    <option value="Social">Social</option>
                    <option value="Other">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimasi Halaman
                  </label>
                  <Input
                    type="number"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    placeholder="Contoh: 200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bahasa
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Indonesian">Bahasa Indonesia</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Buku *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jelaskan tentang buku Anda, target pembaca, dan nilai yang akan diberikan..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Manuscript (Opsional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 mb-2">
                    {formData.manuscript ? formData.manuscript.name : 'Drag & drop file atau klik untuk browse'}
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="manuscript-upload"
                  />
                  <label
                    htmlFor="manuscript-upload"
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    Pilih File
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, atau DOCX (Max 10MB)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Button type="submit" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Submit Proposal</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Proposal Saya</h2>
            <p className="text-gray-600 text-sm mt-1">
              Daftar proposal buku yang telah Anda submit
            </p>
          </div>

          {submissions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {submissions.map(submission => (
                <div key={submission.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {submission.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusLabels[submission.status as keyof typeof statusLabels].color}`}>
                          {statusLabels[submission.status as keyof typeof statusLabels].label}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {submission.description}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Submit: {new Date(submission.submittedAt).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{submission.pages} halaman</span>
                        </div>
                        <span>•</span>
                        <span>{submission.category}</span>
                        <span>•</span>
                        <span>{submission.language}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Lihat</span>
                      </Button>
                      {(submission.status === 'draft' || submission.status === 'revision_needed') && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center space-x-1"
                        >
                          <Edit3 className="h-4 w-4" />
                          <span>Edit</span>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteSubmission(submission.id)}
                        className="flex items-center space-x-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Hapus</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum Ada Proposal
              </h3>
              <p className="text-gray-500 mb-4">
                Mulai submit proposal buku pertama Anda
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Proposal</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}