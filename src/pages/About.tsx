import { Layout } from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        {/* Header */}
        <header className="mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            About
          </span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Penulis
          </h1>
        </header>

        {/* Bio */}
        <div className="prose-literary space-y-6">
          <p>
            Saya telah menulis selama yang saya ingat—pertama di pinggiran buku catatan sekolah, 
            lalu di jurnal-jurnal yang semakin lusuh karena sering digunakan, dan 
            akhirnya di halaman-halaman buku yang diterbitkan yang masih terasa seperti 
            mimpi yang menjadi nyata.
          </p>

          <p>
            Karya-karya saya menjelajahi wilayah sunyi dari pengalaman manusia: kesendirian dan 
            hubungan, ingatan dan kelupaan, cara cahaya jatuh menembus jendela di 
            sore hari, percakapan yang kita lakukan dengan diri sendiri saat tidak ada 
            yang mendengarkan.
          </p>

          <p>
            Saya percaya pada kekuatan kelambanan. Di dunia yang bergerak semakin cepat, saya 
            tertarik pada langkah yang disengaja dari kalimat-kalimat yang hati-hati, 
            kesabaran yang diperlukan untuk menemukan kata yang tepat. Menulis, bagi saya, 
            adalah sebuah latihan perhatian—cara untuk hadir di dunia secara lebih utuh 
            daripada yang mungkin saya lakukan.
          </p>

          <p>
            Saya tinggal di sebuah rumah yang berdiri di tepi antara yang diketahui 
            dan yang tidak—di mana laut bukan sekadar pemandangan, melainkan pengingat abadi 
            bahwa ada kedalaman yang tidak pernah sepenuhnya bisa kita ukur.
          </p>

          <p>
            Suara ombak yang berulang itu bukan sekadar metronom—ia adalah pertanyaan yang sama 
            yang diajukan berkali-kali oleh semesta kepada siapa pun yang mau mendengar: 
            apakah kamu benar-benar ada, ataukah kamu hanya pola yang percaya bahwa dirinya hidup?
          </p>

          <p>
            Saat tidak menulis, saya berjalan di tepi air saat fajar—jam ketika batas antara 
            malam dan siang masih bisa diperdebatkan, ketika bayangan belum memutuskan akan 
            jatuh ke arah mana. Saya merawat taman yang diam-diam mengajari saya bahwa 
            sesuatu harus membusuk terlebih dahulu sebelum bisa tumbuh.
          </p>

          <p>
            Arsip ini bukan sekadar kumpulan kata—ia adalah peta dari wilayah yang tidak pernah 
            saya kunjungi secara fisik, namun selalu saya huni. Dua dekade upaya untuk menamai 
            apa yang tidak punya nama. Saya harap di antara halaman-halaman ini, Anda menemukan 
            bukan jawaban, melainkan pertanyaan yang lebih indah dari yang sebelumnya Anda miliki.
          </p>
        </div>

        {/* Writing Philosophy Section */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Yang Saya Lakukan
          </h2>
          
          <div className="prose-literary mt-6 space-y-6">
            <p>
              Saya menulis untuk memahami apa yang saya pikirkan. Tindakan menuangkan 
              kata-kata ke atas kertas, bagi saya, adalah sebuah tindakan penemuan—saya 
              jarang tahu apa yang sebenarnya saya rasakan tentang sesuatu sampai saya 
              mencoba menulis tentangnya.
            </p>

            <p>
              Proses saya sederhana: saya hadir. Setiap hari, pada jam yang sama, saya 
              duduk dengan kopi dan buku catatan saya dan saya menunggu. Terkadang 
              kata-kata datang dengan mudah; seringkali tidak. Namun praktik untuk 
              hadir, untuk menyediakan diri bagi apa pun yang mungkin datang, adalah 
              hal yang esensial.
            </p>

            <blockquote className="my-8 border-l-2 border-primary pl-6 italic">
              "Halaman kosong itu tidak kosong—ia penuh dengan kemungkinan. Tugas kita 
              hanyalah untuk menemukan kemungkinan mana yang ingin diwujudkan."
            </blockquote>

            <p>
              Saya tertarik pada penulis yang meluangkan waktu mereka: Marilynne Robinson, 
              W.G. Sebald, Mary Oliver. Penulis di mana setiap kata berarti, setiap 
              keheningan disengaja. Inilah tradisi yang saya cita-citakan, bahkan ketika 
              saya merasa kurang.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-16 rounded-lg border border-border bg-card p-8 md:p-10">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Get in Touch
          </h2>
          <p className="mt-4 font-serif text-literary">
            Untuk pertanyaan tentang pembacaan, publikasi, atau sekadar berbagi pemikiran Anda, 
            Anda dipersilakan untuk menghubungi saya di{' '}
            <a 
              href="mailto:hello@eleanorvance.com" 
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              hello@eleanorvance.com
            </a>
          </p>
        </section>
      </article>
    </Layout>
  );
};

export default About;