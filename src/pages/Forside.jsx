
/* Components */
import InfoSection from "../components/infoSection/infoSection";
import Kategori from "../components/forside/kategori/kategori"


const Forside = () => {
  return (
    <article>
      <InfoSection
      title={"Velkommen til Den Glade Skorpe!"}
      info={`Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som "Parma Drama" og "Rabbit Royale". Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!`}
      />
      <Kategori/>
    </article>
  );
};

export default Forside;