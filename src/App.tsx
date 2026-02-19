/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Users, 
  MessageSquare, 
  LogOut, 
  ChevronLeft, 
  Camera, 
  Plus, 
  Search,
  MoreHorizontal,
  Stethoscope,
  Calendar,
  FileText,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type Screen = 'LOGIN' | 'DASHBOARD' | 'PATIENT_LIST' | 'PATIENT_DETAIL' | 'ASSESSMENT' | 'PHOTO_ARCHIVE';

interface Patient {
  id: string;
  name: string;
  no: string;
  gender: 'Kadın' | 'Erkek';
  birthDate: string;
  lastVisit: string;
  region: string;
  anamnesis: string;
}

interface DentalPhoto {
  id: string;
  url: string;
  label: string;
}

// --- Mock Data ---

const MOCK_PATIENTS: Patient[] = [
  { 
    id: '1', 
    name: 'Ayşe Yılmaz', 
    no: '75', 
    gender: 'Kadın', 
    birthDate: '2016 / 8 yaş', 
    lastVisit: '2024-02-15',
    region: 'Merkez / SİVAS',
    anamnesis: 'Hastanın herhangi bir sistemik rahatsızlığı bulunmamaktadır. Devamlı kullandığı ilaç yoktur. Bilinen alerji hikayesi yoktur. Sol üst arkadaki dişinin geç sürmesi sebebiyle kliniğimize başvurmuştur. Hasta daha önce diş tedavisi ilgili herhangi bir kliniğe başvurmamıştır.'
  },
  { 
    id: '2', 
    name: 'Mehmet Demir', 
    no: '780581', 
    gender: 'Erkek', 
    birthDate: '1985-11-20', 
    lastVisit: '2024-02-10',
    region: 'Merkez / ANKARA',
    anamnesis: 'Genel kontrol amaçlı başvuru.'
  },
];

const DENTAL_PHOTOS: DentalPhoto[] = [
  { id: 'p1', url: 'https://picsum.photos/seed/dental1/800/600', label: 'Ön Ağız İçi Fotoğraf' },
  { id: 'p2', url: 'https://picsum.photos/seed/dental2/800/600', label: 'Üst Okluzal Fotoğraf' },
  { id: 'p3', url: 'https://picsum.photos/seed/dental3/800/600', label: 'Alt Okluzal Fotoğraf' },
];

// --- Components ---

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }) => {
  const variants = {
    primary: 'bg-[#E31E24] text-white hover:bg-[#C4191F]',
    secondary: 'bg-white text-[#E31E24] hover:bg-gray-50',
    outline: 'border-2 border-[#E31E24] text-[#E31E24] hover:bg-red-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  return (
    <button 
      className={cn(
        'px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden', className)}>
    {children}
  </div>
);

// --- Screens ---

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm bg-white rounded-[40px] p-10 shadow-xl space-y-10 border border-gray-200"
    >
      <div className="text-center">
        <h1 className="text-3xl font-medium text-gray-800 tracking-wide">TeleDiş Giriş</h1>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <select className="w-full px-5 py-4 rounded-2xl border-none bg-gray-100 text-blue-400 font-medium outline-none appearance-none cursor-pointer">
            <option>Hekim Girişi</option>
            <option>Yönetici Girişi</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-2 h-2 border-r-2 border-b-2 border-blue-400 rotate-45" />
          </div>
        </div>
        
        <input 
          type="text" 
          placeholder="Kullanıcı Adı"
          className="w-full px-5 py-4 rounded-2xl border-none bg-gray-100 text-gray-600 outline-none placeholder-gray-400"
        />
        
        <input 
          type="password" 
          placeholder="Şifre"
          className="w-full px-5 py-4 rounded-2xl border-none bg-gray-100 text-gray-600 outline-none placeholder-gray-400"
        />
        
        <div className="pt-4">
          <button 
            onClick={onLogin}
            className="w-full py-4 rounded-full bg-[#E31E24] text-white font-bold text-lg shadow-lg active:scale-95 transition-transform"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);

const DashboardScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const handleFeedback = () => {
    const feedback = prompt('Geri bildiriminizi yazın:');
    if (feedback) alert('Geri bildiriminiz iletildi. Teşekkürler!');
  };

  const handleProfile = () => {
    alert('Profil düzenleme yakında aktif olacaktır.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E31E24] p-8 items-center justify-center space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-white space-y-4"
      >
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#E31E24] rounded-full mb-1" />
            <div className="w-16 h-10 bg-[#E31E24] rounded-t-full" />
          </div>
        </div>
        <h2 className="text-2xl font-medium tracking-wide">Telekonsültan Hekim 1</h2>
      </motion.div>

      <div className="w-full max-w-xs space-y-6">
        <button 
          onClick={() => onNavigate('PATIENT_LIST')}
          className="w-full flex items-center text-white text-xl font-medium space-x-4 group active:opacity-70 transition-opacity"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <Users className="w-7 h-7" />
          </div>
          <span>Hasta Listesi</span>
        </button>

        <button 
          onClick={handleProfile}
          className="w-full flex items-center text-white text-xl font-medium space-x-4 group active:opacity-70 transition-opacity"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>
          <span>Kullanıcı Profili</span>
        </button>

        <button 
          onClick={handleFeedback}
          className="w-full flex items-center text-white text-xl font-medium space-x-4 group active:opacity-70 transition-opacity"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <FileText className="w-7 h-7" />
          </div>
          <span>Geri Bildirim</span>
        </button>

        <button 
          onClick={() => onNavigate('LOGIN')}
          className="w-full flex items-center text-white text-xl font-medium space-x-4 group active:opacity-70 transition-opacity"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <LogOut className="w-7 h-7" />
          </div>
          <span>Oturum Kapat</span>
        </button>
      </div>
    </div>
  );
};

const PatientListScreen = ({ onBack, onSelect }: { onBack: () => void; onSelect: (p: Patient) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.no.includes(searchTerm)
  );

  const handleAddPatient = () => {
    alert('Yeni hasta ekleme formu yakında eklenecektir.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white p-6 pt-12 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Hasta Listesi</h2>
          <button onClick={handleAddPatient} className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
            <Plus className="w-6 h-6 text-[#E31E24]" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Hasta adı veya protokol no..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
          />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
          <motion.div 
            key={patient.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(patient)}
          >
            <Card className="p-4 flex items-center cursor-pointer hover:border-red-200 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <User className="text-gray-400 w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{patient.name}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">No: {patient.no}</span>
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {patient.lastVisit}</span>
                </div>
              </div>
              <ChevronRight className="text-gray-300 w-5 h-5" />
            </Card>
          </motion.div>
        )) : (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Hasta bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PatientDetailScreen = ({ patient, onBack, onNavigate }: { patient: Patient; onBack: () => void; onNavigate: (s: Screen) => void }) => {
  const handleArchive = () => {
    onNavigate('PHOTO_ARCHIVE');
  };

  const handleMore = () => {
    const action = confirm('Hasta kaydını silmek istiyor musunuz?');
    if (action) alert('Bu işlem için yetkiniz bulunmamaktadır.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white p-6 pt-12 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Hasta Bilgileri</h2>
          <button onClick={handleMore} className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
            <User className="text-[#E31E24] w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">Protokol No: <span className="text-gray-900 font-medium">{patient.no}</span></p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Cinsiyet</p>
          <p className="font-semibold text-gray-900">{patient.gender}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Doğum Tarihi</p>
          <p className="font-semibold text-gray-900">{patient.birthDate}</p>
        </div>
      </div>

      <div className="px-6 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[#E31E24]" />
          Muayene ve Değerlendirme
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('ASSESSMENT')}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center group"
          >
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-100 transition-colors">
              <Stethoscope className="text-[#E31E24] w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-gray-900">Dental Değerlendirme</p>
              <p className="text-xs text-gray-500">Diş haritası ve genel durum</p>
            </div>
            <ChevronRight className="text-gray-300 w-5 h-5" />
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={handleArchive}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
              <Camera className="text-blue-600 w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-gray-900">Fotoğraf Arşivi</p>
              <p className="text-xs text-gray-500">Ağız içi ve dışı görüntüler</p>
            </div>
            <ChevronRight className="text-gray-300 w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const PhotoArchiveScreen = ({ patient, onBack }: { patient: Patient; onBack: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showAnamnesis, setShowAnamnesis] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const nextPhoto = () => setCurrentIndex((prev) => (prev + 1) % DENTAL_PHOTOS.length);
  const prevPhoto = () => setCurrentIndex((prev) => (prev - 1 + DENTAL_PHOTOS.length) % DENTAL_PHOTOS.length);

  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      {/* Header */}
      <div className="bg-[#E31E24] p-4 pt-10 flex items-center justify-between z-20">
        <button onClick={onBack} className="text-white">
          <div className="space-y-1.5">
            <div className="w-6 h-0.5 bg-white" />
            <div className="w-6 h-0.5 bg-white" />
            <div className="w-6 h-0.5 bg-white" />
          </div>
        </button>
        <h2 className="text-white font-medium">Fotoğraf Arşivi</h2>
        <div className="w-6" />
      </div>

      {/* Main Photo View */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={DENTAL_PHOTOS[currentIndex].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <img 
              src={DENTAL_PHOTOS[currentIndex].url} 
              alt={DENTAL_PHOTOS[currentIndex].label}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="bg-black/50 text-white px-4 py-1 rounded-full text-sm">
                {DENTAL_PHOTOS[currentIndex].label}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-3 rounded-full text-white">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-3 rounded-full text-white">
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Info Toggle Button */}
        <button 
          onClick={() => setShowInfo(true)}
          className="absolute top-4 left-4 bg-black/40 p-2 rounded-lg text-white"
        >
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="bg-gray-200 p-4 space-y-4 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-bold">Resim Ekle</span>
            <input type="text" placeholder="Kısa Açıklama" className="bg-white px-3 py-1 rounded border border-gray-300 text-xs w-24" />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <button 
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-bold border border-blue-200"
              >
                Choose Files
              </button>
              
              {showAddMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                  <button className="w-full p-3 text-left text-xs hover:bg-gray-50 flex items-center space-x-2">
                    <FileText className="w-4 h-4" /> <span>Fotoğraf Arşivi</span>
                  </button>
                  <button className="w-full p-3 text-left text-xs hover:bg-gray-50 flex items-center space-x-2 border-t">
                    <Camera className="w-4 h-4" /> <span>Fotoğraf Çek</span>
                  </button>
                  <button className="w-full p-3 text-left text-xs hover:bg-gray-50 flex items-center space-x-2 border-t">
                    <Plus className="w-4 h-4" /> <span>Dosya Seç</span>
                  </button>
                </div>
              )}
            </div>
            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-bold border border-blue-200">Yükle</button>
            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-bold border border-blue-200">Kamera</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex flex-col">
            <span className="text-gray-500">Hasta No</span>
            <span className="font-bold">{patient.no}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Adı</span>
            <span className="font-bold">{patient.name.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-30 flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-xs bg-white/90 backdrop-blur rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#E31E24] p-3 text-white text-center font-bold">
                Hasta Bilgileri
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <span className="text-gray-500">Hasta No:</span>
                  <span className="font-bold text-right">{patient.no}</span>
                  <span className="text-gray-500">Cinsiyet:</span>
                  <span className="font-bold text-right">{patient.gender}</span>
                  <span className="text-gray-500">Doğum Tarihi:</span>
                  <span className="font-bold text-right">{patient.birthDate}</span>
                  <span className="text-gray-500">Bölge/Köy:</span>
                  <span className="font-bold text-right">{patient.region}</span>
                </div>
                <button 
                  onClick={() => { setShowInfo(false); setShowAnamnesis(true); }}
                  className="w-full py-3 bg-blue-100 text-blue-600 rounded-xl font-bold mt-4"
                >
                  Tamam
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {showAnamnesis && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-30 flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-xs bg-white/90 backdrop-blur rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#E31E24] p-3 text-white text-center font-bold">
                Anamnez
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed text-center">
                  {patient.anamnesis}
                </p>
                <button 
                  onClick={() => setShowAnamnesis(false)}
                  className="w-full py-3 bg-blue-100 text-blue-600 rounded-xl font-bold mt-4"
                >
                  Tamam
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AssessmentScreen = ({ onBack }: { onBack: () => void }) => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [gumStatus, setGumStatus] = useState<'Kanamalı' | 'Sağlıklı' | null>(null);
  const [periodontalStatus, setPeriodontalStatus] = useState<'Normal' | 'Kritik' | null>(null);
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Değerlendirme başarıyla kaydedildi!');
      onBack();
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white p-6 pt-12 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Dental Değerlendirme</h2>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        <Card className="p-6">
          <h3 className="text-center font-bold text-gray-800 mb-6">Diş Haritası (Üst Çene)</h3>
          <div className="grid grid-cols-8 gap-2">
            {[18, 17, 16, 15, 14, 13, 12, 11].map((num) => (
              <button 
                key={num}
                onClick={() => setSelectedTooth(num)}
                className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all",
                  selectedTooth === num ? "bg-[#E31E24] text-white border-[#E31E24]" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-red-300"
                )}
              >
                {num}
              </button>
            ))}
            {[21, 22, 23, 24, 25, 26, 27, 28].map((num) => (
              <button 
                key={num}
                onClick={() => setSelectedTooth(num)}
                className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all",
                  selectedTooth === num ? "bg-[#E31E24] text-white border-[#E31E24]" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-red-300"
                )}
              >
                {num}
              </button>
            ))}
          </div>
          {selectedTooth && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4 text-sm font-bold text-[#E31E24]"
            >
              Seçili Diş: {selectedTooth}
            </motion.p>
          )}
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2">Genel Değerlendirme</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Diş Eti Muayenesi</label>
              <div className="flex gap-2">
                <button onClick={() => setGumStatus('Kanamalı')} className={cn("flex-1 py-2 rounded-lg border text-sm font-bold transition-all", gumStatus === 'Kanamalı' ? "bg-red-50 text-[#E31E24] border-red-200" : "bg-gray-50 text-gray-600 border-gray-200")}>Kanamalı</button>
                <button onClick={() => setGumStatus('Sağlıklı')} className={cn("flex-1 py-2 rounded-lg border text-sm font-bold transition-all", gumStatus === 'Sağlıklı' ? "bg-green-50 text-green-600 border-green-200" : "bg-gray-50 text-gray-600 border-gray-200")}>Sağlıklı</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Periodontal Muayene</label>
              <div className="flex gap-2">
                <button onClick={() => setPeriodontalStatus('Normal')} className={cn("flex-1 py-2 rounded-lg border text-sm font-bold transition-all", periodontalStatus === 'Normal' ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-gray-50 text-gray-600 border-gray-200")}>Normal</button>
                <button onClick={() => setPeriodontalStatus('Kritik')} className={cn("flex-1 py-2 rounded-lg border text-sm font-bold transition-all", periodontalStatus === 'Kritik' ? "bg-red-50 text-[#E31E24] border-red-200" : "bg-gray-50 text-gray-600 border-gray-200")}>Kritik</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Notlar</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Hekim notu ekleyin..." className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-red-500/20 h-24 text-sm" />
            </div>
          </div>
        </Card>
        <Button onClick={handleSave} disabled={isSaving} className="w-full py-4 text-lg shadow-lg shadow-red-200 flex items-center justify-center">
          {isSaving ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-white border-t-transparent rounded-full" /> : 'Değerlendirmeyi Kaydet'}
        </Button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('LOGIN');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full sm:max-w-[430px] mx-auto min-h-screen bg-white sm:shadow-2xl relative overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {currentScreen === 'LOGIN' && (
            <LoginScreen onLogin={() => navigate('DASHBOARD')} />
          )}
          {currentScreen === 'DASHBOARD' && (
            <DashboardScreen onNavigate={navigate} />
          )}
          {currentScreen === 'PATIENT_LIST' && (
            <PatientListScreen 
              onBack={() => navigate('DASHBOARD')} 
              onSelect={(p) => {
                setSelectedPatient(p);
                navigate('PATIENT_DETAIL');
              }}
            />
          )}
          {currentScreen === 'PATIENT_DETAIL' && selectedPatient && (
            <PatientDetailScreen 
              patient={selectedPatient} 
              onBack={() => navigate('PATIENT_LIST')} 
              onNavigate={navigate}
            />
          )}
          {currentScreen === 'ASSESSMENT' && (
            <AssessmentScreen onBack={() => navigate('PATIENT_DETAIL')} />
          )}
          {currentScreen === 'PHOTO_ARCHIVE' && selectedPatient && (
            <PhotoArchiveScreen 
              patient={selectedPatient} 
              onBack={() => navigate('PATIENT_DETAIL')} 
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Mobile Status Bar Simulation */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-transparent flex items-center justify-between px-6 pointer-events-none z-50">
        <span className="text-xs font-bold text-gray-400">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-3 h-3 border-2 border-gray-300 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
