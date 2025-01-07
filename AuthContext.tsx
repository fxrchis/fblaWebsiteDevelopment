import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import { auth, ROLES, UserDocument } from '../config/firebase';
import { createUser, getUser } from '../utils/firebase';

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  isAdmin: boolean;
  isEmployer: boolean;
  isStudent: boolean;
  signup: (email: string, password: string, name: string, phone: string, role: string, company?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userData = await getUser(user.uid);
        setUserRole(userData?.role || null);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signup(email: string, password: string, name: string, phone: string, role: string, company?: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    const userData: Omit<UserDocument, 'uid'> = {
      email,
      name,
      phone,
      role: role as UserDocument['role'],
      createdAt: new Date().toISOString(),
      ...(company ? { company } : {}),
    };

    await createUser(userCredential.user.uid, userData);
    setUserRole(role);
  }

  async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUser(userCredential.user.uid);
    setUserRole(userData?.role || null);
  }

  async function logout() {
    await signOut(auth);
    setUserRole(null);
  }

  const value = {
    currentUser,
    userRole,
    isAdmin: userRole === ROLES.ADMIN,
    isEmployer: userRole === ROLES.EMPLOYER,
    isStudent: userRole === ROLES.STUDENT,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
