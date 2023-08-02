import React, { useState, useEffect } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/NavBar";

const Profil = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [oturumAcik, setOturumAcik] = useState(true);
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [kullaniciEmail, setKullaniciEmail] = useState("");
  const [kullaniciResim, setKullaniciResim] = useState("");
  const kullanici = auth.currentUser;

  const signOutAccount = () => {
    if (kullanici) {
      signOut(auth)
        .then(() => {
          console.log("Çıkış Başarıyla Gerçekleşti");
          localStorage.setItem("isLoggedIn", "false"); // Kullanıcı oturum durumunu sıfırla
          setOturumAcik(false); // State'i güncelle
        })
        .catch((error) => {
          console.log("Çıkış yaparken bir hata oluştu:", error);
        });
    } else {
      console.log("Çıkış yapmak için giriş yapmanız gerekmektedir.");
    }
  };

  const guncelleProfil = () => {
    if (kullanici) {
      updateProfile(auth.currentUser, {
        displayName: kullaniciAdi,
        email: kullaniciEmail,
        photoURL: kullaniciResim,
      })
        .then(() => {
          console.log("Profil Başarıyla Güncellendi");
        })
        .catch((error) => {
          console.log("Profil Güncelleme Hatası:", error);
        });
    } else {
      console.log("Profil güncellemek için giriş yapmanız gerekmektedir.");
    }
  };

  const handleDosyaSec = (event) => {
    const dosya = event.target.files[0];
    if (dosya) {
      // Dosya varsa, dosyayı saklamak veya yüklemek için gerekli işlemleri burada yapabilirsiniz.
      // Örneğin, Firebase Storage kullanarak dosyayı yükleme işlemini gerçekleştirebilirsiniz.
      // Bu örnekte, sadece dosyanın URL'sini alıyoruz ve state'e atıyoruz.
      const dosyaURL = URL.createObjectURL(dosya);
      setKullaniciResim(dosyaURL);
    }
  };

  useEffect(() => {
    if (!oturumAcik) {
      navigate("/login"); // Kullanıcı oturumu kapalıysa giriş sayfasına yönlendir
    } else if (kullanici && kullanici.displayName && kullanici.email) {
      // Kullanıcı bilgilerini state'e yükle
      setKullaniciAdi(kullanici.displayName);
      setKullaniciEmail(kullanici.email);
      setKullaniciResim(kullanici.photoURL || "");
    }
  }, [oturumAcik, kullanici, navigate]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-screen flex-wrap h-screen">
      <NavBar />
      {kullanici && (
        <>
          <div className="flex flex-col justify-center items-center w-3/6">
            <p>Kullanıcı Adı: {kullaniciAdi}</p>
            <p>E-posta: {kullaniciEmail}</p>
            {kullaniciResim && <img src={kullaniciResim} alt="Profil Resmi" />}
            <p>E-posta Doğrulanmış: {kullanici.emailVerified ? "Evet" : "Hayır"}</p>
          </div>
          <div className="flex flex-col justify-right items-center w-3/6 gap-8">
            <label>
              Kullanıcı Adı:
              <input
                className="ml-3.5 border-2"
                type="text"
                value={kullaniciAdi}
                onChange={(e) => setKullaniciAdi(e.target.value)}
              />
            </label>
            <label>
              E-posta:
              <input
                className="ml-3.5 border-2"
                type="email"
                value={kullaniciEmail}
                onChange={(e) => setKullaniciEmail(e.target.value)}
              />
            </label>
            <label>
              Profil Fotoğrafı Seç:
              <input type="file" accept="image/*" onChange={handleDosyaSec} className="w-60 h-60" />
            </label>
            <button
              onClick={guncelleProfil}
              type="submit"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Profili Güncelle
            </button>
          </div>
        </>
      )}
      <button
        onClick={signOutAccount}
        type="submit"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default Profil;
