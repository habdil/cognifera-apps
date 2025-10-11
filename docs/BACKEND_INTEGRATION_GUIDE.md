# Backend Integration Guide - Admin User Management

## 📋 Overview

Dokumentasi ini berisi panduan lengkap untuk backend developer dalam mengintegrasikan API backend dengan frontend Admin User Management yang sudah dibuat.

**Module**: Admin User Management
**Frontend Framework**: Next.js 15 (App Router)
**UI Components**: shadcn/ui + Radix UI
**State Management**: React hooks (useState, useMemo)
**Notifications**: Sonner Toast

---

## 📁 Files Yang Perlu Diintegrasikan

### 1. Main Component
```
components/dashboard/roles/admin/AdminUsersContent.tsx
```
**Fungsi**: Main component untuk user management dengan CRUD operations

### 2. Modular Sub-Components
```
components/dashboard/roles/admin/users/
├── AddUserDialog.tsx          # Dialog tambah user baru
├── UserTableRow.tsx            # Row component untuk table
├── UserFilters.tsx             # Search & filter component
├── UserStatsCards.tsx          # Stats cards (Total, Authors, etc)
├── UserPagination.tsx          # Pagination component
├── UserAvatar.tsx              # Avatar dengan initials
├── UserEmptyState.tsx          # Empty state component
└── utils.ts                    # Utility functions (formatDate, etc)
```

### 3. Data Models
```
mock-data/users.ts              # Mock data & TypeScript interfaces
```

### 4. Type Definitions
```typescript
interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'AUTHOR' | 'READER';
  status: 'ACTIVE' | 'BLOCKED';
  joinDate: string;              // ISO date string
  lastLogin: string;             // ISO datetime string
  avatar?: string;               // Optional: URL ke avatar image
  bio?: string;
  articlesCount?: number;        // Untuk AUTHOR role
  totalViews?: number;           // Untuk AUTHOR role
}
```

---

## 🔌 API Endpoints Yang Dibutuhkan

### 1. **GET /api/users**
Fetch semua users dengan filter & pagination

**Query Parameters:**
```typescript
{
  page?: number;              // Default: 1
  limit?: number;             // Default: 10
  search?: string;            // Search by name/email
  role?: 'ADMIN' | 'AUTHOR' | 'READER' | 'all';  // Default: 'all'
  status?: 'ACTIVE' | 'BLOCKED' | 'all';          // Default: 'all'
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    users: UserData[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}
```

**Frontend Implementation Location:**
- File: `AdminUsersContent.tsx`
- Line: 34-44 (Filter logic)
- State: `users`, `searchQuery`, `roleFilter`, `statusFilter`

---

### 2. **POST /api/users**
Create new user

**Request Body:**
```typescript
{
  fullName: string;           // Required, min 3 chars, max 100 chars
  email: string;              // Required, valid email, unique
  role: 'AUTHOR' | 'READER';  // Required (Admin tidak bisa dibuat via form)
  password: string;           // Required, min 8 chars
  bio?: string;               // Optional, max 500 chars
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    user: UserData;           // Newly created user
    emailSent: boolean;       // Email notification status
  };
  message: string;
}
```

**Important Notes:**
- ✅ Password harus di-hash (bcrypt recommended)
- ✅ Kirim email ke user dengan credentials
- ✅ Email sudah harus unique (check duplicate)
- ✅ Default status: 'ACTIVE'
- ✅ Set joinDate & lastLogin ke current timestamp

**Frontend Implementation Location:**
- Component: `AddUserDialog.tsx` (line 67-97)
- Handler: `handleAddUser` in `AdminUsersContent.tsx` (line 102-120)
- Validation: `validateForm` in `AddUserDialog.tsx` (line 39-65)

**Email Template Variables:**
```typescript
{
  fullName: string;
  email: string;
  password: string;           // Plain text password (hanya di email)
  role: string;
  loginUrl: string;           // URL ke login page
}
```

---

### 3. **PATCH /api/users/:userId/status**
Toggle user status (Block/Unblock)

**Request Body:**
```typescript
{
  status: 'ACTIVE' | 'BLOCKED';
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    user: UserData;           // Updated user
  };
  message: string;
}
```

**Frontend Implementation Location:**
- Handler: `handleToggleBlock` in `AdminUsersContent.tsx` (line 61-73)
- Component: `UserTableRow.tsx` (line 82-97 - Ban/CheckCircle button)

---

### 4. **DELETE /api/users/:userId**
Delete user permanently

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Frontend Implementation Location:**
- Handler: `handleDelete` in `AdminUsersContent.tsx` (line 81-87)
- Dialog: Delete confirmation dialog (line 215-266)
- Confirmation: `confirmDelete` function (line 89-100)

**Important Notes:**
- ⚠️ Soft delete recommended (mark as deleted, tidak hapus dari DB)
- ⚠️ Cascade delete relations (articles, comments, etc)
- ⚠️ Atau set articles author ke NULL/[DELETED]

---

### 5. **GET /api/users/stats**
Get user statistics for dashboard cards

**Response:**
```typescript
{
  success: boolean;
  data: {
    totalUsers: number;
    activeAuthors: number;
    activeClients: number;
    blockedUsers: number;
  };
  message?: string;
}
```

**Frontend Implementation Location:**
- Component: `UserStatsCards.tsx`
- Calculation: `stats` in `AdminUsersContent.tsx` (line 29-37)

---

## 🔄 Integration Steps

### Step 1: Create API Service Layer

Create file: `lib/api/users.ts`

```typescript
import { UserData } from '@/mock-data/users';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface CreateUserData {
  fullName: string;
  email: string;
  role: string;
  password: string;
  bio?: string;
}

// Fetch all users
export async function fetchUsers(params: FetchUsersParams) {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.role && params.role !== 'all') queryParams.append('role', params.role);
  if (params.status && params.status !== 'all') queryParams.append('status', params.status);

  const response = await fetch(`${API_BASE_URL}/users?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

// Create new user
export async function createUser(data: CreateUserData) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  return response.json();
}

// Toggle user status
export async function toggleUserStatus(userId: string, status: 'ACTIVE' | 'BLOCKED') {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update user status');
  }

  return response.json();
}

// Delete user
export async function deleteUser(userId: string) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }

  return response.json();
}

// Get user stats
export async function fetchUserStats() {
  const response = await fetch(`${API_BASE_URL}/users/stats`);

  if (!response.ok) {
    throw new Error('Failed to fetch user stats');
  }

  return response.json();
}
```

---

### Step 2: Update AdminUsersContent.tsx

Replace mock data dengan API calls:

```typescript
// Replace this section (line 19-27)
const [users, setUsers] = useState<UserData[]>(mockUsers);

// With:
const [users, setUsers] = useState<UserData[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [total, setTotal] = useState(0);

// Add useEffect to fetch data
useEffect(() => {
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const result = await fetchUsers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        role: roleFilter,
        status: statusFilter,
      });

      setUsers(result.data.users);
      setTotal(result.data.total);
    } catch (error) {
      toast.error('Gagal memuat data users');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  loadUsers();
}, [currentPage, searchQuery, roleFilter, statusFilter]);
```

---

### Step 3: Update Handler Functions

**handleAddUser:**
```typescript
const handleAddUser = async (userData: { fullName: string; email: string; role: string; password: string; bio?: string }) => {
  try {
    const result = await createUser(userData);

    // Refresh user list
    const usersResult = await fetchUsers({
      page: 1,
      limit: itemsPerPage,
    });
    setUsers(usersResult.data.users);
    setCurrentPage(1);

    toast.success('User berhasil ditambahkan', {
      description: result.data.emailSent
        ? 'Credential telah dikirim ke email user'
        : 'User berhasil dibuat, namun email gagal terkirim'
    });
  } catch (error: any) {
    toast.error('Gagal menambahkan user', {
      description: error.message
    });
  }
};
```

**handleToggleBlock:**
```typescript
const handleToggleBlock = async (userId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return;

  const newStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';

  try {
    await toggleUserStatus(userId, newStatus);

    // Update local state
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, status: newStatus } : u
    ));

    toast.success(
      newStatus === 'BLOCKED' ? 'User berhasil diblokir' : 'User berhasil diaktifkan kembali'
    );
  } catch (error: any) {
    toast.error('Gagal mengubah status user', {
      description: error.message
    });
  }
};
```

**confirmDelete:**
```typescript
const confirmDelete = async () => {
  if (!userToDelete) return;

  try {
    await deleteUser(userToDelete.id);

    // Remove from local state
    setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
    setIsDeleteDialogOpen(false);

    toast.success('User berhasil dihapus', {
      description: `${userToDelete.fullName} telah dihapus dari sistem`
    });

    setUserToDelete(null);
  } catch (error: any) {
    toast.error('Gagal menghapus user', {
      description: error.message
    });
  }
};
```

---

## 🔐 Authentication & Authorization

### Headers Required
```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,  // JWT token
}
```

### Permission Checks
- ✅ Only users with role 'ADMIN' can access these endpoints
- ✅ Check permissions on backend for every request
- ✅ Return 403 Forbidden if user doesn't have permission

---

## 📧 Email Notification

### Email Service Integration

**When**: After creating new user (POST /api/users)

**Email Content Template:**

```html
Subject: Akun Cognifera Anda Telah Dibuat

Halo {{fullName}},

Akun Anda di Cognifera telah berhasil dibuat oleh Administrator.

Berikut adalah kredensial login Anda:
- Email: {{email}}
- Password: {{password}}
- Role: {{role}}

Silakan login di: {{loginUrl}}

Untuk keamanan, kami sarankan Anda mengganti password setelah login pertama kali.

Terima kasih,
Tim Cognifera
```

**Email Variables:**
```typescript
{
  fullName: string;
  email: string;
  password: string;        // Plain text password
  role: string;            // "Author" atau "Client"
  loginUrl: string;        // e.g., "https://cognifera.com/login"
}
```

---

## 🎨 UI States & Loading

### Loading States
```typescript
// Add loading state in components
const [isLoading, setIsLoading] = useState(false);

// Show skeleton/loading spinner during API calls
{isLoading ? (
  <Skeleton className="h-10 w-full" />
) : (
  <UserTableRow ... />
)}
```

### Error Handling
```typescript
try {
  // API call
} catch (error: any) {
  // Show user-friendly error
  toast.error('Judul Error', {
    description: error.message || 'Terjadi kesalahan'
  });

  // Log for debugging
  console.error('Error details:', error);
}
```

---

## 🧪 Testing Checklist

### Frontend Testing
- [ ] Search users by name
- [ ] Search users by email
- [ ] Filter by role (ADMIN/AUTHOR/READER)
- [ ] Filter by status (ACTIVE/BLOCKED)
- [ ] Pagination works correctly
- [ ] Add new user (Author)
- [ ] Add new user (Client)
- [ ] Email validation (duplicate check)
- [ ] Password auto-generation
- [ ] Toggle user status (Block/Unblock)
- [ ] Delete user confirmation
- [ ] Success/error toast notifications
- [ ] Stats cards update after actions
- [ ] Empty state when no results

### Backend Testing
- [ ] GET /api/users returns correct data
- [ ] POST /api/users creates user successfully
- [ ] POST /api/users validates email uniqueness
- [ ] POST /api/users sends email notification
- [ ] PATCH /api/users/:id/status updates status
- [ ] DELETE /api/users/:id removes user
- [ ] GET /api/users/stats returns correct counts
- [ ] All endpoints check authentication
- [ ] All endpoints check authorization (ADMIN only)
- [ ] Error responses are consistent

---

## 📝 Example .env Configuration

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cognifera

# Email Service (example with SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@cognifera.com

# Authentication
JWT_SECRET=your_jwt_secret_key
```

---

## 🚀 Deployment Notes

1. **Environment Variables**: Pastikan semua env vars sudah di-set di production
2. **CORS**: Configure CORS untuk allow requests dari frontend domain
3. **Rate Limiting**: Implement rate limiting untuk prevent abuse
4. **Logging**: Log semua user management actions untuk audit trail
5. **Backup**: Backup database before any delete operations

---

## 📞 Support & Questions

Jika ada pertanyaan atau issue saat integrasi, silakan kontak:
- Frontend Developer: [Your Name]
- Documentation: `/docs/BACKEND_INTEGRATION_GUIDE.md`

---

**Last Updated**: 2025-09-30
**Version**: 1.0.0