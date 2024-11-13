import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import logoRunBlue from "../../assets/2579814.jpg";
import logoRunWhite from "../../assets/1259.jpg";
import logoAppRun from "../../assets/isometrica-corriendo-infografia-aplicacion-movil 1.png";
import logoAppGps from "../../assets/infografia 1.png";
import logoAthleteBand from "../../assets/ATHLETEBANDLogo.png";
import ChestMeasurementModal from '../../components/chestMeasurementModal/ChestMeasurementModal';

const LandingPage: React.FC = () => {
    const heroRef = useRef(null);
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
  
    const [isModalOpen, setModalOpen] = useState(false);
  
    const heroInView = useInView(heroRef, { margin: '-50px' });
    const section1InView = useInView(section1Ref, { margin: '-50px' });
    const section2InView = useInView(section2Ref, { margin: '-50px' });
    const section3InView = useInView(section3Ref, { margin: '-50px' });
  
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const handleConfirm = (chestSize: string) => {
      alert(`Medida de pecho ingresada: ${chestSize} cm`);
      closeModal();
  };

  const scrollToSection3 = () => {
    if (section3Ref.current) {
      (section3Ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans relative">
      <motion.button
       whileHover={{ scale: 1.1 }}
       className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-[#00D084] text-white p-3 rounded-full shadow-lg z-50"
       onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </motion.button>

      <header 
        ref={heroRef}
        className="relative min-h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center m-0 p-0 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(13, 42, 61, 0.8), rgba(0, 0, 0, 0.4)), url(${logoRunBlue})`,
        }}
      >
        <img 
          src={logoAthleteBand} 
          alt="Logo Athlete Band" 
          className="hidden md:block absolute top-4 right-4 w-16 h-16 rounded-full object-cover shadow-lg transition-transform transform hover:scale-110" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-2xl px-4 md:px-8 text-white mt-[-4rem] md:mt-[-2rem]"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 md:mb-6">
            Bienvenidos a <span className="text-[#00D084]">Athletic Band</span>
          </h1>
          <div className="md:hidden flex justify-center mb-6 mt-4">
            <img
              src={logoAthleteBand}
              alt="Logo Athlete Band"
              className="w-16 h-16 rounded-full object-cover shadow-lg"
            />
          </div>
          <p className="text-xl md:text-2xl mb-8 md:mb-10">
            Descubre la nueva forma de monitorear tu rendimiento físico con nuestra banda elástica inteligente
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={scrollToSection3}
            className="bg-white text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition mb-6 md:mt-10"
          >
            Adquiere tu banda
          </motion.button>
        </motion.div>
      </header>
      
      <motion.section 
        ref={section1Ref}
        initial={{ opacity: 0, x: -100 }}
        animate={section1InView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between p-16 bg-white text-gray-800 transition-colors hover:bg-gray-100"
      >
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-[#333]">¿Qué es lo que hacemos?</h2>
          <p className="text-lg mb-6">
            Creamos tecnología de vanguardia para atletas. Nuestra banda inteligente monitorea en tiempo real
            métricas clave como frecuencia cardíaca, temperatura corporal, y mucho más para ayudarte a alcanzar 
            tu máximo rendimiento.
          </p>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={section1InView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 flex justify-center mt-6 md:mt-0 md:ml-8"
        >
          <img
            src={logoRunWhite}
            alt="Atleta usando banda"
            className="rounded-lg shadow-lg w-3/4 md:w-full transform transition-transform hover:scale-105 hover:brightness-110"
          />
        </motion.div>
      </motion.section>

      <motion.section 
        ref={section2Ref}
        initial={{ opacity: 0, x: 100 }}
        animate={section2InView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between p-16 bg-[#E0F7FA] text-gray-800 transition-colors hover:bg-[#C0E9F5]"
      >
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={section2InView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 order-2 md:order-1 mt-6 md:mt-0 md:ml-8"
        >
          <img
            src={logoAppRun}
            alt="Aplicación móvil"
            className="rounded-lg shadow-lg w-2/3 md:w-1/2 mx-auto transform transition-transform hover:scale-105 hover:brightness-110"
          />
        </motion.div>
        <div className="md:w-1/2 order-1 md:order-2">
          <h2 className="text-4xl font-bold mb-4 text-[#333]">¿Qué medimos?</h2>
          <p className="text-lg mb-6">
            Nuestra banda está equipada con los últimos sensores para ofrecerte un monitoreo completo de tu salud:
          </p>
          <ul className="list-disc ml-5 text-lg space-y-2">
            <li>Frecuencia cardíaca</li>
            <li>Temperatura corporal</li>
            <li>Actividad física</li>
            <li>Sudoración</li>
            <li>Posición GPS</li>
          </ul>
        </div>
      </motion.section>

      <motion.section 
        ref={section3Ref}
        initial={{ opacity: 0, x: -100 }}
        animate={section3InView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between p-16 bg-white text-gray-800 transition-colors hover:bg-gray-100"
      >
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-[#333]">Compra tu banda</h2>
          <p className="text-lg mb-6">
            ¿Listo para llevar tu rendimiento al siguiente nivel? Mide la circunferencia de tu pecho para elegir la talla perfecta
            y realiza tu compra ahora.
          </p>
          <button 
            onClick={openModal} 
            className="bg-[#00D084] text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-[#00a065] transition"
          >
            Ingresar medidas
          </button>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={section3InView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 flex justify-center mt-6 md:mt-0 md:ml-8"
        >
          <img
            src={logoAppGps}
            alt="Visualización del GPS"
            className="rounded-lg shadow-lg w-3/4 md:w-full transform transition-transform hover:scale-105 hover:brightness-110"
          />
        </motion.div>
      </motion.section>

     
       <ChestMeasurementModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onConfirm={handleConfirm} 
      />

      <footer className="flex items-center justify-center p-4 bg-gray-800 text-white">
        <p className="text-center opacity-80 hover:opacity-100 transition-opacity">&copy; 2024 Athletic Band. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
