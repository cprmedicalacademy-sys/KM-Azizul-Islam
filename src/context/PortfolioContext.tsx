import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProfileData,
  SkillItem,
  ExperienceItem,
  EducationItem,
  ServiceItem,
  ProjectItem,
  INITIAL_PROFILE,
  INITIAL_SKILLS,
  INITIAL_EXPERIENCES,
  INITIAL_EDUCATION,
  INITIAL_SERVICES,
  INITIAL_PROJECTS
} from '../data/portfolioData';

interface PortfolioContextType {
  profile: ProfileData;
  skills: SkillItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  isAdmin: boolean;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateProfile: (updated: Partial<ProfileData>) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  updateSkill: (skill: SkillItem) => void;
  updateExperience: (exp: ExperienceItem) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (json: string) => boolean;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const STORAGE_KEY_PREFIX = 'aio_portfolio_';
const ADMIN_PASSCODE = '2926';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}profile`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_PROFILE,
          ...parsed,
          facebook: parsed.facebook || INITIAL_PROFILE.facebook,
          avatar: INITIAL_PROFILE.avatar,
          cprCardImage: INITIAL_PROFILE.cprCardImage,
          officeAddress: parsed.officeAddress || INITIAL_PROFILE.officeAddress,
        };
      }
      return INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}skills`);
      return saved ? JSON.parse(saved) : INITIAL_SKILLS;
    } catch {
      return INITIAL_SKILLS;
    }
  });

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}experiences`);
      if (saved) {
        const parsed: ExperienceItem[] = JSON.parse(saved);
        return parsed.map(exp => (exp.id === 'cpr-medical' ? INITIAL_EXPERIENCES[0] : exp));
      }
      return INITIAL_EXPERIENCES;
    } catch {
      return INITIAL_EXPERIENCES;
    }
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}education`);
      return saved ? JSON.parse(saved) : INITIAL_EDUCATION;
    } catch {
      return INITIAL_EDUCATION;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}services`);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}projects`);
      if (saved) {
        const parsed: ProjectItem[] = JSON.parse(saved);
        return parsed.map(p => (p.id === 'cpr-academy-brand' ? INITIAL_PROJECTS[0] : p));
      }
      return INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(`${STORAGE_KEY_PREFIX}auth`) === 'true';
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}profile`, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}projects`, JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}skills`, JSON.stringify(skills));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}experiences`, JSON.stringify(experiences));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [experiences]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const loginAdmin = (password: string): boolean => {
    if (password.trim() === ADMIN_PASSCODE) {
      setIsAdmin(true);
      sessionStorage.setItem(`${STORAGE_KEY_PREFIX}auth`, 'true');
      showNotification('Admin Authenticated Successfully');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(`${STORAGE_KEY_PREFIX}auth`);
    showNotification('Logged out from Admin Dashboard');
  };

  const updateProfile = (updated: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    showNotification('Profile information updated');
  };

  const addProject = (projectData: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...projectData,
      id: `project-${Date.now()}`
    };
    setProjects(prev => [newProject, ...prev]);
    showNotification(`Added new project: ${newProject.title}`);
  };

  const updateProject = (project: ProjectItem) => {
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    showNotification(`Updated project: ${project.title}`);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showNotification('Project deleted from portfolio');
  };

  const updateSkill = (skill: SkillItem) => {
    setSkills(prev => prev.map(s => s.id === skill.id ? skill : s));
    showNotification(`Skill ${skill.name} updated`);
  };

  const updateExperience = (exp: ExperienceItem) => {
    setExperiences(prev => prev.map(e => e.id === exp.id ? exp : e));
    showNotification(`Experience at ${exp.company} updated`);
  };

  const resetToDefaults = () => {
    setProfile(INITIAL_PROFILE);
    setSkills(INITIAL_SKILLS);
    setExperiences(INITIAL_EXPERIENCES);
    setEducation(INITIAL_EDUCATION);
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    localStorage.clear();
    showNotification('Reset all content to original defaults');
  };

  const exportDataJson = (): string => {
    const payload = {
      profile,
      skills,
      experiences,
      education,
      services,
      projects,
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.skills) setSkills(parsed.skills);
      if (parsed.experiences) setExperiences(parsed.experiences);
      if (parsed.education) setEducation(parsed.education);
      if (parsed.services) setServices(parsed.services);
      if (parsed.projects) setProjects(parsed.projects);
      showNotification('Portfolio data successfully imported');
      return true;
    } catch {
      showNotification('Invalid JSON file format');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        experiences,
        education,
        services,
        projects,
        isAdmin,
        isAdminModalOpen,
        openAdminModal: () => setIsAdminModalOpen(true),
        closeAdminModal: () => setIsAdminModalOpen(false),
        loginAdmin,
        logoutAdmin,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        updateSkill,
        updateExperience,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        notification,
        showNotification
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
