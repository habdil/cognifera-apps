import { memo, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff, RefreshCw, Copy, Check, ChevronDown } from 'lucide-react';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (userData: { fullName: string; email: string; role: string; password: string; bio?: string }) => void;
  existingEmails?: string[];
}

export const AddUserDialog = memo(({ open, onOpenChange, onAddUser, existingEmails = [] }: AddUserDialogProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('AUTHOR'); // Default to AUTHOR
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});

  // Generate random password
  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let newPassword = '';

    // Ensure at least one of each type
    newPassword += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
    newPassword += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
    newPassword += '0123456789'[Math.floor(Math.random() * 10)]; // Number
    newPassword += '!@#$%^&*'[Math.floor(Math.random() * 8)]; // Special char

    // Fill the rest
    for (let i = 4; i < length; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password
    return newPassword.split('').sort(() => Math.random() - 0.5).join('');
  };

  // Generate password on mount
  useEffect(() => {
    if (open && !password) {
      setPassword(generatePassword());
    }
  }, [open]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFullName('');
        setEmail('');
        setRole('AUTHOR');
        setPassword('');
        setShowPassword(false);
        setBio('');
        setErrors({});
        setIsSubmitting(false);
        setIsCopied(false);
      }, 200); // Delay to avoid visual glitch
    }
  }, [open]);

  const validateForm = (): boolean => {
    const newErrors: { fullName?: string; email?: string; password?: string } = {};

    // Validate full name
    if (!fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Nama lengkap minimal 3 karakter';
    } else if (fullName.trim().length > 100) {
      newErrors.fullName = 'Nama lengkap maksimal 100 karakter';
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Format email tidak valid';
      } else if (existingEmails.includes(email.toLowerCase())) {
        newErrors.email = 'Email sudah terdaftar';
      }
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'Password harus diisi';
    } else if (password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setIsCopied(true);
      toast.success('Password berhasil disalin');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Gagal menyalin password');
    }
  };

  const handleGenerateNewPassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    toast.success('Password baru berhasil digenerate');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Mohon perbaiki error pada form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      onAddUser({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        role,
        password: password,
        bio: bio.trim()
      });

      toast.success('User berhasil ditambahkan', {
        description: `${fullName} telah ditambahkan sebagai ${role === 'AUTHOR' ? 'Author' : 'Client'}. Credential akan dikirim ke email.`
      });

      onOpenChange(false);
    } catch (error) {
      toast.error('Gagal menambahkan user', {
        description: 'Terjadi kesalahan saat menambahkan user'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (fullName || email || bio || password !== generatePassword()) {
      if (confirm('Perubahan yang belum disimpan akan hilang. Lanjutkan?')) {
        onOpenChange(false);
      }
    } else {
      onOpenChange(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah User Baru</DialogTitle>
          <DialogDescription>
            Isi form di bawah untuk menambahkan user baru ke sistem
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Nama Lengkap <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="Masukkan nama lengkap"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              onKeyPress={handleKeyPress}
              disabled={isSubmitting}
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              onKeyPress={handleKeyPress}
              disabled={isSubmitting}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">
              Role <span className="text-red-500">*</span>
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between hover:bg-[var(--color-muted)]"
                  disabled={isSubmitting}
                >
                  <span className="text-left flex-1">
                    {role === 'AUTHOR' ? 'Author - Dapat membuat dan publish artikel' : 'Client - Dapat membaca dan comment artikel'}
                  </span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full z-[10001] bg-white"
                align="start"
                style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
              >
                <DropdownMenuItem
                  onClick={() => setRole('AUTHOR')}
                  className="cursor-pointer hover:bg-[var(--color-muted)]"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">Author</span>
                    <span className="text-xs text-[var(--color-muted-foreground)]">
                      Dapat membuat dan publish artikel
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setRole('READER')}
                  className="cursor-pointer hover:bg-[var(--color-muted)]"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">Client</span>
                    <span className="text-xs text-[var(--color-muted-foreground)]">
                      Dapat membaca dan comment artikel
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {role === 'AUTHOR' ? '📝 Author dapat menulis artikel' : '👤 Client hanya bisa membaca'}
            </p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password akan digenerate otomatis"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  disabled={isSubmitting}
                  className={`pr-10 font-mono ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyPassword}
                disabled={isSubmitting || !password}
                title="Copy password"
              >
                {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleGenerateNewPassword}
                disabled={isSubmitting}
                title="Generate password baru"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
            <p className="text-xs text-[var(--color-muted-foreground)]">
              💡 Password akan dikirim ke email user secara otomatis
            </p>
          </div>

          {/* Bio (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="bio">
              Bio <span className="text-[var(--color-muted-foreground)] text-xs">(Opsional)</span>
            </Label>
            <textarea
              id="bio"
              placeholder="Deskripsi singkat tentang user..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={isSubmitting}
              rows={3}
              className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {bio.length}/500 karakter
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menambahkan...
              </>
            ) : (
              'Tambah User'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

AddUserDialog.displayName = 'AddUserDialog';