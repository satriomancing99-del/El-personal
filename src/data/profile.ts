export interface JourneyItem {
  id: string;
  stage: 'selesai' | 'sedang-berjalan' | 'tahap-mendatang';
  badge: string;
  title: string;
  institution: string;
  description: string;
}

export interface InterestItem {
  id: string;
  title: string;
  description: string;
}

export interface ContactChannel {
  type: 'email' | 'instagram';
  label: string;
  value: string;
  url: string;
}

export interface ProfileData {
  name: string;
  nickname: string;
  origin: string;
  age: number;
  faith: string;
  photoUrl?: string; // Kosongkan jika belum tersedia, sistem akan menampilkan inisial
  
  hero: {
    greeting: string;
    introduction: string;
    callToAction: string;
  };

  about: {
    summary: string;
    principles: {
      title: string;
      description: string;
    }[];
    dailyRhythm: string;
  };

  journey: {
    intro: string;
    items: JourneyItem[];
  };

  interests: {
    intro: string;
    items: InterestItem[];
  };

  relationship: {
    purpose: string;
    values: {
      title: string;
      description: string;
    }[];
    futureOutlook: string;
  };

  contact: {
    heading: string;
    note: string;
    channels: ContactChannel[];
  };
}

export const profileData: ProfileData = {
  name: 'Dewa Bagus Alif Rosyadi',
  nickname: 'El',
  origin: 'Tulungagung, Jawa Timur',
  age: 23,
  faith: 'Islam',

  hero: {
    greeting: 'Halo, salam kenal.',
    introduction: 'Saya El, 23 tahun, asal Tulungagung, Jawa Timur. Saat ini saya sedang menempuh studi di Taiwan dan belajar hidup mandiri di perantauan.',
    callToAction: 'Kenali Saya',
  },

  about: {
    summary: 'Sehari-hari saya tipe orang yang cekatan (sat set) dan terbiasa langsung menyelesaikan urusan yang perlu dituntaskan tanpa menunda-nunda. Saya juga berusaha untuk selalu tepat waktu dan menepati apa yang sudah saya katakan, karena bagi saya itu cara sederhana untuk saling menghargai.',
    principles: [
      {
        title: 'Cekatan (Sat Set)',
        description: 'Jika ada hal penting yang bisa dikerjakan sekarang, saya memilih langsung bertindak daripada membiarkannya tertunda.',
      },
      {
        title: 'Mengusahakan Tepat Waktu',
        description: 'Saya berusaha menghargai waktu orang lain dan membiasakan diri hadir tepat waktu.',
      },
      {
        title: 'Menepati Ucapan',
        description: 'Berusaha memegang komitmen dan menjalankan apa yang sudah disepakati bersama.',
      },
    ],
    dailyRhythm: 'Saat ini hari-hari saya diisi dengan perkuliahan, rutin berolahraga untuk menjaga stamina, serta meluangkan waktu santai untuk membaca atau mendengarkan musik agar pikiran tetap segar.',
  },

  journey: {
    intro: 'Pendidikan yang sudah saya selesaikan, pengalaman berharga, studi yang sedang saya jalani, dan rencana langkah ke depan:',
    items: [
      {
        id: 's1-uin',
        stage: 'selesai',
        badge: 'Pendidikan Selesai',
        title: 'S1 Teknik Informatika',
        institution: 'UIN Maulana Malik Ibrahim Malang',
        description: 'Menyelesaikan kuliah S1 bidang komputer dan teknologi di Malang.',
      },
      {
        id: 'pengalaman-lain',
        stage: 'selesai',
        badge: 'Pengalaman Berharga',
        title: 'Penulisan Buku, Anotasi Data, & Pemasaran Digital',
        institution: 'PT Lini Suara Nusantara, RWS Group, & Harisenin',
        description: 'Pernah menulis buku pelajaran untuk penerbit, mengerjakan pekerjaan lepas anotasi data, dan mengikuti pelatihan digital marketing.',
      },
      {
        id: 'taiwan-intense',
        stage: 'sedang-berjalan',
        badge: 'Sedang Dijalani Saat Ini',
        title: 'Kuliah Teknik Mesin (Beasiswa INTENSE)',
        institution: 'Cheng Shiu University, Taiwan',
        description: 'Saat ini sedang menempuh studi Teknik Mesin di Taiwan melalui beasiswa INTENSE, sekaligus melatih kemandirian dan kemampuan beradaptasi di negeri orang.',
      },
      {
        id: 'ase-contract',
        stage: 'tahap-mendatang',
        badge: 'Tahap Mendatang (Rencana Kontrak)',
        title: 'Rencana Magang 1 Tahun & Kerja 2 Tahun',
        institution: 'ASE Semiconductor Taiwan',
        description: 'Rencana komitmen lanjutan setelah lulus kuliah: magang 1 tahun lalu bekerja 2 tahun di perusahaan semikonduktor di Taiwan untuk membangun pengalaman dan kemandirian masa depan. (Tahap ini adalah rencana mendatang, bukan status saat ini).',
      },
    ],
  },

  interests: {
    intro: 'Beberapa hal yang biasa saya nikmati di waktu luang:',
    items: [
      {
        id: 'mendaki',
        title: 'Mendaki Gunung',
        description: 'Menikmati perjalanan langkah demi langkah di alam bebas dan suasana tenang di alam terbuka.',
      },
      {
        id: 'traveling',
        title: 'Traveling',
        description: 'Senang bepergian ke tempat baru untuk melihat lingkungan dan suasana yang berbeda.',
      },
      {
        id: 'olahraga',
        title: 'Olahraga',
        description: 'Rutin berolahraga untuk menjaga kebugaran tubuh dan daya tahan.',
      },
      {
        id: 'baca-buku',
        title: 'Membaca Buku',
        description: 'Mengisi waktu senggang dengan membaca untuk menambah wawasan baru.',
      },
      {
        id: 'musik',
        title: 'Mendengarkan Musik',
        description: 'Menemani aktivitas harian atau saat ingin istirahat rileks sejenak.',
      },
    ],
  },

  relationship: {
    purpose: 'Tujuan saya membuat halaman ini sederhana: ingin membuka kesempatan saling mengenal dengan seseorang yang terbuka pada hubungan serius. Tidak ada tekanan atau keharusan buru-buru; kita bisa mulai dari mengobrol santai terlebih dahulu untuk melihat apakah ada kecocokan dan kenyamanan bersama.',
    values: [
      {
        title: 'Komunikasi',
        description: 'Saling terbuka apa adanya, mau mendengarkan tanpa menghakimi, dan membicarakan segala hal dengan tenang dan kepala dingin.',
      },
      {
        title: 'Kesetiaan',
        description: 'Komitmen untuk saling menjaga kepercayaan, konsisten mendampingi, dan saling mendukung dalam proses kehidupan.',
      },
    ],
    futureOutlook: 'Sebagai seorang muslim, saya memandang hubungan sebagai ruang untuk saling menjaga kehormatan dan saling mendukung dalam kebaikan. Saya menghargai proses perkenalan yang santun, bertahap, dan saling menghormati batas kenyamanan masing-masing.',
  },

  contact: {
    heading: 'Mari Menyapa',
    note: 'Jika Anda merasa ada keselarasan pandangan atau sekadar ingin saling berkenalan dan mengobrol santai, Anda dipersilakan menyapa lewat kanal di bawah ini:',
    channels: [
      {
        type: 'email',
        label: 'Email',
        value: 'dewa.bagusalif@gmail.com',
        url: 'mailto:dewa.bagusalif@gmail.com?subject=Salam%20Kenal%20-%20Dari%20Website%20Personal',
      },
      {
        type: 'instagram',
        label: 'Instagram',
        value: '@al_ifrosyad',
        url: 'https://instagram.com/al_ifrosyad',
      },
    ],
  },
};
